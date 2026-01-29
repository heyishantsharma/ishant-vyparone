import { useState } from "react";
import { Eye, Truck, XCircle, CheckCircle, CreditCard } from "lucide-react";

// Mock order data
const ordersData = [
  {
    id: 101,
    customer: "John Doe",
    date: "2025-10-10",
    total: 450.0,
    status: "Pending",
    items: [
      { id: 1, name: "Apple", qty: 3, price: 50, image: "https://cdn-icons-png.flaticon.com/512/415/415733.png" },
      { id: 2, name: "Banana", qty: 5, price: 20, image: "https://cdn-icons-png.flaticon.com/512/415/415750.png" },
    ],
    shipping: { address: "123 Main St, City", phone: "1234567890" },
    payment: { method: "Credit Card", status: "Paid" },
  },
  {
    id: 102,
    customer: "Jane Smith",
    date: "2025-10-12",
    total: 1200.5,
    status: "Shipped",
    items: [
      { id: 3, name: "Milk", qty: 2, price: 200, image: "https://cdn-icons-png.flaticon.com/512/1046/1046757.png" },
    ],
    shipping: { address: "456 Market St, City", phone: "9876543210" },
    payment: { method: "Cash on Delivery", status: "Pending" },
  },
];

export default function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const getStatusClass = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Shipped":
        return "bg-blue-100 text-blue-800";
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Orders</h1>

        {/* Orders Table */}
        <div className="overflow-x-auto rounded-2xl shadow-lg bg-white">
          <table className="min-w-full">
            <thead className="bg-green-600 text-white rounded-t-xl">
              <tr>
                <th className="py-3 px-4 text-left">Order ID</th>
                <th className="py-3 px-4 text-left">Customer</th>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Total (₹)</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {ordersData.map((order) => (
                <tr key={order.id} className="border-b last:border-none hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-800">{order.id}</td>
                  <td className="py-3 px-4 text-gray-700">{order.customer}</td>
                  <td className="py-3 px-4 text-gray-700">{order.date}</td>
                  <td className="py-3 px-4 text-gray-700">₹{order.total.toFixed(2)}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusClass(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 flex justify-center items-center gap-2">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="bg-green-600 text-white px-3 py-1 rounded-xl flex items-center gap-1 hover:bg-green-700 transition"
                    >
                      <Eye size={16} /> View
                    </button>
                    {order.status === "Shipped" && (
                      <button className="bg-blue-600 text-white px-3 py-1 rounded-xl flex items-center gap-1 hover:bg-blue-700 transition">
                        <Truck size={16} /> Track
                      </button>
                    )}
                    {order.status === "Pending" && (
                      <button className="bg-red-600 text-white px-3 py-1 rounded-xl flex items-center gap-1 hover:bg-red-700 transition">
                        <XCircle size={16} /> Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Order Sidebar */}
        <div
          className={`fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white shadow-2xl transform transition-transform ${
            selectedOrder ? "translate-x-0" : "translate-x-full"
          } z-50 flex flex-col`}
        >
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-800">Order #{selectedOrder?.id}</h2>
            <button
              onClick={() => setSelectedOrder(null)}
              className="text-gray-600 hover:text-gray-800"
            >
              ✕
            </button>
          </div>

          {selectedOrder && (
            <div className="p-6 flex-1 overflow-y-auto flex flex-col gap-6">
              {/* Shipping Info */}
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Shipping Info</h3>
                <p className="text-gray-600">Name: {selectedOrder.customer}</p>
                <p className="text-gray-600">Address: {selectedOrder.shipping.address}</p>
                <p className="text-gray-600">Phone: {selectedOrder.shipping.phone}</p>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Items</h3>
                <div className="space-y-3">
                  {selectedOrder.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-contain rounded-xl" />
                      <div className="flex-1">
                        <p className="text-gray-800 font-medium">{item.name}</p>
                        <p className="text-gray-600 text-sm">
                          Qty: {item.qty} × ₹{item.price}
                        </p>
                      </div>
                      <p className="font-semibold text-gray-800">₹{(item.qty * item.price).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Info */}
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Payment</h3>
                <p className="text-gray-600 flex items-center gap-2">
                  <CreditCard size={16} /> Method: {selectedOrder.payment.method}
                </p>
                <p className="text-gray-600 flex items-center gap-2">
                  <CheckCircle size={16} /> Status: {selectedOrder.payment.status}
                </p>
                <p className="text-gray-800 font-bold mt-2">Total: ₹{selectedOrder.total.toFixed(2)}</p>
              </div>

              {/* Actions */}
              <div className="mt-auto flex gap-2 flex-wrap">
                {selectedOrder.status === "Pending" && (
                  <button className="bg-red-600 text-white px-4 py-2 rounded-xl flex items-center gap-1 hover:bg-red-700 transition">
                    <XCircle size={16} /> Cancel Order
                  </button>
                )}
                {selectedOrder.status === "Shipped" && (
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-xl flex items-center gap-1 hover:bg-blue-700 transition">
                    <Truck size={16} /> Track Order
                  </button>
                )}
                <button className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition">
                  Reorder
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
