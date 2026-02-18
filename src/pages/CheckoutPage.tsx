import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PaymentConfirmModal from "@/components/payment/PaymentConfirmModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import GlassCard from "@/components/ui/GlassCard";
import { useCart } from "@/context/CartContext";

const tanzaniaRegions = [
  "Arusha", "Dar es Salaam", "Dodoma", "Geita", "Iringa", "Kagera", 
  "Katavi", "Kigoma", "Kilimanjaro", "Lindi", "Manyara", "Mara", 
  "Mbeya", "Morogoro", "Mtwara", "Mwanza", "Njombe", "Pemba North", 
  "Pemba South", "Pwani", "Rukwa", "Ruvuma", "Shinyanga", "Simiyu", 
  "Singida", "Tabora", "Tanga", "Zanzibar Central/South", 
  "Zanzibar North", "Zanzibar Urban/West"
];

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  region: string;
  address: string;
}

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, getTotalPrice } = useCart();
  const [isFormValid, setIsFormValid] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    region: "",
    address: ""
  });

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/cart");
    }
  }, [cartItems, navigate]);

  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  useEffect(() => {
    const { firstName, lastName, email, phone, region, address } = formData;
    const isValid = 
      firstName.trim() !== "" && 
      lastName.trim() !== "" && 
      email.trim() !== "" && 
      phone.trim() !== "" && 
      region.trim() !== "" && 
      address.trim() !== "";
    
    setIsFormValid(isValid);
  }, [formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegionChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      region: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isFormValid) {
      // Open payment confirmation modal instead of alert
      setIsModalOpen(true);
    }
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-40">
      <div className="max-w-4xl mx-auto">
        {/* Payment confirmation modal */}
        <PaymentConfirmModal 
          isOpen={isModalOpen} 
          onClose={closeModal} 
          amount={getTotalPrice()} 
        />
        <h1 className="text-3xl md:text-4xl font-bold mb-8 gradient-text">Checkout</h1>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="md:col-span-1">
            <GlassCard className="sticky top-24">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between">
                    <div>
                      <span className="font-medium">{item.name}</span>
                      <span className="text-gray-600 text-sm block">x{item.quantity}</span>
                    </div>
                    <span>{formatPrice(item.price * item.quantity)} TZS</span>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-200 pt-4 mb-4">
                <div className="flex justify-between font-bold">
                  <span>Total:</span>
                  <span>{formatPrice(getTotalPrice())} TZS</span>
                </div>
              </div>
            </GlassCard>
          </div>
          
          {/* Checkout Form */}
          <div className="md:col-span-2">
            <GlassCard>
              <h2 className="text-xl font-bold mb-6">Shipping Information</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input 
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input 
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="region">Region</Label>
                  <Select 
                    value={formData.region} 
                    onValueChange={handleRegionChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a region" />
                    </SelectTrigger>
                    <SelectContent>
                      {tanzaniaRegions.map(region => (
                        <SelectItem key={region} value={region}>
                          {region}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Physical Address</Label>
                  <Input 
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="pt-4">
                  <Button 
                    type="submit" 
                    className="w-full bg-church-purple hover:bg-church-purple/90 rounded-full"
                    disabled={!isFormValid}
                  >
                    {isFormValid ? "Pay Now" : "Please Fill All Fields"}
                  </Button>
                </div>
              </form>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
