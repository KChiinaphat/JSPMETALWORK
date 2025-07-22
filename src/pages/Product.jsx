import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const ProductPage = () => {
  const [category, setCategory] = useState("ตู้พาเนล");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        const categorized = res.data.reduce((acc, product) => {
          const cat = product.category || "other";
          if (!acc[cat]) acc[cat] = [];
          acc[cat].push(product);
          return acc;
        }, {});
        setProducts(categorized);
        setError("");
      } catch (err) {
        console.error(err);
        setError("ไม่สามารถโหลดข้อมูลสินค้าได้");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <main className="py-12 px-4 sm:px-8 lg:px-16 bg-base-light">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="relative inline-block text-4xl md:text-5xl font-bold mb-6">
          <span className="text-green-primary">สินค้า</span>
          <span className="text-green-secondary">ของเรา</span>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-accent-orange to-accent-orange-light"></div>
        </h1>
        <p className="text-black max-w-2xl mx-auto text-lg">
          เลือกดูสินค้าตามหมวดหมู่ที่ต้องการ
        </p>
      </motion.div>

      {/* Category Selector */}
      <div className="flex justify-center space-x-4 mb-12">
        <button
          onClick={() => setCategory("ตู้พาเนล")}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            category === "ตู้พาเนล"
              ? "bg-amber-100 text-green-primary"
              : "bg-green-primary text-white hover:bg-green-secondary hover:text-black"
          }`}
        >
          ตู้ไฟฟ้าชนิดตู้พาเเนล
        </button>
        <button
          onClick={() => setCategory("ตู้เฟรม")}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            category === "ตู้เฟรม"
              ? "bg-amber-100  text-green-primary"
              : "bg-green-primary text-white hover:bg-green-secondary hover:text-black"
          }`}
        >
          ตู้ไฟฟ้าชนิดตู้เฟรม
        </button>
      </div>

      {loading ? (
        <p className="text-center text-green-secondary">กำลังโหลดข้อมูล...</p>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          >
            {products[category]?.length === 0 || !products[category] ? (
              <p className="col-span-full text-center text-accent-orange text-lg">
                ยังไม่มีสินค้าชนิดนี้
              </p>
            ) : (
              products[category].map((product, idx) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-green-soft/20"
                >
                  <div className="aspect-w-16 aspect-h-9 bg-green-bg/30">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-green-primary">
                      {product.name}
                    </h3>
                    {product.description && (
                      <p className="text-green-secondary mb-4">
                        {product.description}
                      </p>
                    )}
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-emerald-400 font-bold">
                        ฿{product.price?.toLocaleString() || "N/A"}
                      </span>
                      <Link
                        to={`/product/${product._id}`}
                        className="px-4 py-2 bg-emerald-400 hover:bg-emerald-500 text-white rounded-lg transition-colors duration-300"
                      >
                        ดูรายละเอียด
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        </AnimatePresence>
      )}
    </main>
  );
};

export default ProductPage;
