"use client";

import RegistrationForm from "@/common/form/RegistrationForm";
import { clubInfo } from "@/utils/constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faLinkedin, faTiktok } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faMapPin } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function JoinUs() {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const registerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);
  const contactLinksRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      // Header animation
      tl.fromTo(
        headerRef.current,
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        }
      );

      // Registration form container animation (match "Reach Us" style)
      if (registerRef.current) {
        tl.fromTo(
          registerRef.current,
          {
            y: 50,
            opacity: 0,
            scale: 0.95,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.4"
        );
      }

      // Card container animation
      if (containerRef.current) {
        const cardContainer =
          containerRef.current.querySelector(".card-container");
        if (cardContainer) {
          tl.fromTo(
            cardContainer,
            {
              y: 50,
              opacity: 0,
              scale: 0.95,
            },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.8,
              ease: "power2.out",
            },
            "-=0.4"
          );
        }
      }

      // Badge animation
      tl.fromTo(
        badgeRef.current,
        {
          x: -20,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
        },
        "-=0.3"
      );

      // Title animation
      tl.fromTo(
        titleRef.current,
        {
          y: 20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.4"
      );

      // Description animation
      tl.fromTo(
        descriptionRef.current,
        {
          y: 15,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.3"
      );

      // Location animation
      tl.fromTo(
        locationRef.current,
        {
          x: -15,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.2"
      );

      // Contact links stagger animation
      if (contactLinksRef.current) {
        tl.fromTo(
          contactLinksRef.current.children,
          {
            y: 20,
            opacity: 0,
            scale: 0.9,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.4,
            ease: "back.out(1.7)",
            stagger: 0.1,
          },
          "-=0.3"
        );
      }

      // List items animation
      if (listRef.current) {
        tl.fromTo(
          listRef.current.children,
          {
            x: -10,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
            stagger: 0.1,
          },
          "-=0.2"
        );
      }
    },
    { scope: containerRef }
  );

  return (
    <section id="contact" className="w-full" ref={containerRef}>
      <section className="mx-auto max-w-7xl px-4 py-6 lg:px-8 lg:py-20">
        <div className="space-y-2 mb-4" ref={headerRef}>
          <h2 className="text-center text-4xl md:text-6xl pb-4 text-gradient font-bold bg-gradient-to-r from-primary-600 via-primary-400 to-primary-500 bg-clip-text text-transparent">
            Join UniByte
          </h2>
          <p className="paragraph text-primary-600/80 text-lg max-w-2xl mx-auto text-center">
            Start by completing the registration form below. You can also reach
            us via the contact card afterwards.
          </p>
        </div>

        {/* Registration Form Section - Primary */}
        <div className="mb-12" ref={registerRef}>
          <RegistrationForm />
        </div>

        <div
          className="card-container relative isolate w-full overflow-hidden rounded-2xl cursor-default"
          style={{
            background:
              "linear-gradient(100.5deg,hsl(285, 60%, 30%) 29.55%,hsl(285, 50%,28%) 93.8%),radial-gradient(38.35% 93.72% at 18.31% 6.28%,#280454 0,#180454 100%)",
          }}
        >
          <Image
            alt="bg"
            loading="lazy"
            width={1840}
            height={694}
            className="absolute top-0"
            src="https://blocks.mvp-subha.me/assets/cta/grid.svg"
          />
          <div className="relative isolate overflow-hidden px-4 py-12 sm:px-24">
            <p
              ref={badgeRef}
              className="w-fit rounded-xl bg-white px-4 py-1 text-center text-base leading-7 font-semibold text-black uppercase lg:text-left hover:bg-primary-100 hover:text-primary-800 transition-all duration-300 cursor-default"
            >
              Get in touch
            </p>
            <h2
              ref={titleRef}
              className="mt-3 max-w-md text-4xl font-semibold text-white md:text-6xl"
            >
              How Can You{" "}
              <span className="text-pink-500 hover:text-pink-600 transition-colors duration-300">
                Reach Us
              </span>
              ?
            </h2>
            <p
              ref={descriptionRef}
              className="my-auto mt-3 max-w-2xl text-base text-gray-100 md:text-lg hover:text-white transition-colors duration-300"
            >
              If you need to get in touch, there are several ways to contact us.
            </p>

            {/* Location Section */}
            <div
              ref={locationRef}
              className="cursor-default mt-6 flex items-center gap-2 hover:text-pink-500 text-white transition-colors duration-200"
            >
              <FontAwesomeIcon icon={faMapPin} className="h-6 w-6 text-green-500" />
              <span className="text-lg font-medium">Visit Us:</span>
              <Link
                href={`${clubInfo.locationLink}`}
                className="hover:text-pink-500 text-white transition-colors duration-300 hover:underline"
              >
                {clubInfo.address}
              </Link>
            </div>

            <div
              ref={contactLinksRef}
              className="mt-8 flex w-full flex-col justify-between gap-4 text-lg md:flex-row md:flex-wrap"
            >
              <Link
                className="flex items-center gap-2 text-white hover:text-red-300 transition-all duration-200 transform hover:translate-x-1"
                href={`mailto:${clubInfo.contact.email}`}
              >
                <FontAwesomeIcon icon={faEnvelope} className="h-7 w-7 text-red-500 hover:text-red-400 transition-colors duration-200" />
                <span className="hover:underline">
                  {clubInfo.contact.email}
                </span>
              </Link>
              <Link
                className="flex items-center gap-2 text-white hover:text-blue-300 transition-all duration-200 transform hover:translate-x-1"
                href={`${clubInfo.contact.facebook}`}
                target="_blank"
              >
                <FontAwesomeIcon icon={faFacebook} className="h-7 w-7 text-blue-500 hover:text-blue-400 transition-colors duration-200" />
                <span className="hover:underline">unibyte.cs</span>
              </Link>
              <Link
                className="flex items-center gap-2 text-white hover:text-pink-200 transition-all duration-200 transform hover:translate-x-1"
                href={`${clubInfo.contact.instagram}`}
                target="_blank"
              >
                <FontAwesomeIcon icon={faInstagram} className="h-7 w-7 text-pink-500 hover:text-pink-400 transition-colors duration-200" />
                <span className="hover:underline">unibyte.cs</span>
              </Link>
              <Link
                className="flex items-center gap-2 text-white hover:text-blue-200 transition-all duration-200 transform hover:translate-x-1"
                href={`${clubInfo.contact.linkedin}`}
                target="_blank"
              >
                <FontAwesomeIcon icon={faLinkedin} className="h-7 w-7 text-blue-600 hover:text-blue-500 transition-colors duration-200" />
                <span className="hover:underline">unibyte-cs</span>
              </Link>
              <Link
                className="flex items-center gap-2 text-white hover:text-gray-200 transition-all duration-200 transform hover:translate-x-1"
                href={`${clubInfo.contact.tiktok}`}
                target="_blank"
              >
                <FontAwesomeIcon icon={faTiktok} className="h-7 w-7 text-gray-500" />
                <span className="hover:underline">@unibyte.cs</span>
              </Link>
            </div>
            <ul
              ref={listRef}
              className="mt-8 ml-4 list-disc text-sm text-gray-300 md:text-base"
            >
              <li className="hover:text-gray-200 transition-colors duration-300 cursor-default">
                once u register in the form , we will get u back with
                confirmation email , once u accepted and u will get member role
                in discord
              </li>
            </ul>
          </div>
        </div>
      </section>
    </section>
  );
}
// "use client";

