import React from 'react';
import logo from '../assets/JSP_Logo.jpg';  // ✅ เปลี่ยนจาก require มาใช้ import

const Home = () => {
  return (
    <div className="bg-white-100 w-full">
      <div className="container mx-auto px-4 py-8 flex flex-col items-center">
        <img src={logo} alt="Home Banner" className="h-32 mb-6 rounded shadow" />
        <h1 className="text-3xl font-bold mb-6">Welcome to Our Home Page</h1>
        <p className="text-lg mb-4">
          This is the home page of our application. Here you can find various features and information about our services.
        </p>
        <p className="text-lg mb-4">
          Explore our products, projects, and CSR initiatives to learn more about what we do.
        </p>
        <p className="text-lg">
          Feel free to contact us for any inquiries or support.
        </p>
      </div>
    </div>
  );
};

export default Home;
