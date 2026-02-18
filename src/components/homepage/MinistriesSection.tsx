import React from "react";
import { useTranslation } from "react-i18next";
import GlassCard from "@/components/ui/GlassCard";
import { HeartHandshake, BookOpen, Mic } from "lucide-react";

const PuguMarathonFeaturesSection: React.FC = () => {
  const { t } = useTranslation();

  const marathonFeatures = [
    {
      title: t("feature_register"),
      description: t("feature_register_desc"),
      icon: <HeartHandshake className="h-10 w-10 text-[#6A10CB]" />,
    },
    {
      title: t("feature_tips"),
      description: t("feature_tips_desc"),
      icon: <BookOpen className="h-10 w-10 text-[#6A10CB]" />,
    },
    {
      title: t("feature_media"),
      description: t("feature_media_desc"),
      icon: <Mic className="h-10 w-10 text-[#6A10CB]" />,
    },
  ];

  return (
    <section
      className="section-padding bg-gray-100"
      style={{
        backgroundImage: "url('/images/marathon_bg.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="page-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
            {t("features_section_title")}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t("features_section_desc")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {marathonFeatures.map((feature, index) => (
            <div
              key={index}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <GlassCard className="h-full flex flex-col justify-between p-6">
                <div>
                  <div className="mb-4 flex justify-center">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-2 text-center">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-6 text-center">
                    {feature.description}
                  </p>
                </div>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PuguMarathonFeaturesSection;