import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import GlassCard from "@/components/ui/GlassCard";
import { Heart, Shield, Star, BookOpen } from "lucide-react";
import { useTranslation } from "react-i18next";

const AboutPage: React.FC = () => {
  const { t } = useTranslation();

  const values = [
    {
      title: t("community_spirit_title"),
      content: t("community_spirit_content"),
      icon: <Heart className="h-8 w-8 text-[#6A10CB]" />,
    },
    {
      title: t("safety_first_title"),
      content: t("safety_first_content"),
      icon: <Shield className="h-8 w-8 text-[#6A10CB]" />,
    },
    {
      title: t("inspiration_title"),
      content: t("inspiration_content"),
      icon: <Star className="h-8 w-8 text-[#6A10CB]" />,
    },
    {
      title: t("integrity_title"),
      content: t("integrity_content"),
      icon: <BookOpen className="h-8 w-8 text-[#6A10CB]" />,
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section
        className="hero-section relative flex items-center justify-center"
        style={{ minHeight: "500px", padding: "60px 20px" }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center -z-10"
          style={{ backgroundImage: 'url("/images/people.png")' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/20 -z-10"></div>
        <div className="hero-content text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            {t("about_pugu_marathon_title")}
          </h1>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-white">
        <div className="page-container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">
                {t("our_purpose_title")}
              </h2>
              <p className="text-lg text-gray-700 mb-10 leading-relaxed">
                {t("our_purpose_content")}
              </p>

              <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">
                {t("our_mission_title")}
              </h2>
              <p className="text-lg text-gray-700 mb-10 leading-relaxed">
                {t("our_mission_content")}
              </p>

              <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">
                {t("our_vision_title")}
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                {t("our_vision_content")}
              </p>
            </div>

            <div className="flex justify-center">
              <img
                src="/images/map.png"
                alt={t("pugu_marathon_route")}
                className="w-full h-80 md:h-96 lg:h-[28rem] object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding bg-gray-40">
        <div className="page-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
              {t("our_core_values_title")}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t("our_core_values_content")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <GlassCard key={index} className="flex items-start">
                <div className="mr-4 mt-1">{value.icon}</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.content}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;