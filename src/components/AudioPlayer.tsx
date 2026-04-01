"use client";

import { useState, useRef, useEffect, Fragment } from "react";
import { FiVolume2, FiVolumeX } from "react-icons/fi";

export default function AudioPlayer({ src = "/audios/mountain-music.mp3" }: { src?: string }) {

  /**
   * 
   * Audio Player Component
   
   */


  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Attempt autoplay if allowed by the browser
    if (audioRef.current) {
      audioRef.current.volume = 0.5; // Set volume to competitive level
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((e) => {
        // Autoplay blocked by browser policy waiting for user interaction
        console.log("Autoplay blocked. User needs to interact.", e);
        setIsPlaying(false);
      });
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <Fragment>
      <audio ref={audioRef} src={src} loop />
      <button
        onClick={togglePlay}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-white/90 dark:bg-black/90 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-zinc-200 dark:border-zinc-800 text-orange-500 hover:scale-110 hover:text-orange-600 dark:hover:text-orange-400 transition-all duration-300"
        aria-label={isPlaying ? "Mute soundtrack" : "Play soundtrack"}
      >
        <div className="relative">
          {isPlaying ? <FiVolume2 size={24} /> : <FiVolumeX size={24} />}
          {!isPlaying && (
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
            </span>
          )}
        </div>
      </button>
    </Fragment>
  );
}
