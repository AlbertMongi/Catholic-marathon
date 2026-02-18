import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import GlassCard from "@/components/ui/GlassCard";
import { useCart } from "@/context/CartContext";

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice } = useCart();
  
  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="container mx-auto px-4 pb-12 pt-40">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 gradient-text">Your Cart</h1>
        
        {cartItems.length === 0 ? (
          <GlassCard className="text-center py-12">
            <h2 className="text-xl font-medium mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Looks like you haven't added any items to your cart yet.</p>
            <Button asChild className="bg-church-purple hover:bg-church-purple/90 rounded-full">
              <Link to="/store">Continue Shopping</Link>
            </Button>
          </GlassCard>
        ) : (
          <>
            <div className="grid gap-6 mb-8">
              {cartItems.map((item) => (
                <GlassCard key={item.id} className="flex flex-col md:flex-row items-center gap-4 p-4">
                  <div className="w-24 h-24 flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  
                  <div className="flex-grow">
                    <h3 className="font-bold text-lg">{item.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{item.category}</p>
                    <p className="font-medium text-church-purple">{formatPrice(item.price)} TZS</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button 
                      className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      aria-label="Decrease quantity"
                    >
                      <Minus size={16} />
                    </button>
                    
                    <span className="w-10 text-center font-medium">{item.quantity}</span>
                    
                    <button 
                      className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-bold mb-2">{formatPrice(item.price * item.quantity)} TZS</p>
                    <button 
                      className="text-red-500 hover:text-red-700 transition-colors flex items-center gap-1 text-sm"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 size={16} />
                      <span>Remove</span>
                    </button>
                  </div>
                </GlassCard>
              ))}
            </div>
            
            <div className="flex flex-col md:flex-row justify-between gap-6">
              <Link 
                to="/store" 
                className="flex items-center gap-2 text-church-purple hover:text-church-purple/80 transition-colors"
              >
                <ArrowLeft size={16} />
                <span>Continue Shopping</span>
              </Link>
              
              <GlassCard className="md:w-80">
                <div className="flex justify-between mb-4">
                  <span className="font-medium">Subtotal:</span>
                  <span className="font-bold">{formatPrice(getTotalPrice())} TZS</span>
                </div>
                <div className="flex justify-between mb-6">
                  <span className="font-medium">Shipping:</span>
                  <span>Calculated at checkout</span>
                </div>
                <Button 
                  className="w-full bg-church-purple hover:bg-church-purple/90 rounded-full"
                  onClick={() => navigate('/checkout')}
                >
                  Proceed to Checkout
                </Button>
              </GlassCard>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
