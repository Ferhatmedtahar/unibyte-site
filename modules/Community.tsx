"use client";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

function Community() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const numbersRef = useRef<(HTMLDivElement | null)[]>([]);

  const cards = [
    { title: "Events", count: 20, height: "h-64" },
    { title: "Members", count: 150, height: "h-80" },
    { title: "Workshops", count: 10, height: "h-72" },
    { title: "Partners", count: 10, height: "h-56" },
  ];

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
          }
        );
      }
    });
  });

  return (
    <div className=" w-full bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Masonry Layout using CSS Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-min">
          {/* Left Column - Stacked */}
          <div className="space-y-6">
            {cards.slice(0, 2).map((card, index) => (
              <div
                key={index}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                className={`${card.height} bg-white rounded-3xl p-8 flex flex-col justify-center shadow-sm border border-primary-100 transition-all duration-500 ease-out hover:shadow-lg hover:shadow-primary-500/20 hover:bg-gradient-to-br hover:from-primary-50 hover:to-indigo-100 cursor-pointer group`}
              >
                <div className="text-center">
                  <div
                    ref={(el) => {
                      numbersRef.current[index] = el;
                    }}
                    className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-500  mb-4 transition-colors duration-300 group-hover:text-primary-700"
                  >
                    +0
                  </div>
                  <div className="text-xl md:text-2xl lg:text-3xl font-semibold text-primary-500/85 transition-colors duration-300 group-hover:text-primary-600">
                    {card.title}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column - Stacked */}
          <div className="space-y-6">
            {cards.slice(2, 4).map((card, index) => (
              <div
                key={index + 2}
                ref={(el) => {
                  cardsRef.current[index + 2] = el;
                }}
                className={`${card.height} bg-white rounded-3xl p-8 flex flex-col justify-center shadow-sm border border-primary-100 transition-all duration-500 ease-out hover:shadow-lg hover:shadow-primary-500/20 hover:bg-gradient-to-br hover:from-primary-50 hover:to-indigo-100 cursor-pointer group`}
              >
                <div className="text-center">
                  <div
                    ref={(el) => {
                      numbersRef.current[index + 2] = el;
                    }}
                    className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-500 mb-4 transition-colors duration-300 group-hover:text-primary-700"
                  >
                    +0
                  </div>
                  <div className="text-xl md:text-2xl lg:text-3xl font-semibold text-primary-500/85 transition-colors duration-300 group-hover:text-primary-600">
                    {card.title}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Third Column for larger screens - Optional */}
          <div className="hidden lg:block space-y-6">
            <div className="h-48 bg-white rounded-3xl p-8 flex flex-col justify-center shadow-sm border border-primary-100 transition-all duration-500 ease-out hover:shadow-2xl hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-100 cursor-pointer group">
              <Link href="/community" className="text-center">
                <div className="text-3xl font-bold text-primary-500 mb-2 transition-colors duration-300 group-hover:text-primary-600">
                  Check Out
                </div>
                <div className="text-lg font-semibold text-primary-500/85 transition-colors duration-300 group-hover:text-primary-600/80">
                  Our Community
                </div>
              </Link>
            </div>
            <div className="h-64 bg-white rounded-3xl p-8 flex flex-col justify-center shadow-sm border border-primary-100 transition-all duration-500 ease-out hover:shadow-2xl hover:bg-gradient-to-br hover:from-yellow-100 hover:to-orange-200 cursor-pointer group">
              <Link href="/contact" className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2 transition-colors duration-200 group-hover:text-yellow">
                  Get Involved
                </div>
                <div className="text-lg font-semibold text-primary-600/85 transition-colors duration-200 group-hover:text-yellow">
                  Today
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Community;
