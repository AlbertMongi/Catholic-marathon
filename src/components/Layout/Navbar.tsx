// import React, { useState, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { Menu, X, ShoppingCart } from "lucide-react";
// import { useCart } from "@/context/CartContext";
// import { Button } from "@/components/ui/button";
// import { useTranslation } from "react-i18next";

// const GOLD = "#FAC31C";

// const Navbar: React.FC = () => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const location = useLocation();
//   const { getTotalItems } = useCart();
//   const cartItemCount = getTotalItems ? getTotalItems() : 0;
//   const { t, i18n } = useTranslation();

//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 10);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const navLinks = [
//     { key: "home", path: "/" },
//     { key: "register", path: "/give" },
//     { key: "gallery", path: "/events" },
//   ];

//   const toggleLanguage = () => {
//     const currentLang = i18n.language || "en";
//     const newLang = currentLang === "en" ? "sw" : "en";
//     i18n.changeLanguage(newLang);
//   };

//   return (
//     <header
//       className={`sticky top-4 mx-auto max-w-[1400px] rounded-2xl z-50 transition-all duration-300 shadow-xl ${
//         isScrolled ? "glass py-2" : "py-3 backdrop-blur-md"
//       }`}
//       style={!isScrolled ? { backgroundColor: "rgba(255,255,255,0.95)" } : {}}
//     >
//       <div className="container mx-auto px-8">
//         <nav className="flex items-center justify-between">
//           {/* Logo */}
//           <Link to="/" className="flex items-center mx-3">
//             <img
//               src="/images/pugu_black.png"
//               alt="Catholic Marathon"
//               className="h-13 md:h-14 w-auto object-contain"
//             />
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex space-x-12 items-center">
//             {navLinks.map((link) => {
//               const isActive = location.pathname === link.path;
//               return (
//                 <Link
//                   key={link.key}
//                   to={link.path}
//                   className="font-semibold text-lg transition-colors duration-200"
//                   style={{ color: isActive ? GOLD : "#3f3f3f" }}
//                   onMouseEnter={(e) => (e.currentTarget.style.color = GOLD)}
//                   onMouseLeave={(e) =>
//                     (e.currentTarget.style.color = isActive ? GOLD : "#3f3f3f")
//                   }
//                 >
//                   {t(link.key)}
//                 </Link>
//               );
//             })}

//             {/* Cart Icon */}
//             {cartItemCount > 0 && (
//               <Link to="/cart" className="relative">
//                 <ShoppingCart className="h-6 w-6" style={{ color: GOLD }} />
//                 <span
//                   className="absolute -top-2 -right-2 text-sm font-bold rounded-full h-5 w-5 flex items-center justify-center"
//                   style={{ backgroundColor: GOLD, color: "#1a1a1a" }}
//                 >
//                   {cartItemCount}
//                 </span>
//               </Link>
//             )}

//             {/* Language Switch */}
//             <Button onClick={toggleLanguage} className="language-btn">
//               🌐 {i18n?.language?.toUpperCase() || "EN"}
//             </Button>
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             className="md:hidden"
//             style={{ color: GOLD }}
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//           >
//             {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </nav>

//         {/* Mobile Menu */}
//         {isMobileMenuOpen && (
//           <div className="md:hidden glass mt-3 rounded-2xl p-4 animate-fade-in">
//             <div className="flex flex-col space-y-3">
//               {navLinks.map((link) => {
//                 const isActive = location.pathname === link.path;
//                 return (
//                   <Link
//                     key={link.key}
//                     to={link.path}
//                     className="font-semibold text-lg py-2 transition-colors"
//                     style={{ color: isActive ? GOLD : "#3f3f3f" }}
//                     onClick={() => setIsMobileMenuOpen(false)}
//                   >
//                     {t(link.key)}
//                   </Link>
//                 );
//               })}

//               {/* Mobile Cart */}
//               {cartItemCount > 0 && (
//                 <Link
//                   to="/cart"
//                   className="flex items-center py-2 font-semibold text-lg"
//                   style={{ color: GOLD }}
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   <ShoppingCart className="h-5 w-5 mr-2" />
//                   {t("cart")}
//                   <span
//                     className="ml-2 text-sm font-bold rounded-full h-5 w-5 flex items-center justify-center"
//                     style={{ backgroundColor: GOLD, color: "#1a1a1a" }}
//                   >
//                     {cartItemCount}
//                   </span>
//                 </Link>
//               )}

