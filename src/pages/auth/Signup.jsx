import { useState } from "react";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "shopOwner",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup Data:", formData);
    // TODO: Connect with backend API via Axios POST
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-green-50 via-white to-green-100">
      {/* Left Section */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 bg-gradient-to-br from-green-600 to-green-500 text-white">
        <div className="flex items-center space-x-2 mb-6">
          <UserPlus size={40} />
          <h1 className="text-3xl font-bold">ShopSmart</h1>
        </div>
        <p className="text-center text-lg max-w-sm">
          Manage your store, inventory, and wholesale connections seamlessly in one place.
        </p>
        <img
          src="https://cdn-icons-png.flaticon.com/512/4108/4108844.png"
          alt="Shop illustration"
          className="w-60 mt-8 hidden md:block"
        />
      </div>

      {/* Right Section (Signup Form) */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
            Create Your Account 👋
          </h2>
          <p className="text-center text-gray-500 mb-6">
            Sign up to manage your shop, track inventory, and connect with distributors.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Field */}
            <div>
              <label className="block text-gray-600 text-sm font-medium mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-gray-600 text-sm font-medium mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="example@shop.com"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <label className="block text-gray-600 text-sm font-medium mb-1">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-10 text-gray-500 hover:text-green-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Role Select */}
            <div>
              <label className="block text-gray-600 text-sm font-medium mb-1">Select Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="shopOwner">Shop Owner</option>
                <option value="distributor">Distributor</option>
                <option value="employee">Employee</option>
              </select>
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition-all shadow-lg"
            >
              Sign Up
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-5">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="px-3 text-gray-500 text-sm">OR</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          {/* Login Link */}
          <p className="text-center text-gray-600 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-green-600 font-semibold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
