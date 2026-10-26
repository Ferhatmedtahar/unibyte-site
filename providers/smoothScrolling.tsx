"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis, useLenis, type LenisRef } from "lenis/react";
import { ReactNode, useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const detectMac = () =>
  typeof navigator !== "undefined" &&
  (/Macintosh|Mac OS X/i.test(navigator.userAgent) ||
    /Mac/i.test(
      (navigator as unknown as { userAgentData?: { platform?: string } })
        .userAgentData?.platform ?? "",
    ) ||
    /Mac/i.test(navigator.platform ?? ""));

export default function SmoothScrolling({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);
  const [isMac] = useState(detectMac);

  useLenis(ScrollTrigger.update);

  useEffect(() => {
    gsap.ticker.lagSmoothing(0);

    const update = (time: number) => lenisRef.current?.lenis?.raf(time * 1000);
    gsap.ticker.add(update);

    return () => gsap.ticker.remove(update);
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        autoRaf: false,
        lerp: isMac ? 0.17 : 0.15,
        smoothWheel: true,
        wheelMultiplier: 1.1,
        anchors: true,
        syncTouch: false,
        touchMultiplier: 1.5,
        infinite: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
