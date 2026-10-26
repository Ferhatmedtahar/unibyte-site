"use client";

import { teamMembers } from "@/utils/constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import MarqueeRow from "./components/MarqueeRow";

gsap.registerPlugin(ScrollTrigger);
export default function TeamTestimonials() {
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#team",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });
    tl.from("#team", {
      y: 60,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
    });
  }, []);
  // Split members into two groups of 10
  const firstRow = teamMembers.slice(0, 10);
  const secondRow = teamMembers.slice(10, 20);

  return (
    <>
      {/* Add custom CSS for animations */}
      <style jsx global>{`
        @keyframes marquee-left {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes marquee-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }

        .hover\\:pause:hover {
          animation-play-state: paused !important;
        }
      `}</style>

      <div id="team" className="w-full py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-10">
            <h2 className="section-title text-center mb-5">
              Meet Our Amazing Team
            </h2>
            <p className="section-lead mx-auto px-4">
              Discover the talented individuals who make our success possible
            </p>
          </div>
          <div className="space-y-3">
            <MarqueeRow members={firstRow} direction="left" />
            <MarqueeRow members={secondRow} direction="right" />
          </div>
        </div>
      </div>
    </>
  );
}
