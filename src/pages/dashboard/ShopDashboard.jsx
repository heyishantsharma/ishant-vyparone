import { useState, useEffect } from "react";
import {
  Home, ShoppingCart, Package, Users, BarChart2, Settings, Bell, LogOut, Plus, Menu, X
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar
} from "recharts";

// Mock Data
const initialMetrics = [
  { title: "Total Orders", value: 1250, icon: <ShoppingCart size={28} className="text-green-600" /> },
  { title: "Products", value: 320, icon: <Package size={28} className="text-green-600" /> },
  { title: "Customers", value: 540, icon: <Users size={28} className="text-green-600" /> },
  { title: "Revenue", value: 125000, icon: <BarChart2 size={28} className="text-green-600" /> },
];

const initialRevenueData = [
  { month: "Jan", revenue: 12000, orders: 320 },
  { month: "Feb", revenue: 15000, orders: 400 },
  { month: "Mar", revenue: 18000, orders: 450 },
  { month: "Apr", revenue: 20000, orders: 500 },
  { month: "May", revenue: 22000, orders: 520 },
];

const initialRecentOrders = [
  { id: 101, customer: "John Doe", total: 450, status: "Pending" },
  { id: 102, customer: "Jane Smith", total: 1200, status: "Shipped" },
  { id: 103, customer: "Mark Johnson", total: 320, status: "Delivered" },
];

export default function LiveShopDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [metrics, setMetrics] = useState(initialMetrics);
  const [revenueData, setRevenueData] = useState(initialRevenueData);
  const [recentOrders, setRecentOrders] = useState(initialRecentOrders);
  const [notifications, setNotifications] = useState(0);

  const menuItems = [
    { name: "Dashboard", icon: <Home size={20} /> },
    { name: "Orders", icon: <ShoppingCart size={20} /> },
    { name: "Products", icon: <Package size={20} /> },
    { name: "Customers", icon: <Users size={20} /> },
    { name: "Reports", icon: <BarChart2 size={20} /> },
    { name: "Settings", icon: <Settings size={20} /> },
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case "Pending": return "bg-yellow-100 text-yellow-800";
      case "Shipped": return "bg-blue-100 text-blue-800";
      case "Delivered": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) =>
        prev.map((m) => {
          if (m.title === "Total Orders") return { ...m, value: m.value + Math.floor(Math.random() * 5) };
          if (m.title === "Revenue") return { ...m, value: m.value + Math.floor(Math.random() * 2000) };
          return m;
        })
      );

      const newOrder = {
        id: recentOrders.length + 101,
        customer: ["Alice", "Bob", "Charlie"][Math.floor(Math.random() * 3)],
        total: Math.floor(Math.random() * 2000),
        status: ["Pending", "Shipped", "Delivered"][Math.floor(Math.random() * 3)],
      };
      setRecentOrders((prev) => [newOrder, ...prev].slice(0, 5));
      setNotifications((prev) => prev + 1);

      const newRevenueData = [...revenueData];
      const lastMonth = newRevenueData[newRevenueData.length - 1];
      newRevenueData.push({
        month: `M${newRevenueData.length + 1}`,
        revenue: lastMonth.revenue + Math.floor(Math.random() * 5000),
        orders: lastMonth.orders + Math.floor(Math.random() * 50),
      });
      setRevenueData(newRevenueData.slice(-6));
    }, 5000);

    return () => clearInterval(interval);
  }, [metrics, recentOrders, revenueData]);

  return (
    <div className="flex min-h-screen bg-green-50 my-20 ">
      {/* Sidebar */}
     <aside
        className={`bg-green-700 text-white w-64 p-6 fixed md:relative md:flex-shrink-0 h-screen transition-transform transform z-30 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <h2 className="text-2xl font-bold mb-6">ShopSmart</h2>
        <nav className="flex flex-col space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveMenu(item.name)}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all w-full justify-start hover:bg-green-500 ${
                activeMenu === item.name ? "bg-green-700 font-semibold" : ""
              }`}
            >
              {item.icon} {item.name}
            </button>
          ))}
        </nav>
        <button className="flex items-center gap-3 px-4 py-2 rounded-lg mt-auto hover:bg-green-500 transition w-full">
          <LogOut size={18} /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-0 md:ml-64 p-6 flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden bg-green-600 p-2 rounded-lg text-white"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <h1 className="text-3xl font-bold text-gray-800">{activeMenu}</h1>
          <div className="flex items-center gap-4">
            <button className="relative">
              <Bell size={20} />
              {notifications > 0 && (
                <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full animate-ping" />
              )}
            </button>
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-700">JD</div>
          </div>
        </header>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
            <Plus size={18} /> Add Product
          </button>
          <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
            <Plus size={18} /> Add Order
          </button>
          <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
            <Plus size={18} /> Add Customer
          </button>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric) => (
            <div key={metric.title} className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-start hover:shadow-2xl transition transform hover:-translate-y-1">
              <div className="mb-3">{metric.icon}</div>
              <h3 className="text-gray-700 font-semibold">{metric.title}</h3>
              <p className="text-2xl font-bold text-gray-800">{metric.title === "Revenue" ? `₹${metric.value}` : metric.value}</p>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white shadow-lg rounded-2xl p-6">
            <h2 className="text-lg font-bold mb-4">Revenue Over Time</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#16a34a" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white shadow-lg rounded-2xl p-6">
            <h2 className="text-lg font-bold mb-4">Orders Over Time</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="orders" fill="#16a34a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-green-600 text-white rounded-t-xl">
                <tr>
                  <th className="py-3 px-4 text-left">Order ID</th>
                  <th className="py-3 px-4 text-left">Customer</th>
                  <th className="py-3 px-4 text-left">Total (₹)</th>
                  <th className="py-3 px-4 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-green-50 transition">
                    <td className="py-3 px-4">{order.id}</td>
                    <td className="py-3 px-4">{order.customer}</td>
                    <td className="py-3 px-4">₹{order.total}</td>
                    <td className={`py-3 px-4 font-semibold text-center rounded-full ${getStatusClass(order.status)}`}>
                      {order.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
