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

    gsap.from(".left-image ,.lamp-hero", {
      y: 100,
      opacity: 0,
      duration: 1.5,
      ease: "expo.out",
      delay: 1.5,
    });

    // Button animations
    gsap.from(".hero-buttons", {
      y: 50,
      opacity: 0,
      duration: 1.2,
      ease: "expo.out",
      delay: 1.8,
    });

    gsap.to(".hero-button", {
      // boxShadow: "0 0 20px rgba(127, 6, 121, 0.3)",
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.2,
    });

    // Alternative: Animate transform and opacity for floating effect
    gsap.to(".blob-bg", {
      x: 10,
      y: 10,
      rotation: 0.5,
      duration: 20,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Add subtle scale animation
    gsap.to(".blob-bg", {
      scale: 1.02,
      duration: 15,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
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
      .to(".lamp-hero", { y: 200 }, 0)
      .to(".left-image", { y: -200 }, 0);
  }, [isMobile]);

  return (
    <section id="hero" className="relative">
      <div className="min-h-screen  w-full bg-gradient-to-br from-primary-50/50 via-white to-white  overflow-hidden flex items-center justify-center">
        {/* Enhanced Gradient Overlay with Animated Blobs */}
        <div
          className="absolute inset-0 z-0 blob-bg"
          style={
            {
              backgroundImage: `
              linear-gradient(to right, rgba(127, 6, 121, 0.09) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(127, 6, 121, 0.09) 1px, transparent 1px),
              radial-gradient(circle 300px at 20% 20%, rgba(127, 6, 121, 0.15), transparent),
              radial-gradient(circle 500px at 80% 80%, rgba(127, 6, 121, 0.15), transparent),
              radial-gradient(circle 400px at 100% 40%, rgba(248, 109, 242, 0.05), transparent)
            `,
              backgroundSize:
                "60px 60px, 60px 60px, 100% 100%, 100% 100%, 100% 100%",
            } as React.CSSProperties
          }
        />

        <Image
          src={`/images/hand-hero.svg`}
          alt="hand-hero"
          width={200}
          height={200}
          className={`left-image filter drop-shadow-lg select-none absolute left-0 hidden md:block lg:bottom-0 lg:left-0 md:h-[400px] lg:h-[500px] xl:h-auto  z-0`}
        />
        <Image
          src={`/images/lamp-hero.png`}
          alt="lamp-hero"
          width={80}
          height={80}
          className={`lamp-hero filter drop-shadow-md select-none absolute right-0 md:right-1 lg:right-8 top-20  lg:top-[15%]  z-0`}
        />

        <div className="flex flex-col items-center gap-8 z-10 relative px-4 text-center max-w-4xl mx-auto w-full">
          <h1 className="title bg-gradient-to-r from-primary-600 via-primary-400 to-primary-500 bg-clip-text text-transparent text-6xl md:text-8xl font-bold">
            Unibyte
          </h1>

          <div className="flex flex-col items-center gap-2">
            <p className="yellow-subtitle font-inter text-2xl md:text-3xl text-primary-800 max-w-3xl font-semibold tracking-tight">
              WHERE THE POWER OF 0s AND 1s UNITE !
            </p>
            <p className="subtitle text-yellow font-inter text-lg md:text-xl max-w-2xl font-medium text-center leading-relaxed">
              To embrace the future with a community of thinkers and creators.
            </p>
          </div>

          <div className="hero-buttons flex items-center gap-4 ">
            <div className="hero-button">
              <Button variant="primary">Learn More</Button>
            </div>
            <div className="hero-button">
              <Button variant="secondary">Join Us</Button>
            </div>
          </div>
        </div>

        {/* Bottom Accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-200 via-yellow to-primary-400 opacity-60"></div>
      </div>
    </section>
  );
}

export default Hero;
