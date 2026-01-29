import { useState } from "react";
import {
  PlusCircle,
  Search,
  Filter,
  Edit,
  Trash2,
  Menu,
  Tag,
  DollarSign,
  Package,
  X,
  Upload,
} from "lucide-react";

export default function ProductsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [priceRange, setPriceRange] = useState(1000);
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    image: "",
  });

  const categories = ["All", "Groceries", "Beverages", "Cooking Essentials"];

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Organic Honey 1kg",
      category: "Groceries",
      price: 450,
      stock: 120,
      image:
        "https://images.unsplash.com/photo-1615485737457-58c2f2b7f9a3?auto=format&fit=crop&w=600&q=60",
    },
    {
      id: 2,
      name: "Green Tea Pack",
      category: "Beverages",
      price: 180,
      stock: 60,
      image:
        "https://images.unsplash.com/photo-1615485291964-61d9b6b58c41?auto=format&fit=crop&w=600&q=60",
    },
    {
      id: 3,
      name: "Rice Bag 10kg",
      category: "Groceries",
      price: 850,
      stock: 200,
      image:
        "https://images.unsplash.com/photo-1603048297501-e636c9c85b87?auto=format&fit=crop&w=600&q=60",
    },
  ]);

  const handleAddProduct = () => {
    if (!formData.name || !formData.category || !formData.price) return;
    if (editProduct) {
      setProducts((prev) =>
        prev.map((p) => (p.id === editProduct.id ? { ...editProduct, ...formData } : p))
      );
    } else {
      setProducts([
        ...products,
        { ...formData, id: Date.now(), price: Number(formData.price) },
      ]);
    }
    setFormData({ name: "", category: "", price: "", stock: "", image: "" });
    setEditProduct(null);
    setShowModal(false);
  };

  const handleEdit = (product) => {
    setEditProduct(product);
    setFormData(product);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "All" || p.category === filterCategory;
    const matchesPrice = p.price <= priceRange;
    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="flex min-h-screen bg-green-50">
      {/* Sidebar */}
      <aside
        className={`bg-green-700 text-white w-64 p-6 fixed md:relative md:flex-shrink-0 h-screen transition-transform transform z-30 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <h2 className="text-2xl font-bold mb-8 tracking-wide">ShopSmart Admin</h2>
        <nav className="flex flex-col space-y-2">
          <button className="text-left px-4 py-2 rounded-lg hover:bg-green-600 transition">Dashboard</button>
          <button className="text-left px-4 py-2 bg-green-600 rounded-lg">Products</button>
          <button className="text-left px-4 py-2 rounded-lg hover:bg-green-600 transition">Orders</button>
          <button className="text-left px-4 py-2 rounded-lg hover:bg-green-600 transition">Customers</button>
          <button className="text-left px-4 py-2 rounded-lg hover:bg-green-600 transition">Reports</button>
          <button className="text-left px-4 py-2 rounded-lg hover:bg-green-600 transition">Settings</button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-0 md:ml-64 p-6">
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-green-800">Product Management</h1>
          <button className="md:hidden text-green-700" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu size={26} />
          </button>
        </header>

        {/* Search + Filter + Add */}
        <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
          <div className="flex items-center bg-white border rounded-lg shadow-sm px-3 py-2 w-full sm:w-1/2">
            <Search className="text-gray-400 mr-2" size={18} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full outline-none text-gray-700"
            />
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <select
              className="border rounded-lg px-3 py-2 bg-white text-gray-700 shadow-sm"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </select>

            <div className="flex items-center bg-white border rounded-lg shadow-sm px-3 py-2">
              <Filter size={18} className="text-gray-500 mr-2" />
              <input
                type="range"
                min="100"
                max="1000"
                step="50"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
              />
              <span className="ml-2 text-sm text-gray-600">₹{priceRange}</span>
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition"
            >
              <PlusCircle size={18} /> Add Product
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 overflow-hidden"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-green-800 text-lg mb-1">{product.name}</h3>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Tag size={16} /> {product.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <DollarSign size={16} /> {product.price}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className="flex items-center gap-1 text-gray-500 text-sm">
                    <Package size={16} /> {product.stock} in stock
                  </span>
                  <div className="flex gap-2">
                    <button
                      className="bg-green-100 text-green-700 p-1 rounded-lg hover:bg-green-200"
                      onClick={() => handleEdit(product)}
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      className="bg-red-100 text-red-600 p-1 rounded-lg hover:bg-red-200"
                      onClick={() => handleDelete(product.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-10 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} ShopSmart Admin. All rights reserved.
        </footer>
      </div>

      {/* Add/Edit Product Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl relative animate-fadeIn">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setShowModal(false)}
            >
              <X size={22} />
            </button>

            <div className="p-6">
              <h2 className="text-2xl font-bold text-green-700 mb-4">
                {editProduct ? "Edit Product" : "Add New Product"}
              </h2>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Product Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="text"
                  placeholder="Category"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="number"
                  placeholder="Price (₹)"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="number"
                  placeholder="Stock Quantity"
                  value={formData.stock}
                  onChange={(e) =>
                    setFormData({ ...formData, stock: e.target.value })
                  }
                  className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-green-500"
                />
                <div className="flex items-center gap-2 border rounded-lg p-2 bg-gray-50">
                  <Upload size={20} className="text-gray-500" />
                  <input
                    type="text"
                    placeholder="Image URL"
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    className="w-full outline-none bg-transparent"
                  />
                </div>
                <button
                  onClick={handleAddProduct}
                  className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                >
                  {editProduct ? "Update Product" : "Add Product"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
