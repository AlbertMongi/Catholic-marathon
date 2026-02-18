import React, { useEffect, useState } from "react";
import GlassCard from "@/components/ui/GlassCard";

const MARATHON_DATE = new Date("2026-05-30T00:00:00"); // 25 March 2026

const ServiceTimes: React.FC = () => {
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
      const minutes = Math.floor(
        (diff % (1000 * 60 * 60)) / (1000 * 60)
      );

      setTimeLeft({ days, hours, minutes });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000 * 60); // update every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative bg-white py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <GlassCard className="transform -mt-20 z-20">
            <h2 className="text-2xl font-bold mb-6 gradient-text">
              Countdown to Pugu Marathon
            </h2>

            <div className="flex justify-center gap-12 md:gap-20">
              {/* Days – remains dark gray */}
              <div className="text-center">
  <p className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#FAC31C]">
                  {timeLeft.days}
                </p>
                <p className="uppercase tracking-wide text-gray-600 mt-2 text-sm md:text-base font-medium">
                  Days
                </p>
              </div>

              <div className="w-px bg-gray-300 opacity-80 self-center h-16 md:h-24"></div>

              {/* Hours – now in #FAC31C */}
              <div className="text-center">
                <p className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#FAC31C]">
                  {timeLeft.hours}
                </p>
                <p className="uppercase tracking-wide text-gray-600 mt-2 text-sm md:text-base font-medium">
                  Hours
                </p>
              </div>

              <div className="w-px bg-gray-300 opacity-80 self-center h-16 md:h-24"></div>

              {/* Minutes – now in #FAC31C */}
              <div className="text-center">
                <p className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#FAC31C]">
                  {timeLeft.minutes}
                </p>
                <p className="uppercase tracking-wide text-gray-600 mt-2 text-sm md:text-base font-medium">
                  Minutes
                </p>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Overlapping Marathon Image */}
        <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-20 z-0 pointer-events-none">
          <img
            src="/images/marathon.png"
            alt="Pugu Marathon"
            className="max-w-xs sm:max-w-md md:max-w-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default ServiceTimes;