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
import { useTranslation } from "react-i18next";

const Footer: React.FC = () => {
  const { t } = useTranslation();

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
                  aria-label={t("visit_our_page", { platform: social.icon.type.displayName })}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-serif font-medium mb-4 text-[#FAC31C]">
              {t("quick_links")}
            </h3>
            <ul className="space-y-2">
              {[
                { to: "/about", label: t("about_pugu_marathon") },
                { to: "/give", label: t("register_to_run") },
                { to: "/contact", label: t("contact_us") },
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
              {t("marathon_highlights")}
            </h3>
            <div className="space-y-4 text-gray-200">
              <div>
                <p className="font-medium">{t("race_day_excitement")}</p>
                <p className="text-sm">{t("race_day_description")}</p>
              </div>
              <div>
                <p className="font-medium">{t("training_tips")}</p>
                <p className="text-sm">{t("training_tips_description")}</p>
              </div>
              <div>
                <p className="font-medium">{t("community_engagement")}</p>
                <p className="text-sm">{t("community_engagement_description")}</p>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-serif font-medium mb-4 text-[#FAC31C]">
              {t("contact_us")}
            </h3>
            <ul className="space-y-4 text-gray-200">
              <li className="flex items-start">
                <MapPin size={18} className="mr-3 mt-1 flex-shrink-0 text-[#FAC31C]" />
                <span>{t("location")}</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-3 flex-shrink-0 text-[#FAC31C]" />
                <a
                  href="tel:+255716400001"
                  className="hover:text-[#FAC31C] transition-colors duration-300"
                  aria-label={t("call_us")}
                >
                  +255 716 400 001
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-3 flex-shrink-0 text-[#FAC31C]" />
                <a
                  href="mailto:info@evmak.com"
                  className="hover:text-[#FAC31C] transition-colors duration-300"
                  aria-label={t("email_us")}
                >
                  info@evmak.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-purple-700/50 mt-12 pt-8 text-center text-gray-300">
          <p>© {new Date().getFullYear()} Pugu Marathon. {t("all_rights_reserved")}</p>
          <p className="mt-2 text-sm">{t("footer_tagline")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;