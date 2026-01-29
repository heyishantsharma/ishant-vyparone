import { useState } from "react";
import { Search, Filter, Plus, FileDown, Edit, Trash2, X } from "lucide-react";

// Mock Data
const mockStocks = [
  { id: 1, name: "Fresh Apples", category: "Fruits", quantity: 120, unit: "kg", status: "In Stock" },
  { id: 2, name: "Milk Packets", category: "Dairy", quantity: 45, unit: "ltr", status: "Low Stock" },
  { id: 3, name: "Bread Loaf", category: "Bakery", quantity: 0, unit: "pcs", status: "Out of Stock" },
  { id: 4, name: "Orange Juice", category: "Beverages", quantity: 85, unit: "ltr", status: "In Stock" },
  { id: 5, name: "Rice Bag", category: "Grains", quantity: 12, unit: "kg", status: "Low Stock" },
  { id: 6, name: "Butter", category: "Dairy", quantity: 90, unit: "pkt", status: "In Stock" },
  { id: 7, name: "Pasta", category: "Snacks", quantity: 35, unit: "pkt", status: "Low Stock" },
  { id: 8, name: "Coca-Cola", category: "Beverages", quantity: 200, unit: "btl", status: "In Stock" },
];

export default function StockListPage() {
  const [search, setSearch] = useState("");
  const [stocks, setStocks] = useState(mockStocks);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const itemsPerPage = 5;
  const filteredStocks = stocks.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedStocks = filteredStocks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredStocks.length / itemsPerPage);

  // Export to CSV
  const exportCSV = () => {
    const csvRows = [
      ["ID", "Name", "Category", "Quantity", "Unit", "Status"],
      ...stocks.map((item) => [
        item.id,
        item.name,
        item.category,
        item.quantity,
        item.unit,
        item.status,
      ]),
    ];
    const blob = new Blob([csvRows.map((r) => r.join(",")).join("\n")], {
      type: "text/csv",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "stock_list.csv";
    link.click();
  };

  // Handle Add/Edit
  const handleSave = (item) => {
    if (editItem) {
      setStocks(stocks.map((s) => (s.id === editItem.id ? item : s)));
    } else {
      setStocks([...stocks, { ...item, id: stocks.length + 1 }]);
    }
    setShowModal(false);
    setEditItem(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 p-6 my-20">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-green-700 mb-4 sm:mb-0">📦 Stock Management</h1>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search items..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-4 py-2 border border-green-300 rounded-xl focus:ring-2 focus:ring-green-400 outline-none w-60"
              />
            </div>
            <button
              className="flex items-center bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition"
              onClick={() => setShowModal(true)}
            >
              <Plus size={18} className="mr-2" /> Add Item
            </button>
            <button
              className="flex items-center bg-green-100 text-green-700 px-4 py-2 rounded-xl hover:bg-green-200 transition"
              onClick={exportCSV}
            >
              <FileDown size={18} className="mr-2" /> Export CSV
            </button>
          </div>
        </div>

        {/* Stock Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-x-auto">
          <table className="min-w-full text-left text-gray-700">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="px-6 py-3 font-semibold">#</th>
                <th className="px-6 py-3 font-semibold">Product</th>
                <th className="px-6 py-3 font-semibold">Category</th>
                <th className="px-6 py-3 font-semibold">Quantity</th>
                <th className="px-6 py-3 font-semibold">Status</th>
                <th className="px-6 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedStocks.map((item) => (
                <tr key={item.id} className="border-b hover:bg-green-50 transition">
                  <td className="px-6 py-3">{item.id}</td>
                  <td className="px-6 py-3 font-medium">{item.name}</td>
                  <td className="px-6 py-3">{item.category}</td>
                  <td className="px-6 py-3">{item.quantity} {item.unit}</td>
                  <td className="px-6 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        item.status === "In Stock"
                          ? "bg-green-100 text-green-700"
                          : item.status === "Low Stock"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-right">
                    <button
                      onClick={() => {
                        setEditItem(item);
                        setShowModal(true);
                      }}
                      className="text-green-600 hover:underline mr-3"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => setStocks(stocks.filter((s) => s.id !== item.id))}
                      className="text-red-600 hover:underline"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredStocks.length === 0 && (
            <div className="text-center py-6 text-gray-500">No items found.</div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6 space-x-2">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-xl ${
                currentPage === i + 1
                  ? "bg-green-600 text-white"
                  : "bg-white border text-green-700 hover:bg-green-100"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-96 relative">
            <button
              onClick={() => {
                setShowModal(false);
                setEditItem(null);
              }}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={18} />
            </button>
            <h2 className="text-xl font-bold text-green-700 mb-4">
              {editItem ? "Edit Stock Item" : "Add New Stock"}
            </h2>
            <StockForm item={editItem} onSave={handleSave} />
          </div>
        </div>
      )}
    </div>
  );
}

function StockForm({ item, onSave }) {
  const [form, setForm] = useState(
    item || { name: "", category: "", quantity: "", unit: "", status: "In Stock" }
  );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave(form);
      }}
      className="space-y-3"
    >
      <input
        type="text"
        placeholder="Product Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-green-400"
        required
      />
      <input
        type="text"
        placeholder="Category"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
        className="w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-green-400"
        required
      />
      <input
        type="number"
        placeholder="Quantity"
        value={form.quantity}
        onChange={(e) => setForm({ ...form, quantity: e.target.value })}
        className="w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-green-400"
        required
      />
      <input
        type="text"
        placeholder="Unit (e.g., kg, pcs)"
        value={form.unit}
        onChange={(e) => setForm({ ...form, unit: e.target.value })}
        className="w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-green-400"
        required
      />
      <select
        value={form.status}
        onChange={(e) => setForm({ ...form, status: e.target.value })}
        className="w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-green-400"
      >
        <option>In Stock</option>
        <option>Low Stock</option>
        <option>Out of Stock</option>
      </select>
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition"
      >
        Save
      </button>
    </form>
  );
}
