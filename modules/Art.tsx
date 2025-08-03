"use client";
import { featureLists, goodLists } from "@/utils/constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useMediaQuery } from "react-responsive";
export default function Art() {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  useGSAP(() => {
    const start = isMobile ? "top 20%" : "top top";

    const maskTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#art",
        start,
        end: "bottom center",
        scrub: 1.5,
        pin: true,
      },
    });

    maskTimeline
      .to(".will-fade", { opacity: 0, stagger: 0.2, ease: "power1.inOut" })
      .to(".masked-img", {
        scale: 1.3,
        maskPosition: "center",
        maskSize: "400%",
        duration: 1,
        ease: "power1.inOut ",
      })
      .to("#masked-content", { opacity: 1, duration: 1, ease: "power1.inOut" });
  });
  return (
    <section id="art">
      <div id="work" className="container mx-auto h-full pt-20">
        <h2 className="will-fade">AIRPODS</h2>

        <div className="content">
          <ul className="space-y-4 will-fade">
            {goodLists.map((feature: string, index: number) => (
              <li key={index} className="flex items-center gap-2">
                <img src="/images/check.png" alt="check" />
                <p>{feature}</p>
              </li>
            ))}
          </ul>

          <div className="showcase-img">
            <img
              src="/images/under-img1.jpeg"
              alt="showcase airpods"
              className="abs-center masked-img size-full object-contain"
            />
          </div>

          <ul className="space-y-4 will-fade">
            {featureLists.map((feature: string, index: number) => (
              <li key={index} className="flex items-center justify-start gap-2">
                <img src="/images/check.png" alt="check" />
                <p className="md:w-fit w-60">{feature}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="masked-container   mt-6">
          <h2 className="will-fade">Sound, Perfected</h2>
          <div id="masked-content" className=" mt-6">
            <h3>Tuned by Innovation, Built for You</h3>
            <p>
              This isn’t just audio. It’s a personalized sound experience,
              crafted to deliver clarity, comfort, and connection like never
              before.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
