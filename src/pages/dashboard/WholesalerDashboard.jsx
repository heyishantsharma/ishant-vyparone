import { useState, useEffect } from "react";
import {
  Home, ShoppingCart, Package, Users, BarChart2, Settings,
  Bell, LogOut, Plus, Edit, Trash
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar
} from "recharts";

// Mock Data
const initialMetrics = [
  { title: "Total Orders", value: 850, icon: <ShoppingCart size={28} className="text-green-600" /> },
  { title: "Products", value: 450, icon: <Package size={28} className="text-green-600" /> },
  { title: "Customers", value: 320, icon: <Users size={28} className="text-green-600" /> },
  { title: "Revenue", value: 780000, icon: <BarChart2 size={28} className="text-green-600" /> },
];

const initialRevenueData = [
  { month: "Jan", revenue: 120000, orders: 80 },
  { month: "Feb", revenue: 150000, orders: 100 },
  { month: "Mar", revenue: 180000, orders: 120 },
  { month: "Apr", revenue: 200000, orders: 150 },
  { month: "May", revenue: 220000, orders: 170 },
];

const initialRecentOrders = [
  { id: 201, customer: "Retailer A", total: 5000, status: "Pending" },
  { id: 202, customer: "Retailer B", total: 12000, status: "Shipped" },
  { id: 203, customer: "Retailer C", total: 3200, status: "Delivered" },
];

const initialProducts = Array.from({ length: 45 }).map((_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  category: ["Fruits", "Beverages", "Dairy"][i % 3],
  price: (Math.random() * 500 + 50).toFixed(2),
  stock: Math.floor(Math.random() * 100),
  rating: (Math.random() * 5).toFixed(1),
}));

