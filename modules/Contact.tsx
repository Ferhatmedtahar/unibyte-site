"use client";
import { openingHours, socials, storeInfo } from "@/utils/constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import Image from "next/image";

const Contact = () => {
  useGSAP(() => {
    const titleSplit = SplitText.create("#contact h2", { type: "words" });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#contact",
        start: "top center",
      },
      ease: "power1.inOut",
    });

    timeline
      .from(titleSplit.words, {
        opacity: 0,
        yPercent: 100,
        stagger: 0.02,
      })
      .from("#contact h3, #contact p", {
        opacity: 0,
        yPercent: 100,
        stagger: 0.02,
      })
      .to("#f-right-airpod", {
        y: "-50",
        duration: 1,
        ease: "power1.inOut",
      })
      .to(
        "#f-left-airpod",
        {
          y: "-50",
          duration: 1,
          ease: "power1.inOut",
        },
        "<"
      );
  });

  return (
    <footer id="contact">
      <Image
        height={200}
        width={200}
        src={`/images/air-pods-right-hero.png`}
        alt="airpod-right"
        id="f-right-airpod"
      />

      <Image
        height={200}
        width={200}
        src={`/images/air-pods-left-hero.png`}
        alt="airpod-left"
        id="f-left-airpod"
      />

      <div className="content">
        <h2>Where to Find Us</h2>

        <div>
          <h3>Visit Our Store</h3>
          <p>{storeInfo.address}</p>
        </div>

        <div>
          <h3>Contact Us</h3>
          <p>{storeInfo.contact.phone}</p>
          <p>{storeInfo.contact.email}</p>
        </div>

        <div>
          <h3>Open Every Day</h3>
          {openingHours.map((time) => (
            <p key={time.day}>
              {time.day} : {time.time}
            </p>
          ))}
        </div>

        <div>
          <h3>Socials</h3>

          <div className="flex-center gap-5">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
              >
                <img src={social.icon} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
