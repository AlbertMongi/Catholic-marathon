import React from "react";
import { useTranslation } from "react-i18next";

const ExperienceSection: React.FC = () => {
  const { t } = useTranslation(); // ✅ Move useTranslation inside component

  return (
    <section
      className="relative overflow-hidden flex flex-col items-center justify-center"
      style={{
        backgroundImage: "url('/images/way_experience.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "400px",
        padding: "60px 20px",
      }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#E18731]/10 to-[#E18731]/5 -z-10"></div>

      <div className="text-center w-full max-w-4xl">
        {/* Section Heading */}
        <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">
          {t("watch_marathon_title")}
        </h2>

        {/* YouTube Video */}
        <div className="w-full aspect-video">
          <iframe
            className="w-full h-full rounded-xl shadow-lg"
            src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;