export default function WholesalerDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [metrics, setMetrics] = useState(initialMetrics);
  const [revenueData, setRevenueData] = useState(initialRevenueData);
  const [recentOrders, setRecentOrders] = useState(initialRecentOrders);
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [notifications, setNotifications] = useState(0);
  const [rightPanelOpen, setRightPanelOpen] = useState(true);

  const productsPerPage = 10;
  const menuItems = [
    { name: "Dashboard", icon: <Home size={20} /> },
    { name: "Orders", icon: <ShoppingCart size={20} /> },
    { name: "Products", icon: <Package size={20} /> },
    { name: "Customers", icon: <Users size={20} /> },
    { name: "Reports", icon: <BarChart2 size={20} /> },
    { name: "Settings", icon: <Settings size={20} /> },
  ];
  const categories = ["All", "Fruits", "Beverages", "Dairy"];

  const getStatusClass = (stock) => {
    if (stock === 0) return "bg-red-100 text-red-800";
    if (stock < 20) return "bg-yellow-100 text-yellow-800";
    return "bg-green-100 text-green-800";
  };

  const filteredProducts = products
    .filter(
      (p) =>
        (selectedCategory === "All" || p.category === selectedCategory) &&
        (p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.category.toLowerCase().includes(search.toLowerCase()))
    );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) =>
        prev.map((m) => {
          if (m.title === "Total Orders") return { ...m, value: m.value + Math.floor(Math.random() * 3) };
          if (m.title === "Revenue") return { ...m, value: m.value + Math.floor(Math.random() * 5000) };
          return m;
        })
      );

      const newOrder = {
        id: recentOrders.length + 201,
        customer: ["Retailer X", "Retailer Y", "Retailer Z"][Math.floor(Math.random() * 3)],
        total: Math.floor(Math.random() * 15000),
        status: ["Pending", "Shipped", "Delivered"][Math.floor(Math.random() * 3)],
      };
      setRecentOrders((prev) => [newOrder, ...prev].slice(0, 5));
      setNotifications((prev) => prev + 1);

      const lastMonth = revenueData[revenueData.length - 1];
      setRevenueData((prev) => [
        ...prev.slice(-5),
        {
          month: `M${prev.length + 1}`,
          revenue: lastMonth.revenue + Math.floor(Math.random() * 50000),
          orders: lastMonth.orders + Math.floor(Math.random() * 20),
        },
      ]);
    }, 5000);

    return () => clearInterval(interval);
  }, [metrics, recentOrders, revenueData]);

  return (
    <div className="min-h-screen flex bg-green-50">
      {/* Sidebar */}
      <aside className={`bg-green-600 text-white w-64 p-6 fixed h-full top-0 left-0 transform transition-transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 z-20`}>
        <h2 className="text-2xl font-bold mb-6">WholeSalePro</h2>
        <nav className="flex flex-col space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveMenu(item.name)}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all w-full justify-start hover:bg-green-500 ${activeMenu === item.name ? "bg-green-700 font-semibold" : ""}`}
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
            ☰
          </button>
          <h1 className="text-3xl font-bold text-gray-800">{activeMenu}</h1>
          <div className="flex items-center gap-4">
            <button className="relative">
              <Bell size={20} />
              {notifications > 0 && <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full animate-ping" />}
            </button>
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-700">WH</div>
          </div>
        </header>

        {/* Dashboard Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric) => (
            <div key={metric.title} className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-start hover:shadow-2xl transition transform hover:-translate-y-1">
              <div className="mb-3">{metric.icon}</div>
              <h3 className="text-gray-700 font-semibold">{metric.title}</h3>
              <p className="text-2xl font-bold text-gray-800">{metric.title === "Revenue" ? `₹${metric.value}` : metric.value}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Products & Orders */}
          <div className="flex-1">
            {/* Products Table */}
            <div className="bg-white shadow-lg rounded-2xl p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Products</h2>
              <div className="flex flex-wrap gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Search Products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="px-4 py-2 border rounded-lg w-full sm:w-1/2"
                />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 border rounded-lg"
                >
                  {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-green-600 text-white rounded-t-xl">
                    <tr>
                      <th className="py-3 px-4 text-left">Product</th>
                      <th className="py-3 px-4 text-left">Category</th>
                      <th className="py-3 px-4 text-left">Price (₹)</th>
                      <th className="py-3 px-4 text-left">Stock</th>
                      <th className="py-3 px-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedProducts.map((product) => (
                      <tr key={product.id} className="border-b hover:bg-green-50 transition">
                        <td className="py-3 px-4">{product.name}</td>
                        <td className="py-3 px-4">{product.category}</td>
                        <td className="py-3 px-4">₹{product.price}</td>
                        <td className={`py-3 px-4 font-semibold text-center ${getStatusClass(product.stock)}`}>
                          {product.stock > 0 ? product.stock : "Out"}
                        </td>
                        <td className="py-3 px-4 flex justify-center gap-2">
                          <button className="bg-blue-500 text-white p-1 rounded-lg hover:bg-blue-600"><Edit size={16} /></button>
                          <button className="bg-red-500 text-white p-1 rounded-lg hover:bg-red-600"><Trash size={16} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  Prev
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-1 rounded-lg transition ${currentPage === i + 1 ? "bg-green-700 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          {/* Real-time Sidebar Panel */}
          <div className={`w-full lg:w-80 bg-white shadow-lg rounded-2xl p-6 flex-shrink-0 transition-transform ${rightPanelOpen ? "translate-x-0" : "translate-x-full"} lg:translate-x-0`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Live Updates</h2>
              <button onClick={() => setRightPanelOpen(!rightPanelOpen)} className="text-gray-500 hover:text-gray-700">✕</button>
            </div>

            {/* Recent Orders */}
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Recent Orders</h3>
              <ul className="space-y-2 max-h-64 overflow-y-auto">
                {recentOrders.map((order) => (
                  <li key={order.id} className="bg-green-50 px-3 py-2 rounded-lg flex justify-between items-center">
                    <span className="text-sm">{order.customer}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusClass(order.total)}`}>{order.status}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Revenue Chart */}
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Revenue (Last 6 months)</h3>
              <ResponsiveContainer width="100%" height={150}>
                <BarChart data={revenueData}>
                  <XAxis dataKey="month" hide />
                  <YAxis hide />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#16a34a" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Stock Alerts */}
            <div>
              <h3 className="font-semibold mb-2">Stock Alerts</h3>
              <ul className="space-y-2">
                {products.filter(p => p.stock < 20).slice(0, 5).map(p => (
                  <li key={p.id} className="bg-yellow-50 px-3 py-2 rounded-lg text-sm flex justify-between">
                    <span>{p.name}</span>
                    <span>{p.stock}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
