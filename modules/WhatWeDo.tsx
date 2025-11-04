"use client";
import { HoverEffect } from "@/common/ui/card-hover-effect";
import { activities } from "@/utils/constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function WhatWeDo() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    tl.from(titleRef.current, {
      y: 60,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
    });
    tl.from(".paragraph", {
      y: 60,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });

    tl.from(
      ".card-item",
      {
        y: 80,
        opacity: 0,
        scale: 0.8,
        duration: 1,
        ease: "power2.out",
        stagger: 0.15,
      },
      "-=0.5"
    );
  });

  return (
    <div
      id="activities"
      ref={containerRef}
      className="max-w-6xl mx-auto px-8 py-20 relative"
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-primary-100/80 to-primary-200/80 text-primary-800 text-sm font-medium mb-6">
          <div className="w-2 h-2 bg-primary-500 rounded-full mr-2 animate-pulse"></div>
          Our Activities
        </div>
        <h2
          ref={titleRef}
          className="text-4xl md:text-6xl pb-4 text-gradient font-bold bg-gradient-to-r from-primary-600 via-primary-400 to-primary-500 bg-clip-text text-transparent mb-4"
        >
          What We Do
        </h2>
        <p className=" paragraph text-primary-600/80 text-lg max-w-2xl mx-auto">
          Discover the exciting activities and opportunities that make UniByte a
          thriving tech community
        </p>
      </div>

      <div ref={cardsRef}>
        <HoverEffect items={activities} />
      </div>
    </div>
  );
}
