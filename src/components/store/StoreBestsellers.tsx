import React from "react";
import { Star } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";

const StoreBestsellers: React.FC = () => {
  return (
    <section className="section-padding bg-white">
      <div className="page-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
            Bestsellers
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our most popular items loved by our community.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <GlassCard className="text-center">
            <div className="mb-4">
              <img
                src="/images/faith_journal.jpg"
                alt="Faith Journal"
                className="w-full h-60 object-cover rounded-lg"
              />
            </div>
            <div className="flex justify-center mb-2">
              <div className="flex text-church-gold">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
            </div>
            <h3 className="font-bold">Faith Journal</h3>
            <p className="text-church-purple font-medium">30,000 TZS</p>
          </GlassCard>

          <GlassCard className="text-center">
            <div className="mb-4">
              <img
                src="/images/necklace.jpeg"
                alt="Wooden Cross Necklace"
                className="w-full h-60 object-cover rounded-lg"
              />
            </div>
            <div className="flex justify-center mb-2">
              <div className="flex text-church-gold">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={i < 4 ? "currentColor" : "none"}
                  />
                ))}
              </div>
            </div>
            <h3 className="font-bold">Wooden Cross Necklace</h3>
            <p className="text-church-purple font-medium">40,000 TZS</p>
          </GlassCard>

          <GlassCard className="text-center">
            <div className="mb-4">
              <img
                src="/images/daily_devotional.jpeg"
                alt="Daily Devotional"
                className="w-full h-60 object-cover rounded-lg"
              />
            </div>
            <div className="flex justify-center mb-2">
              <div className="flex text-church-gold">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
            </div>
            <h3 className="font-bold">Daily Devotional</h3>
            <p className="text-church-purple font-medium">36,000 TZS</p>
          </GlassCard>

          <GlassCard className="text-center">
            <div className="mb-4">
              <img
                src="/images/mug.jpeg"
                alt="Pastor Tony Ministry Mug"
                className="w-full h-60 object-cover rounded-lg"
              />
            </div>
            <div className="flex justify-center mb-2">
              <div className="flex text-church-gold">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={i < 5 ? "currentColor" : "none"}
                  />
                ))}
              </div>
            </div>
            <h3 className="font-bold">Mug</h3>
            <p className="text-church-purple font-medium">20,000 TZS</p>
          </GlassCard>
        </div>
      </div>
    </section>
  );
};

export default StoreBestsellers;
