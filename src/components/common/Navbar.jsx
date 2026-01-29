import { useState } from "react";
import { ShoppingCart, Menu, X, User, Store } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "Categories", href: "/categories" },
    { label: "Orders", href: "/orders" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav className="bg-gradient-to-r from-green-600 to-green-500 shadow-lg fixed top-0 left-0 w-full z-50 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-2">
            <Store className="text-white w-8 h-8" />
            <h1 className="text-2xl font-bold">VyaparOne</h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-white/90 hover:text-white font-medium transition"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Right Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="relative">
              <ShoppingCart className="w-6 h-6 text-white hover:text-gray-100" />
              <span className="absolute -top-2 -right-2 bg-white text-green-700 text-xs font-semibold rounded-full px-1.5">
                3
              </span>
            </button>
            <button className="flex items-center bg-white text-green-700 px-4 py-1.5 rounded-full hover:bg-green-50 transition font-semibold">
              <User className="w-4 h-4 mr-2" />
              Account
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-green-600/95 border-t border-green-400 shadow-md">
          <div className="px-4 py-3 space-y-2">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block text-white hover:text-green-100 font-medium transition"
              >
                {item.label}
              </a>
            ))}
            <div className="flex items-center justify-between mt-3">
              <button className="flex items-center bg-white text-green-700 px-4 py-1.5 rounded-full hover:bg-green-50 transition font-semibold">
                <User className="w-4 h-4 mr-2" />
                Account
              </button>
              <button className="relative">
                <ShoppingCart className="w-6 h-6 text-white hover:text-green-100" />
                <span className="absolute -top-2 -right-2 bg-white text-green-700 text-xs font-semibold rounded-full px-1.5">
                  3
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
