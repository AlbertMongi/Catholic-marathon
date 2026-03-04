import React, { useEffect, useState } from "react";
import GlassCard from "@/components/ui/GlassCard";
import { useTranslation } from "react-i18next";

const MARATHON_DATE = new Date("2026-05-30T00:00:00"); // 30 May 2026

const ServiceTimes: React.FC = () => {
  const { t } = useTranslation();

  const [daysLeft, setDaysLeft] = useState(0);

  useEffect(() => {
    const calculateDaysLeft = () => {
      const now = new Date();
      const diff = MARATHON_DATE.getTime() - now.getTime();

      if (diff <= 0) {
        setDaysLeft(0);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      setDaysLeft(days);
    };

    calculateDaysLeft();
    const interval = setInterval(calculateDaysLeft, 1000 * 60 * 60); // update every hour

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative bg-white py-24">
 <div className="container mx-auto px-4">
  <div className="max-w-4xl mx-auto text-center relative z-10">
    <GlassCard className="transform -mt-20 z-20">
      <h2 className="text-3xl md:text-4xl lg:text-3xl font-bold mb-6 gradient-text">
        {t("countdown_title")}
      </h2>

            {/* Days Only */}
            <div className="flex justify-center">
              <div className="text-center">
                <p className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#FAC31C]">
                  {daysLeft}
                </p>
                {/* <p className="uppercase tracking-wide text-gray-600 mt-2 text-sm md:text-base font-medium">
                  {t("days")}
                </p> */}
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Marathon Image */}
        <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-20 z-0 pointer-events-none">
          <img
            src="/images/marathon.png"
            alt={t("countdown_title")}
            className="max-w-xs sm:max-w-sm md:max-w-md"
          />
        </div>
      </div>
    </section>
  );
};

export default ServiceTimes;