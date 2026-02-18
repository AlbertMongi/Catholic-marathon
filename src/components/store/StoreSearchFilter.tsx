import React from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import GlassCard from "@/components/ui/GlassCard";

interface StoreSearchFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
}

const StoreSearchFilter: React.FC<StoreSearchFilterProps> = ({
  searchTerm,
  setSearchTerm,
  categoryFilter,
  setCategoryFilter,
}) => {
  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <GlassCard className="transform -mt-20 z-20">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="pl-10 pr-4 py-3 rounded-lg border border-gray-200 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="w-full md:w-48">
                <select
                  className="w-full p-3 rounded-lg border border-gray-200"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value="all">All Products</option>
                  <option value="apparel">Apparel</option>
                  <option value="books">Books</option>
                  <option value="bible">Bible</option>
                  <option value="accessories">Accessories</option>
                </select>
              </div>
              <Button className="bg-church-purple hover:bg-church-purple/90 rounded-full">
                Search
              </Button>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
};

export default StoreSearchFilter;
