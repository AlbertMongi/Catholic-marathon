import React from "react";
import { useTranslation } from "react-i18next";

const SponsorsSection: React.FC = () => {
  const { t } = useTranslation();

  // List of sponsor logos
  const sponsors = [
    "https://download.logo.wine/logo/Vodacom/Vodacom-Logo.wine.png",
    "https://download.logo.wine/logo/Vodacom/Vodacom-Logo.wine.png",
    "https://download.logo.wine/logo/Vodacom/Vodacom-Logo.wine.png",
    "https://download.logo.wine/logo/Vodacom/Vodacom-Logo.wine.png",
    "https://download.logo.wine/logo/Vodacom/Vodacom-Logo.wine.png",
    "https://download.logo.wine/logo/Vodacom/Vodacom-Logo.wine.png",
  ];

  return (
    <section className="section-padding bg-white text-gray-800">
      <div className="page-container text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-[#FAC31C]">
          {t("our_proud_sponsors")}
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 items-center justify-center">
          {sponsors.map((logo, index) => (
            <div key={index} className="flex items-center justify-center">
              <img
                src={logo}
                alt={t("sponsor_alt", { number: index + 1 })}
                className="max-h-16 object-contain filter brightness-100 hover:brightness-125 transition duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SponsorsSection;