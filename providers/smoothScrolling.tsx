"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis, type LenisRef } from "lenis/react";
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
  // Lazy init: read once on the client so Lenis is created with the right lerp
  // (options aren't rendered markup, so there's no hydration mismatch)
  const [isMac] = useState(detectMac);

  // Drive Lenis from GSAP's ticker so ScrollTrigger and scroll share one frame.
  // lagSmoothing(0) stops GSAP throttling deltas on slower hardware (Intel Macs),
  // which otherwise shows up as scroll jumps / stutter.
  useEffect(() => {
    gsap.ticker.lagSmoothing(0);

    const update = (time: number) => lenisRef.current?.lenis?.raf(time * 1000);
    gsap.ticker.add(update);

    const lenis = lenisRef.current?.lenis;
    lenis?.on("scroll", ScrollTrigger.update);

    return () => {
      gsap.ticker.remove(update);
      lenis?.off("scroll", ScrollTrigger.update);
    };
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        autoRaf: false,
        // Pure lerp, no duration/easing timer — follows the wheel directly.
        // Mac trackpads get a touch more, so fingers never feel ahead of the page.
        lerp: isMac ? 0.17 : 0.15,
        smoothWheel: true,
        wheelMultiplier: 1.1,
        anchors: true,
        // Phones keep native momentum scrolling
        syncTouch: false,
        touchMultiplier: 1.5,
        infinite: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
