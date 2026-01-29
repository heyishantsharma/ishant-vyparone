import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 p-6 my-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
          Contact Us
        </h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Have questions or need support? Reach out to us and we’ll help you manage your shop efficiently.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Send a Message</h2>
            <form className="space-y-5">
              <div>
                <label className="block text-gray-600 mb-1 font-medium">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-600 mb-1 font-medium">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-600 mb-1 font-medium">Message</label>
                <textarea
                  placeholder="Your message"
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-xl font-semibold transition-all shadow-md"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col justify-center bg-white rounded-2xl shadow-2xl p-8 space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Information</h2>

            <div className="flex items-center space-x-4">
              <MapPin className="w-6 h-6 text-green-600" />
              <p className="text-gray-600">123 Market Street, ShopCity, India</p>
            </div>

            <div className="flex items-center space-x-4">
              <Phone className="w-6 h-6 text-green-600" />
              <p className="text-gray-600">+91 98765 43210</p>
            </div>

            <div className="flex items-center space-x-4">
              <Mail className="w-6 h-6 text-green-600" />
              <p className="text-gray-600">support@shopsmart.com</p>
            </div>

            <div className="mt-6">
              <h3 className="text-gray-800 font-semibold mb-2">Business Hours</h3>
              <p className="text-gray-600">Mon - Fri: 9:00 AM - 6:00 PM</p>
              <p className="text-gray-600">Sat - Sun: 10:00 AM - 4:00 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
