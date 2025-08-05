import { clubInfo } from "@/utils/constants";
import Image from "next/image";
import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-primary-800 border-t border-primary-500 px-24 py-10">
      <div className="flex justify-between items-center">
        {/* Left side - Logo and description */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Image src="/logo.svg" alt="Logo" width={36} height={36} />
            <span className="text-white text-xl font-semibold">Unibyte</span>
          </div>
          <p className="text-primary-100 text-sm leading-relaxed max-w-xs">
            WHERE THE POWER OF 0s AND 1s UNITE !
          </p>
        </div>

        {/* Right side - Email and navigation */}
        <div className="flex items-center gap-10">
          {/* Email contact */}
          <Link
            href={`mailto:${clubInfo.contact.email}`}
            className="flex items-center gap-2 bg-primary-900 hover:bg-primary-700 border border-primary-600 hover:border-primary-500 px-4 py-3 rounded-lg text-primary-100 hover:text-white text-sm transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            {clubInfo.contact.email}
          </Link>

          {/* Navigation */}
          <nav>
            <ul className="flex gap-8">
              <li>
                <Link
                  href="#about"
                  className="text-primary-100 hover:text-white text-sm font-medium transition-colors duration-200"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="#events"
                  className="text-primary-100 hover:text-white text-sm font-medium transition-colors duration-200"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  href="#community"
                  className="text-primary-100 hover:text-white text-sm font-medium transition-colors duration-200"
                >
                  Community
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="text-primary-100 hover:text-white text-sm font-medium transition-colors duration-200"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