// import RegistrationForm from "@/common/form/RegistrationForm";
// import { clubInfo } from "@/utils/constants";
// import { useGSAP } from "@gsap/react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { Facebook, Instagram, Mail, MapPin } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { useRef } from "react";

// gsap.registerPlugin(ScrollTrigger);

// export default function JoinUs() {
//   const containerRef = useRef<HTMLElement>(null);
//   const headerRef = useRef<HTMLDivElement>(null);
//   const badgeRef = useRef<HTMLParagraphElement>(null);
//   const titleRef = useRef<HTMLHeadingElement>(null);
//   const descriptionRef = useRef<HTMLParagraphElement>(null);
//   const locationRef = useRef<HTMLDivElement>(null);
//   const contactLinksRef = useRef<HTMLDivElement>(null);
//   const listRef = useRef<HTMLUListElement>(null);

//   useGSAP(
//     () => {
//       const tl = gsap.timeline({
//         scrollTrigger: {
//           trigger: containerRef.current,
//           start: "top 80%",
//           end: "bottom 20%",
//           toggleActions: "play none none reverse",
//         },
//       });

//       // Header animation
//       tl.fromTo(
//         headerRef.current,
//         {
//           y: 30,
//           opacity: 0,
//         },
//         {
//           y: 0,
//           opacity: 1,
//           duration: 0.8,
//           ease: "power2.out",
//         }
//       );

