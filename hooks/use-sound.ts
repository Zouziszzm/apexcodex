"use client"

import { useCallback, useEffect, useRef } from "react"

import type * as ToneType from "tone";

export function useSound() {
  const tickRef = useRef<ToneType.NoiseSynth | null>(null);

  const playTick = useCallback(async () => {
    const Tone = await import("tone");
    
    if (Tone.getContext().state !== "running") {
      await Tone.start();
    }

    if (!tickRef.current) {
      tickRef.current = new Tone.NoiseSynth({
        noise: { type: "white" },
        envelope: { attack: 0.001, decay: 0.02, sustain: 0 },
      }).toDestination();
      tickRef.current.volume.value = -35;
    }

    tickRef.current.triggerAttackRelease("32n");
  }, []);

  useEffect(() => {
    const handleInteraction = async () => {
      const Tone = await import("tone");
      Tone.start();
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
    };

    window.addEventListener("click", handleInteraction);
    window.addEventListener("keydown", handleInteraction);
    window.addEventListener("touchstart", handleInteraction);

    return () => {
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
      tickRef.current?.dispose();
    };
  }, []);

  // Map all interactions to the same subtle tick sound
  return { 
    playClick: playTick, 
    playTick, 
    playChime: playTick, 
    playOpen: playTick, 
    playClose: playTick 
  }
}
