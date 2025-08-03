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
// "use client";
// import { useGSAP } from "@gsap/react";
// import gsap from "gsap";
// import { ScrollTrigger, SplitText } from "gsap/all";
// import Image from "next/image";
// import { useRef } from "react";

// gsap.registerPlugin(SplitText, ScrollTrigger);

// const About = () => {
//   const containerRef = useRef(null);
//   const joinSectionRef = useRef(null);

//   useGSAP(() => {
//     // Main text animation
//     const mainText = new SplitText(".main-text", {
//       type: "words, lines",
//     });

//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: containerRef.current,
//         start: "top 80%",
//         end: "bottom 20%",
//       },
//     });

//     tl.from(".image-1", {
//       x: -100,
//       opacity: 0,
//       duration: 1.2,
//       ease: "power2.out",
//     })
//       .from(
//         mainText.lines,
//         {
//           y: 50,
//           opacity: 0,
//           duration: 1,
//           ease: "power2.out",
//           stagger: 0.1,
//         },
//         "-=0.8"
//       )
//       .from(
//         ".image-2",
//         {
//           x: 100,
//           opacity: 0,
//           duration: 1.2,
//           ease: "power2.out",
//         },
//         "-=0.6"
//       );

//     // Join section animation
//     const joinTl = gsap.timeline({
//       scrollTrigger: {
//         trigger: joinSectionRef.current,
//         start: "top 80%",
//       },
//     });

//     joinTl
//       .from(".join-title", {
//         y: 50,
//         opacity: 0,
//         duration: 1,
//         ease: "power2.out",
//       })
//       .from(
//         ".join-subtitle",
//         {
//           y: 30,
//           opacity: 0,
//           duration: 0.8,
//           ease: "power2.out",
//         },
//         "-=0.5"
//       )
//       .from(
//         ".qr-container",
//         {
//           scale: 0.8,
//           opacity: 0,
//           duration: 1,
//           ease: "back.out(1.7)",
//         },
//         "-=0.3"
//       )
//       .from(
//         ".arrow-container",
//         {
//           x: -30,
//           opacity: 0,
//           duration: 0.8,
//           ease: "power2.out",
//         },
//         "-=0.5"
//       );
//   }, []);

//   return (
//     <div className="min-h-screen bg-white text-gray-800">
//       <div ref={containerRef} className="py-20 px-6">
//         <div className="max-w-6xl mx-auto">
//           {/* First Image and Text Section */}
//           <div className="flex flex-col lg:flex-row items-center gap-12 mb-20">
//             <div className="image-1 lg:w-1/2">
//               <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-100 to-pink-100 p-6 shadow-2xl">
//                 <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-3xl"></div>
//                 <Image
//                   src="/images/about-2.png"
//                   alt="UniByte Community Event"
//                   width={500}
//                   height={400}
//                   className="w-full h-80 object-cover rounded-2xl relative z-10 shadow-lg"
//                 />
//                 <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full opacity-20"></div>
//                 <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full opacity-20"></div>
//               </div>
//             </div>

//             <div className="lg:w-1/2">
//               <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 text-sm font-medium mb-6">
//                 <div className="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse"></div>
//                 Innovation Hub
//               </div>
//               <p className="main-text text-xl leading-relaxed text-gray-700 font-medium">
//                 Whether you're passionate about{" "}
//                 <span className="text-purple-600 font-semibold">coding</span>,
//                 <span className="text-pink-600 font-semibold"> designing</span>,
//                 <span className="text-yellow-600 font-semibold">
//                   {" "}
//                   photography
//                 </span>
//                 , or any tech frontier,
//                 <span className="font-bold text-purple-800"> UniByte</span> is
//                 your launchpad for ideas, innovation, and impact! We bring
//                 together creative minds to explore the endless possibilities of
//                 technology and digital innovation.
//               </p>
//             </div>
//           </div>