//       // Card container animation
//       if (containerRef.current) {
//         const cardContainer =
//           containerRef.current.querySelector(".card-container");
//         if (cardContainer) {
//           tl.fromTo(
//             cardContainer,
//             {
//               y: 50,
//               opacity: 0,
//               scale: 0.95,
//             },
//             {
//               y: 0,
//               opacity: 1,
//               scale: 1,
//               duration: 0.8,
//               ease: "power2.out",
//             },
//             "-=0.4"
//           );
//         }
//       }

//       // Badge animation
//       tl.fromTo(
//         badgeRef.current,
//         {
//           x: -20,
//           opacity: 0,
//         },
//         {
//           x: 0,
//           opacity: 1,
//           duration: 0.6,
//           ease: "back.out(1.7)",
//         },
//         "-=0.3"
//       );

//       // Title animation
//       tl.fromTo(
//         titleRef.current,
//         {
//           y: 20,
//           opacity: 0,
//         },
//         {
//           y: 0,
//           opacity: 1,
//           duration: 0.6,
//           ease: "power2.out",
//         },
//         "-=0.4"
//       );

//       // Description animation
//       tl.fromTo(
//         descriptionRef.current,
//         {
//           y: 15,
//           opacity: 0,
//         },
//         {
//           y: 0,
//           opacity: 1,
//           duration: 0.5,
//           ease: "power2.out",
//         },
//         "-=0.3"
//       );

//       // Location animation
//       tl.fromTo(
//         locationRef.current,
//         {
//           x: -15,
//           opacity: 0,
//         },
//         {
//           x: 0,
//           opacity: 1,
//           duration: 0.5,
//           ease: "power2.out",
//         },
//         "-=0.2"
//       );

//       // Contact links stagger animation
//       if (contactLinksRef.current) {
//         tl.fromTo(
//           contactLinksRef.current.children,
//           {
//             y: 20,
//             opacity: 0,
//             scale: 0.9,
//           },
//           {
//             y: 0,
//             opacity: 1,
//             scale: 1,
//             duration: 0.4,
//             ease: "back.out(1.7)",
//             stagger: 0.1,
//           },
//           "-=0.3"
//         );
//       }

//       // List items animation
//       if (listRef.current) {
//         tl.fromTo(
//           listRef.current.children,
//           {
//             x: -10,
//             opacity: 0,
//           },
//           {
//             x: 0,
//             opacity: 1,
//             duration: 0.4,
//             ease: "power2.out",
//             stagger: 0.1,
//           },
//           "-=0.2"
//         );
//       }
//     },
//     { scope: containerRef }
//   );

//   return (
//     <section id="contact" className="w-full" ref={containerRef}>
//       <section className="mx-auto max-w-7xl px-4 py-6 lg:px-8 lg:py-20">
//         <div className="space-y-2 mb-4" ref={headerRef}>
//           <h2 className="text-center text-4xl md:text-6xl pb-4 text-gradient font-bold bg-gradient-to-r from-primary-600 via-primary-400 to-primary-500 bg-clip-text text-transparent">
//             Ready to Join?
//           </h2>
//           <p className="paragraph text-primary-600/80 text-lg max-w-2xl mx-auto text-center">
//             We are always looking for talented individuals to join our team. If
//             you are interested in working with us, please contact us.
//           </p>
//         </div>
//         <RegistrationForm />

