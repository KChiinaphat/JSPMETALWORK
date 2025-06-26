import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { login } from '../../utils/auth';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Get return URL from location state or default to admin page
  const from = location.state?.from?.pathname || '/adminpage';

  // ถ้า login แล้วเป็น admin ไม่ให้กลับมาหน้านี้อีก
  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token && role === 'admin') {
      navigate(from);
    }
  }, [navigate, from]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setError('');

    try {
      const result = await login({ username, password });
      console.log('login result:', result);  // ดูข้อมูลที่ได้จาก login
    
      const { role } = result;
      if (role === 'admin') {
        navigate(from);
      } else {
        setError('ไม่ใช่ผู้ดูแลระบบ');
        localStorage.removeItem('token');
        localStorage.removeItem('role');
      }
    
    } catch (error) {
      console.error('Login error:', error);
      setPassword(''); // Clear password on error
      setError(error.message || 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="absolute inset-0 bg-yellow-500 opacity-5 pattern-grid-lg"></div>
      <form
        onSubmit={handleSubmit}
        className="backdrop-blur-sm bg-white/80 p-8 rounded-xl shadow-lg 
        min-w-[300px] w-full max-w-sm border border-white/20"
      >
        <h2 className="text-center mb-6 text-2xl font-semibold text-gray-800">Admin Login</h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">Username</label>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-gray-300/50 
            bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 
            focus:ring-yellow-400 transition-all duration-200"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-medium text-gray-700">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-gray-300/50 
            bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 
            focus:ring-yellow-400 transition-all duration-200"
            required
          />
          <div className="mt-2 flex items-center">
            <input
              id="show-password"
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              className="mr-2"
            />
            <label htmlFor="show-password" className="text-sm select-none">แสดงรหัสผ่าน</label>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 text-white rounded-lg font-bold transition-all duration-200 
          ${isSubmitting 
            ? 'bg-gray-400' 
            : 'bg-yellow-600 hover:bg-yellow-700 hover:shadow-lg transform hover:-translate-y-0.5'
          }`}
        >
          {isSubmitting ? 'กำลังเข้าสู่ระบบ...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