//           {/* Second Image and Text Section */}
//           <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
//             <div className="image-2 lg:w-1/2">
//               <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-100 to-purple-100 p-6 shadow-2xl">
//                 <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl"></div>
//                 <Image
//                   src="/images/about-1.png"
//                   alt="UniByte Team Collaboration"
//                   width={500}
//                   height={400}
//                   className="w-full h-80 object-cover rounded-2xl relative z-10 shadow-lg"
//                 />
//                 <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full opacity-20"></div>
//                 <div className="absolute -bottom-4 -right-4 w-14 h-14 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full opacity-20"></div>
//               </div>
//             </div>

//             <div className="lg:w-1/2">
//               <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-purple-800 text-sm font-medium mb-6">
//                 <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
//                 Community Driven
//               </div>
//               <p className="main-text text-xl leading-relaxed text-gray-700 font-medium">
//                 Join our community of{" "}
//                 <span className="text-purple-600 font-semibold">
//                   brilliant minds
//                 </span>{" "}
//                 where creativity meets technology. From{" "}
//                 <span className="text-blue-600 font-semibold">hackathons</span>{" "}
//                 to
//                 <span className="text-green-600 font-semibold"> workshops</span>
//                 , from networking events to collaborative projects - we're
//                 building the future one byte at a time.
//                 <span className="font-bold text-purple-800">
//                   {" "}
//                   Your journey in tech starts here.
//                 </span>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Join Us Section */}
//       <section
//         ref={joinSectionRef}
//         className="py-20 px-6 bg-gradient-to-br from-purple-50 to-pink-50"
//       >
//         <div className="max-w-4xl mx-auto text-center">
//           <div className="bg-white rounded-3xl p-12 shadow-2xl border border-purple-100">
//             <h2 className="join-title text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
//               JOINS US NOW AND BE ONE
//               <br />
//               OF OUR BRILLIANT BYTES
//             </h2>

//             <p className="join-subtitle text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
//               Scan the code and fill out the registration form to become part of
//               our innovative community!
//             </p>

//             <div className="flex flex-col md:flex-row items-center justify-center gap-8">
//               {/* Arrow Container */}
//               <div className="arrow-container flex items-center">
//                 <div className="flex space-x-2">
//                   <div className="w-0 h-0 border-l-[20px] border-l-purple-500 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent animate-pulse"></div>
//                   <div
//                     className="w-0 h-0 border-l-[20px] border-l-purple-400 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent animate-pulse"
//                     style={{ animationDelay: "0.2s" }}
//                   ></div>
//                   <div
//                     className="w-0 h-0 border-l-[20px] border-l-purple-300 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent animate-pulse"
//                     style={{ animationDelay: "0.4s" }}
//                   ></div>
//                 </div>
//               </div>

//               {/* QR Code Container */}
//               <div className="qr-container">
//                 <div className="relative">
//                   <div className="w-48 h-48 bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl p-4 shadow-lg border-4 border-white">
//                     <div className="w-full h-full bg-white rounded-2xl flex items-center justify-center relative overflow-hidden">
//                       {/* QR Code Pattern */}
//                       <div className="w-full h-full grid grid-cols-8 gap-1 p-2">
//                         {/* Simulated QR Code Pattern */}
//                         {Array.from({ length: 64 }).map((_, i) => (
//                           <div
//                             key={i}
//                             className={`rounded-sm ${
//                               Math.random() > 0.5
//                                 ? "bg-gray-800"
//                                 : "bg-transparent"
//                             }`}
//                           />
//                         ))}
//                       </div>

//                       {/* Center Logo */}
//                       <div className="absolute inset-0 flex items-center justify-center">
//                         <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
//                           <span className="text-white font-bold text-lg">
//                             UB
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Decorative Elements */}
//                   <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full"></div>
//                   <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-br from-green-400 to-blue-400 rounded-full"></div>
//                 </div>

//                 <p className="text-purple-600 font-semibold mt-4 text-sm">
//                   Scan to Register
//                 </p>
//               </div>
//             </div>

