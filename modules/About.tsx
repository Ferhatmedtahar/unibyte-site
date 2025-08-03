"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(SplitText, ScrollTrigger);

const About = () => {
  const containerRef = useRef(null);
  const joinSectionRef = useRef(null);

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
        "-=0.8"
      )
      .from(
        ".image-2",
        {
          x: 100,
          opacity: 0,
          duration: 1.2,
          ease: "power2.out",
        },
        "-=0.6"
      );

    // Join section animation
    const joinTl = gsap.timeline({
      scrollTrigger: {
        trigger: joinSectionRef.current,
        start: "top 80%",
      },
    });

    joinTl
      .from(".join-title", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      })
      .from(
        ".join-subtitle",
        {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.5"
      )
      .from(
        ".qr-container",
        {
          scale: 0.8,
          opacity: 0,
          duration: 1,
          ease: "back.out(1.7)",
        },
        "-=0.3"
      )
      .from(
        ".arrow-container",
        {
          x: -30,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.5"
      );
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <div ref={containerRef} className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* First Image and Text Section */}
          <div className="flex flex-col lg:flex-row items-center gap-12 mb-20">
            <div className="image-1 lg:w-1/2">
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-100 to-pink-100 p-6 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-3xl"></div>
                <Image
                  src="/images/about-2.png"
                  alt="UniByte Community Event"
                  width={500}
                  height={400}
                  className="w-full h-80 object-cover rounded-2xl relative z-10 shadow-lg"
                />
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full opacity-20"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full opacity-20"></div>
              </div>
            </div>

            <div className="lg:w-1/2">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 text-sm font-medium mb-6">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse"></div>
                Innovation Hub
              </div>
              <p className="main-text text-xl leading-relaxed text-gray-700 font-medium">
                Whether you're passionate about{" "}
                <span className="text-purple-600 font-semibold">coding</span>,
                <span className="text-pink-600 font-semibold"> designing</span>,
                <span className="text-yellow-600 font-semibold">
                  {" "}
                  photography
                </span>
                , or any tech frontier,
                <span className="font-bold text-purple-800"> UniByte</span> is
                your launchpad for ideas, innovation, and impact! We bring
                together creative minds to explore the endless possibilities of
                technology and digital innovation.
              </p>
            </div>
          </div>

          {/* Second Image and Text Section */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
            <div className="image-2 lg:w-1/2">
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-100 to-purple-100 p-6 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl"></div>
                <Image
                  src="/images/about-1.png"
                  alt="UniByte Team Collaboration"
                  width={500}
                  height={400}
                  className="w-full h-80 object-cover rounded-2xl relative z-10 shadow-lg"
                />
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full opacity-20"></div>
                <div className="absolute -bottom-4 -right-4 w-14 h-14 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full opacity-20"></div>
              </div>
            </div>

            <div className="lg:w-1/2">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-purple-800 text-sm font-medium mb-6">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
                Community Driven
              </div>
              <p className="main-text text-xl leading-relaxed text-gray-700 font-medium">
                Join our community of{" "}
                <span className="text-purple-600 font-semibold">
                  brilliant minds
                </span>{" "}
                where creativity meets technology. From{" "}
                <span className="text-blue-600 font-semibold">hackathons</span>{" "}
                to
                <span className="text-green-600 font-semibold"> workshops</span>
                , from networking events to collaborative projects - we're
                building the future one byte at a time.
                <span className="font-bold text-purple-800">
                  {" "}
                  Your journey in tech starts here.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Join Us Section */}
      <section ref={joinSectionRef} className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            {/* Left Side - Text */}
            <div className="flex-1">
              <h2 className="join-title text-4xl md:text-5xl font-bold text-primary-500 mb-4">
                JOINS US NOW AND BE ONE
                <br />
                OF OUR BRILLIANT BYTES
              </h2>

              <div className="join-subtitle border-2 border-dashed border-primary-400 p-4 rounded-lg inline-block">
                <p className="text-yellow font-medium">
                  Scan the code and fill out the registration form !
                </p>
              </div>
            </div>

            {/* Center - Arrows */}
            <div className="arrow-container flex items-center">
              <div className="flex space-x-2">
                <div className="w-0 h-0 border-l-[30px] border-l-primary-400/95 border-t-[15px] border-t-transparent border-b-[15px] border-b-transparent"></div>
                <div className="w-0 h-0 border-l-[30px] border-l-primary-300 border-t-[15px] border-t-transparent border-b-[15px] border-b-transparent"></div>
                <div className="w-0 h-0 border-l-[30px] border-l-primary-100 border-t-[15px] border-t-transparent border-b-[15px] border-b-transparent"></div>
              </div>
            </div>

            {/* Right Side - QR Code */}
            <div className="qr-container">
              <div className="w-48 h-48 bg-yellow/80 rounded-3xl p-4">
                <Image
                  src="/images/QR code.png"
                  alt="UniByte QR Code"
                  width={500}
                  height={400}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
