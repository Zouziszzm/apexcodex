"use client";
import { motion, MotionValue, useTransform } from "motion/react";
import FLink from "@/context/Transition/Link";
import { SquareMenu, Asterisk } from "lucide-react";
import { usePathname } from "next/navigation";
import Switch from "../toggle/Switch";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import LanguageDropdown from "../toggle/languagetoggle";

const MOBILE_BREAKPOINT = 1600;

type NavbarProps = {
  scrollYProgress: MotionValue<number>;
};

const Navbar = ({ scrollYProgress }: NavbarProps) => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const links = [
    { label: "Home", link: "/" },
    { label: "Works", link: "/works" },
    { label: "Playground", link: "/playground" },
    { label: "Source", link: "https://github.com/Zouziszzm" },
  ];

  // 🔁 Rotate 360deg every 5% scroll → 100% / 5 = 20 * 360 = 7200deg
  //const rotation = useTransform(scrollYProgress, (v) => v * 7200);

  // 100% / 20% = 5 full rotations → 5 * 360 = 1800deg
  const rotation = useTransform(scrollYProgress, (v) => v * 1200);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= MOBILE_BREAKPOINT) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="sticky top-0 z-50 flex w-full justify-center backdrop-blur-sm">
      {/* Desktop Navbar */}
      <div className="3xl:flex hidden h-[40px] w-full items-center justify-between p-2 px-2">
        <div className="font-english-heading flex gap-1.5 text-2xl">
          <div className="leading-10">Farhaan</div>
          <motion.div
            style={{ rotate: rotation }}
            className="mt-[-2px] flex items-center justify-center"
          >
            <Asterisk size={24} />
          </motion.div>
        </div>

        <div className="font-english-heading text-body-xl flex gap-4 tracking-wide">
          {links.map(({ label, link }, index) => {
            const isActive =
              link !== "#" && !link.startsWith("http") && pathname === link;
            return (
              <motion.div
                key={index}
                className="group relative inline-block"
                whileHover="hover"
                variants={{ hover: { transition: {} } }}
              >
                <FLink href={link}>{label}</FLink>
                <motion.div
                  className="bgs absolute bottom-[5px] left-0 h-[2px] w-full origin-left"
                  initial={{ scaleX: isActive ? 1 : 0 }}
                  animate={{ scaleX: isActive ? 1 : 0 }}
                  variants={{
                    hover: {
                      scaleX: 1,
                      transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                    },
                  }}
                />
              </motion.div>
            );
          })}
        </div>
        <div className="font-english-heading flex gap-2">
          <Switch />
          <LanguageDropdown />
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="3xl:hidden flex h-[40px] w-full items-center justify-between p-2 px-1">
        <div className="font-english-heading flex gap-1.5 text-2xl">
          <div>Farhaan</div>
          <motion.div
            style={{ rotate: rotation }}
            className="flex items-center justify-center"
          >
            <Asterisk size={24} />
          </motion.div>
        </div>

        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <SquareMenu />
        </button>

        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, y: -10, height: 0 }}
          animate={{
            opacity: mobileMenuOpen ? 1 : 0,
            y: mobileMenuOpen ? 0 : -10,
            height: mobileMenuOpen ? "auto" : 0,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="border-bgs bg-background absolute top-[50px] right-4 z-50 w-[200px] overflow-hidden rounded-sm border-1"
        >
          <div className="flex flex-col gap-1">
            {links.map(({ label, link }, index) => (
              <Link
                key={index}
                href={link}
                className="block px-4 py-2 text-left"
                onClick={() => setMobileMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
          </div>

          <hr className="border-bgs border-t" />

          <div className="flex justify-around gap-2">
            <button className="border-bgs border-r-1 px-4 py-2 text-center transition-colors">
              EN
            </button>
            <button className="px-4 py-2 text-left">FR</button>
            <button className="border-bgs border-l-1 px-4 py-2 text-left">
              中文
            </button>
          </div>

          <hr className="border-bgs border-t" />

          <div className="px-4 py-2 text-center">
            <Switch />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Navbar;