//             {/* Additional CTA */}
//             <div className="mt-12 pt-8 border-t border-purple-100">
//               <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
//                 Join Our Community
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default About;
// // "use client";
// // import { useGSAP } from "@gsap/react";
// // import gsap from "gsap";
// // import { ScrollTrigger, SplitText } from "gsap/all";
// // import Image from "next/image";
// // import { useRef } from "react";

// // gsap.registerPlugin(SplitText, ScrollTrigger);

// // const About = () => {
// //   const containerRef = useRef(null);

// //   useGSAP(() => {
// //     // Main text animation
// //     const mainText = new SplitText(".main-text", {
// //       type: "words, lines",
// //     });

// //     const tl = gsap.timeline({
// //       scrollTrigger: {
// //         trigger: containerRef.current,
// //         start: "top 80%",
// //         end: "bottom 20%",
// //       },
// //     });

// //     tl.from(".image-1", {
// //       x: -100,
// //       opacity: 0,
// //       duration: 1.2,
// //       ease: "power2.out",
// //     })
// //       .from(
// //         mainText.lines,
// //         {
// //           y: 50,
// //           opacity: 0,
// //           duration: 1,
// //           ease: "power2.out",
// //           stagger: 0.1,
// //         },
// //         "-=0.8"
// //       )
// //       .from(
// //         ".image-2",
// //         {
// //           x: 100,
// //           opacity: 0,
// //           duration: 1.2,
// //           ease: "power2.out",
// //         },
// //         "-=0.6"
// //       );
// //   }, []);

// //   return (
// //     <div
// //       ref={containerRef}
// //       className="min-h-screen bg-white text-gray-800 py-20 px-6"
// //     >
// //       <div className="max-w-6xl mx-auto">
// //         <div className="flex flex-col lg:flex-row items-center gap-12 mb-20">
// //           <div className="image-1 lg:w-1/2">
// //             <Image
// //               src="/images/about-2.png"
// //               alt="Image 2"
// //               width={400}
// //               height={400}
// //               className="w-full h-full object-cover rounded-2xl"
// //             />
// //           </div>

// //           <div className="lg:w-1/2">
// //             <p className="main-text text-lg leading-relaxed text-gray-700">
// //               Whether you're passionate about coding, designing, photography, or
// //               any tech frontier, UniByte is your launchpad for ideas,
// //               innovation, and impact! We bring together creative minds to
// //               explore the endless possibilities of technology and digital
// //               innovation.
// //             </p>
// //           </div>
// //         </div>

// //         {/* Second Image and Text Section */}
// //         <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
// //           <div className="image-2 lg:w-1/2">
// //             <div className="w-full h-80 bg-gray-200 rounded-2xl flex items-center justify-center">
// //               <Image
// //                 src="/images/about-1.png"
// //                 alt="Image 1"
// //                 width={400}
// //                 height={400}
// //                 className="w-full h-full object-cover rounded-2xl"
// //               />
// //             </div>
// //           </div>

// //           <div className="lg:w-1/2">
// //             <p className="main-text text-lg leading-relaxed text-gray-700">
// //               Join our community of brilliant minds where creativity meets
// //               technology. From hackathons to workshops, from networking events
// //               to collaborative projects - we're building the future one byte at
// //               a time. Your journey in tech starts here.
// //             </p>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default About; // "use client";
// // // import React, { useRef, useEffect } from "react";
// // // import { useGSAP } from "@gsap/react";
// // // import gsap from "gsap";
// // // import { ScrollTrigger, SplitText } from "gsap/all";

// // // gsap.registerPlugin(SplitText, ScrollTrigger);

// // // const About = () => {
// // //   const containerRef = useRef(null);
// // //   const heroRef = useRef(null);
// // //   const statsRef = useRef(null);
// // //   const gridRef = useRef(null);
// // //   const teamRef = useRef(null);

// // //   useGSAP(() => {
// // //     // Hero Section Animation
// // //     const heroTitle = new SplitText(".hero-title", {
// // //       type: "chars, words, lines",
// // //     });

