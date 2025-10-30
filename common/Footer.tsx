import { clubInfo } from "@/utils/constants";
import { Facebook, Instagram, Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-primary-800 border-t border-primary-500 px-6 md:px-24 py-10 text-primary-100">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
        {/* Left side - Logo and description */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={36}
              height={36}
              // className="w-12 h-12"
            />
            <span className="text-white text-xl font-semibold">Unibyte</span>
          </div>
          <p className="text-sm max-w-xs text-yellow/75">
            WHERE THE POWER OF 0s AND 1s UNITE!
          </p>
        </div>

        {/* Right side - Navigation */}
        <nav>
          <ul className="flex flex-wrap gap-6">
            <li key="about">
              <Link
                href="#about"
                className="hover:text-white text-sm font-medium transition-colors duration-200"
              >
                About
              </Link>
            </li>
            <li key="events">
              <Link
                href="#events"
                className="hover:text-white text-sm font-medium transition-colors duration-200"
              >
                Events
              </Link>
            </li>
            <li key="community">
              <Link
                href="#community"
                className="hover:text-white text-sm font-medium transition-colors duration-200"
              >
                Community
              </Link>
            </li>
            <li key="contact">
              <Link
                href="#contact"
                className="hover:text-white text-sm font-medium transition-colors duration-200"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="mt-6 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div className="flex flex-row gap-4 flex-wrap">
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
          <Link
            className="flex items-center gap-2 hover:text-blue-200 transition-all duration-200"
            href={clubInfo.contact.linkedin}
            target="_blank"
          >
            <Linkedin className="h-6 w-6 text-blue-600" />
          </Link>
          <Link
            className="flex items-center gap-2 hover:text-gray-200 transition-all duration-200"
            href={clubInfo.contact.tiktok}
            target="_blank"
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.525.02C2.438 2.02 2 4.808 2 7.398v.016c0 2.67 2.174 4.815 4.88 4.815s4.88-2.145 4.88-4.815v-.016C17.76 2.02 15.394 2 12.525 2 9.658c0-2.736 2.167-4.815 4.88-4.815zm4.885 16.41c0 2.267-1.73 4.115-4.12 4.115v-.016c0-2.39-1.848-4.115-4.115-4.115zm-4.88 6.815v1.039c0 2.267 1.73 4.115 4.12 4.115s4.12-1.848 4.12-4.115v-1.039c-2.735 0-4.88-2.167-4.88-4.815z"/>
            </svg>
          </Link>
        </div>

        {/* Copyright */}
        <p className="text-sm text-primary-100 mt-4 md:mt-0">
          © {new Date().getFullYear()} Unibyte Club. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
