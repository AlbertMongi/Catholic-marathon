import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const backgroundImages = [
  "/images/people.png",
  "/images/marathon1.png",
  "/images/istock.jpg",
  "/images/legs.jpg",
  "/images/maratho.jpg",
];

const HeroSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 3000); // 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* INTERNAL CSS */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Inter:wght@400;500;600&display=swap');

          .hero-section { position: relative; isolation: isolate; }
          .hero-bg { position: absolute; inset: 0; background-size: cover; background-position: center; background-repeat: no-repeat; transition: opacity 1s ease-in-out; z-index: -10; }
          .hero-gradient { position: absolute; inset: 0; z-index: -5; background: linear-gradient(to bottom right, rgba(106,16,203,0.65), rgba(0,0,0,0.7)); }
          .hero-title { font-family: 'Montserrat', sans-serif; font-size: clamp(2.5rem, 5vw, 4.2rem); font-weight: 900; letter-spacing: -0.03em; line-height: 1.1; color: #ffffff; margin-bottom: 1rem; text-shadow: 0 10px 30px rgba(0,0,0,0.45); }
          .hero-subtitle { font-family: 'Inter', sans-serif; font-size: 1.25rem; font-weight: 500; color: rgba(255,255,255,0.95); max-width: 640px; margin: 0 auto 2rem auto; line-height: 1.6; }
          .hero-content { position: relative; z-index: 10; text-align: center; max-width: 64rem; margin: 0 auto; padding: 0 1rem; }
        `}
      </style>

      <section className="hero-section relative min-h-[70vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Sliding Backgrounds */}
        {backgroundImages.map((img, idx) => (
          <div
            key={idx}
            className="hero-bg"
            style={{ backgroundImage: `url("${img}")`, opacity: idx === currentIndex ? 1 : 0 }}
          />
        ))}

        <div className="hero-gradient" />

        {/* Hero Content */}
        <div className="hero-content animate-fade-in">
          <h1 className="hero-title">{t("hero_title")}</h1>

          <p className="hero-subtitle">{t("hero_subtitle")}</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              className="group bg-[#6A10CB] hover:bg-[#6A10CB]/90 text-white text-lg font-semibold rounded-full px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
            >
              <Link to="/give" className="flex items-center gap-2">
                {t("hero_register")}
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;