"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";
import { DiaTextReveal } from "@/components/ui/dia-text-rv";
import type { NowPlaying } from "@/lib/spotify";

const POLL_MS = 30_000;

type SpotifyNowPlayingProps = {
  variant?: "block" | "inline";
  className?: string;
};

function trackLabel(track: NowPlaying) {
  return `${track.title}${track.artist ? ` · ${track.artist}` : ""}`;
}

/** ECG line — viewBox amp 1 unit = 0.75px on screen (svg h 6px / viewBox h 8) */
const ECG_VIEW_H = 8;
const ECG_BASELINE = 4;
const ECG_AMP_MAX = 7; // ±1.5px peak / trough at full scale
const ECG_CYCLES = 5;
const ECG_CYCLE_W = 48;

function randomAmpRange(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function buildEcgCyclePath(x: number, peakAmp: number, valleyAmp = peakAmp) {
  const y = ECG_BASELINE;
  const up = y - peakAmp;
  const down = y + valleyAmp;
  const soft = y - peakAmp * 0.45;
  return [
    `M${x},${y}`,
    `H${x + 10}`,
    `Q${x + 11.5},${y} ${x + 12.5},${soft} T${x + 14.5},${y}`,
    `H${x + 18}`,
    `L${x + 18.7},${y} L${x + 19},${up} L${x + 19.3},${down} L${x + 19.6},${y} H${x + 20.5}`,
    `H${x + 23}`,
    `Q${x + 25},${y} ${x + 26},${soft} T${x + 28},${y}`,
    `H${x + ECG_CYCLE_W}`,
  ].join(" ");
}

type EcgSegmentState = {
  peak: number;
  valley: number;
  peakMax: number;
  valleyMax: number;
  duration: number;
  delay: number;
};

function createSegmentStates(): EcgSegmentState[] {
  return Array.from({ length: ECG_CYCLES }, (_, i) => ({
    peak: 0.12,
    valley: 0.12,
    peakMax: randomAmpRange(0.5, ECG_AMP_MAX),
    valleyMax: randomAmpRange(0.5, ECG_AMP_MAX),
    duration: randomAmpRange(0.45, 0.95),
    delay: i * 0.14 + randomAmpRange(0, 0.28),
  }));
}

function SongWaveform() {
  const svgRef = useRef<SVGSVGElement>(null);
  const segmentsRef = useRef<EcgSegmentState[] | null>(null);
  if (!segmentsRef.current) segmentsRef.current = createSegmentStates();

  useGSAP(
    () => {
      const svg = svgRef.current;
      if (!svg) return;

      const paths = svg.querySelectorAll<SVGPathElement>(".song-waveform-path");
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      paths.forEach((path, i) => {
        const x = i * ECG_CYCLE_W;
        const seg = segmentsRef.current![i];

        if (reduced) {
          path.setAttribute("d", buildEcgCyclePath(x, seg.peakMax, seg.valleyMax));
          return;
        }

        gsap.to(seg, {
          peak: seg.peakMax,
          valley: seg.valleyMax,
          duration: seg.duration,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: seg.delay,
          onUpdate: () => {
            path.setAttribute("d", buildEcgCyclePath(x, seg.peak, seg.valley));
          },
        });
      });
    },
    { scope: svgRef },
  );

  return (
    <svg
      ref={svgRef}
      className="song-waveform"
      viewBox={`0 0 ${ECG_CYCLES * ECG_CYCLE_W} ${ECG_VIEW_H}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {Array.from({ length: ECG_CYCLES }, (_, i) => (
        <path
          key={i}
          className="song-waveform-path"
          d={buildEcgCyclePath(i * ECG_CYCLE_W, 0.12)}
        />
      ))}
    </svg>
  );
}

function TrackLine({
  track,
  maxWidthClass,
}: {
  track: NowPlaying;
  maxWidthClass: string;
}) {
  const [hovered, setHovered] = useState(false);
  const [truncated, setTruncated] = useState(false);
  const lineRef = useRef<HTMLSpanElement>(null);
  const full = trackLabel(track);

  useEffect(() => {
    const el = lineRef.current;
    if (!el) return;

    const check = () => setTruncated(el.scrollWidth > el.clientWidth);
    check();

    const observer = new ResizeObserver(check);
    observer.observe(el);
    return () => observer.disconnect();
  }, [full]);

  return (
    <span
      className={cn(
        "relative inline-flex min-w-0 flex-1 flex-col gap-1 align-top",
        maxWidthClass,
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        ref={lineRef}
        className="block w-full min-w-0 truncate whitespace-nowrap"
        title={truncated ? undefined : full}
      >
        Listening to —{" "}
        {track.songUrl ? (
          <a
            href={track.songUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-(--body) hover:text-(--accent) transition-colors"
          >
            {track.title}
          </a>
        ) : (
          <span className="text-(--body)">{track.title}</span>
        )}
        {track.artist ? (
          <span className="text-(--subtext)/70"> · {track.artist}</span>
        ) : null}
      </span>
      <SongWaveform />
      {truncated && (
        <span
          className={cn(
            "absolute left-1/2 bottom-[calc(100%+0.45rem)] -translate-x-1/2 z-50",
            "pointer-events-none whitespace-normal text-center w-max max-w-[min(260px,72vw)]",
            "font-body-xs font-light italic text-(--subtext)/75 tracking-wide",
            "transition-all duration-300 ease-out",
            hovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1",
          )}
          aria-hidden={!hovered}
        >
          {full}
        </span>
      )}
    </span>
  );
}

export function SpotifyNowPlaying({
  variant = "block",
  className,
}: SpotifyNowPlayingProps) {
  const [track, setTrack] = useState<NowPlaying | null>(null);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const res = await fetch("/api/spotify/now-playing");
        if (!res.ok) return;
        const data = (await res.json()) as NowPlaying;
        if (active) setTrack(data);
      } catch {
        if (active) setTrack(null);
      }
    };

    load();
    const interval = setInterval(load, POLL_MS);
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, []);

  if (!track?.isPlaying || !track.title) return null;

  const maxWidthClass = variant === "inline" ? "" : "max-w-full";

  const line = <TrackLine track={track} maxWidthClass={maxWidthClass} />;

  if (variant === "inline") {
    return (
      <span
        className={cn(
          "flex w-full min-w-0 flex-col font-body-sm font-light text-(--subtext)/80 leading-tight align-top",
          className,
        )}
      >
        {line}
      </span>
    );
  }

  return (
    <p
      className={cn(
        "font-body-sm font-light text-(--subtext)/80 leading-relaxed min-w-0",
        className,
      )}
    >
      <DiaTextReveal delay={0.5} duration={1.2} textColor="var(--subtext)">
        <>{line}</>
      </DiaTextReveal>
    </p>
  );
}
