import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import GlassCard from "@/components/ui/GlassCard";
import { Calendar } from "lucide-react";

const StoreNewArrivalsBanner: React.FC = () => {
  return (
    <section className="section-padding bg-church-dark text-white">
      <div className="page-container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-church-gold">
              New Arrivals
            </h2>
            <p className="text-white/80 mb-6">
              Check out our latest products, including our new "Faith & Hope"
              book series and worship album "Eternal Pastor Tony".
            </p>
            <div className="flex items-center gap-4 mb-6">
              <Calendar size={20} className="text-church-gold" />
              <span>Just released: April 2025</span>
            </div>
            <Button
              asChild
              className="bg-church-gold hover:bg-church-gold/90 text-church-dark rounded-full"
            >
              <Link to="#">Shop New Arrivals</Link>
            </Button>
          </div>

          <div>
            <GlassCard variant="dark" className="overflow-hidden">
              <img
                src="/images/new_arrival.jpeg"
                alt="New Arrivals"
                className="w-full h-64 object-cover rounded-lg"
              />
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoreNewArrivalsBanner;