//         <div
//           className="card-container relative isolate w-full overflow-hidden rounded-2xl cursor-default"
//           style={{
//             background:
//               "linear-gradient(100.5deg,hsl(285, 60%, 30%) 29.55%,hsl(285, 50%,28%) 93.8%),radial-gradient(38.35% 93.72% at 18.31% 6.28%,#280454 0,#180454 100%)",
//           }}
//         >
//           <Image
//             alt="bg"
//             loading="lazy"
//             width="1840"
//             height="694"
//             className="absolute top-0"
//             src="https://blocks.mvp-subha.me/assets/cta/grid.svg"
//           />
//           <div className="relative isolate overflow-hidden px-4 py-12 sm:px-24">
//             <p
//               ref={badgeRef}
//               className="w-fit rounded-xl bg-white px-4 py-1 text-center text-base leading-7 font-semibold text-black uppercase lg:text-left hover:bg-primary-100 hover:text-primary-800 transition-all duration-300 cursor-default"
//             >
//               Get in touch
//             </p>
//             <h2
//               ref={titleRef}
//               className="mt-3 max-w-md text-4xl font-semibold text-white md:text-6xl"
//             >
//               How Can You{" "}
//               <span className="text-pink-500 hover:text-pink-600 transition-colors duration-300">
//                 Reach Us
//               </span>
//               ?
//             </h2>
//             <p
//               ref={descriptionRef}
//               className="my-auto mt-3 max-w-2xl text-base text-gray-100 md:text-lg hover:text-white transition-colors duration-300"
//             >
//               If you need to get in touch, there are several ways to contact us.
//             </p>

//             {/* Location Section */}
//             <div
//               ref={locationRef}
//               className="cursor-default mt-6 flex items-center gap-2 hover:text-pink-500 text-white transition-colors duration-200"
//             >
//               <MapPin className="h-6 w-6 text-green-500" />
//               <span className="text-lg font-medium">Visit Us:</span>
//               <Link
//                 href={`${clubInfo.locationLink}`}
//                 className="hover:text-pink-500 text-white transition-colors duration-300 hover:underline"
//               >
//                 {clubInfo.address}
//               </Link>
//             </div>

//             <div
//               ref={contactLinksRef}
//               className="mt-8 flex w-full flex-col justify-between gap-4 text-lg md:flex-row"
//             >
//               <Link
//                 className="flex items-center gap-2 text-white hover:text-red-300 transition-all duration-200 transform hover:translate-x-1"
//                 href={`mailto:${clubInfo.contact.email}`}
//               >
//                 <Mail className="h-7 w-7 text-red-500 hover:text-red-400 transition-colors duration-200" />
//                 <span className="hover:underline">
//                   {clubInfo.contact.email}
//                 </span>
//               </Link>
//               <Link
//                 className="flex items-center gap-2 text-white hover:text-blue-300 transition-all duration-200 transform hover:translate-x-1"
//                 href={`${clubInfo.contact.facebook}`}
//               >
//                 <Facebook className="h-7 w-7 text-blue-500 hover:text-blue-400 transition-colors duration-200" />
//                 <span className="hover:underline">unibyte.cs</span>
//               </Link>
//               <Link
//                 className="flex items-center gap-2 text-white hover:text-pink-200 transition-all duration-200 transform hover:translate-x-1"
//                 href={`${clubInfo.contact.instagram}`}
//               >
//                 <Instagram className="h-7 w-7 text-pink-500 hover:text-pink-400 transition-colors duration-200" />
//                 <span className="hover:underline">unibyte.cs</span>
//               </Link>
//             </div>
//             <ul
//               ref={listRef}
//               className="mt-8 ml-4 list-disc text-sm text-gray-300 md:text-base"
//             >
//               <li className="hover:text-gray-200 transition-colors duration-300 cursor-default">
//                 Come meet us during the Open Day and register by providing your
//                 full name and email.
//               </li>
//               <li className="hover:text-gray-200 transition-colors duration-300 cursor-default">
//                 We&apos;ll send you an email with a Discord invite link.
//               </li>
//               <li className="hover:text-gray-200 transition-colors duration-300 cursor-default">
//                 Join our Discord server to officially become a member of the
//                 team.
//               </li>
//             </ul>
//           </div>
//         </div>
//       </section>
//     </section>
//   );
// }
