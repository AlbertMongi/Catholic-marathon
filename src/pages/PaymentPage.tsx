import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import GlassCard from "@/components/ui/GlassCard";
import { CreditCard, Smartphone } from "lucide-react";
import { useCart } from "@/context/CartContext";

// Supported countries with their country codes
const countries = [
  { code: "tz", name: "Tanzania", phoneCode: "255" },
  { code: "ke", name: "Kenya", phoneCode: "254" },
  { code: "mw", name: "Malawi", phoneCode: "265" },
  { code: "zm", name: "Zambia", phoneCode: "260" }
];

// Mobile payment operators by country
const mobileOperatorsByCountry = {
  tz: [
    { id: "mpesa", name: "M-PESA", logo: "🟠" },
    { id: "tigopesa", name: "TIGO PESA", logo: "🔵" },
    { id: "airtelmoney", name: "AIRTEL MONEY", logo: "🔴" },
    { id: "halopesa", name: "HALOPESA", logo: "🟢" }
  ],
  ke: [
    { id: "mpesa", name: "M-PESA", logo: "🟠" },
    { id: "airtelke", name: "AIRTEL MONEY", logo: "🔴" }
  ],
  mw: [
    { id: "airtelmw", name: "AIRTEL MONEY", logo: "🔴" },
    { id: "mpesa", name: "M-PESA", logo: "🔵" }
  ],
  zm: [
    { id: "mtnzm", name: "MTN MONEY", logo: "🟡" },
    { id: "airtelzm", name: "AIRTEL MONEY", logo: "🔴" },
  ]
};

const PaymentPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  
  // Get amount from location state or redirect back to checkout
  const amount = location.state?.amount;
  
  useEffect(() => {
    if (!amount) {
      navigate("/checkout");
    }
  }, [amount, navigate]);
  
  const [paymentMethod, setPaymentMethod] = useState<"card" | "mobile">("mobile");
  const [selectedCountry, setSelectedCountry] = useState<string>("tz"); // Tanzania as default
  const [selectedOperator, setSelectedOperator] = useState<string>("mpesa");
  const [phoneNumber, setPhoneNumber] = useState<string>("+255");
  const [isPhoneValid, setIsPhoneValid] = useState<boolean>(false);
  
  // Get current country code
  const currentCountry = countries.find(c => c.code === selectedCountry);
  const countryPhoneCode = currentCountry?.phoneCode || "255";
  
  // Get mobile operators for the selected country
  const mobileOperators = mobileOperatorsByCountry[selectedCountry as keyof typeof mobileOperatorsByCountry] || [];
  
  const formatPrice = (price: number) => {
    return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") || "0";
  };
  
  // Update selected operator when country changes
  useEffect(() => {
    if (mobileOperators.length > 0) {
      setSelectedOperator(mobileOperators[0].id);
    }
  }, [selectedCountry]);
  
  // Update phone number prefix when country changes
  useEffect(() => {
    setPhoneNumber(`+${countryPhoneCode}`);
  }, [countryPhoneCode]);
  
  // Validate phone number format based on country code
  useEffect(() => {
    if (!phoneNumber) {
      setIsPhoneValid(false);
      return;
    }
    
    // Check if starts with + and country code followed by 9 digits
    const regex = new RegExp(`^\\+${countryPhoneCode}[0-9]{9}$`);
    setIsPhoneValid(regex.test(phoneNumber));
  }, [phoneNumber, countryPhoneCode]);
  
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    
    // Ensure the input starts with +
    if (!value.startsWith('+')) {
      value = '+' + value.replace(/[^0-9]/g, "");
    }
    
    // Only allow numbers after the + sign
    const parts = value.split('+');
    if (parts.length > 1) {
      value = '+' + parts[1].replace(/[^0-9]/g, "");
    }
    
    setPhoneNumber(value);
  };

  const handlePayment = () => {
    // Simulate successful payment
    alert("Payment successful! Thank you for your purchase.");
    clearCart();
    navigate("/");
  };

  return (
    <div className="container mx-auto px-4 py-40">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 gradient-text">Payment</h1>
        
        <GlassCard className="mb-6">
          <div className="flex justify-between items-center mb-6">
            <span className="text-lg">Total Amount:</span>
            <span className="text-2xl font-bold">{formatPrice(amount)} TZS</span>
          </div>
          
          <div className="mb-6">
            <Label className="text-lg mb-3 block">Select Payment Method</Label>
            <div className="grid grid-cols-2 gap-4">
              <Button
                type="button"
                variant={paymentMethod === "mobile" ? "default" : "outline"}
                className={`h-20 flex-col gap-2 ${
                  paymentMethod === "mobile" ? "bg-church-purple hover:bg-church-purple/90" : ""
                } rounded-lg`}
                onClick={() => setPaymentMethod("mobile")}
              >
                <Smartphone size={24} />
                <span>Mobile Money</span>
              </Button>
              
              <Button
                type="button"
                variant={paymentMethod === "card" ? "default" : "outline"}
                className={`h-20 flex-col gap-2 ${
                  paymentMethod === "card" ? "bg-church-purple hover:bg-church-purple/90" : ""
                } rounded-lg`}
                onClick={() => setPaymentMethod("card")}
              >
                <CreditCard size={24} />
                <span>Card Payment</span>
              </Button>
            </div>
          </div>
          
          {paymentMethod === "mobile" ? (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="country">Select Country</Label>
                <Select 
                  value={selectedCountry} 
                  onValueChange={(value) => setSelectedCountry(value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map(country => (
                      <SelectItem key={country.code} value={country.code}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="mb-3 block">Select Mobile Operator</Label>
                {mobileOperators.length > 0 ? (
                  <RadioGroup 
                    value={selectedOperator} 
                    onValueChange={setSelectedOperator}
                    className="grid grid-cols-2 gap-4"
                  >
                    {mobileOperators.map(operator => (
                      <div key={operator.id} className="flex items-center space-x-2">
                        <RadioGroupItem value={operator.id} id={operator.id} />
                        <Label htmlFor={operator.id} className="flex items-center">
                          <span className="mr-2">{operator.logo}</span>
                          {operator.name}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                ) : (
                  <p className="text-gray-500">No operators available for this country</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  placeholder={`+${countryPhoneCode}XXXXXXXXX`}
                  className={`${phoneNumber && !isPhoneValid ? "border-red-500" : ""}`}
                />
                {phoneNumber && !isPhoneValid && (
                  <p className="text-red-500 text-sm">
                    Phone number must start with +{countryPhoneCode} followed by 9 digits
                  </p>
                )}
              </div>
              
              <Button
                className="w-full bg-church-purple hover:bg-church-purple/90 rounded-full"
                onClick={handlePayment}
                disabled={!isPhoneValid}
              >
                Pay with {mobileOperators.find(op => op.id === selectedOperator)?.name}
              </Button>
              
              {/* Payment Processor Branding */}
              <div className="flex items-center justify-center mt-4 text-gray-500 text-sm">
                <span className="mr-2">Powered by</span>
                <img 
                  src="/images/evpay-logo.png" 
                  alt="EvPay" 
                  className="h-6"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <p className="text-center py-4">
                You will be redirected to our secure card payment processor.
              </p>
              
              <Button
                className="w-full bg-church-purple hover:bg-church-purple/90 rounded-full"
                onClick={handlePayment}
              >
                Proceed to Card Payment
              </Button>
              
              {/* Payment Processor Branding */}
              <div className="flex items-center justify-center mt-4 text-gray-500 text-sm">
                <span className="mr-2">Powered by</span>
                <img 
                  src="/images/evpay-logo.png" 
                  alt="EvPay" 
                  className="h-6"
                />
              </div>
            </div>
          )}
        </GlassCard>
        
        <div className="text-center">
          <Button
            variant="ghost"
            className="text-church-purple"
            onClick={() => navigate(-1)}
          >
            Back to Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;