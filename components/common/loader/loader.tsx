"use client"
import { paths } from "@/public/svg/paths";
import { Svg } from "./svg"
import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';
import { LoaderProps } from '@/lib/types';

const Loader = ({ onComplete }: LoaderProps) => {
  const progressFillRef = useRef<HTMLDivElement>(null);
  const progressTextRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(loaderRef.current,
      {
        opacity: 0
      },
      {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out'
      }
    )
      .to(progressFillRef.current, {
        width: '100%',
        duration: 2,
        ease: 'power2.out'
      }, ">")
      .to(progressTextRef.current, {
        innerText: 100,
        duration: 2,
        ease: 'power1.in',
        snap: { innerText: 1 }
      }, "<")
      .to(loaderRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.in',
        onComplete: () => {
          setIsVisible(false);
          onComplete?.();
        }
      });

  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div
      ref={loaderRef}
      className="h-screen w-full flex flex-col fixed top-0 left-0 z-50 bg-background"
    >
      <div className="flex-1 flex justify-center items-center">
        <div className="aspect-auto">
          <Svg paths={paths} />
        </div>
      </div>
      <div className="pb-14 px-[10px] lg:px-[50px]">
        <div className="w-full flex justify-end">
          <div className="flex">
            <div ref={progressTextRef}>0</div>
            <p>%</p>
          </div>
        </div>
        <div className="w-0 h-[0.8px] bg-[#000]" ref={progressFillRef}></div>
      </div>
    </div>
  )
}

export default Loader
