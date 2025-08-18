import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import logo from "../assets/JSP_Logo.png";

const menuItems = [
  { to: "/", text: "หน้าหลัก", description: "กลับสู่หน้าแรก" },
  { to: "/about", text: "เกี่ยวกับเรา", description: "ข้อมูลเกี่ยวกับบริษัท" },
  { to: "/product", text: "สินค้า", description: "ผลิตภัณฑ์และบริการ" },
  { to: "/certificates", text: "ใบประกาศ", description: "รางวัลและการรับรอง" },
  { to: "/project", text: "โปรเจกต์", description: "ผลงานที่ผ่านมา" },
  { to: "/csr", text: "CSR", description: "ความรับผิดชอบต่อสังคม" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
      if (currentScrollY <= 10) {
        setShowNavbar(true);
      } else if (currentScrollY > lastScrollY) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(currentScrollY);
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const handleClickOutside = () => setActiveDropdown(null);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <>
      <motion.nav
        layout
        initial={{ y: 0 }}
        animate={{ y: showNavbar ? 0 : -100 }}
        transition={{ duration: 0.4, ease: [0.25, 0.8, 0.25, 1] }}
        className={clsx(
          "fixed top-0 left-0 right-0 z-50 transition-colors duration-300",
          "bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 shadow-md"
        )}
      >
        <div
          className="h-1 bg-gradient-to-r from-emerald-400 to-teal-400 transition-all duration-200"
          style={{ width: `${scrollProgress}%` }}
        />

        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-3"
              >
                <img
                  src={logo}
                  alt="JSP Logo"
                  className="w-15 h-15 rounded-lg shadow-lg object-cover"
                />
                <div className="hidden sm:block">
                  <h1
                    className={clsx(
                      "text-xl font-bold transition-colors",
                      isScrolled ? "text-gray-800" : "text-white"
                    )}
                  >
                    JSP METAL WORKS CO., LTD. 
                  </h1>
                  <p
                    className={clsx(
                      "text-sm transition-colors",
                      isScrolled ? "text-gray-500" : "text-emerald-100"
                    )}
                  >
                    ผลิตตู้ไฟฟ้าเปล่าคุณภาพสูง
                  </p>
                </div>
              </motion.div>
            </Link>

            <div className="hidden lg:flex items-center space-x-1">
              {menuItems.map((item, index) => (
                <div
                  key={item.to}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(index)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to={item.to}
                    className={clsx(
                      "relative px-4 py-2 rounded-lg transition-all duration-200 font-medium",
                      location.pathname === item.to
                        ? isScrolled
                          ? "text-emerald-600 bg-emerald-50"
                          : "text-emerald-200 bg-white/10"
                        : isScrolled
                        ? "text-gray-700 hover:text-emerald-600 hover:bg-emerald-50"
                        : "text-white hover:text-emerald-200 hover:bg-white/10"
                    )}
                  >
                    {item.text}
                    {location.pathname === item.to && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400 rounded-full"
                      />
                    )}
                  </Link>

                  <AnimatePresence>
                    {activeDropdown === index && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        transition={{ duration: 0.2, delay: 0.1 }}
                        className="pointer-events-none absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-gray-800/90 text-white text-sm rounded-lg shadow-lg"
                      >
                        {item.description}
                        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800/90 rotate-45" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            <div className="hidden md:block">
              <Link to="/contact" onClick={() => setIsOpen(false)}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={clsx(
                    "px-6 py-2 rounded-full font-medium transition-all duration-200 shadow-lg",
                    isScrolled
                      ? "bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-xl"
                      : "bg-white text-emerald-600 hover:bg-emerald-50 hover:shadow-xl"
                  )}
                >
                  ติดต่อเรา
                </motion.button>
              </Link>
            </div>

            <button
              className={clsx(
                "lg:hidden p-2 rounded-lg transition-colors",
                isScrolled
                  ? "text-gray-700 hover:bg-gray-100"
                  : "text-white hover:bg-white/10"
              )}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                <motion.div
                  animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-0.5 bg-current rounded-full"
                />
                <motion.div
                  animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-0.5 bg-current rounded-full"
                />
                <motion.div
                  animate={
                    isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }
                  }
                  transition={{ duration: 0.3 }}
                  className="w-full h-0.5 bg-current rounded-full"
                />
              </div>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.8, 0.25, 1] }}
              className="lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-lg overflow-hidden"
            >
              <div className="container mx-auto px-6 py-4">
                <div className="space-y-2">
                  {menuItems.map((item, index) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setIsOpen(false)}
                      className={clsx(
                        "block px-4 py-3 rounded-lg transition-all duration-200 group",
                        location.pathname === item.to
                          ? "text-emerald-600 bg-emerald-50 font-semibold"
                          : "text-gray-700 hover:text-emerald-600 hover:bg-emerald-50"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{item.text}</div>
                          <div className="text-sm text-gray-500 group-hover:text-emerald-500 transition-colors">
                            {item.description}
                          </div>
                        </div>
                        <div className="text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity">
                          →
                        </div>
                      </div>
                    </Link>
                  ))}
                  <div className="pt-4 border-t border-gray-200">
                    <Link
                      to="/contact"
                      onClick={() => setIsOpen(false)}
                      className="block w-full px-4 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors text-center"
                    >
                      ติดต่อเรา
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <div className="h-20" />
    </>
  );
};

export default Navbar;
