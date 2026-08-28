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
} from "@/lib/ambient-tracks";
import {
  readAmbientPreference,
  readSiteConsent,
  writeSiteConsent,
  type SiteConsentStatus,
} from "@/lib/site-preferences";
import { SiteConsentDialog } from "@/components/ui/site-consent-dialog";

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

export function AmbientSoundProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [enabled, setEnabled] = useState(false);
  const [consentStatus, setConsentStatus] =
    useState<SiteConsentStatus>("unknown");
  const [ready, setReady] = useState(false);
  const chainRef = useRef<AmbientAudioChain | null>(null);
  const currentTrackRef = useRef<string | undefined>(undefined);
  const enabledRef = useRef(false);
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

    try {
      if (chain.context.state === "suspended") {
        await chain.context.resume();
      }
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

  const setAmbientEnabled = useCallback(
    (next: boolean, persist = true) => {
      enabledRef.current = next;
      setEnabled(next);

      if (next) {
        void playRandomTrack();
      } else {
        stop();
      }

      if (!persist) return;

      try {
        localStorage.setItem("ambient-sound", next ? "on" : "off");
      } catch {
        // Storage may be blocked in strict/private modes.
      }
    },
    [playRandomTrack, stop],
  );

  const resolveConsent = useCallback(
    (allowed: boolean) => {
      writeSiteConsent(allowed);
      setConsentStatus(allowed ? "accepted" : "declined");
      setAmbientEnabled(allowed);
    },
    [setAmbientEnabled],
  );

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
    const consent = readSiteConsent();
    setConsentStatus(consent);

    if (consent !== "unknown") {
      const enabledOnLoad = readAmbientPreference();
      enabledRef.current = enabledOnLoad;
      setEnabled(enabledOnLoad);
    }

    setReady(true);

    return () => {
      const chain = chainRef.current;
      if (chain) {
        chain.audio.pause();
        void chain.context.close();
        chainRef.current = null;
      }
    };
  }, []);

  const toggle = useCallback(() => {
    setAmbientEnabled(!enabledRef.current);
  }, [setAmbientEnabled]);

  return (
    <AmbientSoundContext.Provider value={{ enabled, toggle }}>
      {children}
      {ready && consentStatus === "unknown" ? (
        <SiteConsentDialog
          onAllow={() => resolveConsent(true)}
          onDecline={() => resolveConsent(false)}
        />
      ) : null}
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
