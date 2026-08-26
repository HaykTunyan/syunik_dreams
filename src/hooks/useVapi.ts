"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Vapi from "@vapi-ai/web";
import { VAPI_PUBLIC_KEY, ASSISTANT_ID } from "@/lib/vapi/config";
import { useRouter } from '@/i18n/navigation';

export type CallStatus = "idle" | "connecting" | "active" | "error";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
}

export interface UseVapiOptions {
  assistantId?: string;
  publicKey?: string;
}

export function useVapi(options: UseVapiOptions = {}) {

  /**
   * 
   * Voice AI helper functions.
   */


  const activeAssistantId = options.assistantId || ASSISTANT_ID;
  const activePublicKey = options.publicKey || VAPI_PUBLIC_KEY;

  const [callStatus, setCallStatus] = useState<CallStatus>("idle");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isUserSpeaking, setIsUserSpeaking] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [activeTranscript, setActiveTranscript] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [error, setError] = useState<string | null>(null);

  const vapiRef = useRef<Vapi | null>(null);
  const router = useRouter();

  const routerRef = useRef(router);
  routerRef.current = router;


  // console.log("callStatus", callStatus);
  // console.log("isSpeaking", isSpeaking);
  // console.log("isUserSpeaking", isUserSpeaking);
  // console.log("volumeLevel", volumeLevel);
  // console.log("activeTranscript", activeTranscript);
  // console.log("messages", messages);
  // console.log("error", error);

  useEffect(() => {
    if (typeof window === "undefined" || !activePublicKey) return;

    try {
      const vapi = new Vapi(activePublicKey);
      vapiRef.current = vapi;

      const handleCallStart = () => {
        setCallStatus("active");
        setError(null);
      };

      const handleCallEnd = () => {
        setCallStatus("idle");
        setIsSpeaking(false);
        setIsUserSpeaking(false);
        setVolumeLevel(0);
      };

      const handleSpeechStart = () => {
        setIsSpeaking(true);
      };

      const handleSpeechEnd = () => {
        setIsSpeaking(false);
      };

      const handleVolumeLevel = (level: number) => {
        setVolumeLevel(level);
      };

      const handleMessage = (message: any) => {
        if (message?.type === "transcript" && message?.transcript) {
          const text = message.transcript;
          const role = message.role === "user" ? "user" : "assistant";
          setActiveTranscript(text);

          if (message.transcriptType === "final") {
            setMessages((prev) => [
              ...prev,
              {
                id: `${Date.now()}-${Math.random()}`,
                role,
                text,
              },
            ]);
            setActiveTranscript("");

            // NOTE: Client-side keyword-based navigation fallback has been
            // removed. Navigation is now handled entirely via the
            // assistant's tool-calling (see the "tool-calls" handler below),
            // which is far more reliable than regex matching on transcripts
            // and avoids duplicate/conflicting navigation triggers.
          }
        }

        // Handle client-side tool calls from the AI (new Vapi format)
        if (message?.type === "tool-calls") {
          const toolCalls = message.toolCallList || [];

          toolCalls.forEach((toolCall: any) => {
            const name = toolCall.function?.name;
            let parameters: Record<string, any> = {};

            try {
              const args = toolCall.function?.arguments;
              if (typeof args === "string") {
                parameters = JSON.parse(args || "{}");
              } else if (typeof args === "object" && args !== null) {
                parameters = args;
              }
            } catch (err) {
              console.error("Failed to parse tool call arguments:", err);
              return;
            }

            switch (name) {
              case "navigate_to_city":
                if (parameters?.cityId) {
                  routerRef.current.push(`/city/${parameters.cityId.toLowerCase()}`);
                }
                break;
              case "navigate_about_us":
              case "navigate_about-road":
                routerRef.current.push(`/about-road`);
                break;
              case "navigate_home":
                routerRef.current.push(`/`);
                break;
              case "navigate_trips":
                routerRef.current.push(`/trips`);
                break;
              case "navigate_history":
                routerRef.current.push(`/history`);
                break;
              case "navigate_your_city":
                routerRef.current.push(`/your-city`);
                break;
              case "navigate_cities":
                routerRef.current.push(`/city`);
                break;
              case "navigate_product":
                routerRef.current.push(`/product`);
                break;
              default:
                console.warn("Unhandled tool call:", name);
            }
          });
        }
      };

      const handleError = (err: any) => {
        console.error("Vapi Voice AI Error:", err);
        const errMsg = typeof err === "string" ? err : err?.message || "Voice connection failed";
        setError(errMsg);
        setCallStatus("error");
        setIsSpeaking(false);
        setIsUserSpeaking(false);
      };

      vapi.on("call-start", handleCallStart);
      vapi.on("call-end", handleCallEnd);
      vapi.on("speech-start", handleSpeechStart);
      vapi.on("speech-end", handleSpeechEnd);
      vapi.on("volume-level", handleVolumeLevel);
      vapi.on("message", handleMessage);
      vapi.on("error", handleError);

      return () => {
        try {
          vapi.stop();
          vapi.removeAllListeners();
        } catch {
          // cleanup fallback
        }
      };
    } catch (err: any) {
      console.error("Failed to initialize Vapi:", err);
      setError(err?.message || "Vapi initialization error");
    }
  }, [activePublicKey]);

  const startCall = useCallback(
    async (variableValues?: Record<string, any>) => {
      if (!vapiRef.current) {
        setError("Vapi client is not initialized.");
        return;
      }

      setCallStatus("connecting");
      setError(null);
      setActiveTranscript("");

      try {
        if (variableValues) {
          await vapiRef.current.start(activeAssistantId, {
            variableValues,
          } as any);
        } else {
          await vapiRef.current.start(activeAssistantId);
        }
      } catch (err: any) {
        console.error("Failed to start Vapi call:", err);
        setError(err?.message || "Failed to connect to Voice AI");
        setCallStatus("error");
      }
    },
    [activeAssistantId]
  );

  const stopCall = useCallback(() => {
    if (vapiRef.current) {
      try {
        vapiRef.current.stop();
      } catch (err) {
        console.error("Error stopping Vapi call:", err);
      }
    }
    setCallStatus("idle");
    setIsSpeaking(false);
    setIsUserSpeaking(false);
    setVolumeLevel(0);
  }, []);

  const toggleCall = useCallback(
    (variableValues?: Record<string, any>) => {
      if (callStatus === "active" || callStatus === "connecting") {
        stopCall();
      } else {
        startCall(variableValues);
      }
    },
    [callStatus, startCall, stopCall]
  );

  return {
    callStatus,
    isCalling: callStatus === "active" || callStatus === "connecting",
    isConnecting: callStatus === "connecting",
    isSpeaking,
    isUserSpeaking,
    volumeLevel,
    activeTranscript,
    messages,
    error,
    startCall,
    stopCall,
    toggleCall,
  };
}