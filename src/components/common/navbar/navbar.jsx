"use client";

import { Asterisk, Menu } from "lucide-react";
import TransitionLink from "../link/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

const IndiaTime = () => {
  const [time, setTime] = useState("");

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
      <span className="text-size-vxs">CURRENT TIME</span>
      <span>{time} IST</span>
    </div>
  );
};

const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuPanelRef = useRef(null);
  const linkItemsRef = useRef([]);
  const activeLinkUnderlineRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!menuPanelRef.current || !isMenuOpen) return;

    gsap.to(menuPanelRef.current, {
      x: 0,
      duration: 0.5,
      ease: "power3.out",
      overwrite: "auto",
    });

    linkItemsRef.current.forEach((itemRef, index) => {
      if (itemRef) {
        gsap.fromTo(
          itemRef,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
            delay: index * 0.15,
            overwrite: "auto",
          }
        );
      }
    });

    if (activeLinkUnderlineRef.current) {
      gsap.fromTo(
        activeLinkUnderlineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.8,
          ease: "power2.out",
          delay: linkItemsRef.current.length * 0.15 + 0.1,
          overwrite: "auto",
        }
      );
    }
  }, [isMenuOpen]);

  useEffect(() => {
    if (!menuPanelRef.current || isMenuOpen) return;

    if (activeLinkUnderlineRef.current) {
      gsap.to(activeLinkUnderlineRef.current, {
        scaleX: 0,
        duration: 0.4,
        ease: "power2.in",
        overwrite: "auto",
      });
    }

    linkItemsRef.current.forEach((itemRef, index) => {
      if (itemRef) {
        gsap.to(itemRef, {
          y: 20,
          opacity: 0,
          duration: 0.4,
          ease: "power3.in",
          delay: (linkItemsRef.current.length - 1 - index) * 0.05,
          overwrite: "auto",
        });
      }
    });

    gsap.to(menuPanelRef.current, {
      x: "100%",
      duration: 0.5,
      ease: "power3.in",
      overwrite: "auto",
      delay: 0.1,
    });
  }, [isMenuOpen]);

  const navItems = [
    { id: 1, label: "HOME", href: "/" },
    { id: 2, label: "ABOUT", href: "/about" },
    { id: 3, label: "CASES", href: "/cases" },
    { id: 4, label: "PLAYGROUND", href: "/playground" },
    { id: 5, label: "CONTACT", href: "/contact" },
    { id: 6, label: "SOURCE", href: "https://www.github.com" },
    { id: 7, label: "RESUME", href: "#" },
  ];

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("http") || href === "#") return false;
    return pathname.startsWith(href);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Navbar */}
      <div className="hidden md:flex w-full px-[4.29%] py-[0.8vh] sticky top-0 left-0 right-0 z-50 backdrop-blur-[4px]">
        <div className="w-full flex items-center justify-between">
          <div className="flex w-full items-center">
            <div className="mr-[5.46%]">
              <Asterisk size={24} className="text-gray-800" />
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
                      {item.label}
                    </TransitionLink>
                  );
                })}
              </div>
              <IndiaTime />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden flex w-full px-[4.29%] py-4 sticky top-0 left-0 right-0 z-50 backdrop-blur-[4px]">
        <div className="w-full flex items-center justify-between">
          <Asterisk size={24} className="text-gray-800" />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 -mr-2"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <Menu size={24} className="text-gray-800" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <div
        className={`md:hidden fixed top-[56px] left-0 right-0 bottom-0 z-40 transition-opacity duration-300 ${isMenuOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
          }`}
      >
        <div
          className="absolute inset-0 bg-black/20"
          onClick={() => setIsMenuOpen(false)}
        />

        <div
          ref={menuPanelRef}
          className={`absolute top-0 right-0 bottom-0 w-full bg-background ${isMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          style={{ x: isMenuOpen ? 0 : "100%" }}
        >
          <div className="flex flex-col h-full px-[4.29%] pt-8 pb-4">
            <nav className="flex-1">
              <ul className="space-y-6">
                {navItems.map((item, index) => {
                  const active = isActive(item.href);
                  return (
                    <li key={item.id} className="pb-2">
                      <div
                        ref={(el) => (linkItemsRef.current[index] = el)}
                        className="text-2xl font-medium text-gray-800 hover:opacity-75"
                        style={{ y: 0, opacity: 1 }}
                      >
                        <TransitionLink
                          href={item.href}
                          active={active}
                          onClick={handleLinkClick}
                          className="block transition-opacity"
                        >
                          {item.label}
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
