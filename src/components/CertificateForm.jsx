import { useState } from 'react';
import axios from 'axios';

const CertificateForm = () => {
  const [file, setFile] = useState(null);
  const [logo, setLogo] = useState(null);
  const [title, setTitle] = useState('');
  const [type, setType] = useState('สี');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !title) {
      setError('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    if (file.type !== 'application/pdf') {
      setError('กรุณาอัพโหลดไฟล์ PDF เท่านั้น');
      return;
    }

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('ไฟล์มีขนาดใหญ่เกินไป (สูงสุด 10MB)');
      return;
    }

    // Check logo if exists
    if (logo) {
      if (!logo.type.startsWith('image/')) {
        setError('กรุณาอัพโหลดไฟล์รูปภาพเท่านั้น');
        return;
      }
      if (logo.size > 2 * 1024 * 1024) { // 2MB limit for logo
        setError('ไฟล์โลโก้มีขนาดใหญ่เกินไป (สูงสุด 2MB)');
        return;
      }
    }

    setLoading(true);
    setError('');
    setSuccess('');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('category', type);
    if (logo) {
      formData.append('logo', logo);
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('กรุณาเข้าสู่ระบบใหม่');
      }

      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/certificates`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.success) {
        setSuccess('อัพโหลดใบประกาศสำเร็จ');
        setTitle('');
        setFile(null);
        setLogo(null);
        setType('สี');
        // Reset file inputs
        e.target.reset();
      } else {
        throw new Error(response.data.message || 'เกิดข้อผิดพลาดในการอัพโหลด');
      }
    } catch (error) {
      if (error.response?.status === 401) {
        setError('กรุณาเข้าสู่ระบบใหม่');
        setTimeout(() => {
          window.location.href = '/admin/login';
        }, 2000);
      } else {
        setError(error.response?.data?.message || error.message || 'เกิดข้อผิดพลาดในการอัพโหลด');
      }
      console.error('Error uploading certificate:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-green-primary">อัพโหลดใบประกาศ</h2>
      
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
          <label htmlFor="title" className="block text-sm font-medium text-green-primary mb-1">
            ชื่อใบประกาศ
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-green-soft/30 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-orange focus:border-accent-orange"
            placeholder="กรอกชื่อใบประกาศ"
            required
          />
        </div>

        <div>
          <label htmlFor="type" className="block text-sm font-medium text-green-primary mb-1">
            ประเภทใบประกาศ
          </label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full px-3 py-2 border border-green-soft/30 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-orange focus:border-accent-orange"
            required
          >
            <option value="สี">สี</option>
            <option value="เหล็ก">เหล็ก</option>
            <option value="สถาบันไฟฟ้าและอิเล็กทรอนิกส์">สถาบันไฟฟ้าและอิเล็กทรอนิกส์</option>
          </select>
        </div>

        <div>
          <label htmlFor="logo" className="block text-sm font-medium text-green-primary mb-1">
            โลโก้ (ถ้ามี)
          </label>
          <input
            type="file"
            id="logo"
            accept="image/*"
            onChange={(e) => setLogo(e.target.files[0])}
            className="w-full px-3 py-2 border border-green-soft/30 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-orange focus:border-accent-orange"
          />
          <p className="mt-1 text-sm text-green-secondary">
            รองรับไฟล์รูปภาพ (JPG, PNG) ขนาดไม่เกิน 2MB
          </p>
          {logo && (
            <div className="mt-2">
              <img
                src={URL.createObjectURL(logo)}
                alt="Logo preview"
                className="h-20 w-20 object-contain border rounded border-green-soft/30"
              />
            </div>
          )}
        </div>

        <div>
          <label htmlFor="file" className="block text-sm font-medium text-green-primary mb-1">
            ไฟล์ใบประกาศ (PDF)
          </label>
          <input
            type="file"
            id="file"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full px-3 py-2 border border-green-soft/30 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-orange focus:border-accent-orange"
            required
          />
          <p className="mt-1 text-sm text-green-secondary">
            รองรับเฉพาะไฟล์ PDF ขนาดไม่เกิน 10MB
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded-md text-white font-medium ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-500 hover:bg-accent-orange-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-orange'
          } transition-colors`}
        >
          {loading ? 'กำลังอัพโหลด...' : 'อัพโหลดใบประกาศ'}
        </button>
      </form>
    </div>
  );
};

export default CertificateForm; 