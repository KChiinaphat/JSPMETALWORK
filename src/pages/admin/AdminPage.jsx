import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductForm from '../../components/ProductForm';
import CertificateForm from '../../components/CertificateForm';
import CertificateList from '../../components/CertificateList';
import ProductList from '../../components/ProductList';
import ProjectForm from '../../components/ProjectForm';
import ProjectList from '../../components/ProjectList';
import EditProduct from '../../components/EditProduct';

const AdminPage = () => {
  const navigate = useNavigate();
  const [showProductForm, setShowProductForm] = useState(false);
  const [showCertificateForm, setShowCertificateForm] = useState(false);
  const [showProductList, setShowProductList] = useState(false);
  const [showCertificateList, setShowCertificateList] = useState(false);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showProjectList, setShowProjectList] = useState(false);
  const [showEditProduct, setShowEditProduct] = useState(false);

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

  // ฟังก์ชัน reset toggle แสดงฟอร์มหรือ list ตัวอื่น ๆ
  const resetAll = () => {
    setShowProductForm(false);
    setShowCertificateForm(false);
    setShowProductList(false);
    setShowCertificateList(false);
    setShowProjectForm(false);
    setShowProjectList(false);
    setShowEditProduct(false);
  };

  // ฟังก์ชัน toggle ที่สามารถกดซ้ำเพื่อปิดได้
  const toggleProductForm = () => {
    if (showProductForm) resetAll();
    else {
      resetAll();
      setShowProductForm(true);
    }
  };
  const toggleCertificateForm = () => {
    if (showCertificateForm) resetAll();
    else {
      resetAll();
      setShowCertificateForm(true);
    }
  };
  const toggleProductList = () => {
    if (showProductList) resetAll();
    else {
      resetAll();
      setShowProductList(true);
    }
  };
  const toggleCertificateList = () => {
    if (showCertificateList) resetAll();
    else {
      resetAll();
      setShowCertificateList(true);
    }
  };
  const toggleProjectForm = () => {
    if (showProjectForm) resetAll();
    else {
      resetAll();
      setShowProjectForm(true);
    }
  };
  const toggleProjectList = () => {
    if (showProjectList) resetAll();
    else {
      resetAll();
      setShowProjectList(true);
    }
  };
  const toggleEditProduct = () => {
    if (showEditProduct) resetAll();
    else {
      resetAll();
      setShowEditProduct(true);
    }
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

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          <button
            onClick={toggleProductForm}
            className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-lg shadow"
          >
            เพิ่มสินค้า
          </button>
          <button
            onClick={toggleCertificateForm}
            className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-lg shadow"
          >
            อัพโหลดใบประกาศ
          </button>
          <button
            onClick={toggleProductList}
            className="bg-purple-500 hover:bg-purple-600 text-white p-4 rounded-lg shadow"
          >
            แสดงสินค้าทั้งหมด
          </button>
          <button
            onClick={toggleCertificateList}
            className="bg-yellow-500 hover:bg-yellow-600 text-white p-4 rounded-lg shadow"
          >
            แสดงใบประกาศทั้งหมด
          </button>
          <button
            onClick={toggleProjectForm}
            className="bg-indigo-500 hover:bg-indigo-600 text-white p-4 rounded-lg shadow"
          >
            เพิ่มโปรเจกต์
          </button>
          <button
            onClick={toggleProjectList}
            className="bg-gray-500 hover:bg-gray-600 text-white p-4 rounded-lg shadow"
          >
            เเสดงโปรเจกต์ทั้งหมด
          </button>
          <button
            onClick={toggleEditProduct}
            className="bg-amber-800 hover:bg-amber-950 text-white p-4 rounded-lg shadow">
              แก้ไข้สิ้นค้ารายตัว
            </button>
        </div>

        <div className="bg-white rounded-lg shadow p-6 min-h-[300px]">
          {showProductForm && <ProductForm />}
          {showCertificateForm && <CertificateForm />}
          {showProductList && <ProductList />}
          {showCertificateList && <CertificateList />}
          {showProjectForm && <ProjectForm />}
          {showProjectList && <ProjectList />}
          {showEditProduct&& <EditProduct/>}
          {/* ถ้าต้องการเพิ่ม loading, error display ที่นี่ ก็แจ้งได้นะครับ */}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
