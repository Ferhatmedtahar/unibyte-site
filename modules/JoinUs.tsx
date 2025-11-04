"use client";

import RegistrationForm from "@/common/form/RegistrationForm";
import { clubInfo } from "@/utils/constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin } from "lucide-react";
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
              <MapPin className="h-6 w-6 text-green-500" />
              <span className="text-lg font-medium">Visit Us:</span>
              <Link
                target="_blank"
                href={`${clubInfo.locationLink}`}
                className="hover:text-pink-500 text-white transition-colors duration-300 hover:underline"
              >
                {clubInfo.address}
              </Link>
            </div>

            <div
              ref={contactLinksRef}
              className="mt-8 flex w-full flex-col justify-between gap-4 text-lg md:flex-row"
            >
              <Link
                target="_blank"
                className="flex items-center gap-2 text-white hover:text-red-300 transition-all duration-200 transform hover:translate-x-1"
                href={`mailto:${clubInfo.contact.email}`}
              >
                <svg
                  className="h-7 w-7 text-red-500 hover:text-red-400 transition-colors duration-200"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h3.819v-.273L12 9.36l6.545-4.547V3.821h3.819c.904 0 1.636.733 1.636 1.636z" />
                </svg>
                <span className="hover:underline">
                  {clubInfo.contact.email}
                </span>
              </Link>
              <Link
                target="_blank"
                className="flex items-center gap-2 text-white hover:text-blue-300 transition-all duration-200 transform hover:translate-x-1"
                href={`${clubInfo.contact.facebook}`}
              >
                <svg
                  className="h-7 w-7 text-blue-500 hover:text-blue-400 transition-colors duration-200"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span className="hover:underline">unibyte.cs</span>
              </Link>
              <Link
                target="_blank"
                className="flex items-center gap-2 text-white hover:text-pink-200 transition-all duration-200 transform hover:translate-x-1"
                href={`${clubInfo.contact.instagram}`}
              >
                <svg
                  className="h-7 w-7 text-pink-500 hover:text-pink-400 transition-colors duration-200"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                <span className="hover:underline">unibyte.cs</span>
              </Link>
              <Link
                className="flex items-center gap-2 text-white hover:text-blue-200 transition-all duration-200 transform hover:translate-x-1"
                href={`${clubInfo.contact.linkedin}`}
                target="_blank"
              >
                <svg
                  className="h-7 w-7"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                <span className="hover:underline">unibyte-cs</span>
              </Link>
              <Link
                className="flex items-center gap-2 text-white hover:text-gray-200 transition-all duration-200 transform hover:translate-x-1"
                href={`${clubInfo.contact.tiktok}`}
                target="_blank"
              >
                <svg
                  className="h-7 w-7"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
                <span className="hover:underline">@unibyte.cs</span>
              </Link>
            </div>
            <ul
              ref={listRef}
              className="mt-8 ml-4 list-disc text-sm text-gray-300 md:text-base"
            >
              <li className="hover:text-gray-200 transition-colors duration-300 cursor-default">
                Once you complete the registration form, you&apos;ll receive an
                approval email. After that, you&apos;ll be added to our Discord
                server and granted the member role.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </section>
  );
}
