import { useState, useEffect } from "react";
import axios from "axios";

const ProjectList = () => {
    const [project, setProject] = useState([]);
    const [loading,setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedProject, setSelectedProject] = useState(null);
    const [filter, setFilter] = useState('ทั้งหมด');
    
    useEffect(() => {
        fetchProject();
    }, [filter]);

    const fetchProject = async () => {
        try {
            const token = localStorage.getItem('token');
            if(!token) {
                throw new Error('กรุณาเข้าสู่ระบบใหม่');
            }

            let url = `${import.meta.env.VITE_API_URL}/api/projects`;
            if (filter !== 'ทั้งหมด') {
                const categoryMap = {
                    'ตู้พาเนล':'ตู้พาเนล',
                    'ตู้เฟรม':'ตู้เฟรม'
                };
                const backendCategory = categoryMap[filter] || filter;
                url += `?category=${encodeURIComponent(backendCategory)}`;
            }

            const response = await axios.get(url, {
                headers:{
                    Authorization:`Bearer ${token}`,
                },
            });

            if (Array.isArray(response.data)) {
                setProject(response.data);
            }else if (response.data?.project) {
                setProducts(response.data.project);
            } else {
                throw new Error('รูปเเบบข้อมูลไม่ถูกต้อง');
            } 
        } catch (error) {
            if (error.response?.status == 401){
                setError('กรุณาเข้าสู่ระบบใหม่');
                setTimeout(() => {
                    window.location.href = '/admin/login';
                }, 2000);
            }else {
                setError(error.response?.data?.message || error.message || 'ไม่สามารถโหลดข้อมูลโปรเจกต์');
            }
        } finally {
            setLoading(false);
        }
    };

        const handleDelete = async (id) => {
            if (!window.confirm(`คุณต้องการลบโปรเจค ${name} ใช่หรือไม่`)) {
                return;
            }

            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('กรุณาเข้าสู่ระบบใหม่');
                }

                const response = await axios.delete(`http://localhost:5000/api/projects/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.data.success) {
                    fetchProject();
                }else {
                    throw new Error(response.data.message || 'ไม่สามารถลบสินค้าได้');
                }
            } catch (error) {
                setError(error.response?.data?.message || error.message || 'ไม่สามารถลบสินค้าได้');
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
        return(
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
          <option value="ตู้พาเนล">ตู้พาเนล</option>
          <option value="ตู้เฟรม">ตู้เฟรม</option>
        </select>
      </div>

      <div className="grid gap-6">
        {project.map((project) => (
          <div key={project._id} className="bg-white p-6 rounded-lg shadow-md border border-green-soft/20">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-start gap-4">
                {project.image && (
                  <img
                    src={`http://localhost:5000/uploads/${project.image}`}
                    alt={project.name}
                    className="h-16 w-16 object-contain border rounded border-green-soft/30"
                  />
                )}
                <div>
                  <h3 className="font-semibold text-lg text-green-primary">{project.name}</h3>
                  <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                    project.category === 'ตู้พาเนล' ? 'bg-green-bg text-green-primary' : 
                    project.category === 'ตู้เฟรม' ? 'bg-green-soft text-green-primary' : 
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {project.category || 'อื่นๆ'}
                  </span>
                  {project.location && (
                    <div className="text-green-primary font-bold mt-1">
                        {project.location}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => window.open(`http://localhost:5000/uploads/${project.image}`, '_blank')}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors"
                >
                  ดูรูป
                </button>
                <button
                  onClick={() => handleDelete(project._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors"
                >
                  ลบ
                </button>
              </div>
            </div>
            {project.description && (
              <div className="text-sm text-green-secondary mb-2">
                {project.description}
              </div>
            )}
            <div className="text-sm text-green-secondary">
              อัพโหลดเมื่อ: {new Date(project.createdAt).toLocaleString('th-TH')}
            </div>
          </div>
        ))}
      </div>{selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 border border-green-soft/20">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-green-primary">{selectedProject.name}</h2>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-green-secondary hover:text-green-primary"
              >
                ✕
              </button>
            </div>
            {selectedProject.image && (
              <img
                src={`http://localhost:5000/uploads/${selectedProject.image}`}
                alt={selectedProject.name}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
            )}
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-green-secondary">หมวดหมู่</h3>
                <p className="mt-1 text-green-primary">{selectedProject.category}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-green-secondary">ราคา</h3>
                <p className="mt-1 text-accent-orange font-bold">฿{selectedProject.price?.toLocaleString()}</p>
              </div>
              {selectedProject.description && (
                <div>
                  <h3 className="text-sm font-medium text-green-secondary">รายละเอียด</h3>
                  <p className="mt-1 text-green-secondary">{selectedProject.description}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
    );
};

export default ProjectList;