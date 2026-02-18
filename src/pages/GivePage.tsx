// import React, { useState } from "react";
// import { Button } from "@/components/ui/button";
// import GlassCard from "@/components/ui/GlassCard";
// import {
//   Heart,
//   CreditCard,
//   Smartphone,
//   Building,
//   ChevronDown,
// } from "lucide-react";

// // IMPORTANT: Replace with your actual API base URL (same as in mobile app)
// const BASE_URL = "https://development.sadakaplus.co.tz/api"; // ← CHANGE THIS

// const faqs = [
//   {
//     question: "What is Sadaka Plus?",
//     answer:
//       "Sadaka Plus is a secure digital giving platform that allows users to make donations easily and transparently. It is designed to support churches, ministries, charities and community initiatives through simple, fast and reliable online giving.",
//   },
//   {
//     question: "Is Sadaka Plus safe and secure?",
//     answer:
//       "Yes. Sadaka Plus uses trusted payment infrastructure with bank-level security and encryption. Your personal and financial information is protected and sensitive payment details are never stored on our servers.",
//   },
//   {
//     question: "What payment methods are supported?",
//     answer:
//       "Sadaka Plus supports mobile money services (HaloPesa, TigoPesa, Airtel Money), bank transfers and debit or credit cards.",
//   },
//   {
//     question: "Can I choose where my donation goes?",
//     answer:
//       "Absolutely. Sadaka Plus allows you to select specific causes, programs or projects to support so your giving aligns with your purpose.",
//   },
//   {
//     question: "Will I receive confirmation after donating?",
//     answer:
//       "Yes. After every successful donation, you receive an instant confirmation and receipt, and can track your giving history.",
//   },
//   {
//     question: "Who can use Sadaka Plus?",
//     answer:
//       "Sadaka Plus is designed for individuals, churches, ministries, charities and organizations looking for a modern digital giving solution.",
//   },
// ];

// const GivePage: React.FC = () => {
//   const [isAnonymous, setIsAnonymous] = useState(false);
//   const [selectedAmount, setSelectedAmount] = useState("");
//   const [customAmount, setCustomAmount] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [frequency, setFrequency] = useState("One time");
//   const [paymentMethod, setPaymentMethod] = useState<"mobile" | "bank" | "card" | "">("");
//   const [cardNumber, setCardNumber] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [openFAQ, setOpenFAQ] = useState<number | null>(null);

//   const amount = customAmount || selectedAmount;
//   const rawAmount = amount ? Number(amount.replace(/\D/g, "")) : 0;

//   const toggleFAQ = (index: number) => {
//     setOpenFAQ(openFAQ === index ? null : index);
//   };

//   const formatCardNumber = (value: string) => {
//     const cleaned = value.replace(/\D/g, "");
//     const chunks = cleaned.match(/.{1,4}/g) || [];
//     return chunks.join(" ");
//   };

