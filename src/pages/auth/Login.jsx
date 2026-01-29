import { useState } from "react";
import { Mail, Lock, Store } from "lucide-react";
import { Link } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", formData);
    // TODO: Integrate with backend API via Axios
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-green-50 via-white to-green-100">
      {/* Left Section */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 bg-gradient-to-br from-green-600 to-green-500 text-white">
        <div className="flex items-center space-x-2 mb-6">
          <Store size={40} />
          <h1 className="text-3xl font-bold">ShopSmart</h1>
        </div>
        <p className="text-center text-lg max-w-sm">
          Manage your store, inventory, and wholesale connections seamlessly in one place.
        </p>
        <img
          src="https://cdn-icons-png.flaticon.com/512/3081/3081559.png"
          alt="Shop illustration"
          className="w-60 mt-8 hidden md:block"
        />
      </div>

      {/* Right Section (Login Form) */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
            Welcome Back 👋
          </h2>
          <p className="text-center text-gray-500 mb-6">
            Login to manage your shop and track sales
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-gray-600 text-sm font-medium mb-1">
                Email Address
              </label>
              <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-green-500">
                <Mail className="text-gray-400 mr-2" size={20} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                  className="w-full outline-none text-gray-700"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-gray-600 text-sm font-medium mb-1">
                Password
              </label>
              <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-green-500">
                <Lock className="text-gray-400 mr-2" size={20} />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Enter your password"
                  className="w-full outline-none text-gray-700"
                />
              </div>
            </div>

            {/* Remember + Forgot Password */}
            <div className="flex justify-between items-center text-sm text-gray-600">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Remember me
              </label>
              <Link to="/forgot-password" className="text-green-600 hover:underline">
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition-all duration-300 shadow-lg"
            >
              Login
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-5">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="px-3 text-gray-500 text-sm">OR</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          {/* Signup Link */}
          <p className="text-center text-gray-600 text-sm">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-green-600 font-semibold hover:underline">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
