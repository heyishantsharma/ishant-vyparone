import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-green-600 text-white py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Logo & Description */}
        <div>
          <h1 className="text-2xl font-bold mb-3">ShopSmart</h1>
          <p className="text-green-100 text-sm">
            Seamlessly manage your shops, track inventory, and connect with distributors. Grow your business effortlessly.
          </p>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="hover:text-gray-200"><Facebook size={20} /></a>
            <a href="#" className="hover:text-gray-200"><Twitter size={20} /></a>
            <a href="#" className="hover:text-gray-200"><Instagram size={20} /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-green-100">
            <li><Link to="/" className="hover:text-white transition">Home</Link></li>
            <li><Link to="/shop" className="hover:text-white transition">Shop</Link></li>
            <li><Link to="/categories" className="hover:text-white transition">Categories</Link></li>
            <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact Info</h3>
          <ul className="space-y-3 text-green-100 text-sm">
            <li className="flex items-center space-x-2">
              <MapPin size={16} /> <span>123 Market Street, ShopCity, India</span>
            </li>
            <li className="flex items-center space-x-2">
              <Phone size={16} /> <span>+91 98765 43210</span>
            </li>
            <li className="flex items-center space-x-2">
              <Mail size={16} /> <span>support@shopsmart.com</span>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Newsletter</h3>
          <p className="text-green-100 text-sm mb-4">
            Subscribe to get updates on new products and offers.
          </p>
          <form className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 rounded-lg text-gray-800 focus:outline-none"
            />
            <button className="bg-white text-green-600 px-4 py-2 rounded-lg font-semibold hover:bg-green-100 transition">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-green-500 mt-10"></div>

      {/* Copyright */}
      <p className="text-center text-green-100 text-sm mt-6">
        © {new Date().getFullYear()} ShopSmart. All rights reserved.
      </p>
    </footer>
  );
}
