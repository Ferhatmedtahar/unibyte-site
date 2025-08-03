"use client";

import { sliderLists } from "@/utils/constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useRef, useState } from "react";
export default function Slider() {
  const contentRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useGSAP(() => {
    gsap.from("#title", {
      y: 100,
      duration: 1.5,
      ease: "expo.out",
    });
    gsap.fromTo(
      ".details h2",
      { yPercent: 80, opacity: 0 },
      {
        yPercent: 0,
        opacity: 100,
        delay: 0.1,
        duration: 1,
        ease: "power2.inOut",
      }
    );
    gsap.fromTo(
      ".details p",
      { yPercent: 100, opacity: 0 },
      {
        yPercent: 0,
        delay: 0.2,
        duration: 1,
        opacity: 100,
        ease: "power2.inOut",
      }
    );
    gsap.from(".airpod", {
      opacity: 0,
      duration: 2,
      ease: "expo.out",
      x: -200,
    });
  }, [currentIndex]);

  const totalAirpods = sliderLists.length;
  const goToSlide = (index: number) => {
    const newIndex = (index + totalAirpods) % totalAirpods;

    setCurrentIndex(newIndex);
  };

  const getAirpodAt = (indexOffset: number) => {
    return sliderLists[
      (currentIndex + indexOffset + totalAirpods) % totalAirpods
    ];
  };

  const currentAirpod = getAirpodAt(0);
  const prevAirpod = getAirpodAt(-1);
  const nextAirpod = getAirpodAt(1);

  return (
    <section id="menu" aria-labelledby="menu-heading ">
      <Image
        height={100}
        width={100}
        className="absolute bottom-0 left-0 -rotate-24 ml-4  "
        src="/images/contact-1.jpg"
        alt="left-airpod"
        id="m-left-airpod"
      />
      <Image
        className="rotate-24 mr-4   "
        height={100}
        width={100}
        src="/images/contact-2.jpg"
        alt="right-airpod"
        id="m-right-airpod"
      />

      <h2 id="menu-heading" className="sr-only">
        Cocktail Menu
      </h2>

      <nav className="airpods-tabs" aria-label="Airpods Navigation">
        {sliderLists.map((airpod: any, index: number) => {
          const isActive = index === currentIndex;

          return (
            <button
              key={airpod.id}
              className={`
				${isActive ? "text-white border-white" : "text-white/50 border-white/50"}
			 `}
              onClick={() => goToSlide(index)}
            >
              {airpod.name}
            </button>
          );
        })}
      </nav>

      <div className="content">
        <div className="arrows">
          <button
            className="text-left"
            onClick={() => goToSlide(currentIndex - 1)}
          >
            <span>{prevAirpod.name}</span>
            <img
              src="/images/right-arrow.png"
              alt="right-arrow"
              aria-hidden="true"
            />
          </button>

          <button
            className="text-left"
            onClick={() => goToSlide(currentIndex + 1)}
          >
            <span>{nextAirpod.name}</span>
            <img
              src="/images/left-arrow.png"
              alt="left-arrow"
              aria-hidden="true"
            />
          </button>
        </div>

        <div className="airpod overflow-x-hidden overflow-y-hidden">
          <Image
            height={500}
            width={500}
            alt={currentAirpod.name}
            src={currentAirpod.image}
            className="object-contain"
          />
        </div>

        <div className="airpod-info">
          <div ref={contentRef} className="info">
            <p id="title" className="text-4xl">
              {currentAirpod.name}
            </p>
          </div>

          <div className="details">
            <h2>{currentAirpod.title}</h2>
            <p>{currentAirpod.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
