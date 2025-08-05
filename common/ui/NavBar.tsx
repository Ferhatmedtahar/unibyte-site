"use client";
import { clubInfo, NAVBAR_ITEMS } from "@/utils/constants";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Facebook, Instagram, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useGSAP(() => {
    // Initial navbar animation
    gsap.fromTo(
      ".navbar",
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.inOut", delay: 0.2 }
    );
  }, []);

  // Menu animations
  useGSAP(() => {
    if (isOpen) {
      const tl = gsap.timeline();

      tl.from(".menu-item", {
        x: 100,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.2,
      }).from(
        ".menu-footer",
        {
          y: 50,
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.3"
      );
    }
  }, [isOpen]);

  const isMobile = useMediaQuery({ maxWidth: 767 });

  const handleClickOutside = (event: MouseEvent) => {
    if (
      isOpen &&
      menuRef.current &&
      buttonRef.current &&
      !menuRef.current.contains(event.target as Node) &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen && !isMobile) {
      // Add a small delay to prevent immediate triggering
      const timer = setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside);
      }, 100);

      return () => {
        clearTimeout(timer);
        document.removeEventListener("mousedown", handleClickOutside);
      };
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen, isMobile]);

  const handleMenuToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <nav className="navbar fixed top-0 left-0 right-0 z-50 px-6 lg:px-12 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              alt="logo"
              width={40}
              height={40}
              src="/logo.svg"
              className="w-10 h-10 rounded-full"
            />
            <span className="text-xl font-bold text-primary-600 font-roboto">
              Unibyte
            </span>
          </Link>
          <button
            ref={buttonRef}
            onClick={handleMenuToggle}
            className="flex items-center gap-3 text-primary-600 hover:text-primary-500 transition-colors duration-300 font-medium hover:cursor-pointer"
          >
            <span className="text-lg font-roboto">Menu</span>
            <div className="w-6 h-6 flex flex-col justify-center items-center relative">
              <div
                className={`w-6 h-0.5 bg-primary-500 transform transition-all duration-300 absolute ${
                  isOpen ? "rotate-45" : "-translate-y-1.5"
                }`}
              ></div>
              <div
                className={`w-6 h-0.5 bg-primary-500 transform transition-all duration-300 absolute ${
                  isOpen ? "opacity-0" : "opacity-100"
                }`}
              ></div>
              <div
                className={`w-6 h-0.5 bg-primary-500 transform transition-all duration-300 absolute ${
                  isOpen ? "-rotate-45" : "translate-y-1.5"
                }`}
              ></div>
            </div>
          </button>
        </div>
      </nav>
      <div
        ref={menuRef}
        className={` fixed top-0  left-[0%] md:left-[55%] lg:left-[58%] xl:left-[65%] 2xl:left-[70%] right-0 bottom-0 bg-primary-800/85 z-40 transition-all duration-500 ease-out ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="flex   flex-col justify-center items-center w-full md:items-start h-full px-6 lg:px-12 max-w-2xl">
          <nav className="mb-16 mt-12 pt-8 md:pt-4">
            {NAVBAR_ITEMS.map((item, index) => (
              <div key={item.id} className="menu-item overflow-hidden ">
                <Link
                  href={`/#${item.id}`}
                  onClick={handleLinkClick}
                  className="z-20  block text-white hover:text-[#8f109f]  transition-colors duration-300 py-3 text-5xl lg:text-7xl font-bold font-roboto leading-tight text-center md:text-start"
                >
                  {item.title}
                </Link>
                <div className="max-h-[1px]  h-[1px] bg-gradient-to-r from-transparent via-primary-200 to-transparent"></div>
              </div>
            ))}
          </nav>

          <div className="menu-footer">
            <div className="flex gap-4 mb-6">
              <div className="flex flex-row gap-4">
                <Link
                  className="flex items-center gap-2 hover:text-red-300 transition-all duration-200"
                  href={`mailto:${clubInfo.contact.email}`}
                >
                  <Mail className="h-6 w-6 text-red-500" />
                </Link>
                <Link
                  className="flex items-center gap-2 hover:text-blue-300 transition-all duration-200"
                  href={clubInfo.contact.facebook}
                  target="_blank"
                >
                  <Facebook className="h-6 w-6 text-blue-500" />
                </Link>
                <Link
                  className="flex items-center gap-2 hover:text-pink-200 transition-all duration-200"
                  href={clubInfo.contact.instagram}
                  target="_blank"
                >
                  <Instagram className="h-6 w-6 text-pink-500" />
                </Link>
              </div>
            </div>
            <p className="text-yellow text-sm font-inter">
              Where the power of 0s and 1s unite
            </p>
          </div>
        </div>
      </div>
      <div
        className={`fixed inset-0 backdrop-blur-sm z-30 transition-all duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      ></div>
    </>
  );
}
// "use client";
// import { clubInfo, NAVBAR_ITEMS } from "@/utils/constants";
// import { useGSAP } from "@gsap/react";
// import { gsap } from "gsap";
// import { Facebook, Instagram, Mail } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { useEffect, useRef, useState } from "react";
// import { useMediaQuery } from "react-responsive";

// export default function NavBar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const menuRef = useRef<HTMLDivElement>(null);
//   const buttonRef = useRef<HTMLButtonElement>(null);

//   useGSAP(() => {
//     // Initial navbar animation
//     gsap.fromTo(
//       ".navbar",
//       { y: -100, opacity: 0 },
//       { y: 0, opacity: 1, duration: 1, ease: "power2.out", delay: 0.2 }
//     );
//   }, []);

//   // Menu animations
//   useGSAP(() => {
//     if (isOpen) {
//       const tl = gsap.timeline();

//       tl.from(".menu-item", {
//         x: 100,
//         opacity: 0,
//         duration: 0.6,
//         stagger: 0.1,
//         ease: "power3.out",
//         delay: 0.2,
//       }).from(
//         ".menu-footer",
//         {
//           y: 50,
//           opacity: 0,
//           duration: 0.5,
//           ease: "power2.out",
//         },
//         "-=0.3"
//       );
//     }
//   }, [isOpen]);

//   const isMobile = useMediaQuery({ maxWidth: 767 });

//   const handleClickOutside = (event: MouseEvent) => {
//     if (
//       isOpen &&
//       menuRef.current &&
//       buttonRef.current &&
//       !menuRef.current.contains(event.target as Node) &&
//       !buttonRef.current.contains(event.target as Node)
//     ) {
//       setIsOpen(false);
//     }
//   };

//   useEffect(() => {
//     if (isOpen && !isMobile) {
//       // Add a small delay to prevent immediate triggering
//       const timer = setTimeout(() => {
//         document.addEventListener("mousedown", handleClickOutside);
//       }, 100);

//       return () => {
//         clearTimeout(timer);
//         document.removeEventListener("mousedown", handleClickOutside);
//       };
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//     }
//   }, [isOpen, isMobile]);

//   const handleMenuToggle = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     setIsOpen(!isOpen);
//   };

//   const handleLinkClick = () => {
//     setIsOpen(false);
//   };

//   return (
//     <>
//       <nav className="navbar fixed top-0 left-0 right-0 z-50 px-6 lg:px-12 py-4">
//         <div className="flex justify-between items-center">
//           <Link href="/" className="flex items-center gap-3 group">
//             <Image
//               alt="logo"
//               width={40}
//               height={40}
//               src="/logo.svg"
//               className="w-10 h-10 rounded-full"
//             />
//             <span className="text-xl font-bold text-primary-600 font-roboto">
//               Unibyte
//             </span>
//           </Link>
//           <button
//             ref={buttonRef}
//             onClick={handleMenuToggle}
//             className="flex items-center gap-3 text-primary-600 hover:text-primary-500 transition-colors duration-300 font-medium hover:cursor-pointer"
//           >
//             <span className="text-lg font-roboto">Menu</span>
//             <div className="w-6 h-6 flex flex-col justify-center items-center relative">
//               <div
//                 className={`w-6 h-0.5 bg-primary-500 transform transition-all duration-300 absolute ${
//                   isOpen ? "rotate-45" : "-translate-y-1.5"
//                 }`}
//               ></div>
//               <div
//                 className={`w-6 h-0.5 bg-primary-500 transform transition-all duration-300 absolute ${
//                   isOpen ? "opacity-0" : "opacity-100"
//                 }`}
//               ></div>
//               <div
//                 className={`w-6 h-0.5 bg-primary-500 transform transition-all duration-300 absolute ${
//                   isOpen ? "-rotate-45" : "translate-y-1.5"
//                 }`}
//               ></div>
//             </div>
//           </button>
//         </div>
//       </nav>
//       <div
//         ref={menuRef}
//         className={` fixed top-0  left-[0%] md:left-[55%] lg:left-[58%] xl:left-[65%] 2xl:left-[70%] right-0 bottom-0 bg-primary-800/85 z-40 transition-all duration-500 ease-out ${
//           isOpen ? "opacity-100 visible" : "opacity-0 invisible"
//         }`}
//       >
//         <div className="flex   flex-col justify-center items-center w-full md:items-start h-full px-6 lg:px-12 max-w-2xl">
//           <nav className="mb-16 mt-12 pt-8 md:pt-4">
//             {NAVBAR_ITEMS.map((item, index) => (
//               <div key={item.id} className="menu-item overflow-hidden ">
//                 <Link
//                   href={`/#${item.id}`}
//                   onClick={handleLinkClick}
//                   className="z-20  block text-white hover:text-[#8f109f]  transition-colors duration-300 py-3 text-5xl lg:text-7xl font-bold font-roboto leading-tight text-center md:text-start"
//                 >
//                   {item.title}
//                 </Link>
//                 <div className="max-h-[1px]  h-[1px] bg-gradient-to-r from-transparent via-primary-200 to-transparent"></div>
//               </div>
//             ))}
//           </nav>

//           <div className="menu-footer">
//             <div className="flex gap-4 mb-6">
//               <div className="flex flex-row gap-4">
//                 <Link
//                   className="flex items-center gap-2 hover:text-red-300 transition-all duration-200"
//                   href={`mailto:${clubInfo.contact.email}`}
//                 >
//                   <Mail className="h-6 w-6 text-red-500" />
//                 </Link>
//                 <Link
//                   className="flex items-center gap-2 hover:text-blue-300 transition-all duration-200"
//                   href={clubInfo.contact.facebook}
//                   target="_blank"
//                 >
//                   <Facebook className="h-6 w-6 text-blue-500" />
//                 </Link>
//                 <Link
//                   className="flex items-center gap-2 hover:text-pink-200 transition-all duration-200"
//                   href={clubInfo.contact.instagram}
//                   target="_blank"
//                 >
//                   <Instagram className="h-6 w-6 text-pink-500" />
//                 </Link>
//               </div>
//             </div>
//             <p className="text-yellow text-sm font-inter">
//               Where the power of 0s and 1s unite
//             </p>
//           </div>
//         </div>
//       </div>
//       <div
//         className={`fixed inset-0 backdrop-blur-sm z-30 transition-all duration-300 ${
//           isOpen ? "opacity-100 visible" : "opacity-0 invisible"
//         }`}
//       ></div>
//     </>
//   );
// }
// // "use client";
// // import { clubInfo, NAVBAR_ITEMS } from "@/utils/constants";
// // import { useGSAP } from "@gsap/react";
// // import { gsap } from "gsap";
// // import { Facebook, Instagram, Mail } from "lucide-react";
// // import Image from "next/image";
// // import Link from "next/link";
// // import { useEffect, useRef, useState } from "react";
// // import { useMediaQuery } from "react-responsive";

// // export default function NavBar() {
// //   const [isOpen, setIsOpen] = useState(false);
// //   const menuRef = useRef<HTMLDivElement>(null);
// //   const buttonRef = useRef<HTMLButtonElement>(null);

// //   useGSAP(() => {
// //     // Initial navbar animation
// //     gsap.fromTo(
// //       ".navbar",
// //       { y: -100, opacity: 0 },
// //       { y: 0, opacity: 1, duration: 1, ease: "power2.out", delay: 0.2 }
// //     );
// //   }, []);

// //   // Menu animations
// //   useGSAP(() => {
// //     if (isOpen) {
// //       const tl = gsap.timeline();

// //       tl.from(".menu-item", {
// //         x: 100,
// //         opacity: 0,
// //         duration: 0.6,
// //         stagger: 0.1,
// //         ease: "power3.out",
// //         delay: 0.2,
// //       }).from(
// //         ".menu-footer",
// //         {
// //           y: 50,
// //           opacity: 0,
// //           duration: 0.5,
// //           ease: "power2.out",
// //         },
// //         "-=0.3"
// //       );
// //     }
// //   }, [isOpen]);

// //   const isMobile = useMediaQuery({ maxWidth: 767 });

// //   const handleClickOutside = (event: MouseEvent) => {
// //     if (
// //       isOpen &&
// //       menuRef.current &&
// //       buttonRef.current &&
// //       !menuRef.current.contains(event.target as Node) &&
// //       !buttonRef.current.contains(event.target as Node)
// //     ) {
// //       setIsOpen(false);
// //     }
// //   };

// //   useEffect(() => {
// //     if (isOpen && !isMobile) {
// //       document.addEventListener("mousedown", handleClickOutside);
// //     }

// //     return () => {
// //       if (!isMobile) {
// //         document.removeEventListener("mousedown", handleClickOutside);
// //       }
// //     };
// //   }, [isOpen, isMobile]);

// //   const handleMenuToggle = () => {
// //     setIsOpen(!isOpen);
// //   };

// //   const handleLinkClick = () => {
// //     setIsOpen(false);
// //   };

// //   return (
// //     <>
// //       <nav className="navbar fixed top-0 left-0 right-0 z-50 px-6 lg:px-12 py-4">
// //         <div className="flex justify-between items-center">
// //           <Link href="/" className="flex items-center gap-3 group">
// //             <Image
// //               alt="logo"
// //               width={40}
// //               height={40}
// //               src="/logo.svg"
// //               className="w-10 h-10 rounded-full"
// //             />
// //             <span className="text-xl font-bold text-primary-600 font-roboto">
// //               Unibyte
// //             </span>
// //           </Link>
// //           <button
// //             ref={buttonRef}
// //             onClick={handleMenuToggle}
// //             className="flex items-center gap-3 text-primary-600 hover:text-primary-500 transition-colors duration-300 font-medium hover:cursor-pointer"
// //           >
// //             <span className="text-lg font-roboto">Menu</span>
// //             <div className="w-6 h-6 flex flex-col justify-center items-center relative">
// //               <div
// //                 className={`w-6 h-0.5 bg-primary-500 transform transition-all duration-300 absolute ${
// //                   isOpen ? "rotate-45" : "-translate-y-1.5"
// //                 }`}
// //               ></div>
// //               <div
// //                 className={`w-6 h-0.5 bg-primary-500 transform transition-all duration-300 absolute ${
// //                   isOpen ? "opacity-0" : "opacity-100"
// //                 }`}
// //               ></div>
// //               <div
// //                 className={`w-6 h-0.5 bg-primary-500 transform transition-all duration-300 absolute ${
// //                   isOpen ? "-rotate-45" : "translate-y-1.5"
// //                 }`}
// //               ></div>
// //             </div>
// //           </button>
// //         </div>
// //       </nav>
// //       <div
// //         ref={menuRef}
// //         className={` fixed top-0  left-[0%] md:left-[55%] lg:left-[58%] xl:left-[65%] 2xl:left-[70%] right-0 bottom-0 bg-primary-800/85 z-40 transition-all duration-500 ease-out ${
// //           isOpen ? "opacity-100 visible" : "opacity-0 invisible"
// //         }`}
// //       >
// //         <div className="flex   flex-col justify-center items-center w-full md:items-start h-full px-6 lg:px-12 max-w-2xl">
// //           <nav className="mb-16 mt-12 pt-8 md:pt-4">
// //             {NAVBAR_ITEMS.map((item, index) => (
// //               <div key={item.id} className="menu-item overflow-hidden ">
// //                 <Link
// //                   href={`/#${item.id}`}
// //                   onClick={handleLinkClick}
// //                   className="z-20  block text-white hover:text-[#8f109f]  transition-colors duration-300 py-3 text-5xl lg:text-7xl font-bold font-roboto leading-tight text-center md:text-start"
// //                 >
// //                   {item.title}
// //                 </Link>
// //                 <div className="max-h-[1px]  h-[1px] bg-gradient-to-r from-transparent via-primary-200 to-transparent"></div>
// //               </div>
// //             ))}
// //           </nav>

// //           <div className="menu-footer">
// //             <div className="flex gap-4 mb-6">
// //               <div className="flex flex-row gap-4">
// //                 <Link
// //                   className="flex items-center gap-2 hover:text-red-300 transition-all duration-200"
// //                   href={`mailto:${clubInfo.contact.email}`}
// //                 >
// //                   <Mail className="h-6 w-6 text-red-500" />
// //                 </Link>
// //                 <Link
// //                   className="flex items-center gap-2 hover:text-blue-300 transition-all duration-200"
// //                   href={clubInfo.contact.facebook}
// //                   target="_blank"
// //                 >
// //                   <Facebook className="h-6 w-6 text-blue-500" />
// //                 </Link>
// //                 <Link
// //                   className="flex items-center gap-2 hover:text-pink-200 transition-all duration-200"
// //                   href={clubInfo.contact.instagram}
// //                   target="_blank"
// //                 >
// //                   <Instagram className="h-6 w-6 text-pink-500" />
// //                 </Link>
// //               </div>
// //             </div>
// //             <p className="text-yellow text-sm font-inter">
// //               Where the power of 0s and 1s unite
// //             </p>
// //           </div>
// //         </div>
// //       </div>
// //       <div
// //         className={`fixed inset-0 backdrop-blur-sm z-30 transition-all duration-300 ${
// //           isOpen ? "opacity-100 visible" : "opacity-0 invisible"
// //         }`}
// //       ></div>
// //     </>
// //   );
// // }
// // // "use client";
// // // import { clubInfo, NAVBAR_ITEMS } from "@/utils/constants";
// // // import { useGSAP } from "@gsap/react";
// // // import { gsap } from "gsap";
// // // import { Facebook, Instagram, Mail } from "lucide-react";
// // // import Image from "next/image";
// // // import Link from "next/link";
// // // import { useEffect, useRef, useState } from "react";
// // // import { useMediaQuery } from "react-responsive";
// // // export default function NavBar() {
// // //   const [isOpen, setIsOpen] = useState(false);
// // //   const menuRef = useRef<HTMLDivElement>(null);
// // //   useGSAP(() => {
// // //     // Initial navbar animation
// // //     gsap.fromTo(
// // //       ".navbar",
// // //       { y: -100, opacity: 0 },
// // //       { y: 0, opacity: 1, duration: 1, ease: "power2.out", delay: 0.2 }
// // //     );
// // //   }, []);

// // //   // Menu animations
// // //   useGSAP(() => {
// // //     if (isOpen) {
// // //       const tl = gsap.timeline();

// // //       tl.from(".menu-item", {
// // //         x: 100,
// // //         opacity: 0,
// // //         duration: 0.6,
// // //         stagger: 0.1,
// // //         ease: "power3.out",
// // //         delay: 0.2,
// // //       }).from(
// // //         ".menu-footer",
// // //         {
// // //           y: 50,
// // //           opacity: 0,
// // //           duration: 0.5,
// // //           ease: "power2.out",
// // //         },
// // //         "-=0.3"
// // //       );
// // //     }
// // //   }, [isOpen]);
// // //   const isMobile = useMediaQuery({ maxWidth: 767 });
// // //   const handleClickOutside = (event: MouseEvent) => {
// // //     if (
// // //       isOpen &&
// // //       menuRef.current &&
// // //       !menuRef.current.contains(event.target as Node)
// // //     ) {
// // //       setIsOpen(false);
// // //     }
// // //   };
// // //   useEffect(() => {
// // //     if (isOpen && !isMobile) {
// // //       document.addEventListener("mousedown", handleClickOutside);
// // //     }

// // //     return () => {
// // //       if (!isMobile) {
// // //         document.removeEventListener("mousedown", handleClickOutside);
// // //       }
// // //     };
// // //   }, [isOpen, isMobile]);
// // //   const handleMenuToggle = () => {
// // //     setIsOpen(!isOpen);
// // //   };

// // //   const handleLinkClick = () => {
// // //     setIsOpen(false);
// // //   };

// // //   return (
// // //     <>
// // //       <nav className="navbar fixed top-0 left-0 right-0 z-50 px-6 lg:px-12 py-4">
// // //         <div className="flex justify-between items-center">
// // //           <Link href="/" className="flex items-center gap-3 group">
// // //             <Image
// // //               alt="logo"
// // //               width={40}
// // //               height={40}
// // //               src="/logo.svg"
// // //               className="w-10 h-10 rounded-full"
// // //             />
// // //             <span className="text-xl font-bold text-primary-600 font-roboto">
// // //               Unibyte
// // //             </span>
// // //           </Link>
// // //           <button
// // //             onClick={handleMenuToggle}
// // //             className="flex items-center gap-3 text-primary-600 hover:text-primary-500 transition-colors duration-300 font-medium hover:cursor-pointer"
// // //           >
// // //             <span className="text-lg font-roboto">Menu</span>
// // //             <div className="w-6 h-6 flex flex-col justify-center items-center relative">
// // //               <div
// // //                 className={`w-6 h-0.5 bg-primary-500 transform transition-all duration-300 absolute ${
// // //                   isOpen ? "rotate-45" : "-translate-y-1.5"
// // //                 }`}
// // //               ></div>
// // //               <div
// // //                 className={`w-6 h-0.5 bg-primary-500 transform transition-all duration-300 absolute ${
// // //                   isOpen ? "opacity-0" : "opacity-100"
// // //                 }`}
// // //               ></div>
// // //               <div
// // //                 className={`w-6 h-0.5 bg-primary-500 transform transition-all duration-300 absolute ${
// // //                   isOpen ? "-rotate-45" : "translate-y-1.5"
// // //                 }`}
// // //               ></div>
// // //             </div>
// // //           </button>
// // //         </div>
// // //       </nav>
// // //       <div
// // //         ref={menuRef}
// // //         className={` fixed top-0  left-[0%] md:left-[55%] lg:left-[58%] xl:left-[65%] 2xl:left-[70%] right-0 bottom-0 bg-primary-800/85 z-40 transition-all duration-500 ease-out ${
// // //           isOpen ? "opacity-100 visible" : "opacity-0 invisible"
// // //         }`}
// // //       >
// // //         <div className="flex   flex-col justify-center items-center w-full md:items-start h-full px-6 lg:px-12 max-w-2xl">
// // //           <nav className="mb-16 mt-12 pt-8 md:pt-4">
// // //             {NAVBAR_ITEMS.map((item, index) => (
// // //               <div key={item.id} className="menu-item overflow-hidden ">
// // //                 <Link
// // //                   href={`/#${item.id}`}
// // //                   onClick={handleLinkClick}
// // //                   className="z-20  block text-white hover:text-[#8f109f]  transition-colors duration-300 py-3 text-5xl lg:text-7xl font-bold font-roboto leading-tight text-center md:text-start"
// // //                 >
// // //                   {item.title}
// // //                 </Link>
// // //                 <div className="max-h-[1px]  h-[1px] bg-gradient-to-r from-transparent via-primary-200 to-transparent"></div>
// // //               </div>
// // //             ))}
// // //           </nav>

// // //           <div className="menu-footer">
// // //             <div className="flex gap-4 mb-6">
// // //               <div className="flex flex-row gap-4">
// // //                 <Link
// // //                   className="flex items-center gap-2 hover:text-red-300 transition-all duration-200"
// // //                   href={`mailto:${clubInfo.contact.email}`}
// // //                 >
// // //                   <Mail className="h-6 w-6 text-red-500" />
// // //                 </Link>
// // //                 <Link
// // //                   className="flex items-center gap-2 hover:text-blue-300 transition-all duration-200"
// // //                   href={clubInfo.contact.facebook}
// // //                   target="_blank"
// // //                 >
// // //                   <Facebook className="h-6 w-6 text-blue-500" />
// // //                 </Link>
// // //                 <Link
// // //                   className="flex items-center gap-2 hover:text-pink-200 transition-all duration-200"
// // //                   href={clubInfo.contact.instagram}
// // //                   target="_blank"
// // //                 >
// // //                   <Instagram className="h-6 w-6 text-pink-500" />
// // //                 </Link>
// // //               </div>
// // //             </div>
// // //             <p className="text-yellow text-sm font-inter">
// // //               Where the power of 0s and 1s unite
// // //             </p>
// // //           </div>
// // //         </div>
// // //       </div>
// // //       <div
// // //         className={`fixed inset-0 backdrop-blur-sm z-30 transition-all duration-300 ${
// // //           isOpen ? "opacity-100 visible" : "opacity-0 invisible"
// // //         }`}
// // //       ></div>
// // //     </>
// // //   );
// // // }
