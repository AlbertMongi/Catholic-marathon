import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface PaymentConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
}

const PaymentConfirmModal: React.FC<PaymentConfirmModalProps> = ({
  isOpen,
  onClose,
  amount,
}) => {
  const navigate = useNavigate();

  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleProceed = () => {
    navigate("/payment", { state: { amount } });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full relative animate-in fade-in zoom-in duration-300">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <X size={20} />
        </button>
        
        <div className="p-6">
          <h3 className="text-xl font-bold text-center mb-4">Payment Confirmation</h3>
          
          <div className="text-center mb-6">
            <p className="mb-4">
              You are about to be redirected to the payment page.
            </p>
            <p className="font-bold text-xl mb-2">
              Amount: {formatPrice(amount)} TZS
            </p>
            <p className="text-gray-600 text-sm">
              Card payments and mobile payments are supported:
            </p>
            <p className="text-gray-600 text-sm">
              M-PESA, TIGO PESA, AIRTEL-MONEY, HALOPESA
            </p>
          </div>
          
          <div className="flex gap-4">
            <Button 
              variant="outline" 
              className="flex-1 rounded-full"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button 
              className="flex-1 bg-church-purple hover:bg-church-purple/90 rounded-full"
              onClick={handleProceed}
            >
              Proceed
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmModal;
