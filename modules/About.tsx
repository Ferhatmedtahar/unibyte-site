"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(SplitText, ScrollTrigger);

const About = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Main text animation
    const mainText = new SplitText(".main-text", {
      type: "words, lines",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        end: "bottom 20%",
      },
    });

    tl.from(".image-1", {
      x: -100,
      opacity: 0,
      duration: 1.2,
      ease: "power2.out",
    })
      .from(
        mainText.lines,
        {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
          stagger: 0.1,
        },
        "-=0.8",
      )
      .from(
        ".image-2",
        {
          x: 100,
          opacity: 0,
          duration: 1.2,
          ease: "power2.out",
        },
        "-=0.6",
      );
  }, []);

  return (
    <div className="relative">
      <section id="about" className="min-h-screen text-primary-500">
        <div ref={containerRef} className="py-24 md:py-32 px-6">
          <div className="max-w-6xl mx-auto">
            {/* First Image and Text Section */}
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 mb-24 md:mb-32">
              <div className="image-1 lg:w-1/2 w-full">
                <div className="relative rounded-[2rem] bg-gradient-to-br from-primary-100 via-white to-primary-50 p-3">
                  <Image
                    src="/images/about-2.png"
                    alt="UniByte Community Event"
                    width={500}
                    height={400}
                    className="w-full h-80 md:h-96 object-cover rounded-[1.5rem]"
                  />
                </div>
              </div>

              <div className="lg:w-1/2">
                <div className="pill-tag mb-6">
                  <span className="w-2 h-2 bg-gold-400 rounded-full" />
                  Innovation Hub
                </div>

                <p className="main-text text-center sm:text-start text-2xl md:text-[2rem] leading-[1.3] tracking-[-0.02em] text-primary-900/80 font-light">
                  <span className="font-semibold text-primary-500">
                    UniByte
                  </span>{" "}
                  is a student-led tech club at Ammar Telidji University.
                  Whether you&apos;re passionate about{" "}
                  <span className="text-primary-400 font-medium">coding</span>,
                  <span className="text-primary-400 font-medium">
                    {" "}
                    designing
                  </span>
                  ,
                  <span className="text-primary-400 font-medium">
                    {" "}
                    photography
                  </span>
                  , or any tech frontier, UniByte is your launchpad for personal
                  growth, meaningful collaboration, and real-world impact.
                </p>
              </div>
            </div>

            {/* Second Image and Text Section */}
            <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20">
              <div className="image-2 lg:w-1/2 w-full">
                <div className="relative rounded-[2rem] bg-gradient-to-br from-gold-200/60 via-white to-primary-50 p-3">
                  <Image
                    src="/images/about-1.png"
                    alt="UniByte Team Collaboration"
                    width={500}
                    height={400}
                    className="w-full h-80 md:h-96 object-cover rounded-[1.5rem]"
                  />
                </div>
              </div>

              <div className="lg:w-1/2">
                <div className="pill-tag mb-6">
                  <span className="w-2 h-2 bg-gold-400 rounded-full" />
                  Community Driven
                </div>
                <p className="text-center sm:text-start main-text text-2xl md:text-[2rem] leading-[1.3] tracking-[-0.02em] text-primary-900/80 font-light">
                  Join our community of{" "}
                  <span className="text-primary-400 font-medium">
                    brilliant minds
                  </span>{" "}
                  where creativity meets technology. From{" "}
                  <span className="text-primary-400 font-medium">
                    hackathons
                  </span>{" "}
                  to
                  <span className="text-primary-400 font-medium">
                    {" "}
                    workshops
                  </span>
                  , from networking events to collaborative projects -
                  we&apos;re building the future one byte at a time.
                  <span className="font-semibold text-primary-500">
                    {" "}
                    Your journey in tech starts here.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
