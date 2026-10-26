"use client";
import { cards } from "@/utils/constants";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

function Community() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const numbersRef = useRef<(HTMLDivElement | null)[]>([]);

  const formatNumber = (num: number, index: number) => {
    if (index === 1) {
      // Members card
      return num >= 1000 ? `+${(num / 1000).toFixed(1)}K` : `+${num}`;
    }
    return `+${num}`;
  };

  useGSAP(() => {
    cardsRef.current.forEach((card, index) => {
      if (card && numbersRef.current[index]) {
        const numberElement = numbersRef.current[index];
        const targetValue = cards[index].count;

        gsap.set(numberElement, { textContent: "+0" });

        gsap.to(
          {},
          {
            duration: 2,
            ease: "power2.out",
            onUpdate: function () {
              const currentValue = Math.round(this.progress() * targetValue);
              numberElement.textContent = formatNumber(currentValue, index);
            },
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          },
        );
      }
    });
  });

  return (
    <section id="community" className="w-full px-6 py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        {/* Masonry Layout using CSS Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 auto-rows-min mx-2">
          {/* Left Column - Stacked */}
          <div className="space-y-8 lg:space-y-10">
            {cards.slice(0, 2).map((card, index) => (
              <div
                key={index}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                className={`${card.height} bg-primary-50/70 transition-colors duration-300 hover:bg-primary-100 rounded-[2rem] p-8 flex flex-col justify-center cursor-default group`}
              >
                <div className="text-center">
                  <div
                    ref={(el) => {
                      numbersRef.current[index] = el;
                    }}
                    className="text-6xl md:text-7xl lg:text-8xl font-semibold tracking-[-0.06em] leading-none text-gradient mb-4 tabular-nums transition-colors duration-300 group-hover:text-primary-700"
                  >
                    +0
                  </div>
                  <div className="text-xl md:text-2xl font-medium tracking-[-0.02em] text-primary-700/70 transition-colors duration-300 group-hover:text-primary-600">
                    {card.title}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column - Stacked */}
          <div className="space-y-8 lg:space-y-10">
            {cards.slice(2, 4).map((card, index) => (
              <div
                key={index + 2}
                ref={(el) => {
                  cardsRef.current[index + 2] = el;
                }}
                className={`${card.height} bg-primary-50/70 transition-colors duration-300 hover:bg-primary-100 rounded-[2rem] p-8 flex flex-col justify-center cursor-default group`}
              >
                <div className="text-center">
                  <div
                    ref={(el) => {
                      numbersRef.current[index + 2] = el;
                    }}
                    className="text-6xl md:text-7xl lg:text-8xl font-semibold tracking-[-0.06em] leading-none text-gradient mb-4 tabular-nums transition-colors duration-300 group-hover:text-primary-700"
                  >
                    +0
                  </div>
                  <div className="text-xl md:text-2xl font-medium tracking-[-0.02em] text-primary-700/70 transition-colors duration-300 group-hover:text-primary-600">
                    {card.title}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Third Column for larger screens - Optional */}
          <div className="hidden lg:block space-y-8 lg:space-y-10">
            <div className="h-48 bg-primary-50/70 transition-colors duration-300 hover:bg-primary-100 rounded-[2rem] p-8 flex flex-col justify-center cursor-pointer group">
              <Link href="#team" className="text-center">
                <div className="text-4xl font-semibold tracking-[-0.04em] text-primary-500 mb-2 transition-colors duration-300 group-hover:text-primary-600">
                  Check Out
                </div>
                <div className="text-lg font-medium text-primary-700/70 transition-colors duration-300 group-hover:text-primary-600/80">
                  Our Community
                </div>
              </Link>
            </div>
            <div className="h-64 bg-primary-800 rounded-[2rem] p-8 flex flex-col justify-center transition-colors duration-300 hover:bg-primary-900 cursor-pointer group">
              <Link href="#contact" className="text-center">
                <div className="text-4xl font-semibold tracking-[-0.04em] text-white mb-2 transition-colors duration-300 group-hover:text-gold-300">
                  Get Involved
                </div>
                <div className="text-lg font-medium text-primary-100/80 transition-colors duration-300 group-hover:text-gold-200">
                  Today
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Community;
