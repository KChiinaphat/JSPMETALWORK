import { useState } from 'react';
import axios from 'axios';

const ProductForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('ตู้พาเนล');
  const [image, setImage] = useState(null); // เปลี่ยนจาก imageUrl เป็น image เพื่อความชัดเจน

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ตรวจสอบความครบถ้วน
    if (!name || !description || !price || !category || !image) {
      setError('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    // ตรวจสอบราคา
    const priceValue = Number(price);
    if (isNaN(priceValue) || priceValue <= 0) {
      setError('กรุณากรอกราคาที่ถูกต้องและมากกว่า 0');
      return;
    }

    // ตรวจสอบไฟล์รูปภาพ
    if (!(image instanceof File) || !image.type.startsWith('image/')) {
      setError('กรุณาอัปโหลดไฟล์รูปภาพที่ถูกต้อง');
      return;
    }
    if (image.size > 5 * 1024 * 1024) {
      setError('ไฟล์รูปภาพมีขนาดใหญ่เกินไป (สูงสุด 5MB)');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('กรุณาเข้าสู่ระบบใหม่');

      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', priceValue);
      formData.append('category', category);
      formData.append('image', image);

      // ล็อก FormData เพื่อ debug
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value instanceof File ? value.name : value);
      }

      const response = await axios.post('http://localhost:5000/api/products', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Response จาก backend:', response.data);

      if (response.status === 201 || response.data.success) {
        setSuccess('เพิ่มสินค้าสำเร็จ');
        setName('');
        setDescription('');
        setPrice('');
        setCategory('ตู้พาเนล');
        setImage(null);
        e.target.reset();
      } else {
        throw new Error(response.data.message || 'เกิดข้อผิดพลาดในการเพิ่มสินค้า');
      }
    } catch (error) {
      console.error('ข้อผิดพลาดจากเซิร์ฟเวอร์:', JSON.stringify(error.response?.data, null, 2));
      console.error('รายละเอียด error response:', JSON.stringify(error.response, null, 2));
      if (error.response?.status === 401) {
        setError('กรุณาเข้าสู่ระบบใหม่');
        setTimeout(() => {
          window.location.href = '/admin/login';
        }, 2000);
      } else {
        setError(
          error.response?.data?.message ||
          error.response?.data?.error?.message ||
          error.message ||
          'เกิดข้อผิดพลาดในการเพิ่มสินค้า'
        );
      }
      console.error('Error adding product:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-green-primary">เพิ่มสินค้า</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-green-primary mb-1">
            ชื่อสินค้า
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 border border-green-soft/30 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-orange focus:border-accent-orange"
            placeholder="กรอกชื่อสินค้า"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-green-primary mb-1">
            รายละเอียด
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={3}
            className="w-full px-3 py-2 border border-green-soft/30 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-orange focus:border-accent-orange"
            placeholder="กรอกรายละเอียดสินค้า"
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-green-primary mb-1">
            ราคา
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            min="0"
            step="0.01"
            className="w-full px-3 py-2 border border-green-soft/30 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-orange focus:border-accent-orange"
            placeholder="กรอกราคา"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-green-primary mb-1">
            หมวดหมู่
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full px-3 py-2 border border-green-soft/30 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-orange focus:border-accent-orange"
          >
            <option value="ตู้พาเนล">ตู้พาเนล</option>
            <option value="ตู้เฟรม">ตู้เฟรม</option>
          </select>
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium text-green-primary mb-1">
            รูปภาพสินค้า
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required
            className="w-full px-3 py-2 border border-green-soft/30 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-orange focus:border-accent-orange"
          />
          <p className="mt-1 text-sm text-green-secondary">รองรับไฟล์รูปภาพขนาดไม่เกิน 5MB</p>
          {image && (
            <div className="mt-2">
              <img
                src={URL.createObjectURL(image)}
                alt="Preview"
                className="h-24 w-24 object-contain border rounded border-green-soft/30"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded-md text-white font-medium ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-accent-orange hover:bg-accent-orange-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-orange'
          } transition-colors`}
        >
          {loading ? 'กำลังเพิ่มสินค้า...' : 'เพิ่มสินค้า'}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;