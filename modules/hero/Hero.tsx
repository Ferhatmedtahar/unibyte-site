"use client";
import Button from "@/common/Button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";

gsap.registerPlugin(SplitText, ScrollTrigger);

function Hero() {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useGSAP(() => {
    const heroSplit = new SplitText(".title", {
      type: "chars, words",
    });
    const paragraphSplit = new SplitText(".subtitle", {
      type: "lines",
    });

    const yellowSubtitle = new SplitText(".yellow-subtitle", {
      type: "words",
    });

    heroSplit.chars.forEach((char, i) => {
      char.classList.add("text-gradient");
    });

    gsap.from(heroSplit.chars, {
      y: 100,
      duration: 1.5,
      ease: "expo.out",
      stagger: 0.05,
    });

    gsap.from(yellowSubtitle.words, {
      y: 100,
      opacity: 0,
      duration: 1.5,
      ease: "expo.out",
      stagger: 0.05,
      delay: 0.8,
    });

    gsap.from(paragraphSplit.lines, {
      y: 100,
      opacity: 0,
      duration: 1.5,
      ease: "expo.out",
      stagger: 0.05,
      delay: 1,
    });
    gsap.from(".right-leaf ,.left-leaf", {
      y: 100,
      opacity: 0,
      duration: 1.5,
      ease: "expo.out",
      delay: 1.5,
    });
    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })
      .to(".right-airpod", { y: 200 }, 0)
      .to(".left-airpod", { y: -200 }, 0);
  }, [isMobile]);

  return (
    <section id="hero" className="relative">
      <div className="min-h-screen w-full bg-gradient-to-br from-primary-50 to-white relative overflow-hidden">
        {/* Enhanced Gradient Overlay with Primary Colors */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(127, 6, 121, 0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(127, 6, 121, 0.08) 1px, transparent 1px),
              radial-gradient(circle 600px at 20% 20%, rgba(244, 11, 233, 0.15), transparent),
              radial-gradient(circle 500px at 80% 80%, rgba(127, 6, 121, 0.12), transparent),
              radial-gradient(circle 400px at 60% 40%, rgba(248, 109, 242, 0.08), transparent)
            `,
            backgroundSize:
              "60px 60px, 60px 60px, 100% 100%, 100% 100%, 100% 100%",
          }}
        />

        <Image
          src={`/images/hand-hero.svg`}
          alt="hand-hero"
          width={400}
          height={400}
          className={`left-image filter drop-shadow-lg select-none`}
        />
        <Image
          src={`/images/lamp-hero.png`}
          alt="lamp-hero"
          width={100}
          height={100}
          className={`lamp-hero filter drop-shadow-md select-none`}
        />

        <div className="flex flex-col items-center gap-8 z-10 relative">
          <h1 className="title bg-gradient-to-r from-primary-600 via-primary-400 to-primary-500 bg-clip-text text-transparent">
            Unibyte
          </h1>

          <div className="flex flex-col items-center gap-3">
            <p className="yellow-subtitle font-inter text-2xl text-primary-800 max-w-xl font-semibold tracking-tight">
              WHERE THE POWER OF 0s AND 1s UNITE !
            </p>
            <p className="yellow-subtitle text-yellow font-inter text-lg max-w-xl font-medium text-center">
              To embrace the future with a community of thinkers and creators.
            </p>
          </div>

          <div className="flex items-center gap-6 mt-4">
            <Button variant="primary">Learn More</Button>
            <Button variant="secondary">Join Us</Button>
          </div>
        </div>

        {/* Bottom Accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-200 via-yellow to-primary-400 opacity-60"></div>
      </div>
    </section>
  );
}

export default Hero;
