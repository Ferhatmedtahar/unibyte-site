"use client";
import { faqData } from "@/utils/constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
gsap.registerPlugin(ScrollTrigger);
function Faq() {
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#faq",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });
    tl.from("#faq-content", {
      y: 60,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
    });
  }, []);
  const [openIndex, setOpenIndex] = useState<number | null>(null); // initially no item is open

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="w-full">
      <div
        id="faq-content"
        className="mx-auto max-w-7xl px-4 py-20 lg:px-8 lg:py-28"
      >
        <div className="space-y-6">
          <h2 className="section-title text-center mb-10">
            Frequently Asked Questions
          </h2>

        <div className="space-y-3">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl bg-primary-50/70 px-4 md:px-6 transition-colors duration-300 hover:bg-primary-100"
            >
              <button
                onClick={() => toggleQuestion(index)}
                aria-expanded={openIndex === index}
                className="group w-full py-6 px-2 text-left flex items-center justify-between gap-6 hover:cursor-pointer focus-visible:rounded-2xl"
              >
                <span className="text-lg md:text-[1.375rem] leading-snug font-medium tracking-[-0.015em] text-primary-700 group-hover:text-primary-500 transition-colors duration-300 flex-1">
                  {item.question}
                </span>
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 ${
                    openIndex === index
                      ? "bg-primary-500 text-white"
                      : "bg-white text-primary-500"
                  }`}
                >
                  <ChevronDownIcon
                    className={`w-4 h-4 transition-transform duration-500 ease-premium ${
                      openIndex === index ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="pb-6 px-2 pr-16">
                  <div
                    className={`text-primary-700/70 text-base md:text-lg leading-relaxed`}
                  >
                    {item.answer}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
}

export default Faq;
