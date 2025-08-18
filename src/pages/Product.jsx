import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "../components/Productcard";

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
              products[category].map((product) => (
                <ProductCard
                  key={product._id}
                  _id={product._id}
                  name={product.name}
                  description={product.description}
                  images={product.images} // ต้องเป็น array [{url: "..."}]
                  price={product.price}
                  category={product.category}
                />
              ))
            )}
          </motion.div>
        </AnimatePresence>
      )}
    </main>
  );
};

export default ProductPage;