// // //     const heroSubtitle = new SplitText(".hero-subtitle", {
// // //       type: "words, lines",
// // //     });

// // //     const heroTl = gsap.timeline({
// // //       scrollTrigger: {
// // //         trigger: heroRef.current,
// // //         start: "top 80%",
// // //         end: "bottom 20%",
// // //       },
// // //     });

// // //     heroTl
// // //       .from(".hero-badge", {
// // //         y: 30,
// // //         opacity: 0,
// // //         duration: 0.8,
// // //         ease: "power2.out",
// // //       })
// // //       .from(
// // //         heroTitle.chars,
// // //         {
// // //           y: 100,
// // //           opacity: 0,
// // //           duration: 1.2,
// // //           ease: "power3.out",
// // //           stagger: 0.02,
// // //         },
// // //         "-=0.5"
// // //       )
// // //       .from(
// // //         heroSubtitle.lines,
// // //         {
// // //           y: 50,
// // //           opacity: 0,
// // //           duration: 1,
// // //           ease: "power2.out",
// // //           stagger: 0.1,
// // //         },
// // //         "-=0.8"
// // //       )
// // //       .from(
// // //         ".hero-cta",
// // //         {
// // //           y: 30,
// // //           opacity: 0,
// // //           duration: 0.8,
// // //           ease: "power2.out",
// // //         },
// // //         "-=0.5"
// // //       );

// // //     // Stats Animation
// // //     const statsTl = gsap.timeline({
// // //       scrollTrigger: {
// // //         trigger: statsRef.current,
// // //         start: "top 70%",
// // //       },
// // //     });

// // //     statsTl.from(".stat-card", {
// // //       y: 60,
// // //       opacity: 0,
// // //       duration: 1,
// // //       ease: "power2.out",
// // //       stagger: 0.15,
// // //     });

// // //     // Grid Animation
// // //     const gridTl = gsap.timeline({
// // //       scrollTrigger: {
// // //         trigger: gridRef.current,
// // //         start: "top 70%",
// // //       },
// // //     });

// // //     gridTl
// // //       .from(".grid-title", {
// // //         y: 50,
// // //         opacity: 0,
// // //         duration: 1,
// // //         ease: "power2.out",
// // //       })
// // //       .from(
// // //         ".grid-item",
// // //         {
// // //           y: 80,
// // //           opacity: 0,
// // //           duration: 1.2,
// // //           ease: "power2.out",
// // //           stagger: 0.1,
// // //         },
// // //         "-=0.5"
// // //       );

// // //     // Team Section Animation
// // //     const teamTl = gsap.timeline({
// // //       scrollTrigger: {
// // //         trigger: teamRef.current,
// // //         start: "top 70%",
// // //       },
// // //     });

// // //     teamTl
// // //       .from(".team-title", {
// // //         y: 50,
// // //         opacity: 0,
// // //         duration: 1,
// // //         ease: "power2.out",
// // //       })
// // //       .from(
// // //         ".team-card",
// // //         {
// // //           y: 60,
// // //           opacity: 0,
// // //           duration: 1,
// // //           ease: "power2.out",
// // //           stagger: 0.2,
// // //         },
// // //         "-=0.5"
// // //       );

// // //     // Parallax effect for background elements
// // //     gsap.to(".floating-element", {
// // //       y: -50,
// // //       scrollTrigger: {
// // //         trigger: containerRef.current,
// // //         start: "top bottom",
// // //         end: "bottom top",
// // //         scrub: 1,
// // //       },
// // //     });
// // //   }, []);

// // //   return (
// // //     <div
// // //       ref={containerRef}
// // //       className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden"
// // //     >
// // //       {/* Floating Background Elements */}
// // //       <div className="floating-element fixed top-20 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
// // //       <div className="floating-element fixed bottom-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

