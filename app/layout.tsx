import Footer from "@/common/ui/Footer";
import NavBar from "@/common/ui/NavBar";
import type { Metadata } from "next";
import favIcon from "../public/favicon.ico";
import ogImage from "../public/images/about-2.png";
import "./globals.css";
import SmoothScrolling from "@/providers/smoothScrolling";
export const metadata: Metadata = {
  title: "UniByte | Ammar Telidji University",
  metadataBase: new URL("https://unibyte-site.vercel.app/"),
  description: `UniByte is a student-led tech club at Ammar Telidji University. 
Whether you're passionate about coding, design, photography, or any tech frontier, 
UniByte is your launchpad for personal growth, meaningful collaboration, and real-world impact.`,
  keywords: [
    "UniByte",
    "tech club",
    "Ammar Telidji University",
    "computer science",
    "programming",
    "web development",
    "UI/UX",
    "data structures",
    "student tech community",
    "hackathons",
    "photography",
    "workshops",
  ],
  openGraph: {
    title: "UniByte | Where the Power of 0s and 1s Unite!",
    description:
      "Join UniByte — the student-led tech community at Ammar Telidji University. Explore coding, design, workshops, and more.",
    url: "https://unibyte-site.vercel.app/",
    siteName: "UniByte",
    images: [
      {
        url: ogImage.src,
        width: ogImage.width,
        height: ogImage.height,
        alt: "UniByte - Student Tech Club",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "UniByte | Ammar Telidji Tech Club",
    description:
      "A student-led tech club focused on innovation, learning, and real-world tech experiences at Ammar Telidji University.",
    images: [
      {
        url: ogImage.src,
        width: ogImage.width,
        height: ogImage.height,
        alt: "UniByte - Student Tech Club",
      },
    ],
  },
  icons: {
    shortcut: favIcon.src,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` antialiased selection:bg-primary-800 selection:text-primary-50`}
      >
        <NavBar />
        <SmoothScrolling>{children}</SmoothScrolling>
        {/* {children} */}
        <Footer />
      </body>
    </html>
  );
}
