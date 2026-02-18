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
    { key: "about", path: "/about" },
    { key: "gallery", path: "/events" },
    // { key: "register", path: "/register" },
  ];

  const toggleLanguage = () => {
    const currentLang = i18n.language || "en";
    const newLang = currentLang === "en" ? "sw" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
    <header
      className={`sticky top-4 mx-auto max-w-7xl rounded-xl z-50 transition-all duration-300 shadow-lg ${
        isScrolled ? "glass py-2" : "py-4 backdrop-blur-md"
      }`}
      style={!isScrolled ? { backgroundColor: "rgba(255,255,255,0.9)" } : {}}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center mx-2">
            <img
              src="/images/pugu.png"
              alt="Catholic Marathon"
              className="h-13 md:h-12 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.key}
                  to={link.path}
                  className="font-medium transition-colors"
                  style={{ color: isActive ? GOLD : "#3f3f3f" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = GOLD)}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = isActive ? GOLD : "#3f3f3f")
                  }
                >
                  {t(link.key)}
                </Link>
              );
            })}

            {/* Cart Icon */}
            {cartItemCount > 0 && (
              <Link to="/cart" className="relative">
                <ShoppingCart className="h-6 w-6" style={{ color: GOLD }} />
                <span
                  className="absolute -top-2 -right-2 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
                  style={{ backgroundColor: GOLD, color: "#1a1a1a" }}
                >
                  {cartItemCount}
                </span>
              </Link>
            )}

            {/* Language Switch */}
            <Button onClick={toggleLanguage} className="language-btn">
              🌐 {i18n?.language?.toUpperCase() || "EN"}
            </Button>
          </div>

          {/* Mobile Menu */}
          <button
            className="md:hidden"
            style={{ color: GOLD }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden glass mt-4 rounded-xl p-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.key}
                    to={link.path}
                    className="font-medium py-2 transition-colors"
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
                  className="flex items-center py-2 font-medium"
                  style={{ color: GOLD }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  {t("cart")}
                  <span
                    className="ml-2 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
                    style={{ backgroundColor: GOLD, color: "#1a1a1a" }}
                  >
                    {cartItemCount}
                  </span>
                </Link>
              )}

              <Button onClick={toggleLanguage} className="language-btn">
                🌐 {i18n?.language?.toUpperCase() || "EN"}
              </Button>
            </div>
          </div>
        )}
      </div>

      <style>
        {`
          .language-btn {
            background-color: ${GOLD};
            color: #1a1a1a;
            border-radius: 9999px;
            padding: 0.5rem 1.25rem;
            font-weight: 600;
            font-size: 0.9rem;
            display: flex;
            align-items: center;
            gap: 0.4rem;
            box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
            transition: all 0.25s ease;
          }
          .language-btn:hover {
            transform: translateY(-1px);
            box-shadow: 0 10px 24px rgba(0, 0, 0, 0.25);
            opacity: 0.95;
          }
        `}
      </style>
    </header>
  );
};

export default Navbar;