import React from "react";
import { useTranslation } from "react-i18next";

const ExperienceSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section
      className="relative overflow-hidden py-16 px-6"
      style={{
        backgroundImage: "url('/images/way_experience.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#E18731]/20 to-[#E18731]/10"></div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#FAC31C]">
          {t("watch_marathon_title")}
        </h2>

        {/* Content Wrapper */}
        <div className="flex flex-col md:flex-row items-center gap-10">
          
          {/* LEFT SIDE - Image */}
          <div className="w-full md:w-1/2">
            <img
              src="/images/map.png"
              alt="Marathon Experience"
              className="w-full h-auto rounded-2xl shadow-2xl object-cover"
            />
          </div>

          {/* RIGHT SIDE - Video */}
          <div className="w-full md:w-1/2">
            <div className="relative w-full pb-[56.25%] rounded-2xl shadow-2xl overflow-hidden">
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

        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;