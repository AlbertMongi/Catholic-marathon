import React from "react";
import { useTranslation } from "react-i18next";

// Picture interface
interface Picture {
  id: string;
  src: string;
  alt: string;
}

const CommunityStoriesSection: React.FC = () => {
  const { t } = useTranslation(); // ✅ Hook inside component

const pictures: Picture[] = [
  // { id: "1", src: "/images/4H7A0373.JPG", alt: t("church_event") },
  // { id: "2", src: "/images/4H7A0391.JPG", alt: t("volunteer_activity") },
  // { id: "8", src: "/images/JMN_9085.JPG", alt: t("volunteer_activity") },
  // { id: "9", src: "/images/JMN_9088.JPG", alt: t("charity_contribution") },
  // { id: "10", src: "/images/JMN_9093.JPG", alt: t("youth_gathering") },
  // { id: "11", src: "/images/JMN_9117.JPG", alt: t("prayer_session") },
  // { id: "12", src: "/images/JMN_9119.JPG", alt: t("community_workshop") },
  // { id: "13", src: "/images/JMN_9125.JPG", alt: t("church_event") },
  // { id: "14", src: "/images/JMN_9156.JPG", alt: t("volunteer_activity") },
  // { id: "15", src: "/images/JMN_9159.JPG", alt: t("charity_contribution") },
  // { id: "16", src: "/images/JMN_9167.JPG", alt: t("youth_gathering") },
  // { id: "17", src: "/images/JMN_9222.JPG", alt: t("prayer_session") },

  { id: "18", src: "/images/WhatsApp Image 2026-02-25 at 20.44.36 (1).jpeg", alt: t("church_event") },
  { id: "19", src: "/images/WhatsApp Image 2026-02-25 at 20.44.36.jpeg", alt: t("church_event") },
  { id: "20", src: "/images/WhatsApp Image 2026-02-25 at 20.44.37 (1).jpeg", alt: t("church_event") },
  { id: "21", src: "/images/WhatsApp Image 2026-02-25 at 20.44.37 (2).jpeg", alt: t("church_event") },
  { id: "22", src: "/images/WhatsApp Image 2026-02-25 at 20.44.37.jpeg", alt: t("church_event") },
  { id: "23", src: "/images/WhatsApp Image 2026-02-25 at 20.44.38 (1).jpeg", alt: t("church_event") },
  { id: "24", src: "/images/WhatsApp Image 2026-02-25 at 20.44.38 (2).jpeg", alt: t("church_event") },
  { id: "25", src: "/images/WhatsApp Image 2026-02-25 at 20.44.38.jpeg", alt: t("church_event") },
  { id: "26", src: "/images/WhatsApp Image 2026-02-25 at 20.44.39 (1).jpeg", alt: t("church_event") },
  { id: "27", src: "/images/WhatsApp Image 2026-02-25 at 20.44.39 (2).jpeg", alt: t("church_event") },
  { id: "28", src: "/images/WhatsApp Image 2026-02-25 at 20.44.39.jpeg", alt: t("church_event") },
  { id: "29", src: "/images/WhatsApp Image 2026-02-25 at 20.44.40 (1).jpeg", alt: t("church_event") },
  { id: "30", src: "/images/WhatsApp Image 2026-02-25 at 20.44.40 (2).jpeg", alt: t("church_event") },
  { id: "31", src: "/images/WhatsApp Image 2026-02-25 at 20.44.40.jpeg", alt: t("church_event") },
  { id: "32", src: "/images/WhatsApp Image 2026-02-25 at 20.44.41 (1).jpeg", alt: t("church_event") },
  { id: "33", src: "/images/WhatsApp Image 2026-02-25 at 20.44.41.jpeg", alt: t("church_event") },
];

  return (
    <section className="relative section-padding bg-church-dark text-white overflow-hidden">
      {/* Optional gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FAC31C]/10 to-[#FAC31C]/5 -z-10"></div>

      <div className="page-container text-center mb-12">
        {/* Section Heading */}
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#FAC31C]">
          {t("marathon_moments_title")}
        </h2>
      </div>

      {/* Sliding gallery */}
      <div className="overflow-hidden relative">
        <div className="flex animate-slideRight gap-6">
          {pictures.concat(pictures).map((pic, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-64 h-64 rounded-xl overflow-hidden shadow-lg"
            >
              <img
                src={pic.src}
                alt={pic.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Tailwind CSS animation */}
      <style>{`
        @keyframes slideRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        .animate-slideRight {
          display: flex;
          animation: slideRight 20s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default CommunityStoriesSection;