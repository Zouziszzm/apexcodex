"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DiaTextReveal } from "@/components/ui/dia-text-rv";
import { ChevronDown } from "lucide-react";
import { useSound } from "@/hooks/use-sound";
import { jobs, companySpans } from "@/data/experience";
import { RoleItem } from "./role-item";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const ExperienceSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerLineRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLElement | null)[]>([]);
  const titleLinesRef = useRef<(HTMLElement | null)[]>([]);
  const dividerLinesRef = useRef<(HTMLElement | null)[]>([]);
  const pulseRefs = useRef<(HTMLElement | null)[]>([]);
  const dividerPulseRefs = useRef<(HTMLElement | null)[]>([]);
  const rolesRefs = useRef<(HTMLDivElement | null)[]>([]);

  const expandedRef = useRef<HTMLDivElement>(null);
  const chevronRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedJobIndices, setExpandedJobIndices] = useState<
    Record<number, boolean>
  >({});

  const totalMonths = companySpans.reduce((acc, span) => {
    const startDate = new Date(span.start);
    const endDate = span.end === "present" ? new Date() : new Date(span.end);
    const diff =
      (endDate.getFullYear() - startDate.getFullYear()) * 12 +
      (endDate.getMonth() - startDate.getMonth());
    return acc + Math.max(0, diff);
  }, 0);

  const totalYears = (totalMonths / 12).toFixed(1);

  const autoCloseTimers = useRef<Record<number, NodeJS.Timeout>>({});
  const pastExpTimer = useRef<NodeJS.Timeout | null>(null);

  const { playTick } = useSound();

  const { contextSafe } = useGSAP({ scope: containerRef });

  const toggleJobRoles = contextSafe((index: number, forcedState?: boolean) => {
    const isNowExpanded =
      forcedState !== undefined ? forcedState : !expandedJobIndices[index];

    // Skip if already in the desired state
    if (expandedJobIndices[index] === isNowExpanded) return;

    playTick();

    setExpandedJobIndices((prev) => ({ ...prev, [index]: isNowExpanded }));

    const rolesContainer = rolesRefs.current[index];
    if (rolesContainer) {
      if (isNowExpanded) {
        gsap.to(rolesContainer, {
          height: "auto",
          opacity: 1,
          marginTop: 12,
          duration: 0.8,
          ease: "expo.out",
        });
      } else {
        gsap.to(rolesContainer, {
          height: 0,
          opacity: 0,
          marginTop: 0,
          duration: 1,
          ease: "expo.inOut",
        });
      }
    }
  });

  const onJobHover = contextSafe((index: number) => {
    if (autoCloseTimers.current[index]) {
      clearTimeout(autoCloseTimers.current[index]);
      delete autoCloseTimers.current[index];
    }

    const pulse = pulseRefs.current[index];
    const dividerPulse = dividerPulseRefs.current[index];
    if (pulse) {
      gsap.fromTo(
        pulse,
        { x: "-100%", opacity: 0 },
        {
          x: "100%",
          opacity: 1,
          duration: 1,
          repeat: -1,
          repeatDelay: 0.2,
          ease: "power2.inOut",
        },
      );
    }
    if (dividerPulse) {
      gsap.fromTo(
        dividerPulse,
        { x: "-100%", opacity: 0 },
        {
          x: "100%",
          opacity: 1,
          duration: 1.2,
          repeat: -1,
          repeatDelay: 0.2,
          ease: "power2.inOut",
        },
      );
    }
  });

  const onJobLeave = contextSafe((index: number) => {
    const pulse = pulseRefs.current[index];
    const dividerPulse = dividerPulseRefs.current[index];
    if (pulse) {
      gsap.killTweensOf(pulse);
      gsap.set(pulse, { x: "-100%", opacity: 0 });
    }
    if (dividerPulse) {
      gsap.killTweensOf(dividerPulse);
      gsap.set(dividerPulse, { x: "-100%", opacity: 0 });
    }

    if (expandedJobIndices[index]) {
      autoCloseTimers.current[index] = setTimeout(() => {
        toggleJobRoles(index);
        delete autoCloseTimers.current[index];
      }, 3000);
    }
  });

  const togglePastExperience = contextSafe((forcedState?: boolean) => {
    const nextState = forcedState !== undefined ? forcedState : !isExpanded;

    // Skip if already in the desired state
    if (isExpanded === nextState) return;

    playTick();

    setIsExpanded(nextState);

    // Clear hash from URL when closing the section
    if (!nextState && window.location.hash === "#experience-metalinex") {
      window.history.replaceState(
        null,
        document.title,
        window.location.pathname + window.location.search,
      );
    }

    if (expandedRef.current) {
      if (nextState) {
        gsap.fromTo(
          expandedRef.current,
          { height: 0, opacity: 0 },
          { height: "auto", opacity: 1, duration: 0.8, ease: "expo.out" },
        );
      } else {
        gsap.to(expandedRef.current, {
          height: 0,
          opacity: 0,
          duration: 1,
          ease: "expo.inOut",
        });
      }
    }
  });

  const onPastExpEnter = contextSafe(() => {
    if (pastExpTimer.current) {
      clearTimeout(pastExpTimer.current);
      pastExpTimer.current = null;
    }
  });

  const onPastExpLeave = contextSafe(() => {
    if (isExpanded) {
      pastExpTimer.current = setTimeout(() => {
        togglePastExperience(false);
        pastExpTimer.current = null;
      }, 5000);
    }
  });

  // Handle deep linking for MetaLine X
  React.useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === "#experience-metalinex") {
        // Small delay to ensure layout is ready
        setTimeout(() => {
          // Find index of MetaLine X (it's index 2 in jobs)
          const metalinexIndex = 2;

          togglePastExperience(true);
          toggleJobRoles(metalinexIndex, true);

          containerRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }, 1000);
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []); // Only run on mount or hash change

  useGSAP(
    () => {
      const items = itemsRef.current.filter((item) => item !== null);
      const titleLines = titleLinesRef.current.filter((line) => line !== null);
      const dividerLines = dividerLinesRef.current.filter(
        (line) => line !== null,
      );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      tl.fromTo(
        headerLineRef.current,
        { scaleX: 0, transformOrigin: "left" },
        { scaleX: 1, duration: 1.5, ease: "power4.inOut" },
      );

      if (items.length > 0) {
        tl.fromTo(
          items,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: "power4.out" },
          "-=1.2",
        );
      }

      const firstLines = [titleLines[0], dividerLines[0]].filter(Boolean);
      if (firstLines.length > 0) {
        tl.fromTo(
          firstLines,
          { scaleX: 0, transformOrigin: "left" },
          { scaleX: 1, duration: 1.2, ease: "power4.inOut" },
          "-=1",
        );
      }

      tl.fromTo(
        chevronRef.current,
        { opacity: 0, x: -10 },
        { opacity: 1, x: 0, duration: 1, ease: "power2.out" },
        "-=0.6",
      );
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} className="w-full mt-6 flex flex-col gap-2">
      <div className="relative pb-2 mb-2 flex items-baseline justify-between">
        <div
          ref={headerLineRef}
          className="absolute bottom-0 left-0 w-full h-px bg-(--border)"
          style={{ transform: "scaleX(0)", transformOrigin: "left" }}
        />
        <h2 className="font-body-sm font-medium">
          <DiaTextReveal
            text="01 Experience"
            delay={0.2}
            duration={1.2}
            textColor="var(--body)"
          />
        </h2>
        <span className="font-body-sm font-medium text-(--subtext)">
          <DiaTextReveal
            text={`${totalYears} Years`}
            delay={0.4}
            duration={1.2}
            textColor="var(--subtext)"
          />
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {/* Current Job (Always Visible) */}
        <div
          ref={(el) => {
            itemsRef.current[0] = el;
          }}
          className="flex flex-col items-start group relative w-full"
          style={{ opacity: 0, transform: "translateY(30px)" }}
          onMouseEnter={() => onJobHover(0)}
          onMouseLeave={() => onJobLeave(0)}
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col items-start gap-1 w-fit mb-2">
              <Link
                href={jobs[0].href!}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body-sm font-medium text-(--body) hover:text-(--accent) transition-colors flex items-center gap-2 reveal-link"
              >
                <DiaTextReveal
                  text={`0${jobs.length}`}
                  delay={0.4}
                  duration={1.2}
                  textColor="var(--subtext)"
                  className="opacity-40 company-reveal"
                />
                <DiaTextReveal
                  text={jobs[0].company}
                  delay={0.4}
                  duration={1.2}
                  textColor="var(--body)"
                  className="company-reveal"
                />
              </Link>
              <div
                ref={(el) => {
                  titleLinesRef.current[0] = el;
                }}
                className="w-full h-px bg-(--body) relative overflow-hidden"
                style={{ transform: "scaleX(0)", transformOrigin: "left" }}
              >
                <div
                  ref={(el) => {
                    pulseRefs.current[0] = el;
                  }}
                  className="absolute inset-0 bg-linear-to-r from-transparent via-white/90 to-transparent -translate-x-full"
                />
              </div>
            </div>
            {jobs[0].roles && (
              <button
                onClick={() => toggleJobRoles(0)}
                className="p-2 hover:bg-white/5 transition-colors text-(--subtext) hover:text-(--body)"
                aria-expanded={!!expandedJobIndices[0]}
                aria-label={
                  expandedJobIndices[0] ? "Collapse roles" : "Expand roles"
                }
              >
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-300 ${expandedJobIndices[0] ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>
            )}
          </div>

          <div className="w-full">
            <RoleItem
              role={jobs[0].roles![0]}
              index={0}
              total={jobs[0].roles!.length}
              isMain={true}
            />
            <div
              ref={(el) => {
                rolesRefs.current[0] = el;
              }}
              className="overflow-hidden h-0 opacity-0 w-full"
            >
              {jobs[0].roles!.slice(1).map((role, rIdx) => (
                <RoleItem
                  key={rIdx + 1}
                  role={role}
                  index={rIdx + 1}
                  total={jobs[0].roles!.length}
                  isMain={false}
                />
              ))}
            </div>
          </div>

          <div
            ref={(el) => {
              dividerLinesRef.current[0] = el;
            }}
            className="absolute bottom-0 left-0 w-full h-px bg-(--border)/40 relative overflow-hidden"
            style={{ transform: "scaleX(0)", transformOrigin: "left" }}
          >
            <div
              ref={(el) => {
                dividerPulseRefs.current[0] = el;
              }}
              className="absolute inset-0 bg-linear-to-r from-transparent via-white/90 to-transparent -translate-x-full"
            />
          </div>
        </div>

        {/* Past Experience Section Wrapper for Auto-Close Tracking */}
        <div
          className="flex flex-col gap-2 w-full"
          onMouseEnter={onPastExpEnter}
          onMouseLeave={onPastExpLeave}
        >
          <button
            ref={(el) => {
              itemsRef.current[1] = el;
            }}
            onClick={() => togglePastExperience()}
            className="flex items-center gap-2  text-[12px] font-medium text-(--subtext) hover:text-(--body) transition-colors group/toggle w-fit"
            style={{ opacity: 0, transform: "translateY(30px)" }}
            aria-expanded={isExpanded}
            aria-label={
              isExpanded ? "Hide past experience" : "Show past experience"
            }
          >
            <span>
              <DiaTextReveal
                text="Past Experience"
                delay={0.8}
                duration={1.2}
                textColor="var(--subtext)"
              />
            </span>
            <div ref={chevronRef} className="opacity-0">
              <ChevronDown
                size={14}
                className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </div>
          </button>

          <div
            ref={expandedRef}
            className="overflow-hidden h-0 opacity-0 flex flex-col gap-2 w-full"
          >
            {jobs.slice(1).map((job, idx) => {
              const index = idx + 1;
              return (
                <div
                  key={index}
                  className="flex flex-col items-start group relative w-full"
                  onMouseEnter={() => onJobHover(index)}
                  onMouseLeave={() => onJobLeave(index)}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex flex-col items-start gap-1 w-fit mb-2">
                      <Link
                        href={job.href!}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-body-sm font-medium text-(--body) hover:text-(--accent) transition-colors flex items-center gap-2 reveal-link"
                      >
                        <span className="opacity-40 text-(--subtext)">
                          0{jobs.length - index}
                        </span>
                        {job.company}
                      </Link>
                      <div
                        ref={(el) => {
                          titleLinesRef.current[index] = el;
                        }}
                        className="w-full h-px bg-(--body) relative overflow-hidden"
                      >
                        <div
                          ref={(el) => {
                            pulseRefs.current[index] = el;
                          }}
                          className="absolute inset-0 bg-linear-to-r from-transparent via-white/90 to-transparent -translate-x-full"
                        />
                      </div>
                    </div>
                    {job.roles && (
                      <button
                        onClick={() => toggleJobRoles(index)}
                        className="p-2 hover:bg-white/5 transition-colors text-(--subtext) hover:text-(--body)"
                        aria-expanded={!!expandedJobIndices[index]}
                        aria-label={
                          expandedJobIndices[index]
                            ? "Collapse roles"
                            : "Expand roles"
                        }
                      >
                        <ChevronDown
                          size={16}
                          className={`transition-transform duration-300 ${expandedJobIndices[index] ? "rotate-180" : ""}`}
                          aria-hidden="true"
                        />
                      </button>
                    )}
                  </div>

                  {job.roles ? (
                    <div className="w-full">
                      <RoleItem
                        role={job.roles[0]}
                        index={0}
                        total={job.roles.length}
                      />
                      <div
                        ref={(el) => {
                          rolesRefs.current[index] = el;
                        }}
                        className="overflow-hidden h-0 opacity-0 w-full"
                      >
                        {job.roles.slice(1).map((role, rIdx) => (
                          <RoleItem
                            key={rIdx + 1}
                            role={role}
                            index={rIdx + 1}
                            total={job.roles!.length}
                            isMain={false}
                          />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="w-full">
                      <RoleItem
                        role={{
                          position: job.position!,
                          duration: job.duration!,
                          dateRange: job.dateRange!,
                        }}
                        index={0}
                        total={1}
                      />
                    </div>
                  )}

                  <div
                    ref={(el) => {
                      dividerLinesRef.current[index] = el;
                    }}
                    className="absolute bottom-0 left-0 w-full h-px bg-(--border)/40 relative overflow-hidden"
                  >
                    <div
                      ref={(el) => {
                        dividerPulseRefs.current[index] = el;
                      }}
                      className="absolute inset-0 bg-linear-to-r from-transparent via-white/90 to-transparent -translate-x-full"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
