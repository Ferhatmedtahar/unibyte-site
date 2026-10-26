"use client";
import Button from "@/common/Button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(SplitText, ScrollTrigger);

const GRID =
  "linear-gradient(to right, rgb(88 4 84 / 0.07) 1px, transparent 1px), linear-gradient(to bottom, rgb(88 4 84 / 0.07) 1px, transparent 1px)";
const GRID_BRIGHT =
  "linear-gradient(to right, rgb(88 4 84 / 0.28) 1px, transparent 1px), linear-gradient(to bottom, rgb(88 4 84 / 0.28) 1px, transparent 1px)";

function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const reveal = [
        ".hero-title",
        ".hero-tagline",
        ".hero-subtitle",
        ".hero-buttons",
        ".hero-hand",
        ".hero-lamp",
        ".hero-backdrop",
      ];

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(reveal, { autoAlpha: 1 });
        section
          .querySelectorAll(".hero-char")
          .forEach((c) => c.classList.remove("is-decoding"));
      });

      mm.add("(prefers-reduced-motion: no-preference)", (context) => {
        let split: SplitText | undefined;
        let tagline: SplitText | undefined;
        let cancelled = false;

        document.fonts.ready.then(() => {
          if (cancelled) return;
          context.add(() => {
            split = new SplitText(".hero-title", {
              type: "chars",
              charsClass: "hero-char is-decoding",
            });
            tagline = new SplitText(".hero-tagline", {
              type: "words",
              mask: "words",
            });

            const chars = split.chars as HTMLElement[];
            const center = (chars.length - 1) / 2;

            // Lock each glyph's width so 0/1 noise doesn't jiggle the layout
            chars.forEach((c) => {
              c.dataset.final = c.textContent ?? "";
              c.style.width = `${c.getBoundingClientRect().width}px`;
            });
            chars.forEach((c, i) => (c.textContent = i % 2 ? "1" : "0"));

            gsap.set(reveal, { autoAlpha: 1 });

            const tl = gsap.timeline({
              defaults: { ease: "expo.out" },
              delay: 0.15,
            });

            tl.from(".hero-backdrop", {
              autoAlpha: 0,
              scale: 1.08,
              duration: 2.2,
              ease: "power2.out",
            })
              // 0s and 1s scattered apart, then pulled together into the word
              .from(
                chars,
                {
                  x: (i) => (i - center) * 70,
                  yPercent: (i) => (i % 2 ? 40 : -40),
                  autoAlpha: 0,
                  filter: "blur(14px)",
                  duration: 1.6,
                  stagger: { each: 0.05, from: "center" },
                },
                0.1,
              );

            chars.forEach((c, i) => {
              const final = c.dataset.final ?? "";
              const bit = () => (Math.random() > 0.5 ? "1" : "0");
              const proxy = { p: 0 };
              let lastStep = -1;
              tl.to(
                proxy,
                {
                  p: 1,
                  duration: 1.1 + Math.abs(i - center) * 0.14,
                  ease: "none",
                  onUpdate: () => {
                    const step = Math.floor(proxy.p * 16);
                    if (step !== lastStep) {
                      lastStep = step;
                      c.textContent = bit();
                    }
                  },
                  onComplete: () => {
                    c.textContent = final;
                    c.classList.remove("is-decoding");
                    c.style.width = "";
                  },
                },
                0.1,
              );
            });

            tl.from(
              tagline.words,
              { yPercent: 110, duration: 1.1, stagger: 0.045 },
              1.2,
            )
              .from(
                ".hero-subtitle",
                { y: 24, autoAlpha: 0, filter: "blur(6px)", duration: 1.2 },
                1.45,
              )
              .from(
                ".hero-buttons > *",
                { y: 24, autoAlpha: 0, duration: 1.1, stagger: 0.1 },
                1.6,
              )
              .from(".hero-hand", { x: -120, autoAlpha: 0, duration: 1.8 }, 1.3)
              .from(
                ".hero-lamp",
                { y: -80, rotate: 0, autoAlpha: 0, duration: 1.8 },
                1.4,
              );

            // Scroll: wordmark recedes, props drift apart
            gsap
              .timeline({
                scrollTrigger: {
                  trigger: section,
                  start: "top top",
                  end: "bottom top",
                  scrub: true,
                },
              })
              .to(".hero-content", { yPercent: 18, autoAlpha: 0.2 }, 0)
              .to(".hero-lamp", { y: 220 }, 0)
              .to(".hero-hand", { y: -200 }, 0);
          });
        });

        // Cursor spotlight on the grid (pointer devices only)
        const spot = section.querySelector<HTMLElement>(".hero-spotlight");
        const fine = window.matchMedia("(pointer: fine)").matches;
        let onMove: ((e: PointerEvent) => void) | undefined;
        if (spot && fine) {
          const xTo = gsap.quickTo(spot, "--mx", {
            duration: 0.6,
            ease: "power3",
          });
          const yTo = gsap.quickTo(spot, "--my", {
            duration: 0.6,
            ease: "power3",
          });
          onMove = (e) => {
            const r = section.getBoundingClientRect();
            xTo(e.clientX - r.left);
            yTo(e.clientY - r.top);
          };
          section.addEventListener("pointermove", onMove);
        }

        // Slow ambient drift of the aurora
        gsap.to(".hero-aurora-a", {
          xPercent: 8,
          yPercent: 6,
          duration: 14,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
        gsap.to(".hero-aurora-b", {
          xPercent: -10,
          yPercent: -8,
          duration: 17,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        return () => {
          cancelled = true;
          split?.revert();
          tagline?.revert();
          if (onMove) section.removeEventListener("pointermove", onMove);
        };
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative isolate min-h-dvh w-full overflow-hidden bg-paper"
    >
      <style>{`
        #hero .hero-title .hero-char {
          background: linear-gradient(180deg, #a24bae 0%, #580454 52%, #2b032a 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          text-align: center;
          padding: 0.18em 0.06em;
          margin: -0.18em -0.06em;
        }
        /* Outfit's "t" crossbar overhangs the "y" once kerning is lost to splitting */
        #hero .hero-title .hero-char:nth-child(6) {
          margin-left: 0;
        }
        #hero .hero-title .hero-char.is-decoding {
          background: none;
          color: var(--color-gold-500);
          text-shadow: 0 0 24px rgb(209 166 76 / 0.45);
        }
        #hero .hero-spotlight {
          --mx: -1000;
          --my: -1000;
          -webkit-mask-image: radial-gradient(260px circle at calc(var(--mx) * 1px) calc(var(--my) * 1px), #000 0%, transparent 100%);
          mask-image: radial-gradient(260px circle at calc(var(--mx) * 1px) calc(var(--my) * 1px), #000 0%, transparent 100%);
        }
      `}</style>

      {/* Backdrop: aurora + masked grid + cursor spotlight */}
      <div className="hero-backdrop invisible pointer-events-none absolute inset-0 -z-10">
        <div className="hero-aurora-a absolute -left-[15%] -top-[25%] h-[75vh] w-[65vw] rounded-full bg-primary-300/35 blur-[120px]" />
        <div className="hero-aurora-b absolute -right-[10%] bottom-[-30%] h-[70vh] w-[55vw] rounded-full bg-primary-200/40 blur-[130px]" />
        <div className="absolute left-1/2 top-[42%] h-[45vh] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-100/80 blur-[90px]" />
        <div
          className="absolute inset-0 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_45%,#000_35%,transparent_80%)]"
          style={{ backgroundImage: GRID, backgroundSize: "72px 72px" }}
        />
        <div
          className="hero-spotlight absolute inset-0"
          style={{ backgroundImage: GRID_BRIGHT, backgroundSize: "72px 72px" }}
        />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-paper" />
      </div>

      <Image
        src="/images/hand-hero-2.png"
        alt=""
        aria-hidden
        width={300}
        height={300}
        priority
        className="hero-hand invisible pointer-events-none absolute -left-16 top-[26%] hidden w-[clamp(220px,22vw,360px)] select-none drop-shadow-[0_30px_40px_rgb(88_4_84/0.25)] md:block"
      />
      <Image
        src="/images/lamp-hero.png"
        alt=""
        aria-hidden
        width={80}
        height={80}
        priority
        className="hero-lamp invisible pointer-events-none absolute right-6 top-24 w-16 rotate-[30deg] select-none drop-shadow-[0_18px_28px_rgb(88_4_84/0.25)] md:right-12 md:top-[16%] md:w-[clamp(72px,6vw,104px)]"
      />

      <div className="hero-content relative z-10 mx-auto flex min-h-dvh w-full max-w-[1600px] flex-col items-center justify-center px-4 pb-16 pt-28 text-center">
        <h1 className="hero-title invisible select-none font-bold leading-[0.9] tracking-[-0.02em] text-primary-500 text-[clamp(4.25rem,20vw,7.5rem)] md:text-[clamp(5rem,14vw,15rem)]">
          Unibyte
        </h1>

        <p className="hero-tagline invisible mt-[clamp(2.25rem,4.5vw,4.5rem)] max-w-[22ch] text-balance text-[clamp(1.125rem,2.1vw,1.875rem)] font-semibold leading-tight tracking-[0.01em] text-primary-600 sm:max-w-none">
          WHERE THE POWER OF 0s AND 1s UNITE !
        </p>
        <p className="hero-subtitle invisible mt-3 max-w-[34ch] text-balance text-[clamp(1.0625rem,1.35vw,1.3125rem)] font-light leading-relaxed text-primary-700/75 sm:max-w-none">
          To embrace the future with a community of thinkers and creators
        </p>

        <div className="hero-buttons invisible mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
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
    </section>
  );
}

export default Hero;
