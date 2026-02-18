import React, { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import GlassCard from "@/components/ui/GlassCard";
import { useCart } from "@/context/CartContext";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

interface StoreProductGridProps {
  filteredProducts: Product[];
}

const StoreProductGrid: React.FC<StoreProductGridProps> = ({
  filteredProducts,
}) => {
  const { addToCart } = useCart();
  const [addedToCart, setAddedToCart] = useState<Record<number, boolean>>({});
  
  const handleAddToCart = (product: Product) => {
    addToCart(product);
    
    // Show added confirmation
    setAddedToCart(prev => ({
      ...prev,
      [product.id]: true
    }));
    
    // Reset after 1.5 seconds
    setTimeout(() => {
      setAddedToCart(prev => ({
        ...prev,
        [product.id]: false
      }));
    }, 1500);
  };
  return (
    <section className="section-padding bg-gray-50">
      <div className="page-container">
        {filteredProducts.length === 0 ? (
          <GlassCard>
            <div className="text-center py-8">
              <h3 className="text-xl font-medium mb-2">No products found</h3>
              <p className="text-gray-600">
                Try adjusting your search or filter
              </p>
            </div>
          </GlassCard>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <GlassCard key={product.id} className="flex flex-col h-full">
                <div className="mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold">{product.name}</h3>
                    <span className="font-bold text-church-purple">
                      {product.price} TZS
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-sm text-church-blue font-medium uppercase">
                    {product.category}
                  </span>
                  <Button 
                    className={`rounded-full ${addedToCart[product.id] ? 'bg-green-600 hover:bg-green-700' : 'bg-church-purple hover:bg-church-purple/90'} flex items-center transition-colors`}
                    onClick={() => handleAddToCart(product)}
                    disabled={addedToCart[product.id]}
                  >
                    {addedToCart[product.id] ? (
                      <>
                        <Check size={18} className="mr-2" /> Added
                      </>
                    ) : (
                      <>
                        <ShoppingCart size={18} className="mr-2" /> Add to Cart
                      </>
                    )}
                  </Button>
                </div>
              </GlassCard>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default StoreProductGrid;
