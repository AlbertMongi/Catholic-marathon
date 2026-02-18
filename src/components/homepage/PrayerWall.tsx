import React from "react";

// Picture interface
interface Picture {
  id: string;
  src: string;
  alt: string;
}

const CommunityStoriesSection: React.FC = () => {
  const pictures: Picture[] = [
    { id: "1", src: "/images/people.png", alt: "Church Event" },
    { id: "2", src: "/images/people1.png", alt: "Volunteer Activity" },
    { id: "3", src: "/images/people.png", alt: "Charity Contribution" },
    { id: "4", src: "/images/people1.png", alt: "Youth Gathering" },
    { id: "5", src: "/images/people.png", alt: "Prayer Session" },
    { id: "6", src: "/images/people1.png", alt: "Community Workshop" },
  ];

  return (
    <section className="relative section-padding bg-church-dark text-white overflow-hidden">
     {/* Optional gradient overlay — updated to purple */}
<div className="absolute inset-0 bg-gradient-to-br from-[#FAC31C]/10 to-[#FAC31C]/5 -z-10"></div>

<div className="page-container text-center mb-12">
  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#FAC31C]">
    Pugu Marathon Moments & Highlights
  </h2>
</div>

      {/* Sliding gallery */}
      <div className="overflow-hidden relative">
        <div className="flex animate-slideRight gap-6">
          {pictures.concat(pictures).map((pic, index) => (
            <div key={index} className="flex-shrink-0 w-64 h-64 rounded-xl overflow-hidden shadow-lg">
              <img
                src={pic.src}
                alt={pic.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Tailwind CSS animation */}
      <style>{`
        @keyframes slideRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        .animate-slideRight {
          display: flex;
          animation: slideRight 20s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default CommunityStoriesSection;