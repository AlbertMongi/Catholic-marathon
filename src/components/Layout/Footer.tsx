import React from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer id="footer-section" className="bg-[#6A10CB] text-white">
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* About Column */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <img
              src="/images/pugu.png"
              alt="Pugu Marathon"
              className="h-20 w-auto mb-6"
            />
            {/* Uncomment if you want the title back */}
            {/* <h3 className="text-2xl font-serif font-medium mb-2 text-[#FAC31C]">
              Pugu Marathon
            </h3> */}
            {/* <p className="text-gray-200 mb-4 max-w-xs">
              Join thousands of runners and supporters for an unforgettable marathon experience in Tanzania.
            </p> */}
            <div className="flex space-x-6 justify-center md:justify-start">
              {[
                { href: "https://www.facebook.com/evmak", icon: <Facebook size={24} /> },
                { href: "https://www.instagram.com/evmakco?igsh=bGlzcmx1YjV0dGJs", icon: <Instagram size={24} /> },
                { href: "https://twitter.com/evmak", icon: <Twitter size={24} /> },
                { href: "https://www.youtube.com/@Evmak", icon: <Youtube size={24} /> },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  className="text-white/80 hover:text-[#FAC31C] transition-colors duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit our ${social.icon.type.displayName} page`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-serif font-medium mb-4 text-[#FAC31C]">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { to: "/about", label: "About Pugu Marathon" },
                { to: "/give", label: "Register to Run" },
                { to: "/contact", label: "Contact Us" },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.to}
                    className="text-gray-200 hover:text-[#FAC31C] transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Marathon Highlights */}
          <div>
            <h3 className="text-lg font-serif font-medium mb-4 text-[#FAC31C]">
              Marathon Highlights
            </h3>
            <div className="space-y-4 text-gray-200">
              <div>
                <p className="font-medium">Race Day Excitement</p>
                <p className="text-sm">Join thousands of runners in a community event</p>
              </div>
              <div>
                <p className="font-medium">Training Tips</p>
                <p className="text-sm">Prepare and improve your performance</p>
              </div>
              <div>
                <p className="font-medium">Community Engagement</p>
                <p className="text-sm">Connect with volunteers, supporters & sponsors</p>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-serif font-medium mb-4 text-[#FAC31C]">
              Contact Us
            </h3>
            <ul className="space-y-4 text-gray-200">
              <li className="flex items-start">
                <MapPin size={18} className="mr-3 mt-1 flex-shrink-0 text-[#FAC31C]" />
                <span>Dar es Salaam, Tanzania</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-3 flex-shrink-0 text-[#FAC31C]" />
                <a
                  href="tel:+255716400001"
                  className="hover:text-[#FAC31C] transition-colors duration-300"
                  aria-label="Call us at +255 716 400 001"
                >
                  +255 716 400 001
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-3 flex-shrink-0 text-[#FAC31C]" />
                <a
                  href="mailto:info@evmak.com"
                  className="hover:text-[#FAC31C] transition-colors duration-300"
                  aria-label="Email us at info@evmak.com"
                >
                  info@evmak.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-purple-700/50 mt-12 pt-8 text-center text-gray-300">
          <p>© {new Date().getFullYear()} Pugu Marathon. All Rights Reserved.</p>
          <p className="mt-2 text-sm">Run • Connect • Inspire</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;