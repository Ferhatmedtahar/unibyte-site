import { clubInfo } from "@/utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faLinkedin, faTiktok } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
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
            <FontAwesomeIcon icon={faEnvelope} className="h-6 w-6 text-red-500" />
          </Link>
          <Link
            className="flex items-center gap-2 hover:text-blue-300 transition-all duration-200"
            href={clubInfo.contact.facebook}
            target="_blank"
          >
            <FontAwesomeIcon icon={faFacebook} className="h-6 w-6 text-blue-500" />
          </Link>
          <Link
            className="flex items-center gap-2 hover:text-pink-200 transition-all duration-200"
            href={clubInfo.contact.instagram}
            target="_blank"
          >
            <FontAwesomeIcon icon={faInstagram} className="h-6 w-6 text-pink-500" />
          </Link>
          <Link
            className="flex items-center gap-2 hover:text-blue-200 transition-all duration-200"
            href={clubInfo.contact.linkedin}
            target="_blank"
          >
            <FontAwesomeIcon icon={faLinkedin} className="h-6 w-6 text-blue-600" />
          </Link>
          <Link
            className="flex items-center gap-2 hover:text-gray-200 transition-all duration-200"
            href={clubInfo.contact.tiktok}
            target="_blank"
          >
            <FontAwesomeIcon icon={faTiktok} className="h-6 w-6 text-gray-500" />
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
