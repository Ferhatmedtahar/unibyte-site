"use client";
import { clubInfo, NAVBAR_ITEMS } from "@/utils/constants";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

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
              src="/logo.png"
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
          <nav className="mb-16 mt-12 pt-9 md:pt-5">
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
                  target="_blank"
                  className="flex items-center gap-2 hover:text-red-300 transition-all duration-200"
                  href={`mailto:${clubInfo.contact.email}`}
                >
                  <svg
                    className="h-6 w-6 text-red-500"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h3.819v-.273L12 9.36l6.545-4.547V3.821h3.819c.904 0 1.636.733 1.636 1.636z" />
                  </svg>
                </Link>
                <Link
                  className="flex items-center gap-2 hover:text-blue-300 transition-all duration-200"
                  href={clubInfo.contact.facebook}
                  target="_blank"
                >
                  <svg
                    className="h-6 w-6 text-blue-500"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </Link>
                <Link
                  className="flex items-center gap-2 hover:text-pink-200 transition-all duration-200"
                  href={clubInfo.contact.instagram}
                  target="_blank"
                >
                  <svg
                    className="h-6 w-6 text-pink-500"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </Link>
                <Link
                  className="flex items-center gap-2 text-[#0077B6] transition-all duration-200"
                  href={clubInfo.contact.linkedin}
                  target="_blank"
                >
                  <svg
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </Link>
                <Link
                  className="flex items-center gap-2 transition-all duration-200"
                  href={clubInfo.contact.tiktok}
                  target="_blank"
                >
                  <svg
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                  </svg>
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
