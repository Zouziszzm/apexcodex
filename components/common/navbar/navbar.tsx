"use client";

import { Asterisk, Menu } from "lucide-react";
import TransitionLink from "../link/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { NavItem } from "@/lib/types";
import LanguageSwitcher from "../language-switcher/language-switcher";
import AnimatedText from "../text/text";

const IndiaTime = () => {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const istTime = new Date(
        now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
      );
      const hours = String(istTime.getHours()).padStart(2, "0");
      const minutes = String(istTime.getMinutes()).padStart(2, "0");
      const seconds = String(istTime.getSeconds()).padStart(2, "0");
      setTime(`${hours}:${minutes}:${seconds}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex text-size-vxs font-family-heading flex-col">
      <AnimatedText className="text-size-vxs" japanese="現在時刻"  classNameJapanese="font-family-jp">
        CURRENT TIME
      </AnimatedText>
      <span>{time} IST</span>
    </div>
  );
};

const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const menuPanelRef = useRef<HTMLDivElement>(null);
  const linkItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const activeLinkUnderlineRef = useRef<HTMLDivElement>(null);
  const animationTimelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  // Handle menu animations
  useEffect(() => {
    if (!menuPanelRef.current) return;

    // Kill any existing animations
    if (animationTimelineRef.current) {
      animationTimelineRef.current.kill();
    }

    if (isMenuOpen) {
      // OPENING ANIMATION
      animationTimelineRef.current = gsap.timeline({
        defaults: { ease: "power3.out", overwrite: "auto" }
      });

      // Slide in panel from right
      animationTimelineRef.current.fromTo(
        menuPanelRef.current,
        { x: "100%" },
        {
          x: 0,
          duration: 0.5,
        },
        0
      );

      // Animate menu items in
      linkItemsRef.current.forEach((itemRef, index) => {
        if (itemRef) {
          animationTimelineRef.current!.fromTo(
            itemRef,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              delay: index * 0.15,
            },
            0.2 // Start after panel starts sliding
          );
        }
      });

      // Animate active underline
      if (activeLinkUnderlineRef.current) {
        animationTimelineRef.current.fromTo(
          activeLinkUnderlineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.8,
            ease: "power2.out",
          },
          linkItemsRef.current.length * 0.15 + 0.3 // Start after all items
        );
      }
    } else {
      // CLOSING ANIMATION - Reverse of opening
      animationTimelineRef.current = gsap.timeline({
        defaults: { ease: "power3.in", overwrite: "auto" }
      });

      const totalItems = linkItemsRef.current.length;

      // Animate active underline out first
      if (activeLinkUnderlineRef.current) {
        animationTimelineRef.current.to(
          activeLinkUnderlineRef.current,
          {
            scaleX: 0,
            duration: 0.3,
          },
          0
        );
      }

      // Animate menu items out in reverse order
      linkItemsRef.current.forEach((itemRef, index) => {
        if (itemRef) {
          animationTimelineRef.current!.to(
            itemRef,
            {
              y: 20,
              opacity: 0,
              duration: 0.4,
              delay: (totalItems - 1 - index) * 0.05,
            },
            0.1
          );
        }
      });

      // Slide out panel to the right (same as opening but reversed)
      animationTimelineRef.current.to(
        menuPanelRef.current,
        {
          x: "100%",
          duration: 0.5,
          ease: "power3.in",
        },
        0.2 + totalItems * 0.05 // Start after items start animating out
      );
    }

    // Clean up timeline on unmount
    return () => {
      if (animationTimelineRef.current) {
        animationTimelineRef.current.kill();
      }
    };
  }, [isMenuOpen]);

  const navItems: NavItem[] = [
    { id: 1, label: "HOME", labelJp: "ホーム", href: "/" },
    { id: 2, label: "ABOUT", labelJp: "について", href: "/about" },
    { id: 3, label: "CASES", labelJp: "事例", href: "/cases" },
    { id: 4, label: "PLAYGROUND", labelJp: "プレイグラウンド", href: "/playground" },
    { id: 5, label: "CONTACT", labelJp: "お問い合わせ", href: "/contact" },
    { id: 6, label: "SOURCE", labelJp: "ソース", href: "https://www.github.com" },
    { id: 7, label: "RESUME", labelJp: "履歴書", href: "#" },
  ];

  const isActive = (href: string): boolean => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("http") || href === "#") return false;
    return pathname.startsWith(href);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const handleBackdropClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Navbar */}
      <div className="hidden lg:flex w-full py-[0.8vh] sticky top-0 left-0 right-0 z-50 backdrop-blur-xs max-w-[1440px] mx-auto">
        <div className="w-full flex items-center justify-between px-[4.29%]">
          <div className="flex w-full items-center">
            <div className="mr-[5.46%]">
              <AnimatedText>
                <Asterisk size={24} className="text-gray-800" />
              </AnimatedText>
            </div>
            <div className="flex w-full justify-between">
              <div className="flex gap-[30px] items-center">
                {navItems.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <TransitionLink
                      key={item.id}
                      href={item.href}
                      active={active}
                      className="font-neue-montreal text-size-xs font-medium transition-colors hover:opacity-75"
                    >
                      <AnimatedText japanese={item.labelJp || item.label} classNameJapanese="font-family-jp">
                        {item.label}
                      </AnimatedText>
                    </TransitionLink>
                  );
                })}
              </div>
              <div className="flex items-center gap-4">
                <AnimatedText>
                  <LanguageSwitcher />
                </AnimatedText>
                <AnimatedText>
                  <IndiaTime />
                </AnimatedText>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="lg:hidden flex w-full px-[4.29%] py-4 sticky top-0 left-0 right-0 z-50 backdrop-blur-xs">
        <div className="w-full flex items-center justify-between">
          <Asterisk size={24} className="text-gray-800" />
          <div className="flex h-full items-center gap-6">
          <LanguageSwitcher />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 -mr-2"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <Menu size={24} className="text-gray-800" />
          </button>
          </div>
          
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <div
        className={`lg:hidden fixed top-[56px] left-0 right-0 bottom-0 z-40 ${isMenuOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
          }`}
        style={{
          transition: "opacity 0.3s ease",
        }}
      >
        <div
          className="absolute inset-0 bg-black/20"
          onClick={handleBackdropClick}
        />

        <div
          ref={menuPanelRef}
          className="absolute top-0 right-0 bottom-0 w-full bg-background"
          style={{
            transform: 'translateX(100%)', // Start off-screen to the right
          }}
        >
          <div className="flex flex-col h-full px-[4.29%] pt-8 pb-4">
            <nav className="flex-1">
              <ul className="space-y-6">
                {navItems.map((item, index) => {
                  const active = isActive(item.href);
                  return (
                    <li key={item.id} className="pb-2">
                      <div
                        ref={(el) => {
                          linkItemsRef.current[index] = el;
                        }}
                        className="text-2xl font-medium text-gray-800 hover:opacity-75"
                        style={{
                          transform: 'translateY(20px)',
                          opacity: 0,
                        }}
                      >
                        <TransitionLink
                          href={item.href}
                          active={active}
                          onClick={handleLinkClick}
                          className="block transition-opacity"
                        >
                          <AnimatedText japanese={item.labelJp || item.label} classNameJapanese="font-family-jp">
                            {item.label}
                          </AnimatedText>
                        </TransitionLink>
                      </div>
                      {active && (
                        <div
                          ref={activeLinkUnderlineRef}
                          className="mt-1 w-full h-[1px] bg-gray-800 origin-left"
                          style={{ transform: "scaleX(0)" }}
                        />
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;