// // //       {/* Hero Section */}
// // //       <section
// // //         ref={heroRef}
// // //         className="min-h-screen flex items-center justify-center px-6 relative"
// // //       >
// // //         <div className="max-w-7xl mx-auto text-center">
// // //           <div className="hero-badge inline-flex items-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8">
// // //             <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
// // //             <span className="text-sm font-medium">
// // //               Crafting Digital Excellence
// // //             </span>
// // //           </div>

// // //           <h1 className="hero-title text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent leading-tight">
// // //             We Build
// // //             <br />
// // //             <span className="text-purple-400">Extraordinary</span>
// // //             <br />
// // //             Experiences
// // //           </h1>

// // //           <p className="hero-subtitle text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
// // //             Passionate innovators dedicated to transforming ideas into
// // //             cutting-edge digital solutions that inspire and engage users
// // //             worldwide.
// // //           </p>

// // //           <div className="hero-cta flex flex-col sm:flex-row gap-6 justify-center items-center">
// // //             <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full font-semibold text-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-2xl">
// // //               Discover Our Work
// // //             </button>
// // //             <button className="px-8 py-4 border-2 border-white/30 rounded-full font-semibold text-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
// // //               Meet The Team
// // //             </button>
// // //           </div>
// // //         </div>
// // //       </section>

// // //       {/* Stats Section */}
// // //       <section ref={statsRef} className="py-20 px-6">
// // //         <div className="max-w-7xl mx-auto">
// // //           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
// // //             <div className="stat-card text-center p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
// // //               <div className="text-4xl md:text-5xl font-bold text-purple-400 mb-4">
// // //                 200+
// // //               </div>
// // //               <div className="text-gray-300 text-lg">Projects Completed</div>
// // //             </div>
// // //             <div className="stat-card text-center p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
// // //               <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-4">
// // //                 50+
// // //               </div>
// // //               <div className="text-gray-300 text-lg">Happy Clients</div>
// // //             </div>
// // //             <div className="stat-card text-center p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
// // //               <div className="text-4xl md:text-5xl font-bold text-emerald-400 mb-4">
// // //                 5+
// // //               </div>
// // //               <div className="text-gray-300 text-lg">Years Experience</div>
// // //             </div>
// // //             <div className="stat-card text-center p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
// // //               <div className="text-4xl md:text-5xl font-bold text-rose-400 mb-4">
// // //                 24/7
// // //               </div>
// // //               <div className="text-gray-300 text-lg">Support Available</div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </section>

// // //       {/* Services Grid */}
// // //       <section ref={gridRef} className="py-20 px-6">
// // //         <div className="max-w-7xl mx-auto">
// // //           <div className="text-center mb-16">
// // //             <h2 className="grid-title text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
// // //               What We Excel At
// // //             </h2>
// // //             <p className="text-xl text-gray-300 max-w-2xl mx-auto">
// // //               From concept to deployment, we deliver comprehensive solutions
// // //               that drive results
// // //             </p>
// // //           </div>

// // //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
// // //             <div className="grid-item group">
// // //               <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 backdrop-blur-md border border-white/10 hover:border-purple-400/50 transition-all duration-300 transform hover:-translate-y-2">
// // //                 <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
// // //                   <svg
// // //                     className="w-8 h-8 text-white"
// // //                     fill="none"
// // //                     stroke="currentColor"
// // //                     viewBox="0 0 24 24"
// // //                   >
// // //                     <path
// // //                       strokeLinecap="round"
// // //                       strokeLinejoin="round"
// // //                       strokeWidth={2}
// // //                       d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
// // //                     />
// // //                   </svg>
// // //                 </div>
// // //                 <h3 className="text-2xl font-bold mb-4">Web Development</h3>
// // //                 <p className="text-gray-300 leading-relaxed">
// // //                   Modern, responsive websites built with cutting-edge
// // //                   technologies and optimized for performance.
// // //                 </p>
// // //               </div>
// // //             </div>

