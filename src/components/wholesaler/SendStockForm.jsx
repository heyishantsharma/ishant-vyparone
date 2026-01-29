import { useState } from "react";
import { Truck, Package, Loader2, CheckCircle2 } from "lucide-react";

export default function SendStockForm() {
  const [form, setForm] = useState({
    fromShop: "",
    toShop: "",
    itemName: "",
    quantity: "",
    unit: "pcs",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setForm({
        fromShop: "",
        toShop: "",
        itemName: "",
        quantity: "",
        unit: "pcs",
        notes: "",
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 p-6 flex items-center justify-center">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-3xl w-full border border-green-200">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Truck className="text-green-600 w-8 h-8" />
            <h1 className="text-3xl font-bold text-green-700">Send Stock</h1>
          </div>
          <p className="text-gray-500 text-sm sm:text-base mt-2 sm:mt-0">
            Transfer products between shops seamlessly
          </p>
        </div>

        {/* Form */}
        {!isSubmitted ? (
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* From Shop */}
            <div className="flex flex-col">
              <label className="font-medium text-gray-700 mb-2">
                From Shop <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="fromShop"
                value={form.fromShop}
                onChange={handleChange}
                placeholder="Enter sender shop name"
                required
                className="border border-green-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-green-400 outline-none"
              />
            </div>

            {/* To Shop */}
            <div className="flex flex-col">
              <label className="font-medium text-gray-700 mb-2">
                To Shop <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="toShop"
                value={form.toShop}
                onChange={handleChange}
                placeholder="Enter receiver shop name"
                required
                className="border border-green-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-green-400 outline-none"
              />
            </div>

            {/* Item Name */}
            <div className="flex flex-col">
              <label className="font-medium text-gray-700 mb-2">
                Item Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="itemName"
                value={form.itemName}
                onChange={handleChange}
                placeholder="Enter item name"
                required
                className="border border-green-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-green-400 outline-none"
              />
            </div>

            {/* Quantity */}
            <div className="flex flex-col">
              <label className="font-medium text-gray-700 mb-2">
                Quantity <span className="text-red-500">*</span>
              </label>
              <div className="flex">
                <input
                  type="number"
                  name="quantity"
                  value={form.quantity}
                  onChange={handleChange}
                  placeholder="0"
                  required
                  className="border border-green-300 rounded-l-xl px-4 py-2 w-full focus:ring-2 focus:ring-green-400 outline-none"
                />
                <select
                  name="unit"
                  value={form.unit}
                  onChange={handleChange}
                  className="border-t border-b border-r border-green-300 bg-green-50 rounded-r-xl px-3 outline-none focus:ring-2 focus:ring-green-400"
                >
                  <option value="pcs">pcs</option>
                  <option value="kg">kg</option>
                  <option value="ltr">ltr</option>
                  <option value="box">box</option>
                </select>
              </div>
            </div>

            {/* Notes */}
            <div className="md:col-span-2 flex flex-col">
              <label className="font-medium text-gray-700 mb-2">
                Notes (optional)
              </label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                placeholder="Enter any special instructions..."
                rows="3"
                className="border border-green-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-green-400 outline-none resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white font-semibold transition ${
                  isSubmitting
                    ? "bg-green-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Sending...
                  </>
                ) : (
                  <>
                    <Package size={20} /> Send Stock
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <CheckCircle2 className="text-green-600 w-16 h-16 mb-4" />
            <h2 className="text-2xl font-bold text-green-700 mb-2">
              Stock Sent Successfully!
            </h2>
            <p className="text-gray-600 mb-6">
              Your stock has been transferred successfully between shops.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 transition"
            >
              Send Another
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
