"use client";
import { useScroll } from "motion/react";
import Navbar from "@/components/common/navbar/Navbar";
export default function Template({ children }: { children: React.ReactNode }) {
  const { scrollYProgress } = useScroll();
  return (
    <>
      <div className="flex h-screen w-full justify-center">
        <div className="relative flex h-full w-full max-w-6xl flex-col px-2 lg:px-8">
          <div className="relative">
            <Navbar scrollYProgress={scrollYProgress} />
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
