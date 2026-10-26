"use client";
import { clubInfo } from "@/utils/constants";
import { useEffect } from "react";

const AWAY_TITLES = [
  "Where did you go? 👀",
  "Come join us! 💜",
  "The 0s and 1s miss you…",
  "Your seat at UniByte is waiting",
];
const RETURN_TITLE = "Welcome back! 👋";

const PLUM = "#8f3d9b";
const GOLD = "#d1a64c";

const BANNER = `
██╗   ██╗███╗   ██╗██╗██████╗ ██╗   ██╗████████╗███████╗
██║   ██║████╗  ██║██║██╔══██╗╚██╗ ██╔╝╚══██╔══╝██╔════╝
██║   ██║██╔██╗ ██║██║██████╔╝ ╚████╔╝    ██║   █████╗
██║   ██║██║╚██╗██║██║██╔══██╗  ╚██╔╝     ██║   ██╔══╝
╚██████╔╝██║ ╚████║██║██████╔╝   ██║      ██║   ███████╗
 ╚═════╝ ╚═╝  ╚═══╝╚═╝╚═════╝    ╚═╝      ╚═╝   ╚══════╝
`;

export default function EasterEggs() {
  useEffect(() => {
    const label = `color: ${PLUM}; font-size: 13px; font-family: monospace;`;
    const value = `color: ${GOLD}; font-size: 13px; font-family: monospace;`;

    console.log(
      `%c${BANNER}`,
      `color: ${PLUM}; font-weight: bold; font-size: 12px; font-family: monospace;`,
    );
    console.log(
      "%cWhere the power of 0s and 1s unite!",
      `color: ${GOLD}; font-size: 14px; font-weight: 500; padding: 4px 0;`,
    );

    const unibyte = {
      help: () => {
        console.log("%c Available commands:", label);
        console.log(
          "%c   unibyte.join()    %c→ How to become a member",
          value,
          label,
        );
        console.log("%c   unibyte.contact() %c→ Find us online", value, label);
        console.log(
          "%c   unibyte.binary()  %c→ A message in 0s and 1s",
          value,
          label,
        );
        return "Try one of the commands above!";
      },
      join: () => {
        console.log(
          "%c🚀 Found the secret door!",
          `color: ${GOLD}; font-size: 16px; font-weight: bold;`,
        );
        console.log(
          "%cFill in the form at #contact — we'll email you back.",
          label,
        );
        document
          .getElementById("contact")
          ?.scrollIntoView({ behavior: "smooth" });
        return "See you inside UniByte 💜";
      },
      contact: () => {
        const c = clubInfo.contact;
        console.log("%c📧 Email:     %c" + c.email, label, value);
        console.log("%c📸 Instagram: %c" + c.instagram, label, value);
        console.log("%c💼 LinkedIn:  %c" + c.linkedin, label, value);
        console.log("%c👍 Facebook:  %c" + c.facebook, label, value);
        console.log("%c🎵 TikTok:    %c" + c.tiktok, label, value);
        console.log("%c📍 Visit:     %c" + clubInfo.address, label, value);
        return "Come say hi!";
      },
      binary: () => {
        const msg = "JOIN US";
        const bits = [...msg]
          .map((ch) => ch.charCodeAt(0).toString(2).padStart(8, "0"))
          .join(" ");
        console.log(`%c${bits}`, value);
        return "Decode it… or just scroll to #contact 😉";
      },
    };

    (window as unknown as Record<string, unknown>).unibyte = unibyte;
    console.log(
      "%c💡 Tip: type %cunibyte.help() %cfor secret commands",
      label,
      value,
      label,
    );

    return () => {
      delete (window as unknown as Record<string, unknown>).unibyte;
    };
  }, []);
  useEffect(() => {
    let original = document.title;
    let cycle: ReturnType<typeof setInterval> | undefined;
    let restore: ReturnType<typeof setTimeout> | undefined;

    const onVisibility = () => {
      clearInterval(cycle);
      clearTimeout(restore);

      if (document.hidden) {
        if (
          !AWAY_TITLES.includes(document.title) &&
          document.title !== RETURN_TITLE
        ) {
          original = document.title;
        }
        let i = 0;
        document.title = AWAY_TITLES[i];
        cycle = setInterval(() => {
          i = (i + 1) % AWAY_TITLES.length;
          document.title = AWAY_TITLES[i];
        }, 2500);
      } else {
        document.title = RETURN_TITLE;
        restore = setTimeout(() => (document.title = original), 1800);
      }
    };

    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      clearInterval(cycle);
      clearTimeout(restore);
      document.title = original;
    };
  }, []);

  return null;
}
