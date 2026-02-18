import React from "react";
import GlassCard from "@/components/ui/GlassCard";
import { Truck, RefreshCw, Heart } from "lucide-react";

const StorePurchaseInfo: React.FC = () => {
  return (
    <section className="section-padding bg-gray-50">
      <div className="page-container">
        <div className="grid md:grid-cols-3 gap-6">
          <GlassCard className="text-center">
            <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-church-purple/10">
              <Truck className="h-8 w-8 text-church-purple" />
            </div>
            <h3 className="text-xl font-bold mb-2">Free Shipping</h3>
            <p className="text-gray-600">
              Free shipping on all orders over 100,000 within the United States.
            </p>
          </GlassCard>

          <GlassCard className="text-center">
            <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-church-purple/10">
              <RefreshCw className="h-8 w-8 text-church-purple" />
            </div>
            <h3 className="text-xl font-bold mb-2">Easy Returns</h3>
            <p className="text-gray-600">
              30-day return policy for most items purchased from our store.
            </p>
          </GlassCard>

          <GlassCard className="text-center">
            <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-church-purple/10">
              <Heart className="h-8 w-8 text-church-purple" />
            </div>
            <h3 className="text-xl font-bold mb-2">Support Our Ministry</h3>
            <p className="text-gray-600">
              All proceeds from the store help fund our church's ministries
              and outreach.
            </p>
          </GlassCard>
        </div>
      </div>
    </section>
  );
};

export default StorePurchaseInfo;
