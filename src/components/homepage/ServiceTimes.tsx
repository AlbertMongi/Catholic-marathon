import React, { useEffect, useState } from "react";
import GlassCard from "@/components/ui/GlassCard";
import { useTranslation } from "react-i18next";

const MARATHON_DATE = new Date("2026-05-30T00:00:00"); // 30 May 2026

const ServiceTimes: React.FC = () => {
  const { t } = useTranslation();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const diff = MARATHON_DATE.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      setTimeLeft({ days, hours, minutes });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000 * 60);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative bg-white py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <GlassCard className="transform -mt-20 z-20">
            <h2 className="text-xl font-bold mb-6 gradient-text">
              {t("countdown_title")}
            </h2>

            <div className="flex justify-center gap-8 md:gap-12">
              {/* Days */}
              <div className="text-center">
                <p className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#FAC31C]">
                  {timeLeft.days}
                </p>
                <p className="uppercase tracking-wide text-gray-600 mt-2 text-xs md:text-sm font-medium">
                  {t("days")}
                </p>
              </div>

              <div className="w-px bg-gray-300 opacity-80 self-center h-12 md:h-16"></div>

              {/* Hours */}
              <div className="text-center">
                <p className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#FAC31C]">
                  {timeLeft.hours}
                </p>
                <p className="uppercase tracking-wide text-gray-600 mt-2 text-xs md:text-sm font-medium">
                  {t("hours")}
                </p>
              </div>

              <div className="w-px bg-gray-300 opacity-80 self-center h-12 md:h-16"></div>

              {/* Minutes */}
              <div className="text-center">
                <p className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#FAC31C]">
                  {timeLeft.minutes}
                </p>
                <p className="uppercase tracking-wide text-gray-600 mt-2 text-xs md:text-sm font-medium">
                  {t("minutes")}
                </p>
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