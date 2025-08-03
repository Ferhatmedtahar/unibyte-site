import Footer from "@/common/ui/Footer";
import NavBar from "@/common/ui/NavBar";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UniByte",
  description: `UniByte is a dynamic scientific club at the University of Laghouat ”Ammar telidji”.
Founded by passionate Computer Science Engineering students on December 14th, 2023.
 We are a vibrant community dedicated to exploring
 the ever-evolving world of technology, pushing the boundaries of knowledge, and fostering a collaborative environment where creativity and curiosity thrive.

 `,
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
        {children}
        <Footer />
      </body>
    </html>
  );
}
