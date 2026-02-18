import React from "react";
import {
  HeroSection,
  ServiceTimes,
  MinistriesSection,
  ExperienceSection,
  PrayerWall,
  CallToAction,
} from "@/components/homepage";

const Index: React.FC = () => {
  return (
    <>
      <HeroSection />
      <ServiceTimes />
      <MinistriesSection />
      <ExperienceSection />
      <PrayerWall />
      <CallToAction />
    </>
  );
};

export default Index;