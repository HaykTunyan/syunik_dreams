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

            // Client-side fallback: check if user says navigation keywords
            if (role === "user") {
              const lowerText = text.toLowerCase();
              const isNavigating = /(navigate|go|redirect|take me)/.test(lowerText);

              if (isNavigating) {
                if (lowerText.includes("home") || lowerText.includes("main page")) {
                  router.push(`/`);
                } else if (lowerText.includes("trip") || lowerText.includes("tour")) {
                  router.push(`/trips`);
                } else if (lowerText.includes("history") || lowerText.includes("past")) {
                  router.push(`/history`);
                } else if (lowerText.includes("your city") || lowerText.includes("my city")) {
                  router.push(`/your-city`);
                } else if (lowerText.includes("cities") || lowerText.includes("all city")) {
                  router.push(`/city`);
                } else if (lowerText.includes("about")) {
                  router.push(`/about-road`);
                } else {
                  // Check for specific cities
                  const cities = ["kapan", "goris", "meghri", "sisian", "agarak", "qajaran"];
                  for (const city of cities) {
                    if (lowerText.includes(city)) {
                      router.push(`/city/${city}`);
                      break;
                    }
                  }
                }
              }
            }
          }
        }

        // Handle function calls from the AI
        if (message?.type === "function-call") {
          const { name, parameters } = message.functionCall || {};


          // console.log("function call", name,);

          if (name === "navigate_to_city" && parameters?.cityId) {
            router.push(`/city/${parameters.cityId.toLowerCase()}`);
          } else if (name === "navigate_about_us") {
            router.push(`/about-road`);
          } else if (name === "navigate_home") {
            router.push(`/`);
          } else if (name === "navigate_trips") {
            router.push(`/trips`);
          } else if (name === "navigate_history") {
            router.push(`/history`);
          } else if (name === "navigate_your_city") {
            router.push(`/your-city`);
          } else if (name === "navigate_cities") {
            router.push(`/city`);
          }

          // Optionally, send a response back to the AI indicating the function was executed
          vapi.send({
            type: "add-message",
            message: {
              role: "system",
              content: `System: Successfully executed ${name}`,
            },
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
  }, [activePublicKey, router]);

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
