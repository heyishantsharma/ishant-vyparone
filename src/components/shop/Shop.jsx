import { useState } from "react";
import { ShoppingBag, Filter, X, Trash2 } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function ShopPage() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const [products] = useState([
    {
      id: 1,
      name: "Premium Headphones",
      category: "Electronics",
      price: 2999,
      image: "https://cdn-icons-png.flaticon.com/512/1165/1165787.png",
      description: "High-quality over-ear headphones with noise cancellation and deep bass.",
    },
    {
      id: 2,
      name: "Organic Honey Jar",
      category: "Groceries",
      price: 450,
      image: "https://cdn-icons-png.flaticon.com/512/3081/3081559.png",
      description: "Pure organic honey harvested from natural farms — 100% chemical-free.",
    },
    {
      id: 3,
      name: "Modern Chair",
      category: "Furniture",
      price: 2499,
      image: "https://cdn-icons-png.flaticon.com/512/865/865020.png",
      description: "Ergonomic wooden chair with premium finish — perfect for your home or office.",
    },
    {
      id: 4,
      name: "Smart Watch",
      category: "Gadgets",
      price: 1999,
      image: "https://cdn-icons-png.flaticon.com/512/3474/3474364.png",
      description: "Track your fitness goals with our modern smartwatch and health features.",
    },
    {
      id: 5,
      name: "Men’s Casual Shoes",
      category: "Fashion",
      price: 1299,
      image: "https://cdn-icons-png.flaticon.com/512/188/188987.png",
      description: "Stylish and comfortable casual shoes, perfect for daily wear.",
    },
  ]);

  const categories = [
    { name: "Electronics", icon: "https://cdn-icons-png.flaticon.com/512/639/639365.png" },
    { name: "Groceries", icon: "https://cdn-icons-png.flaticon.com/512/3081/3081559.png" },
    { name: "Fashion", icon: "https://cdn-icons-png.flaticon.com/512/892/892458.png" },
    { name: "Home", icon: "https://cdn-icons-png.flaticon.com/512/69/69524.png" },
    { name: "Gadgets", icon: "https://cdn-icons-png.flaticon.com/512/1828/1828911.png" },
  ];

  const addToCart = (product) => {
    const existing = cartItems.find((item) => item.id === product.id);
    if (existing) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
    setCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 relative">
      {/* 🟩 Hero Section */}
      <section className="relative w-full h-[70vh] flex items-center justify-center bg-gradient-to-br from-green-600 to-green-500 text-white">
        <div className="absolute inset-0">
          <Swiper slidesPerView={1} loop autoplay={{ delay: 3000 }} modules={[Autoplay]} className="h-full">
            {[
              "https://img.freepik.com/free-photo/shopping-concept-with-cart-bags_23-2147695927.jpg",
              "https://img.freepik.com/free-photo/shopping-cart-with-products-inside_23-2148108541.jpg",
              "https://img.freepik.com/free-photo/front-view-female-holding-shopping-bags_23-2148626325.jpg",
            ].map((img, i) => (
              <SwiperSlide key={i}>
                <img src={img} alt="Shop Banner" className="w-full h-full object-cover opacity-80" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">Welcome to ShopSmart</h1>
          <p className="text-lg md:text-xl font-medium mb-6 text-green-100">
            Explore premium products and exclusive offers.
          </p>
          <button className="bg-white text-green-600 font-semibold px-6 py-3 rounded-xl hover:bg-green-100 transition-all shadow-lg">
            Start Shopping
          </button>
        </div>
      </section>

      {/* 🟢 Category Slider */}
      <section className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">🛍️ Shop by Category</h2>
        <Swiper
          slidesPerView={2}
          spaceBetween={15}
          breakpoints={{
            640: { slidesPerView: 3, spaceBetween: 20 },
            1024: { slidesPerView: 5, spaceBetween: 30 },
          }}
          autoplay={{ delay: 2500 }}
          modules={[Autoplay]}
          className="w-full"
        >
          {categories.map((cat, i) => (
            <SwiperSlide key={i}>
              <div className="flex flex-col items-center bg-white rounded-xl shadow-lg p-4 hover:bg-green-50 transition-all">
                <img src={cat.icon} alt={cat.name} className="w-16 h-16 mb-3" />
                <span className="font-semibold text-gray-700">{cat.name}</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* 🛒 Featured Products */}
      <section className="container mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">🌟 Featured Products</h2>
          <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition">
            <Filter size={18} /> Filter
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg overflow-hidden transition-transform transform hover:-translate-y-1"
            >
              <img src={product.image} alt={product.name} className="w-full h-48 object-contain p-4" />
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{product.name}</h3>
                <p className="text-gray-500 mb-3">{product.category}</p>
                <div className="flex justify-between items-center">
                  <span className="text-green-600 font-bold text-lg">₹{product.price}</span>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-all shadow"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 💚 Quick View Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl relative overflow-hidden">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-3 right-3 text-gray-600 hover:text-red-600"
            >
              <X size={26} />
            </button>
            <div className="grid md:grid-cols-2 gap-6 p-8">
              <div className="flex justify-center items-center">
                <img src={selectedProduct.image} alt={selectedProduct.name} className="w-56 h-56 object-contain" />
              </div>
              <div className="flex flex-col justify-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedProduct.name}</h2>
                <p className="text-gray-500 mb-3">{selectedProduct.category}</p>
                <p className="text-gray-700 mb-4">{selectedProduct.description}</p>
                <span className="text-green-600 font-bold text-2xl mb-4">₹{selectedProduct.price}</span>
                <button
                  onClick={() => {
                    addToCart(selectedProduct);
                    setSelectedProduct(null);
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl shadow-md transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 🛒 Cart Sidebar */}
      <div
        className={`fixed top-0 right-0 w-80 bg-white h-full shadow-2xl transform transition-transform duration-300 z-50 ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold text-green-700 flex items-center gap-2">
            <ShoppingBag size={22} /> Your Cart
          </h2>
          <button onClick={() => setCartOpen(false)} className="text-gray-600 hover:text-red-600">
            <X size={24} />
          </button>
        </div>
        <div className="p-4 space-y-4 overflow-y-auto h-[70vh]">
          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-center mt-8">Your cart is empty 🛍️</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between bg-green-50 rounded-lg p-3 shadow-sm">
                <img src={item.image} alt={item.name} className="w-14 h-14 object-contain" />
                <div className="flex-1 ml-3">
                  <h4 className="font-semibold text-gray-700">{item.name}</h4>
                  <p className="text-sm text-green-700">₹{item.price} × {item.quantity}</p>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700">
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>
        {cartItems.length > 0 && (
          <div className="border-t p-4">
            <div className="flex justify-between text-lg font-semibold mb-3">
              <span>Total:</span>
              <span className="text-green-700">₹{total}</span>
            </div>
            <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium shadow-md transition">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
