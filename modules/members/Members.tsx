"use client";

import { teamMembers } from "@/utils/constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import MarqueeRow from "./components/MarqueeRow";

gsap.registerPlugin(ScrollTrigger);
export default function TeamTestimonials() {
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#team",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });
    tl.from("#team", {
      y: 60,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
    });
  }, []);
  // Split members into two groups of 10
  const firstRow = teamMembers.slice(0, 10);
  const secondRow = teamMembers.slice(10, 20);

  return (
    <>
      {/* Add custom CSS for animations */}
      <style jsx global>{`
        @keyframes marquee-left {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes marquee-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }

        .hover\\:pause:hover {
          animation-play-state: paused !important;
        }
      `}</style>

      <div id="team" className="py-12 sm:py-24 px-4 w-screen">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-10">
            <h2 className="text-center text-4xl md:text-6xl pb-4 text-gradient font-bold bg-gradient-to-r from-primary-600 via-primary-400 to-primary-500 bg-clip-text text-transparent mb-2">
              Meet Our Amazing Team
            </h2>
            <p className="text-lg md:text-xl text-primary-400/85 max-w-3xl mx-auto px-4">
              Discover the talented individuals who make our success possible
            </p>
          </div>
          <div className="space-y-2 sm:space-y-4 ">
            <MarqueeRow members={firstRow} direction="left" />
            <MarqueeRow members={secondRow} direction="right" />
          </div>
        </div>
      </div>
    </>
  );
}
// "use client";

// import { teamMembers } from "@/utils/constants";
// import { useGSAP } from "@gsap/react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/all";
// import MarqueeRow from "./components/MarqueeRow";

// gsap.registerPlugin(ScrollTrigger);
// export default function TeamTestimonials() {
//   useGSAP(() => {
//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: "#team",
//         start: "top 80%",
//         end: "bottom 20%",
//         toggleActions: "play none none reverse",
//       },
//     });
//     tl.from("#team", {
//       y: 60,
//       opacity: 0,
//       duration: 1.2,
//       ease: "power3.out",
//     });
//   }, []);
//   // Split members into two groups of 10
//   const firstRow = teamMembers.slice(0, 10);
//   const secondRow = teamMembers.slice(10, 20);

//   return (
//     <>
//       {/* Add custom CSS for animations */}
//       <style jsx global>{`
//         @keyframes marquee-left {
//           0% {
//             transform: translateX(0%);
//           }
//           100% {
//             transform: translateX(-50%);
//           }
//         }

//         @keyframes marquee-right {
//           0% {
//             transform: translateX(-50%);
//           }
//           100% {
//             transform: translateX(0%);
//           }
//         }

//         .hover\\:pause:hover {
//           animation-play-state: paused !important;
//         }
//       `}</style>

//       <div id="team" className="py-12 sm:py-24 px-4 w-screen">
//         <div className="mx-auto max-w-7xl">
//           {/* Header */}
//           <div className="text-center mb-12 sm:mb-10">
//             <h2 className="text-center text-4xl md:text-6xl pb-4 text-gradient font-bold bg-gradient-to-r from-primary-600 via-primary-400 to-primary-500 bg-clip-text text-transparent mb-2">
//               Meet Our Amazing Team
//             </h2>
//             <p className="text-lg md:text-xl text-primary-400/85 max-w-3xl mx-auto px-4">
//               Discover the talented individuals who make our success possible
//             </p>
//           </div>
//           <div className="space-y-2 sm:space-y-4 ">
//             <MarqueeRow members={firstRow} direction="left" />
//             <MarqueeRow members={secondRow} direction="right" />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
