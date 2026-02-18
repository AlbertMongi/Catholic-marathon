import React from "react";

const StoreHero: React.FC = () => {
  return (
    <section className="hero-section" style={{ minHeight: "50vh" }}>
      <div
        className="hero-bg"
        style={{ backgroundImage: 'url("/images/store_bg.jpeg")' }}
      ></div>
      <div className="hero-gradient"></div>
      <div className="hero-content">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Sadaka Plus Store
        </h1>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Discover resources to help you grow in your faith and support our
          ministry.
        </p>
      </div>
    </section>
  );
};

export default StoreHero;
