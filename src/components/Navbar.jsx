import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/JSP_Logo.jpg';

const Navbar = () => {
  return (
    <nav className="bg-gray-900 shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="cursor-pointer">
          <img src={logo} alt="JSP Logo" className="h-20 w-20 object-cover rounded-lg" />
        </div>
        <ul className="flex space-x-10 text-white font-semibold">
          <li>
            <Link
              to="/"
              className="relative hover:text-yellow-600 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-yellow-600 after:transition-all after:duration-300 hover:after:w-full"
            >
              หน้าหลัก
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="relative hover:text-yellow-600 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-yellow-600 after:transition-all after:duration-300 hover:after:w-full"
            >
              เกี่ยวกับเรา
            </Link>
          </li>
          <li>
            <Link
              to="/product"
              className="relative hover:text-yellow-600 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-yellow-600 after:transition-all after:duration-300 hover:after:w-full"
            >
              สินค้า
            </Link>
          </li>
          <li>
            <Link
              to="/project"
              className="relative hover:text-yellow-600 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-yellow-600 after:transition-all after:duration-300 hover:after:w-full"
            >
              โปรเจกต์
            </Link>
          </li>
          <li>
            <Link
              to="/csr"
              className="relative hover:text-yellow-600 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-yellow-600 after:transition-all after:duration-300 hover:after:w-full"
            >
              ช่วยเหลือสังคม (CSR)
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;