// // //             <div className="grid-item group">
// // //               <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-600/20 to-emerald-600/20 backdrop-blur-md border border-white/10 hover:border-blue-400/50 transition-all duration-300 transform hover:-translate-y-2">
// // //                 <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
// // //                   <svg
// // //                     className="w-8 h-8 text-white"
// // //                     fill="none"
// // //                     stroke="currentColor"
// // //                     viewBox="0 0 24 24"
// // //                   >
// // //                     <path
// // //                       strokeLinecap="round"
// // //                       strokeLinejoin="round"
// // //                       strokeWidth={2}
// // //                       d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
// // //                     />
// // //                   </svg>
// // //                 </div>
// // //                 <h3 className="text-2xl font-bold mb-4">Mobile Apps</h3>
// // //                 <p className="text-gray-300 leading-relaxed">
// // //                   Native and cross-platform mobile applications that deliver
// // //                   seamless user experiences.
// // //                 </p>
// // //               </div>
// // //             </div>

// // //             <div className="grid-item group">
// // //               <div className="p-8 rounded-2xl bg-gradient-to-br from-emerald-600/20 to-rose-600/20 backdrop-blur-md border border-white/10 hover:border-emerald-400/50 transition-all duration-300 transform hover:-translate-y-2">
// // //                 <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
// // //                   <svg
// // //                     className="w-8 h-8 text-white"
// // //                     fill="none"
// // //                     stroke="currentColor"
// // //                     viewBox="0 0 24 24"
// // //                   >
// // //                     <path
// // //                       strokeLinecap="round"
// // //                       strokeLinejoin="round"
// // //                       strokeWidth={2}
// // //                       d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"
// // //                     />
// // //                   </svg>
// // //                 </div>
// // //                 <h3 className="text-2xl font-bold mb-4">UI/UX Design</h3>
// // //                 <p className="text-gray-300 leading-relaxed">
// // //                   Intuitive interfaces and engaging user experiences that
// // //                   convert visitors into customers.
// // //                 </p>
// // //               </div>
// // //             </div>

// // //             <div className="grid-item group">
// // //               <div className="p-8 rounded-2xl bg-gradient-to-br from-rose-600/20 to-orange-600/20 backdrop-blur-md border border-white/10 hover:border-rose-400/50 transition-all duration-300 transform hover:-translate-y-2">
// // //                 <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-rose-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
// // //                   <svg
// // //                     className="w-8 h-8 text-white"
// // //                     fill="none"
// // //                     stroke="currentColor"
// // //                     viewBox="0 0 24 24"
// // //                   >
// // //                     <path
// // //                       strokeLinecap="round"
// // //                       strokeLinejoin="round"
// // //                       strokeWidth={2}
// // //                       d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
// // //                     />
// // //                   </svg>
// // //                 </div>
// // //                 <h3 className="text-2xl font-bold mb-4">Data Analytics</h3>
// // //                 <p className="text-gray-300 leading-relaxed">
// // //                   Powerful insights and analytics to help you make data-driven
// // //                   business decisions.
// // //                 </p>
// // //               </div>
// // //             </div>

// // //             <div className="grid-item group">
// // //               <div className="p-8 rounded-2xl bg-gradient-to-br from-orange-600/20 to-yellow-600/20 backdrop-blur-md border border-white/10 hover:border-orange-400/50 transition-all duration-300 transform hover:-translate-y-2">
// // //                 <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
// // //                   <svg
// // //                     className="w-8 h-8 text-white"
// // //                     fill="none"
// // //                     stroke="currentColor"
// // //                     viewBox="0 0 24 24"
// // //                   >
// // //                     <path
// // //                       strokeLinecap="round"
// // //                       strokeLinejoin="round"
// // //                       strokeWidth={2}
// // //                       d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a1 1 0 01-1-1V9a1 1 0 011-1h1a2 2 0 100-4H4a1 1 0 01-1-1V4a1 1 0 011-1h3a1 1 0 001-1v-1a2 2 0 114 0z"
// // //                     />
// // //                   </svg>
// // //                 </div>
// // //                 <h3 className="text-2xl font-bold mb-4">AI Integration</h3>
// // //                 <p className="text-gray-300 leading-relaxed">
// // //                   Cutting-edge AI and machine learning solutions to automate and
// // //                   enhance your processes.
// // //                 </p>
// // //               </div>
// // //             </div>

