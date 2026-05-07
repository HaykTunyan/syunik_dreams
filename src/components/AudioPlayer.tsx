"use client";

import { useState, useRef, useEffect, Fragment } from "react";
import { FiVolume2, FiVolumeX } from "react-icons/fi";

export default function AudioPlayer() {

  /**
   * 
   * Audio Player Component to play background music in the website    
   */

  const tracks = [
    { name: "Mountain", src: "/audios/mountain-music.mp3" },
    { name: "War", src: "/audios/war-music.mp3" },
  ];

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = tracks[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
      if (isPlaying) {
        audioRef.current.play().catch(console.error);
      }
    }
  }, [currentTrackIndex, isPlaying]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(console.error);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const switchTrack = () => {
    const nextIndex = (currentTrackIndex + 1) % tracks.length;
    setCurrentTrackIndex(nextIndex);
  };

  return (
    <Fragment>
      <audio ref={audioRef} src={currentTrack.src} loop />

      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {/* Track Label */}
        {isPlaying && (
          <div className="bg-white/80 dark:bg-black/80 backdrop-blur-sm px-3 py-1 rounded-lg border border-zinc-200 dark:border-zinc-800 text-[10px] font-bold uppercase tracking-widest text-orange-500 animate-fade-in">
            {currentTrack.name} Music
          </div>
        )}

        <div className="flex gap-2">
          {/* Switch Button */}
          <button
            onClick={switchTrack}
            className="p-3 rounded-full bg-white/90 dark:bg-black/90 backdrop-blur-md shadow-lg border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-orange-500 transition-colors"
            title="Switch Track"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21 21-6-6m6 6v-4.8m0 4.8h-4.8" /><path d="M3 16.2V21m0 0h4.8M3 21l6-6" /><path d="M21 7.8V3m0 0h-4.8M21 3l-6 6" /><path d="M3 7.8V3m0 0h4.8M3 3l6 6" /></svg>
          </button>

          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            className="p-4 rounded-full bg-orange-500 shadow-xl text-white hover:scale-110 active:scale-95 transition-all duration-300"
            aria-label={isPlaying ? "Mute soundtrack" : "Play soundtrack"}
          >
            <div className="relative">
              {isPlaying ? <FiVolume2 size={24} /> : <FiVolumeX size={24} />}
              {!isPlaying && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                </span>
              )}
            </div>
          </button>
        </div>
      </div>
    </Fragment>
  );
}
