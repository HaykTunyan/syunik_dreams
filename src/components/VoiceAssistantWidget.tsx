"use client";

import React, { useState } from "react";
import { useVapi } from "@/hooks/useVapi";
import { FiMic, FiMicOff, FiX, FiVolume2, FiMessageSquare } from "react-icons/fi";

interface VoiceAssistantWidgetProps {
  cityName?: string;
  cityContext?: Record<string, any>;
  embedded?: boolean;
}

export default function VoiceAssistantWidget({
  cityName,
  cityContext,
  embedded = false,
}: VoiceAssistantWidgetProps) {
  const {
    callStatus,
    isCalling,
    isConnecting,
    isSpeaking,
    volumeLevel,
    activeTranscript,
    messages,
    error,
    toggleCall,
    stopCall,
  } = useVapi();

  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    const vars = {
      ...(cityName ? { cityName } : {}),
      ...(cityContext || {}),
    };

    if (!isCalling && !isOpen) {
      setIsOpen(true);
    }
    toggleCall(Object.keys(vars).length > 0 ? vars : undefined);
  };

  // Soundwave visualizer bars height calculation
  const getBarHeight = (multiplier: number) => {
    if (!isCalling) return "h-2";
    const minHeight = 8;
    const maxHeight = 36;
    const calculated = Math.min(
      maxHeight,
      Math.max(minHeight, volumeLevel * 100 * multiplier)
    );
    return `h-[${Math.round(calculated)}px]`;
  };

  if (embedded) {
    return (
      <div className="w-full bg-linear-to-br from-zinc-900 via-zinc-900 to-orange-950/40 p-6 md:p-8 rounded-3xl border border-orange-500/20 shadow-2xl space-y-6 text-white relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-2xl ${isCalling ? "bg-orange-500 text-white animate-pulse" : "bg-zinc-800 text-orange-400"}`}>
              <FiMic className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-black text-xl uppercase tracking-wider">
                Syunik Voice Guide AI
              </h3>
              <p className="text-xs text-zinc-400">
                {cityName ? `Ask AI about ${cityName}` : "Ask anything about Syunik region"}
              </p>
            </div>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${
              callStatus === "active"
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                : callStatus === "connecting"
                ? "bg-amber-500/20 text-amber-400 border border-amber-500/30 animate-pulse"
                : callStatus === "error"
                ? "bg-red-500/20 text-red-400 border border-red-500/30"
                : "bg-zinc-800 text-zinc-400"
            }`}
          >
            {callStatus === "active"
              ? isSpeaking
                ? "AI Speaking..."
                : "Listening..."
              : callStatus === "connecting"
              ? "Connecting..."
              : callStatus === "error"
              ? "Error"
              : "Ready"}
          </span>
        </div>

        {/* Audio Visualizer */}
        <div className="h-16 bg-zinc-950/60 rounded-2xl p-4 flex items-center justify-center gap-1.5 border border-white/5">
          {isCalling ? (
            <div className="flex items-center justify-center gap-1.5 h-full w-full">
              {[0.6, 1.2, 0.8, 1.5, 1.0, 0.7, 1.3, 0.9].map((mult, idx) => (
                <div
                  key={idx}
                  className="w-1.5 bg-linear-to-t from-orange-600 to-amber-400 rounded-full transition-all duration-75"
                  style={{
                    height: `${Math.max(6, Math.min(40, (volumeLevel * 120 + 8) * mult))}px`,
                  }}
                />
              ))}
            </div>
          ) : (
            <p className="text-xs text-zinc-500 italic flex items-center gap-2">
              <FiVolume2 className="w-4 h-4" /> Click below to talk with Syunik AI Guide
            </p>
          )}
        </div>

        {/* Live Transcript / Messages */}
        {(activeTranscript || messages.length > 0) && (
          <div className="max-h-32 overflow-y-auto space-y-2 p-3 bg-black/30 rounded-xl text-sm border border-white/5">
            {messages.slice(-3).map((m) => (
              <div key={m.id} className={`flex gap-2 ${m.role === "user" ? "text-orange-300" : "text-zinc-200"}`}>
                <span className="font-bold text-xs uppercase shrink-0">{m.role}:</span>
                <p className="text-xs">{m.text}</p>
              </div>
            ))}
            {activeTranscript && (
              <div className="flex gap-2 text-amber-200 animate-pulse">
                <span className="font-bold text-xs uppercase shrink-0">Live:</span>
                <p className="text-xs">{activeTranscript}</p>
              </div>
            )}
          </div>
        )}

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs">
            {error}
          </div>
        )}

        <button
          onClick={handleToggle}
          disabled={isConnecting}
          className={`w-full py-4 rounded-2xl font-bold uppercase tracking-wider flex items-center justify-center gap-3 transition-all duration-300 shadow-lg ${
            isCalling
              ? "bg-red-600 hover:bg-red-700 text-white shadow-red-600/30"
              : "bg-orange-500 hover:bg-orange-600 text-white shadow-orange-500/30"
          }`}
        >
          {isCalling ? (
            <>
              <FiMicOff className="w-5 h-5" /> Stop Voice AI
            </>
          ) : (
            <>
              <FiMic className="w-5 h-5" /> Start Voice AI 🎤
            </>
          )}
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Expanded Modal / Drawer */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 bg-zinc-900/95 backdrop-blur-xl border border-zinc-800 rounded-3xl p-6 shadow-2xl text-white space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <div className="flex items-center gap-2.5">
              <div className={`p-2 rounded-xl ${isCalling ? "bg-orange-500 text-white animate-pulse" : "bg-zinc-800 text-orange-400"}`}>
                <FiMic className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm">Syunik Voice AI</h4>
                <p className="text-[10px] text-zinc-400">Interactive Tour Guide</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          {/* Call Status Badge */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-zinc-400">Status:</span>
            <span
              className={`font-semibold uppercase tracking-wider ${
                callStatus === "active"
                  ? "text-emerald-400"
                  : callStatus === "connecting"
                  ? "text-amber-400 animate-pulse"
                  : callStatus === "error"
                  ? "text-red-400"
                  : "text-zinc-500"
              }`}
            >
              {callStatus === "active"
                ? isSpeaking
                  ? "AI Speaking..."
                  : "Listening..."
                : callStatus}
            </span>
          </div>

          {/* Equalizer Visualizer */}
          <div className="h-14 bg-black/40 rounded-2xl px-4 flex items-center justify-center gap-1 border border-zinc-800">
            {isCalling ? (
              <div className="flex items-center justify-center gap-1.5 h-full w-full">
                {[0.7, 1.3, 0.9, 1.6, 1.1, 0.8, 1.4].map((mult, idx) => (
                  <div
                    key={idx}
                    className="w-1 bg-linear-to-t from-orange-500 to-amber-400 rounded-full transition-all duration-75"
                    style={{
                      height: `${Math.max(4, Math.min(32, (volumeLevel * 100 + 6) * mult))}px`,
                    }}
                  />
                ))}
              </div>
            ) : (
              <span className="text-xs text-zinc-500 flex items-center gap-1.5">
                <FiMessageSquare className="w-3.5 h-3.5" /> Start speaking to Syunik Guide
              </span>
            )}
          </div>

          {/* Transcript snippet */}
          {(activeTranscript || messages.length > 0) && (
            <div className="max-h-28 overflow-y-auto space-y-1.5 p-2.5 bg-black/30 rounded-xl text-xs border border-zinc-800">
              {messages.slice(-2).map((m) => (
                <div key={m.id} className="text-zinc-300">
                  <span className="font-semibold text-orange-400">{m.role === "user" ? "You: " : "AI: "}</span>
                  {m.text}
                </div>
              ))}
              {activeTranscript && (
                <div className="text-amber-300 italic">
                  <span className="font-semibold">Live: </span>
                  {activeTranscript}
                </div>
              )}
            </div>
          )}

          {error && (
            <div className="p-2.5 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs">
              {error}
            </div>
          )}

          {/* Action Trigger */}
          <button
            onClick={handleToggle}
            disabled={isConnecting}
            className={`w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
              isCalling
                ? "bg-red-600 hover:bg-red-700 text-white"
                : "bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/25"
            }`}
          >
            {isCalling ? (
              <>
                <FiMicOff className="w-4 h-4" /> End Call
              </>
            ) : (
              <>
                <FiMic className="w-4 h-4" /> Connect Voice AI
              </>
            )}
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
        className={`relative group p-4 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center ${
          isCalling
            ? "bg-orange-500 text-white ring-4 ring-orange-500/30 scale-110"
            : "bg-zinc-900 hover:bg-orange-500 text-orange-400 hover:text-white border border-zinc-800 hover:border-orange-500"
        }`}
        title="Syunik Voice AI Guide"
      >
        {isCalling && (
          <span className="absolute inset-0 rounded-full bg-orange-500 animate-ping opacity-30 pointer-events-none" />
        )}
        <FiMic className="w-6 h-6 z-10" />
      </button>
    </div>
  );
}