//   const showMessage = (msg: string, isError = true) => {
//     alert(msg); // ← Replace with react-hot-toast / sonner / shadcn toast later
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!amount || rawAmount < 100) {
//       showMessage("Please enter a valid amount (minimum 100 TZS)");
//       return;
//     }

//     if (!paymentMethod) {
//       showMessage("Please select a payment method");
//       return;
//     }

//     if (paymentMethod === "mobile" && !phoneNumber.trim()) {
//       showMessage("Phone number is required for Mobile Money");
//       return;
//     }

//     if (paymentMethod === "card" && !cardNumber.trim()) {
//       showMessage("Card number is required for Card payment");
//       return;
//     }

//     // Bank transfer not implemented in the referenced API
//     if (paymentMethod === "bank") {
//       showMessage(
//         "Bank transfer is not yet supported. Please use Mobile Money or Card payment.",
//         true
//       );
//       return;
//     }

//     setLoading(true);

//     try {
//       let paymentUrl: string | null = null;

//       if (paymentMethod === "mobile") {
//         const payload = {
//           offerType: "General Offering",           // Change if you add offering selector
//           amount: rawAmount,
//           phoneNo: phoneNumber.trim(),
//           purpose: frequency,
//           paymentMethod: "Mobile money",           // or "HaloPesa", "TigoPesa", etc. if you add selector
//           communityId: "general",                  // ← placeholder; replace with real community ID if available
//           cardNumber: "",                          // not used for mobile money
//         };

//         const res = await fetch(`${BASE_URL}/payments/mobile`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             // Uncomment and add token if your web app uses the same auth as mobile
//             // "Authorization": `Bearer ${localStorage.getItem("userToken") || ""}`,
//           },
//           body: JSON.stringify(payload),
//         });

//         const data = await res.json();

//         if (res.ok && data.success && data.code === 201 && data.data?.paymentLink) {
//           paymentUrl = data.data.paymentLink;
//           showMessage("Redirecting to payment page...", false);
//         } else {
//           showMessage(data.message || "Failed to initiate mobile payment");
//           setLoading(false);
//           return;
//         }
//       } else if (paymentMethod === "card") {
//         const payload = {
//           amount: rawAmount,
//           payTo: "general",                        // ← placeholder; use community/org ID if available
//           transactionDetails: "General Offering",
//           email: "donor@example.com",              // ← ideally collect real email or use logged-in user
//           communityId: "general",
//           currency: "TZS",
//           countryCode: "TZ",
//           postalCode: "",
//           address: "Dar es Salaam, Tanzania",
//           cardNumber: cardNumber.replace(/\s/g, ""),
//         };

//         const res = await fetch(`${BASE_URL}/payments/card`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             // "Authorization": `Bearer ${localStorage.getItem("userToken") || ""}`,
//           },
//           body: JSON.stringify(payload),
//         });

//         const data = await res.json();

//         if (res.ok && data.success && data.data?.paymentUrl) {
//           paymentUrl = data.data.paymentUrl;
//           showMessage("Redirecting to card payment page...", false);
//         } else {
//           showMessage(data.message || "Card payment initiation failed");
//           setLoading(false);
//           return;
//         }
//       }

//       // Success → redirect to payment URL
//       if (paymentUrl) {
//         window.open(paymentUrl, "_blank", "noopener,noreferrer");
//         // Reset form
//         setSelectedAmount("");
//         setCustomAmount("");
//         setPhoneNumber("");
//         setCardNumber("");
//         setPaymentMethod("");
//         setFrequency("One time");
//       }
//     } catch (err) {
//       console.error("Payment error:", err);
//       showMessage("Network error. Please check your connection and try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       {/* HERO SECTION */}
//       <section className="hero-section">
//         <div
//           className="hero-bg"
//           style={{ backgroundImage: 'url("images/sadaka.JPEG")' }}
//         />
//         <div className="hero-gradient" />
//         <div className="hero-content">
//           <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
//             Give to your community
//           </h1>
//           <p className="text-xl text-white/100 max-w-2xl mx-auto">
//             Your generosity helps spread God's love and make a difference in your community.
//           </p>
//         </div>
//       </section>

//       {/* GIVE ONLINE FORM */}
//       <section className="py-10 md:py-12 bg-white">
//         <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-8">
//             <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-3">
//               Give Online
//             </h2>
//             <p className="text-gray-600 max-w-xl mx-auto text-base">
//               Make a secure donation using mobile money, or credit/debit card.
//             </p>
//           </div>

//           <GlassCard className="p-6 md:p-8 shadow-lg">
//             <form onSubmit={handleSubmit} className="space-y-6">
//               {/* Anonymous toggle */}
//               <label className="flex items-center gap-3 cursor-pointer">
//                 <input
//                   type="checkbox"
//                   checked={isAnonymous}
//                   onChange={(e) => setIsAnonymous(e.target.checked)}
//                   className="h-5 w-5 rounded border-gray-300 text-church-purple focus:ring-church-purple"
//                 />
//                 <span className="text-gray-700 font-medium">Give anonymously</span>
//               </label>

//               {/* Name fields - only when not anonymous */}
//               {!isAnonymous && (
//                 <div className="grid md:grid-cols-2 gap-4">
//                   <input
//                     className="input w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-church-purple focus:border-church-purple outline-none transition-all"
//                     placeholder="First Name (optional)"
//                   />
//                   <input
//                     className="input w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-church-purple focus:border-church-purple outline-none transition-all"
//                     placeholder="Last Name (optional)"
//                   />
//                 </div>
//               )}

//               {/* Phone Number */}
//               <div>
//                 <label className="block text-gray-700 font-medium mb-2">
//                   Phone Number {paymentMethod === "mobile" ? "*" : ""}
//                 </label>
//                 <input
//                   className="input w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-church-purple focus:border-church-purple outline-none transition-all"
//                   placeholder="e.g. 0712345678"
//                   value={phoneNumber}
//                   onChange={(e) => setPhoneNumber(e.target.value)}
//                   required={paymentMethod === "mobile"}
//                 />
//               </div>

//               {/* Frequency */}
//               <div>
//                 <label className="block text-gray-700 font-medium mb-2">
//                   Frequency
//                 </label>
//                 <div className="flex flex-wrap gap-3">
//                   {["One time", "Weekly", "Monthly"].map((f) => (
//                     <button
//                       key={f}
//                       type="button"
//                       onClick={() => setFrequency(f)}
//                       className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
//                         frequency === f
//                           ? "bg-church-purple text-white shadow-sm"
//                           : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                       }`}
//                     >
//                       {f}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Payment Method */}
//               <div>
//                 <p className="font-medium text-gray-700 mb-3">Payment Method</p>
//                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
//                   {[
//                     { id: "mobile", label: "Mobile Money", icon: Smartphone },
//                     { id: "card", label: "Credit/Debit Card", icon: CreditCard },
//                     { id: "bank", label: "Bank Transfer", icon: Building, disabled: true },
//                   ].map(({ id, label, icon: Icon, disabled }) => (
//                     <label
//                       key={id}
//                       className={`flex flex-col items-center justify-center border rounded-lg p-5 cursor-pointer transition-all text-center text-sm md:text-base ${
//                         disabled
//                           ? "opacity-50 cursor-not-allowed bg-gray-50"
//                           : paymentMethod === id
//                           ? "bg-church-purple text-white border-church-purple shadow-md"
//                           : "border-gray-300 hover:border-church-purple/50 hover:bg-gray-50"
//                       }`}
//                     >
//                       <input
//                         type="radio"
//                         name="payment"
//                         className="hidden"
//                         disabled={disabled}
//                         onChange={() => !disabled && setPaymentMethod(id as any)}
//                       />
//                       <Icon className="h-7 w-7 mb-2" />
//                       <span className="font-medium">{label}</span>
//                       {disabled && <span className="text-xs mt-1">(Coming soon)</span>}
//                     </label>
//                   ))}
//                 </div>
//               </div>

//               {/* Card Number - only for card payment */}
//               {paymentMethod === "card" && (
//                 <div>
//                   <label className="block text-gray-700 font-medium mb-2">
//                     Card Number *
//                   </label>
//                   <input
//                     className="input w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-church-purple focus:border-church-purple outline-none transition-all font-mono"
//                     placeholder="1234 5678 9012 3456"
//                     value={cardNumber}
//                     onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
//                     maxLength={19}
//                     required
//                   />
//                   <p className="text-xs text-gray-500 mt-1">
//                     We strongly recommend using a secure payment SDK instead of collecting card numbers directly.
//                   </p>
//                 </div>
//               )}

//               {/* Amount */}
//               <div>
//                 <p className="font-medium text-gray-700 mb-3">Donation Amount (TZS) *</p>
//                 <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5 mb-4">
//                   {["2500", "5000", "10000", "25000", "50000", "100000"].map((amt) => (
//                     <button
//                       type="button"
//                       key={amt}
//                       onClick={() => {
//                         setSelectedAmount(amt);
//                         setCustomAmount("");
//                       }}
//                       className={`border rounded-lg py-2.5 px-3 text-sm font-medium transition-all ${
//                         selectedAmount === amt
//                           ? "bg-church-purple text-white border-church-purple shadow-sm"
//                           : "border-gray-300 hover:bg-gray-50 hover:border-gray-400"
//                       }`}
//                     >
//                       {amt}
//                     </button>
//                   ))}
//                 </div>

//                 <input
//                   className="input w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-church-purple focus:border-church-purple outline-none transition-all"
//                   placeholder="Custom amount (TZS)"
//                   value={customAmount}
//                   onChange={(e) => {
//                     setCustomAmount(e.target.value.replace(/\D/g, ""));
//                     setSelectedAmount("");
//                   }}
//                 />
//               </div>

//               {/* Submit */}
//               <Button
//                 type="submit"
//                 disabled={loading || !amount || !paymentMethod}
//                 className="w-full bg-church-purple hover:bg-church-purple/90 text-white py-6 text-lg font-medium rounded-full mt-4 shadow-md transition-all disabled:opacity-60"
//               >
//                 {loading ? "Processing..." : "Proceed to Payment"}
//               </Button>
//             </form>
//           </GlassCard>
//         </div>
//       </section>

//       {/* FAQ SECTION */}
//       <section className="section-padding bg-white">
//         <div className="page-container">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
//               Frequently Asked Questions
//             </h2>
//             <p className="text-gray-600 max-w-2xl mx-auto">
//               Common questions about using Sadaka Plus for donations and support.
//             </p>
//           </div>

//           <div className="max-w-3xl mx-auto space-y-4">
//             {faqs.map((faq, index) => (
//               <GlassCard key={index}>
//                 <button
//                   onClick={() => toggleFAQ(index)}
//                   className="flex justify-between items-center w-full text-left"
//                 >
//                   <h3 className="font-bold text-lg text-gray-900">
//                     {faq.question}
//                   </h3>
//                   <ChevronDown
//                     className={`text-[#E18731] transition-transform ${
//                       openFAQ === index ? "rotate-180" : ""
//                     }`}
//                   />
//                 </button>

//                 {openFAQ === index && (
//                   <p className="mt-4 text-gray-600">{faq.answer}</p>
//                 )}
//               </GlassCard>
//             ))}
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default GivePage;



import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import GlassCard from "@/components/ui/GlassCard";
import {
  Heart,
  CreditCard,
  Smartphone,
  Building,
  ChevronDown,
  Loader2,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// ────────────────────────────────────────────────
// CONFIG – same base URL as your mobile app
// ────────────────────────────────────────────────
const BASE_URL = "https://development.sadakaplus.co.tz/api/v1";

// Replace with your real auth method (localStorage, context, cookies, etc.)
const getToken = () => localStorage.getItem("userToken") || "";

// ────────────────────────────────────────────────
// TYPES
// ────────────────────────────────────────────────
interface Community {
  id: string;
  name: string;
}

interface Offering {
  id: string;
  name: string;
}

// ────────────────────────────────────────────────
// FAQ data (unchanged)
// ────────────────────────────────────────────────
const faqs = [
  {
    question: "What is Sadaka Plus?",
    answer:
      "Sadaka Plus is a secure digital giving platform that allows users to make donations easily and transparently. It is designed to support churches, ministries, charities and community initiatives through simple, fast and reliable online giving.",
  },
  {
    question: "Is Sadaka Plus safe and secure?",
    answer:
      "Yes. Sadaka Plus uses trusted payment infrastructure with bank-level security and encryption. Your personal and financial information is protected and sensitive payment details are never stored on our servers.",
  },
  {
    question: "What payment methods are supported?",
    answer:
      "Sadaka Plus supports mobile money services (HaloPesa, TigoPesa, Airtel Money), bank transfers and debit or credit cards.",
  },
  {
    question: "Can I choose where my donation goes?",
    answer:
      "Absolutely. Sadaka Plus allows you to select specific causes, programs or projects to support so your giving aligns with your purpose.",
  },
  {
    question: "Will I receive confirmation after donating?",
    answer:
      "Yes. After every successful donation, you receive an instant confirmation and receipt, and can track your giving history.",
  },
  {
    question: "Who can use Sadaka Plus?",
    answer:
      "Sadaka Plus is designed for individuals, churches, ministries, charities and organizations looking for a modern digital giving solution.",
  },
];

const GivePage: React.FC = () => {
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [frequency, setFrequency] = useState("One time");
  const [paymentMethod, setPaymentMethod] = useState<"mobile" | "card" | "bank" | "">("");
  const [cardNumber, setCardNumber] = useState("");

  const [communityId, setCommunityId] = useState<string>("");
  const [offeringId, setOfferingId] = useState<string>("");
  const [joinedCommunities, setJoinedCommunities] = useState<Community[]>([]);
  const [offerings, setOfferings] = useState<Offering[]>([]);
  const [loadingCommunities, setLoadingCommunities] = useState(true);
  const [loadingOfferings, setLoadingOfferings] = useState(false);

  const [loading, setLoading] = useState(false);

  // ────────────────────────────────────────────────
  // FORMAT HELPERS
  // ────────────────────────────────────────────────
  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    const chunks = cleaned.match(/.{1,4}/g) || [];
    return chunks.join(" ");
  };

  const formatAmount = (value: string) => {
    const num = value.replace(/\D/g, "");
    return num ? Number(num).toLocaleString("en-US") : "";
  };

  // ────────────────────────────────────────────────
  // FETCH JOINED COMMUNITIES
  // ────────────────────────────────────────────────
  useEffect(() => {
    const fetchCommunities = async () => {
      setLoadingCommunities(true);
      try {
        const token = getToken();
        if (!token) return;

        const res = await fetch(`${BASE_URL}/communities/joined`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (res.ok && Array.isArray(data.data)) {
          setJoinedCommunities(
            data.data.map((c: any) => ({
              id: String(c.id),
              name: c.name || "Unnamed Community",
            }))
          );
        }
      } catch (err) {
        console.error("Failed to load communities:", err);
      } finally {
        setLoadingCommunities(false);
      }
    };

    fetchCommunities();
  }, []);

  // ────────────────────────────────────────────────
  // FETCH OFFERINGS – EXACTLY FROM /offers/community/${id}
  // ────────────────────────────────────────────────
  useEffect(() => {
    if (!communityId) {
      setOfferings([]);
      setOfferingId("");
      return;
    }

    const fetchOfferings = async () => {
      setLoadingOfferings(true);
      try {
        const token = getToken();
        if (!token) return;

        const res = await fetch(`${BASE_URL}/offers/community/${communityId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok && data.success && Array.isArray(data.data)) {
          const list = data.data.map((o: any) => ({
            id: String(o.id),
            name: o.name || "General Offering",
          }));
          setOfferings(list);
        } else {
          setOfferings([]);
        }
      } catch (err) {
        console.error("Failed to load offerings:", err);
        setOfferings([]);
      } finally {
        setLoadingOfferings(false);
      }
    };

    fetchOfferings();
  }, [communityId]);

  const amount = customAmount || selectedAmount;
  const rawAmount = amount ? Number(amount.replace(/\D/g, "")) : 0;

  const showMessage = (msg: string, isError = true) => {
    alert(msg); // ← Replace with toast (react-hot-toast / sonner) in production
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!communityId) {
      showMessage("Please select a community");
      return;
    }

    if (!offeringId) {
      showMessage("Please select an offering");
      return;
    }

    if (!amount || rawAmount < 100) {
      showMessage("Please enter a valid amount (minimum 100 TZS)");
      return;
    }

    if (!paymentMethod) {
      showMessage("Please select a payment method");
      return;
    }

    if (paymentMethod === "mobile" && !phoneNumber.trim()) {
      showMessage("Phone number is required for Mobile Money");
      return;
    }

    if (paymentMethod === "card" && !cardNumber.trim()) {
      showMessage("Card number is required for Card payment");
      return;
    }

    if (paymentMethod === "bank") {
      showMessage("Bank transfer is not yet supported.");
      return;
    }

    setLoading(true);

    try {
      let paymentUrl: string | null = null;
      const token = getToken();

      if (paymentMethod === "mobile") {
        const payload = {
          offerType: offeringId,
          amount: rawAmount,
          phoneNo: phoneNumber.trim(),
          purpose: frequency,
          paymentMethod: "Mobile money", // ← can be enhanced with network selector later
          communityId: communityId,
          cardNumber: "",
        };

        const res = await fetch(`${BASE_URL}/payments/mobile`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });

        const data = await res.json();

        if (res.ok && data.success && data.code === 201 && data.data?.paymentLink) {
          paymentUrl = data.data.paymentLink;
          showMessage("Redirecting to payment...", false);
        } else {
          showMessage(data.message || "Mobile payment failed");
          setLoading(false);
          return;
        }
      } else if (paymentMethod === "card") {
        const payload = {
          amount: rawAmount,
          payTo: communityId,
          transactionDetails: offeringId,
          email: "donor@example.com", // ← improve: collect real email
          communityId: communityId,
          currency: "TZS",
          countryCode: "TZ",
          postalCode: "",
          address: "Dar es Salaam, Tanzania",
          cardNumber: cardNumber.replace(/\s/g, ""),
        };

        const res = await fetch(`${BASE_URL}/payments/card`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });

        const data = await res.json();

        if (res.ok && data.success && data.data?.paymentUrl) {
          paymentUrl = data.data.paymentUrl;
          showMessage("Redirecting to card payment...", false);
        } else {
          showMessage(data.message || "Card payment failed");
          setLoading(false);
          return;
        }
      }

      if (paymentUrl) {
        window.open(paymentUrl, "_blank", "noopener,noreferrer");
        // Reset form
        setSelectedAmount("");
        setCustomAmount("");
        setPhoneNumber("");
        setCardNumber("");
        setCommunityId("");
        setOfferingId("");
        setPaymentMethod("");
        setFrequency("One time");
      }
    } catch (err) {
      console.error("Payment error:", err);
      showMessage("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* HERO */}
      <section className="hero-section relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("images/sadaka.JPEG")' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Give to your community
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            Your generosity helps spread God's love and make a difference.
          </p>
        </div>
      </section>

      {/* FORM SECTION */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Give Online</h2>
            <p className="text-gray-600 text-lg">
              Make a secure donation using mobile money or credit/debit card.
            </p>
          </div>

          <GlassCard className="p-6 md:p-10 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Anonymous */}
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="h-5 w-5 rounded border-gray-300 text-purple-600 focus:ring-purple-600"
                />
                <span className="text-gray-800 font-medium">Give anonymously</span>
              </label>

              {/* Community */}
              <div>
                <label className="block text-gray-800 font-medium mb-2 text-lg">
                  Give to
                </label>
                <Select
                  value={communityId}
                  onValueChange={setCommunityId}
                  disabled={loadingCommunities || joinedCommunities.length === 0}
                >
                  <SelectTrigger className="h-12">
                    <SelectValue
                      placeholder={
                        loadingCommunities
                          ? "Loading communities..."
                          : joinedCommunities.length === 0
                          ? "No communities joined yet"
                          : "Select a community"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {joinedCommunities.map((comm) => (
                      <SelectItem key={comm.id} value={comm.id}>
                        {comm.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Offering */}
              <div>
                <label className="block text-gray-800 font-medium mb-2 text-lg">
                  What's your offering?
                </label>
                <Select
                  value={offeringId}
                  onValueChange={setOfferingId}
                  disabled={!communityId || loadingOfferings}
                >
                  <SelectTrigger className="h-12">
                    <SelectValue
                      placeholder={
                        !communityId
                          ? "Select a community first"
                          : loadingOfferings
                          ? "Loading offerings..."
                          : "Select offering"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {offerings.map((off) => (
                      <SelectItem key={off.id} value={off.id}>
                        {off.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-gray-800 font-medium mb-2 text-lg">
                  Phone Number {paymentMethod === "mobile" ? "(required)" : ""}
                </label>
                <input
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-purple-600 outline-none transition-all text-base"
                  placeholder="e.g. 0712345678"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
                  required={paymentMethod === "mobile"}
                />
              </div>

              {/* Frequency */}
              <div>
                <label className="block text-gray-800 font-medium mb-2 text-lg">
                  Frequency
                </label>
                <div className="flex flex-wrap gap-3">
                  {["One time", "Weekly", "Monthly"].map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setFrequency(f)}
                      className={`px-6 py-2.5 rounded-full text-base font-medium transition-all ${
                        frequency === f
                          ? "bg-purple-600 text-white shadow-md"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-gray-800 font-medium mb-3 text-lg">
                  Payment Method
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { id: "mobile", label: "Mobile Money", icon: Smartphone },
                    { id: "card", label: "Credit/Debit Card", icon: CreditCard },
                    { id: "bank", label: "Bank Transfer", icon: Building, disabled: true },
                  ].map(({ id, label, icon: Icon, disabled }) => (
                    <label
                      key={id}
                      className={`flex flex-col items-center justify-center border-2 rounded-xl p-6 cursor-pointer transition-all text-center ${
                        disabled
                          ? "opacity-50 cursor-not-allowed bg-gray-50"
                          : paymentMethod === id
                          ? "border-purple-600 bg-purple-50 text-purple-700 shadow-md"
                          : "border-gray-300 hover:border-purple-400 hover:bg-purple-50/50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        className="hidden"
                        disabled={disabled}
                        onChange={() => !disabled && setPaymentMethod(id as any)}
                      />
                      <Icon className="h-8 w-8 mb-3" />
                      <span className="font-semibold text-base">{label}</span>
                      {disabled && <span className="text-xs mt-2 text-gray-500">(Coming soon)</span>}
                    </label>
                  ))}
                </div>
              </div>

              {/* Card Number */}
              {paymentMethod === "card" && (
                <div>
                  <label className="block text-gray-800 font-medium mb-2 text-lg">
                    Card Number *
                  </label>
                  <input
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-purple-600 outline-none transition-all font-mono text-base"
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                    maxLength={19}
                    required
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    We recommend using a secure payment SDK instead of collecting card numbers directly.
                  </p>
                </div>
              )}

              {/* Amount */}
              <div>
                <label className="block text-gray-800 font-medium mb-3 text-lg">
                  Donation Amount (TZS) *
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-5">
                  {["2500", "5000", "10000", "25000", "50000", "100000"].map((amt) => (
                    <button
                      type="button"
                      key={amt}
                      onClick={() => {
                        setSelectedAmount(amt);
                        setCustomAmount("");
                      }}
                      className={`border-2 rounded-lg py-3 px-4 text-base font-medium transition-all ${
                        selectedAmount === amt
                          ? "border-purple-600 bg-purple-50 text-purple-700 shadow-sm"
                          : "border-gray-300 hover:border-purple-400 hover:bg-purple-50/50"
                      }`}
                    >
                      {amt}
                    </button>
                  ))}
                </div>

                <input
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-purple-600 outline-none transition-all text-base"
                  placeholder="Custom amount (TZS)"
                  value={formatAmount(customAmount)}
                  onChange={(e) => {
                    setCustomAmount(e.target.value.replace(/\D/g, ""));
                    setSelectedAmount("");
                  }}
                />
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={loading || !amount || !paymentMethod || !communityId || !offeringId}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-7 text-xl font-semibold rounded-xl shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-3">
                    <Loader2 className="h-6 w-6 animate-spin" />
                    Processing...
                  </span>
                ) : (
                  "Proceed to Payment"
                )}
              </Button>
            </form>
          </GlassCard>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 text-lg">
              Common questions about using Sadaka Plus
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <GlassCard key={index} className="p-6">
                <h3 className="font-bold text-xl text-gray-900">{faq.question}</h3>
                <p className="mt-4 text-gray-700 leading-relaxed">{faq.answer}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default GivePage;