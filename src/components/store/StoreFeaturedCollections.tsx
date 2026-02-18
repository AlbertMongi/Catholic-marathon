import React from "react";
import { Link } from "react-router-dom";
import GlassCard from "@/components/ui/GlassCard";

const StoreFeaturedCollections: React.FC = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-church-purple/10 to-church-blue/10 -z-10"></div>
      <div className="page-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
            Featured Collections
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our curated collections for specific needs and interests.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
        
        </div>
      </div>
    </section>
  );
};

export default StoreFeaturedCollections;
