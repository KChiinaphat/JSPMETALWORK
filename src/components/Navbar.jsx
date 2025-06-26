import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import logo from "../assets/JSP_Logo.png";
import { Menu, X } from "lucide-react";

const menuItems = [
  { to: "/", text: "หน้าหลัก" },
  { to: "/about", text: "เกี่ยวกับเรา" },
  { to: "/product", text: "สินค้า" },
  { to: "/certificates", text: "ใบประกาศ" },
  { to: "/project", text: "โปรเจกต์" },
  { to: "/csr", text: "CSR" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();

  // แสดง/ซ่อน Navbar ตาม scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 10) {
        setShowNavbar(true);
      } else if (currentScrollY > lastScrollY) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);

      // คำนวณ scroll progress
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: showNavbar ? 0 : -100 }}
      transition={{ duration: 0.3 }}
      className="bg-green-primary border-b border-green-soft shadow-md fixed top-0 left-0 right-0 z-50"
    >
      {/* Scroll progress bar */}
      <motion.div
        className="h-1 bg-accent-orange"
        style={{ width: `${scrollProgress}%` }}
        initial={{ width: 0 }}
        animate={{ width: `${scrollProgress}%` }}
        transition={{ ease: "easeOut", duration: 0.2 }}
      />

      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/">
          <img src={logo} alt="Logo" className="h-12 w-12 rounded-xl shadow-sm" />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 text-white font-medium">
          {menuItems.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className={clsx(
                  "transition-all relative group",
                  location.pathname === item.to ? "text-accent-orange font-semibold" : "hover:text-accent-orange"
                )}
              >
                {item.text}
                <span className="block h-[2px] w-0 bg-accent-orange group-hover:w-full transition-all duration-300"></span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-green-primary text-white shadow-md border-t border-green-soft"
          >
            <ul className="flex flex-col divide-y divide-green-soft">
              {menuItems.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    onClick={() => setIsOpen(false)}
                    className={clsx(
                      "block px-6 py-4 text-lg transition hover:text-accent-orange",
                      location.pathname === item.to && "text-accent-orange font-semibold"
                    )}
                  >
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
