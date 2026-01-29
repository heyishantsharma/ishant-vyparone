import { useState } from "react";
import { Package, ShoppingCart, Star, Filter, Store, X } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const shops = [
  {
    id: 1,
    name: "FreshMart",
    banner:
      "https://img.freepik.com/free-photo/assortment-organic-vegetables-market_23-2148641719.jpg",
  },
  {
    id: 2,
    name: "DailyNeeds",
    banner:
      "https://img.freepik.com/free-photo/supermarket-basket-full-products_23-2148579393.jpg",
  },
];

const categories = [
  { id: 1, name: "Fruits & Vegetables", items: 120 },
  { id: 2, name: "Beverages", items: 80 },
  { id: 3, name: "Dairy Products", items: 60 },
  { id: 4, name: "Snacks & Bakery", items: 90 },
];

const products = Array.from({ length: 16 }).map((_, idx) => ({
  id: idx,
  name: `Product ${idx + 1}`,
  price: (Math.random() * 100 + 10).toFixed(2),
  stock: Math.floor(Math.random() * 100),
  rating: (Math.random() * 5).toFixed(1),
  description: "Top-quality product for your daily needs.",
  image: "https://cdn-icons-png.flaticon.com/512/3081/3081559.png",
}));

export default function CategoryPage() {
  const [selectedShop, setSelectedShop] = useState(shops[0]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = selectedCategory
    ? products.filter((_, i) => i % categories.length === selectedCategory.id - 1)
    : products;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">

      {/* Hero Slider */}
      <section className="relative w-full h-[60vh]">
        <Swiper slidesPerView={1} loop autoplay={{ delay: 3000 }} modules={[Autoplay]} className="h-full">
          {shops.map((shop) => (
            <SwiperSlide key={shop.id}>
              <div className="relative w-full h-[60vh]">
                <img
                  src={shop.banner}
                  alt={shop.name}
                  className="w-full h-full object-cover brightness-75"
                />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white bg-black/40">
                  <Store size={48} className="mb-3 text-green-300" />
                  <h1 className="text-4xl md:text-5xl font-bold mb-3">{shop.name}</h1>
                  <p className="text-lg max-w-lg text-center">
                    Your trusted destination for fresh groceries and daily essentials.
                  </p>
                  <button
                    onClick={() => setSelectedShop(shop)}
                    className="mt-6 bg-green-600 hover:bg-green-700 px-6 py-2 rounded-xl text-white font-semibold transition-all"
                  >
                    Visit {shop.name}
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Shop Selector */}
      <div className="flex justify-center gap-4 mt-8 flex-wrap">
        {shops.map((shop) => (
          <button
            key={shop.id}
            onClick={() => setSelectedShop(shop)}
            className={`px-6 py-2 rounded-xl font-semibold shadow transition-all ${
              selectedShop.id === shop.id
                ? "bg-green-600 text-white"
                : "bg-white text-green-600 border border-green-600 hover:bg-green-100"
            }`}
          >
            {shop.name}
          </button>
        ))}
      </div>

      {/* Category Selector */}
      <section className="container mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Shop by Category</h2>
          <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
            <Filter size={18} /> Filter
          </button>
        </div>

        <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat)}
              className={`flex items-center space-x-2 px-5 py-3 rounded-xl border shadow-sm transition-all ${
                selectedCategory?.id === cat.id
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-white text-green-600 border-green-600 hover:bg-green-100"
              }`}
            >
              <Package size={20} />
              <span>{cat.name}</span>
              <span className="text-sm bg-white text-green-600 px-2 py-0.5 rounded-full">{cat.items}</span>
            </button>
          ))}
          <button
            onClick={() => setSelectedCategory(null)}
            className="px-4 py-2 rounded-xl bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
          >
            All
          </button>
        </div>
      </section>

      {/* Product Grid */}
      <section className="container mx-auto px-6 pb-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Top Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1 p-5 flex flex-col text-center cursor-pointer"
              onClick={() => setSelectedProduct(product)}
            >
              <div className="relative">
                <img src={product.image} alt={product.name} className="w-40 h-40 mx-auto object-contain mb-4"/>
                {product.stock < 20 && (
                  <span className="absolute top-2 left-2 bg-yellow-400 text-xs text-white px-2 py-1 rounded-full">
                    Low Stock
                  </span>
                )}
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">{product.name}</h3>
              <p className="text-green-600 font-bold mb-1">₹{product.price}</p>
              <div className="flex justify-center items-center mb-2">
                <Star className="text-yellow-400 w-4 h-4" />
                <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
              </div>
              <p className={`text-sm mb-3 ${product.stock > 0 ? "text-gray-600" : "text-red-500"}`}>
                {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
              </p>
              <button
                className={`mt-auto flex items-center justify-center gap-2 w-full py-2 rounded-xl font-semibold transition-all ${
                  product.stock > 0
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-gray-400 text-gray-200 cursor-not-allowed"
                }`}
              >
                <ShoppingCart size={18} /> Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Product Sidebar Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
          <div className="w-full max-w-md bg-white h-full p-6 relative overflow-y-auto">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-green-600"
              onClick={() => setSelectedProduct(null)}
            >
              <X size={28} />
            </button>
            <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-64 object-contain mb-4"/>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedProduct.name}</h2>
            <p className="text-green-600 font-bold text-xl mb-2">₹{selectedProduct.price}</p>
            <div className="flex items-center mb-4">
              <Star className="text-yellow-400 w-4 h-4" />
              <span className="ml-1 text-sm text-gray-600">{selectedProduct.rating}</span>
            </div>
            <p className="text-gray-600 mb-4">{selectedProduct.description}</p>
            <div className="flex gap-4 mb-4">
              <input
                type="number"
                defaultValue={1}
                min={1}
                className="w-24 border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-xl transition-all flex justify-center items-center gap-2">
                <ShoppingCart size={18} /> Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
