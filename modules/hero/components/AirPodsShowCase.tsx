"use client";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function AirpodsScrollCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    canvas.width = 1158;
    canvas.height = 770;

    const resizeCanvas = () => {
      const container = containerRef.current;
      if (!container) return;

      const containerWidth = container.offsetWidth;
      const containerHeight = container.offsetHeight;

      const scaleX = (containerWidth * 0.85) / 1158;
      const scaleY = (containerHeight * 0.8) / 770;
      const scale = Math.min(scaleX, scaleY);

      canvas.style.width = `${1158 * scale}px`;
      canvas.style.height = `${770 * scale}px`;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const frameCount = 130;
    const currentFrame = (index: number) =>
      `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${(
        index + 1
      )
        .toString()
        .padStart(4, "0")}.jpg`;

    const images: HTMLImageElement[] = [];
    const airpods = { frame: 0 };
    let imagesLoaded = 0;

    for (let i = 0; i < frameCount; i++) {
      const img = document.createElement("img");
      img.src = currentFrame(i);
      img.onload = () => {
        imagesLoaded++;
        const progress = (imagesLoaded / frameCount) * 100;
        setLoadingProgress(progress);

        if (imagesLoaded === frameCount) {
          setIsLoaded(true);
        }
      };
      images.push(img);
    }

    const render = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      if (images[airpods.frame]) {
        context.drawImage(images[airpods.frame], 0, 0);
      }
    };

    const checkImagesLoaded = () => {
      if (imagesLoaded === frameCount) {
        createAnimation();
      } else {
        setTimeout(checkImagesLoaded, 100);
      }
    };

    const createAnimation = () => {
      render();

      // Create the main timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom-=100 top",
          scrub: 0.5,
          pin: true,
          pinSpacing: false,
          anticipatePin: 1,
          refreshPriority: -1,
          onUpdate: (self) => {
            const progress = Math.round(self.progress * 100);
          },
        },
      });

      // Main frame animation
      tl.to(airpods, {
        frame: frameCount - 1,
        snap: "frame",
        ease: "none",
        onUpdate: render,
      });

      // Optional: Add some text animations that sync with the scroll
      tl.from(
        ".airpods-title",
        {
          opacity: 0,
          y: 50,
          duration: 0.2,
        },
        0.1
      ).to(
        ".airpods-title",
        {
          opacity: 0,
          y: -50,
          duration: 0.2,
        },
        0.7
      );

      tl.from(
        ".airpods-subtitle",
        {
          opacity: 0,
          y: 50,
          duration: 0.2,
        },
        0.3
      ).to(
        ".airpods-subtitle",
        {
          opacity: 0,
          y: -50,
          duration: 0.2,
        },
        0.8
      );
    };

    checkImagesLoaded();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen bg-black flex items-center justify-center overflow-hidden"
    >
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-black" />

      {/* Loading screen */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-black flex items-center justify-center z-50">
          <div className="text-center text-white">
            <div className="w-32 h-1 bg-gray-700 rounded-full mb-4 overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-300 ease-out"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
            <p className="text-sm opacity-70">Loading AirPods Experience...</p>
            <p className="text-xs opacity-50 mt-1">
              {Math.round(loadingProgress)}%
            </p>
          </div>
        </div>
      )}

      {/* Canvas */}
      <canvas
        id="hero-lightpass"
        ref={canvasRef}
        className={`relative z-10  max-w-[70vw] max-h-[70vh] object-contain transition-opacity duration-500 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Text overlays that animate with scroll */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center text-white">
          <h2 className="airpods-title text-4xl md:text-6xl font-bold mb-4 opacity-0">
            AirPods Pro
          </h2>
          <p className="airpods-subtitle text-lg md:text-xl opacity-0">
            Immersive Sound Experience
          </p>
        </div>
      </div>

      {/* Scroll indicator - only show when loaded */}
      {isLoaded && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-center">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center mb-2 mx-auto">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce" />
          </div>
          <p className="text-xs opacity-70">Scroll to explore</p>
        </div>
      )}
    </div>
  );
}
