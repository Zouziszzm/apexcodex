"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  AMBIENT_VOLUME,
  pickAmbientTrack,
  readAmbientPreference,
} from "@/lib/ambient-tracks";

interface AmbientSoundContextValue {
  enabled: boolean;
  toggle: () => void;
}

const AmbientSoundContext = createContext<AmbientSoundContextValue | undefined>(
  undefined,
);

type AmbientAudioChain = {
  audio: HTMLAudioElement;
  context: AudioContext;
  gain: GainNode;
};

function createAmbientAudioChain(): AmbientAudioChain {
  const audio = new Audio();
  audio.preload = "auto";
  audio.volume = 1;
  audio.setAttribute("playsinline", "");

  const context = new AudioContext();
  const source = context.createMediaElementSource(audio);
  const gain = context.createGain();
  gain.gain.value = AMBIENT_VOLUME;

  source.connect(gain);
  gain.connect(context.destination);

  return { audio, context, gain };
}

function isAmbientPlaying(chain: AmbientAudioChain) {
  return (
    !chain.audio.paused &&
    !chain.audio.ended &&
    chain.audio.currentTime > 0
  );
}

export function AmbientSoundProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [enabled, setEnabled] = useState(true);
  const chainRef = useRef<AmbientAudioChain | null>(null);
  const currentTrackRef = useRef<string | undefined>(undefined);
  const enabledRef = useRef(true);
  const skipEnabledEffectRef = useRef(true);

  const ensureChain = useCallback(() => {
    if (chainRef.current) return chainRef.current;

    const chain = createAmbientAudioChain();
    chainRef.current = chain;

    chain.audio.addEventListener("ended", () => {
      if (enabledRef.current) void playRandomTrackRef.current();
    });

    return chain;
  }, []);

  const playRandomTrackRef = useRef<() => Promise<boolean>>(async () => false);

  const playRandomTrack = useCallback(async (): Promise<boolean> => {
    if (!enabledRef.current) return false;

    const chain = ensureChain();
    const track = pickAmbientTrack(currentTrackRef.current);
    currentTrackRef.current = track;
    chain.audio.src = track;
    chain.gain.gain.value = AMBIENT_VOLUME;

    // Resume synchronously when possible — iOS needs this inside a gesture.
    if (chain.context.state === "suspended") {
      void chain.context.resume();
    }

    try {
      await chain.audio.play();
      return true;
    } catch {
      return false;
    }
  }, [ensureChain]);

  playRandomTrackRef.current = playRandomTrack;

  const stop = useCallback(() => {
    const chain = chainRef.current;
    if (!chain) return;

    chain.audio.pause();
    chain.audio.currentTime = 0;
    currentTrackRef.current = undefined;
  }, []);

  const startFromGesture = useCallback(() => {
    if (!enabledRef.current) return;

    const chain = chainRef.current;
    if (chain && isAmbientPlaying(chain)) return;

    void playRandomTrack();
  }, [playRandomTrack]);

  useEffect(() => {
    enabledRef.current = enabled;

    if (skipEnabledEffectRef.current) {
      skipEnabledEffectRef.current = false;
      return;
    }

    if (!enabled) {
      stop();
      return;
    }

    void playRandomTrack();
  }, [enabled, playRandomTrack, stop]);

  useEffect(() => {
    const enabledOnLoad = readAmbientPreference();
    enabledRef.current = enabledOnLoad;
    setEnabled(enabledOnLoad);

    const onGesture = () => {
      startFromGesture();
    };

    window.addEventListener("pointerdown", onGesture, { capture: true });
    window.addEventListener("touchstart", onGesture, { capture: true });
    window.addEventListener("keydown", onGesture, { capture: true });

    return () => {
      window.removeEventListener("pointerdown", onGesture, { capture: true });
      window.removeEventListener("touchstart", onGesture, { capture: true });
      window.removeEventListener("keydown", onGesture, { capture: true });

      const chain = chainRef.current;
      if (chain) {
        chain.audio.pause();
        void chain.context.close();
        chainRef.current = null;
      }
    };
  }, [startFromGesture]);

  const toggle = useCallback(() => {
    setEnabled((current) => {
      const next = !current;
      enabledRef.current = next;

      if (next) {
        void playRandomTrack();
      } else {
        stop();
      }

      try {
        localStorage.setItem("ambient-sound", next ? "on" : "off");
      } catch {
        // Storage may be blocked in strict/private modes.
      }

      return next;
    });
  }, [playRandomTrack, stop]);

  return (
    <AmbientSoundContext.Provider value={{ enabled, toggle }}>
      {children}
    </AmbientSoundContext.Provider>
  );
}

export function useAmbientSound() {
  const context = useContext(AmbientSoundContext);
  if (!context) {
    throw new Error("useAmbientSound must be used within AmbientSoundProvider");
  }
  return context;
}
