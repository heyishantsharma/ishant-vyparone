import { ShoppingBag, Truck, Users, ArrowRight } from "lucide-react";
import background from '../../assets/images/background2.jpg';
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-800">
      {/* ✅ Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-6 py-20">
        <div className="md:w-1/2 space-y-6 text-center md:text-left">
          <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
            Manage Your <span className="text-green-600">Shops & Distributors</span> Seamlessly
          </h1>
          <p className="text-gray-600 text-lg">
            A powerful platform to connect distributors, track inventory, and grow your business — all in one place.
          </p>
          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 pt-4">
            <button className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-all">
              Get Started
            </button>
            <button className="border border-green-600 text-green-700 px-6 py-3 rounded-xl font-semibold hover:bg-green-50 transition-all flex items-center gap-2">
              Learn More <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <img
            src={background}
            alt="Shop Management Dashboard"
            className="w-full max-w-lg rounded-3xl shadow-lg"
          />
        </div>
      </section>

      {/* ✅ Features Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Why Choose Our Platform?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-gray-50 p-8 rounded-2xl shadow hover:shadow-xl transition-all">
              <div className="bg-green-100 text-green-600 w-14 h-14 flex items-center justify-center rounded-xl mb-4">
                <ShoppingBag size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Inventory</h3>
              <p className="text-gray-600">
                Monitor stock levels and auto-replenish items to keep your shop running smoothly.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl shadow hover:shadow-xl transition-all">
              <div className="bg-blue-100 text-blue-600 w-14 h-14 flex items-center justify-center rounded-xl mb-4">
                <Truck size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Distributor Network</h3>
              <p className="text-gray-600">
                Manage and connect with multiple distributors efficiently using real-time dashboards.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl shadow hover:shadow-xl transition-all">
              <div className="bg-yellow-100 text-yellow-600 w-14 h-14 flex items-center justify-center rounded-xl mb-4">
                <Users size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Customer Insights</h3>
              <p className="text-gray-600">
                Understand your customer trends and buying behavior to make better business decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ Call-to-Action Section */}
      <section className="bg-green-600 py-16 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Ready to Grow Your Business?</h2>
        <p className="text-lg mb-6">
          Join hundreds of shop owners and distributors using our platform daily.
        </p>
        <button className="bg-white text-green-700 px-8 py-3 rounded-xl font-semibold hover:bg-green-50 transition-all">
          Start Now
        </button>
      </section>

     
    </div>
  );
}
