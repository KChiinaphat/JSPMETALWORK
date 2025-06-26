import { useState, useEffect } from 'react';
import axios from 'axios';

const CertificateList = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('ทั้งหมด');

  useEffect(() => {
    fetchCertificates();
  }, [filter]);

  const fetchCertificates = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('กรุณาเข้าสู่ระบบใหม่');
      }

      let url = 'http://localhost:5000/api/certificates';
      if (filter !== 'ทั้งหมด') {
        url += `?category=${encodeURIComponent(filter)}`;
      }

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (Array.isArray(response.data)) {
        setCertificates(response.data);
      } else if (response.data?.certificates) {
        setCertificates(response.data.certificates);
      } else {
        throw new Error('รูปแบบข้อมูลไม่ถูกต้อง');
      }
    } catch (error) {
      if (error.response?.status === 401) {
        setError('กรุณาเข้าสู่ระบบใหม่');
        setTimeout(() => {
          window.location.href = '/admin/login';
        }, 2000);
      } else {
        setError(error.response?.data?.message || error.message || 'ไม่สามารถโหลดข้อมูลใบประกาศได้');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('คุณต้องการลบใบประกาศนี้ใช่หรือไม่?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('กรุณาเข้าสู่ระบบใหม่');
      }

      const response = await axios.delete(`http://localhost:5000/api/certificates/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        fetchCertificates(); // Refresh list
      } else {
        throw new Error(response.data.message || 'ไม่สามารถลบใบประกาศได้');
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message || 'ไม่สามารถลบใบประกาศได้');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-orange"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <label htmlFor="filter" className="block text-sm font-medium text-green-primary mb-1">
          กรองตามประเภท
        </label>
        <select
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full px-3 py-2 border border-green-soft/30 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-orange focus:border-accent-orange"
        >
          <option value="ทั้งหมด">ทั้งหมด</option>
          <option value="สี">สี</option>
          <option value="เหล็ก">เหล็ก</option>
          {/* เพิ่มหมวดอื่นๆ ได้ที่นี่ */}
        </select>
      </div>

      <div className="grid gap-6">
        {certificates.map((cert) => (
          <div key={cert._id} className="bg-white p-6 rounded-lg shadow-md border border-green-soft/20">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-start gap-4">
                {cert.logo && (
                  <img
                    src={cert.logo.url}
                    alt="Logo"
                    className="h-16 w-16 object-contain border rounded border-green-soft/30"
                  />
                )}
                <div>
                  <h3 className="font-semibold text-lg text-green-primary">{cert.name}</h3>
                  <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                    cert.category === 'สี' ? 'bg-green-bg text-green-primary' : 'bg-green-soft text-green-primary'
                  }`}>
                    {cert.category}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-accent-orange hover:bg-accent-orange-dark text-white px-3 py-1 rounded text-sm transition-colors"
                >
                  ดูไฟล์
                </a>
                <a
                  href={cert.url}
                  download
                  className="bg-green-primary hover:bg-green-secondary text-white px-3 py-1 rounded text-sm transition-colors"
                >
                  ดาวน์โหลด
                </a>
                <button
                  onClick={() => handleDelete(cert._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors"
                >
                  ลบ
                </button>
              </div>
            </div>
            <div className="text-sm text-green-secondary">
              อัพโหลดเมื่อ: {new Date(cert.createdAt).toLocaleString('th-TH')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CertificateList;
