import React from "react";
import { useTranslation } from "react-i18next";

const ExperienceSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section
      className="relative overflow-hidden py-12 px-4"
      style={{
        backgroundImage: "url('/images/way_experience.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#E18731]/30 to-[#E18731]/20"></div>

      <div className="relative max-w-3xl mx-auto text-center">
        {/* Section Heading */}
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-[#FAC31C]">
          {t("watch_marathon_title")}
        </h2>

        {/* Centered Video */}
        <div className="relative w-full pb-[50%] rounded-xl shadow-lg overflow-hidden">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/lWpDkMreI7g"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;