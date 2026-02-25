import React from "react";
import { useTranslation } from "react-i18next";
import GlassCard from "@/components/ui/GlassCard";
import { HeartHandshake, Heart, BookOpen, Leaf, Users } from "lucide-react";

const PuguMarathonFeaturesSection: React.FC = () => {
  const { t } = useTranslation();

  const communityFeatures = [
    {
      title: t("health_title"),
      description: t(
        "health_desc"
        
      ),
      icon: <Heart className="h-10 w-10 text-[#6A10CB]" />,
    },
    {
      title: t("education_title"),
      description: t(
        "education_desc"
      ),
      icon: <BookOpen className="h-10 w-10 text-[#6A10CB]" />,
    },
    {
      title: t("environment_title"),
      description: t(
        "environment_desc"
       
      ),
      icon: <Leaf className="h-10 w-10 text-[#6A10CB]" />,
    },
    {
      title: t("youth_empowerment_title", "Youth Empowerment"),
      description: t(
        "youth_empowerment_desc"
      ),
      icon: <Users className="h-10 w-10 text-[#6A10CB]" />,
    },
    {
      title: t("feature_register"),
      description: t("feature_register_desc"),
      icon: <HeartHandshake className="h-10 w-10 text-[#6A10CB]" />,
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
            {t("community_focus_title")}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t("community_focus_desc")}
          </p>
        </div>

        {/* TOP 3 */}
        <div className="grid gap-6 md:grid-cols-3 mb-6">
          {communityFeatures.slice(0, 3).map((feature, index) => (
            <GlassCard key={index} className="h-full flex flex-col p-6">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* CENTERED 2 BELOW */}
        <div className="flex justify-center">
          <div className="grid gap-6 md:grid-cols-2 max-w-4xl w-full">
            {communityFeatures.slice(3, 5).map((feature, index) => (
              <GlassCard key={index} className="h-full flex flex-col p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PuguMarathonFeaturesSection;