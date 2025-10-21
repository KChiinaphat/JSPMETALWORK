import { useState, useEffect } from "react";
import axios from "axios";

const EditProduct = () => {
  const [products, setProducts] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    category: "",
    images: [],
  });
  const [newImages, setNewImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // โหลดสินค้าทั้งหมด
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("กรุณาเข้าสู่ระบบใหม่");

        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err.response?.data?.message || err.message);
      }
    };
    fetchProducts();
  }, []);

  // โหลดข้อมูลสินค้าที่เลือก
  useEffect(() => {
    if (!selectedId) return;
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("กรุณาเข้าสู่ระบบใหม่");

        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/products/${selectedId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setProductData(res.data);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(err.response?.data?.message || err.message);
      }
    };
    fetchProduct();
  }, [selectedId]);

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setNewImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedId) return alert("กรุณาเลือกสินค้าก่อน");

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("กรุณาเข้าสู่ระบบใหม่");

      setLoading(true);
      const formData = new FormData();
      formData.append("name", productData.name);
      formData.append("price", productData.price);
      formData.append("category", productData.category);

      newImages.forEach((file) => formData.append("images", file));

      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/products/${selectedId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("แก้ไขสินค้าเรียบร้อยแล้ว!");
      setNewImages([]);
    } catch (err) {
      console.error("Error updating product:", err);
      if (err.response?.status === 401) {
        alert("กรุณาเข้าสู่ระบบใหม่");
        window.location.href = "/admin/login";
      } else {
        setError(err.response?.data?.message || err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">แก้ไขสินค้า</h2>

      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      {/* Select เลือกสินค้า */}
      <label className="block mb-2 font-medium">เลือกสินค้า</label>
      <select
        value={selectedId}
        onChange={(e) => setSelectedId(e.target.value)}
        className="border px-3 py-2 rounded w-full mb-4"
      >
        <option value="">-- เลือกสินค้า --</option>
        {products.map((p) => (
          <option key={p._id} value={p._id}>
            {p.name}
          </option>
        ))}
      </select>

      {/* ฟอร์มแก้ไข */}
      {selectedId && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">ชื่อสินค้า</label>
            <input
              type="text"
              name="name"
              value={productData.name}
              onChange={handleChange}
              className="border px-3 py-2 rounded w-full"
              required
            />
          </div>

          <div>
            <label className="block mb-1">ราคา</label>
            <input
              type="number"
              name="price"
              value={productData.price}
              onChange={handleChange}
              className="border px-3 py-2 rounded w-full"
              required
            />
          </div>

          <div>
            <label className="block mb-1">หมวดหมู่</label>
            <select
              name="category"
              value={productData.category}
              onChange={handleChange}
              className="border px-3 py-2 rounded w-full"
              required
            >
              <option value="">-- เลือกหมวดหมู่ --</option>
              <option value="ตู้พาเนล">ตู้พาเนล</option>
              <option value="ตู้เฟรม">ตู้เฟรม</option>
            </select>
          </div>

          <div>
            <label className="block mb-1">รูปเดิม</label>
            <div className="flex gap-2 flex-wrap">
              {productData.images?.map((img, idx) => (
                <img
                  key={idx}
                  src={img.url || img}
                  alt={`old-${idx}`}
                  className="w-24 h-24 object-cover rounded border"
                />
              ))}
            </div>
          </div>

          <div>
            <label className="block mb-1"   >อัปโหลดรูปใหม่โดยถ้าไม่เปลี่ยนใช่รูปเดิมนะครับเเต่สามารถเปลี่ยนรูปใหม่ได้</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="border px-3 py-2 rounded w-full"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            {loading ? "กำลังอัปเดต..." : "บันทึกการแก้ไข"}
          </button>
        </form>
      )}
    </div>
  );
};

export default EditProduct;