//               <Button onClick={toggleLanguage} className="language-btn">
//                 🌐 {i18n?.language?.toUpperCase() || "EN"}
//               </Button>
//             </div>
//           </div>
//         )}
//       </div>

//       <style>
//         {`
//           .language-btn {
//             background-color: ${GOLD};
//             color: #1a1a1a;
//             border-radius: 9999px;
//             padding: 0.5rem 1.25rem;
//             font-weight: 700;
//             font-size: 0.9rem;
//             display: flex;
//             align-items: center;
//             gap: 0.5rem;
//             box-shadow: 0 5px 16px rgba(0, 0, 0, 0.15);
//             transition: all 0.25s ease;
//           }
//           .language-btn:hover {
//             transform: translateY(-1px);
//             box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
//             opacity: 0.95;
//           }
//         `}
//       </style>
//     </header>
//   );
// };

// export default Navbar;



import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const GOLD = "#FAC31C";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { getTotalItems } = useCart();
  const cartItemCount = getTotalItems ? getTotalItems() : 0;
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { key: "home", path: "/" },
    { key: "register", path: "/give" },
    { key: "gallery", path: "/events" },
  ];

  const toggleLanguage = () => {
    const currentLang = i18n.language || "en";
    const newLang = currentLang === "en" ? "sw" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
    <header
      className={`sticky top-4 mx-auto max-w-[1520px] rounded-2xl z-50 transition-all duration-300 shadow-xl ${
        isScrolled ? "glass py-2" : "py-3 backdrop-blur-md"
      }`}
      style={!isScrolled ? { backgroundColor: "rgba(255,255,255,0.95)" } : {}}
    >
      <div className="container mx-auto px-6 sm:px-8 md:px-10 lg:px-12">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center mx-2 sm:mx-3">
            <img
              src="/images/pugu_black.png"
              alt="Catholic Marathon"
              className="h-12 sm:h-13 md:h-14 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10 lg:space-x-14">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.key}
                  to={link.path}
                  className="font-semibold text-lg transition-colors duration-200 hover:text-[#FAC31C]"
                  style={{ color: isActive ? GOLD : "#3f3f3f" }}
                >
                  {t(link.key)}
                </Link>
              );
            })}

            {/* Cart Icon */}
            {cartItemCount > 0 && (
              <Link to="/cart" className="relative ml-4">
                <ShoppingCart className="h-6 w-6" style={{ color: GOLD }} />
                <span
                  className="absolute -top-2 -right-2 text-sm font-bold rounded-full h-5 w-5 flex items-center justify-center text-black"
                  style={{ backgroundColor: GOLD }}
                >
                  {cartItemCount}
                </span>
              </Link>
            )}

            {/* Language Switch */}
            <Button
              onClick={toggleLanguage}
              className="language-btn ml-6"
            >
              🌐 {i18n?.language?.toUpperCase() || "EN"}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#FAC31C]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 px-2 pb-4 glass rounded-2xl animate-fade-in">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.key}
                    to={link.path}
                    className="font-semibold text-lg py-2 transition-colors"
                    style={{ color: isActive ? GOLD : "#3f3f3f" }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t(link.key)}
                  </Link>
                );
              })}

              {/* Mobile Cart */}
              {cartItemCount > 0 && (
                <Link
                  to="/cart"
                  className="flex items-center py-2 font-semibold text-lg"
                  style={{ color: GOLD }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <ShoppingCart className="h-5 w-5 mr-3" />
                  {t("cart")}
                  <span
                    className="ml-3 text-sm font-bold rounded-full h-5 w-5 flex items-center justify-center text-black"
                    style={{ backgroundColor: GOLD }}
                  >
                    {cartItemCount}
                  </span>
                </Link>
              )}

              <Button
                onClick={toggleLanguage}
                className="language-btn w-fit mt-2"
              >
                🌐 {i18n?.language?.toUpperCase() || "EN"}
              </Button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .language-btn {
          background-color: ${GOLD};
          color: #1a1a1a;
          border-radius: 9999px;
          padding: 0.5rem 1.25rem;
          font-weight: 700;
          font-size: 0.95rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          box-shadow: 0 5px 16px rgba(0, 0, 0, 0.15);
          transition: all 0.25s ease;
        }
        .language-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
          opacity: 0.95;
        }
        .glass {
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </header>
  );
};

export default Navbar;