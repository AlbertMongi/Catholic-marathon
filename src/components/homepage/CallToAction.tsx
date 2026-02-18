import React from "react";

const SponsorsSection: React.FC = () => {
  // List of sponsor logos (replace with your actual images)
  const sponsors = [
    "https://download.logo.wine/logo/Vodacom/Vodacom-Logo.wine.png",
    "https://download.logo.wine/logo/Vodacom/Vodacom-Logo.wine.png",
    "https://download.logo.wine/logo/Vodacom/Vodacom-Logo.wine.png",
    "https://download.logo.wine/logo/Vodacom/Vodacom-Logo.wine.png",
    "https://download.logo.wine/logo/Vodacom/Vodacom-Logo.wine.png",
    "https://download.logo.wine/logo/Vodacom/Vodacom-Logo.wine.png",
    
  ];

  return (
    <section className="section-padding bg-gradient-church text-white">
    <div className="page-container text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-[#FAC31C]">
          Our Proud Sponsors
        </h2>
        {/* <p className="text-white/90 max-w-2xl mx-auto mb-8">
          The Pugu Marathon is made possible thanks to our amazing sponsors who support the runners and the community.
        </p> */}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 items-center justify-center">
          {sponsors.map((logo, index) => (
            <div key={index} className="flex items-center justify-center">
              <img
                src={logo}
                alt={`Sponsor ${index + 1}`}
                className="max-h-16 object-contain filter brightness-100 hover:brightness-125 transition duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SponsorsSection;