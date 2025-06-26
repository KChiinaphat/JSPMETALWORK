import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductForm from '../../components/ProductForm';
import CertificateForm from '../../components/CertificateForm';
import CertificateList from '../../components/CertificateList';
import ProductList from '../../components/ProductList';

const AdminPage = () => {
  const navigate = useNavigate();
  const [showProductForm, setShowProductForm] = useState(false);
  const [showCertificateForm, setShowCertificateForm] = useState(false);
  const [showProductList, setShowProductList] = useState(false);
  const [showCertificateList, setShowCertificateList] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (!token || role !== 'admin') {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">แผงควบคุมผู้ดูแลระบบ</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            ออกจากระบบ
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <button
            onClick={() => {
              setShowProductForm(true);
              setShowCertificateForm(false);
              setShowProductList(false);
              setShowCertificateList(false);
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-lg shadow"
          >
            เพิ่มสินค้า
          </button>
          <button
            onClick={() => {
              setShowCertificateForm(true);
              setShowProductForm(false);
              setShowProductList(false);
              setShowCertificateList(false);
            }}
            className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-lg shadow"
          >
            อัพโหลดใบประกาศ
          </button>
          <button
            onClick={() => {
              setShowProductList(true);
              setShowProductForm(false);
              setShowCertificateForm(false);
              setShowCertificateList(false);
            }}
            className="bg-purple-500 hover:bg-purple-600 text-white p-4 rounded-lg shadow"
          >
            แสดงสินค้าทั้งหมด
          </button>
          <button
            onClick={() => {
              setShowCertificateList(true);
              setShowProductForm(false);
              setShowCertificateForm(false);
              setShowProductList(false);
            }}
            className="bg-yellow-500 hover:bg-yellow-600 text-white p-4 rounded-lg shadow"
          >
            แสดงใบประกาศทั้งหมด
          </button>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          {showProductForm && <ProductForm />}
          {showCertificateForm && <CertificateForm />}
          {showProductList && <ProductList />}
          {showCertificateList && <CertificateList />}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;