// // //             <div className="grid-item group">
// // //               <div className="p-8 rounded-2xl bg-gradient-to-br from-yellow-600/20 to-purple-600/20 backdrop-blur-md border border-white/10 hover:border-yellow-400/50 transition-all duration-300 transform hover:-translate-y-2">
// // //                 <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
// // //                   <svg
// // //                     className="w-8 h-8 text-white"
// // //                     fill="none"
// // //                     stroke="currentColor"
// // //                     viewBox="0 0 24 24"
// // //                   >
// // //                     <path
// // //                       strokeLinecap="round"
// // //                       strokeLinejoin="round"
// // //                       strokeWidth={2}
// // //                       d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
// // //                     />
// // //                   </svg>
// // //                 </div>
// // //                 <h3 className="text-2xl font-bold mb-4">Cybersecurity</h3>
// // //                 <p className="text-gray-300 leading-relaxed">
// // //                   Comprehensive security solutions to protect your digital
// // //                   assets and user data.
// // //                 </p>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </section>

// // //       {/* Team Section */}
// // //       <section ref={teamRef} className="py-20 px-6">
// // //         <div className="max-w-7xl mx-auto text-center">
// // //           <h2 className="team-title text-4xl md:text-6xl font-bold mb-16 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
// // //             Meet Our Visionaries
// // //           </h2>

// // //           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
// // //             <div className="team-card group">
// // //               <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 backdrop-blur-md border border-white/10 p-8 hover:border-purple-400/50 transition-all duration-300 transform hover:-translate-y-2">
// // //                 <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full mx-auto mb-6 flex items-center justify-center text-3xl font-bold">
// // //                   A
// // //                 </div>
// // //                 <h3 className="text-2xl font-bold mb-2">Alex Rodriguez</h3>
// // //                 <p className="text-purple-400 mb-4">CEO & Founder</p>
// // //                 <p className="text-gray-300 leading-relaxed">
// // //                   Visionary leader with 10+ years of experience in digital
// // //                   transformation and innovation.
// // //                 </p>
// // //               </div>
// // //             </div>

// // //             <div className="team-card group">
// // //               <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600/20 to-emerald-600/20 backdrop-blur-md border border-white/10 p-8 hover:border-blue-400/50 transition-all duration-300 transform hover:-translate-y-2">
// // //                 <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full mx-auto mb-6 flex items-center justify-center text-3xl font-bold">
// // //                   S
// // //                 </div>
// // //                 <h3 className="text-2xl font-bold mb-2">Sarah Chen</h3>
// // //                 <p className="text-blue-400 mb-4">CTO</p>
// // //                 <p className="text-gray-300 leading-relaxed">
// // //                   Technical genius specializing in scalable architectures and
// // //                   cutting-edge development practices.
// // //                 </p>
// // //               </div>
// // //             </div>

// // //             <div className="team-card group">
// // //               <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-600/20 to-rose-600/20 backdrop-blur-md border border-white/10 p-8 hover:border-emerald-400/50 transition-all duration-300 transform hover:-translate-y-2">
// // //                 <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-rose-500 rounded-full mx-auto mb-6 flex items-center justify-center text-3xl font-bold">
// // //                   M
// // //                 </div>
// // //                 <h3 className="text-2xl font-bold mb-2">Marcus Johnson</h3>
// // //                 <p className="text-emerald-400 mb-4">Creative Director</p>
// // //                 <p className="text-gray-300 leading-relaxed">
// // //                   Design expert crafting beautiful, intuitive experiences that
// // //                   users love and remember.
// // //                 </p>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </section>

