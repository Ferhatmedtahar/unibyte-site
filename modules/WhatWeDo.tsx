"use client";
import { HoverEffect } from "@/common/ui/card-hover-effect";
import { activities } from "@/utils/constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";
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
      "-=0.5",
    );
  });

  return (
    <div
      id="activities"
      ref={containerRef}
      className="max-w-6xl mx-auto px-6 md:px-8 py-24 md:py-32 relative"
    >
      <div className="text-center mb-12">
        <div className="pill-tag mb-6">
          <span className="w-2 h-2 bg-gold-400 rounded-full" />
          Our Activities
        </div>
        <h2 ref={titleRef} className="section-title mb-5">
          What We Do
        </h2>
        <p className="paragraph section-lead mx-auto">
          Discover the exciting activities and opportunities that make UniByte a
          thriving tech community
        </p>
      </div>

      <div ref={cardsRef} className="hidden md:block">
        <HoverEffect items={activities} />
      </div>

      <ul className="flex flex-col gap-8 md:hidden">
        {activities.map((item) => (
          <li key={item.title} className="flex items-start gap-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-500">
              <Image
                src={item.link}
                alt=""
                width={24}
                height={24}
                className="h-6 w-6 object-contain"
              />
            </span>
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-semibold leading-snug tracking-[-0.015em] text-primary-800">
                {item.title}
              </h3>
              <p className="text-[0.9375rem] leading-relaxed text-primary-700/75">
                {item.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
