"use client";
import Button from "@/common/Button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useRef } from "react";
import BitWordmark from "./components/BitWordmark";

gsap.registerPlugin(SplitText);

const REVEAL = [".hero-tagline", ".hero-subtitle", ".hero-buttons"];
const MOBILE_LINES = ["Uni", "byte"];

function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { contextSafe } = useGSAP({ scope: sectionRef });
  const playCopy = contextSafe(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(REVEAL, { autoAlpha: 1 });
      return;
    }
    const tagline = new SplitText(".hero-tagline", {
      type: "words",
      mask: "words",
    });
    gsap.set(REVEAL, { autoAlpha: 1 });
    gsap
      .timeline({ defaults: { ease: "expo.out" }, delay: 0.9 })
      .from(tagline.words, { yPercent: 110, duration: 1.1, stagger: 0.04 })
      .from(".hero-subtitle", { y: 16, autoAlpha: 0, duration: 1 }, 0.25)
      .from(
        ".hero-buttons > *",
        { y: 16, autoAlpha: 0, duration: 0.9, stagger: 0.08 },
        0.4,
      );
  });

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative isolate flex min-h-dvh w-full flex-col overflow-hidden bg-paper"
    >
      <h1 className="sr-only">Unibyte</h1>
      <div className="flex items-end pt-24 pb-4 sm:flex-1 sm:items-center sm:pb-0 md:pt-28">
        <BitWordmark
          word="Unibyte"
          mobileLines={MOBILE_LINES}
          onStart={playCopy}
          className="w-full px-5 sm:px-4 md:px-8"
        />
      </div>
      <div className="mx-auto grid w-full max-w-[1480px] mt-auto gap-7 px-5 pb-10 sm:mt-0 sm:gap-8 sm:pb-12 md:grid-cols-12 md:items-end md:gap-10 md:px-10 md:pb-16">
        <p className="hero-tagline invisible max-w-[20ch] text-[clamp(1.75rem,4vw,3.5rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-primary-500 md:col-span-7">
          WHERE THE POWER OF 0s AND 1s UNITE !
        </p>

        <div className="flex flex-col items-start gap-7 md:col-span-5 md:col-start-8">
          <p className="hero-subtitle invisible max-w-[34ch] text-[clamp(1.0625rem,1.3vw,1.25rem)] font-light leading-relaxed text-primary-700/75">
            To embrace the future with a community of thinkers and creators
          </p>
          <div className="hero-buttons invisible flex flex-wrap items-center gap-3">
            <div>
              <Button href="#contact" size="large">
                Join Us
              </Button>
            </div>
            <div>
              <Button href="#about" variant="secondary" size="large">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