// // //       {/* CTA Section */}
// // //       <section className="py-20 px-6">
// // //         <div className="max-w-4xl mx-auto text-center">
// // //           <div className="p-12 rounded-3xl bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-md border border-white/10">
// // //             <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
// // //               Ready to Transform Your Vision?
// // //             </h2>
// // //             <p className="text-xl text-gray-300 mb-8 leading-relaxed">
// // //               Let's collaborate to bring your ideas to life with innovative
// // //               solutions that make a lasting impact.
// // //             </p>
// // //             <div className="flex flex-col sm:flex-row gap-6 justify-center">
// // //               <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full font-semibold text-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-2xl">
// // //                 Start Your Project
// // //               </button>
// // //               <button className="px-8 py-4 border-2 border-white/30 rounded-full font-semibold text-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
// // //                 Schedule a Call
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </section>
// // //     </div>
// // //   );
// // // };

// // // export default About;
// // // // "use client";
// // // // import { useGSAP } from "@gsap/react";
// // // // import gsap from "gsap";
// // // // import { ScrollTrigger, SplitText } from "gsap/all";
// // // // gsap.registerPlugin(SplitText, ScrollTrigger);

// // // // const About = () => {
// // // //   useGSAP(() => {
// // // //     const header = new SplitText("h2", {
// // // //       type: "words , lines",
// // // //     });

// // // //     const scrollTimeline = gsap.timeline({
// // // //       scrollTrigger: {
// // // //         trigger: "#about",
// // // //         start: "top bottom",
// // // //       },
// // // //     });

// // // //     scrollTimeline
// // // //       .from(header.lines, {
// // // //         y: 100,
// // // //         opacity: 0,
// // // //         duration: 1.5,
// // // //         ease: "expo.out",
// // // //         stagger: 0.05,
// // // //       })
// // // //       .from(
// // // //         ".top-grid div, .bottom-grid div",
// // // //         {
// // // //           opacity: 0,
// // // //           duration: 1,
// // // //           ease: "power2.inOut",
// // // //           stagger: 0.05,
// // // //         },
// // // //         "-=1"
// // // //       );
// // // //   }, []);
// // // //   return (
// // // //     <section id="about">
// // // //       <div className="mb-16 md:px-0 px-5">
// // // //         <div className="content">
// // // //           <div className="md:col-span-8">
// // // //             <p className="badge">Best Quality</p>
// // // //             <h2>
// // // //               Where every detail matters <span className="text-white">-</span>{" "}
// // // //               from chip to ear
// // // //             </h2>
// // // //           </div>

// // // //           <div className="sub-content">
// // // //             <p>
// // // //               Every AirPod we offer reflects our obsession with detail — from
// // // //               the cutting-edge chipset to the ergonomic design. That precision
// // // //               is what turns simple audio into an unforgettable listening
// // // //               experience.
// // // //             </p>

// // // //             <div>
// // // //               <p className="md:text-3xl text-xl font-bold">
// // // //                 <span>4.5</span>/5
// // // //               </p>
// // // //               <p className="text-sm text-white-100">
// // // //                 More than +12000 customers
// // // //               </p>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </div>

// // // //       <div className="top-grid">
// // // //         <div className="md:col-span-3">
// // // //           <div />
// // // //           <img src="/images/abt1.jpeg" alt="grid-img-1" />
// // // //         </div>

// // // //         <div className="md:col-span-6">
// // // //           <div />
// // // //           <img src="/images/abt2.jpeg" alt="grid-img-2" />
// // // //         </div>

// // // //         <div className="md:col-span-3">
// // // //           <div />
// // // //           <img src="/images/abt5.jpeg" alt="grid-img-5" />
// // // //         </div>
// // // //       </div>

// // // //       <div className="bottom-grid">
// // // //         <div className="md:col-span-8">
// // // //           <div />
// // // //           <img src="/images/abt3.jpeg" alt="grid-img-3" />
// // // //         </div>

// // // //         <div className="md:col-span-4">
// // // //           <div />
// // // //           <img src="/images/abt4.jpeg" alt="grid-img-4" />
// // // //         </div>
// // // //       </div>
// // // //     </section>
// // // //   );
// // // // };
// // // // export default About;
