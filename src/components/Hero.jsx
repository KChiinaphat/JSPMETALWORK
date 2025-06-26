import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import heroBg from "../assets/img/hero-bg.jpg";

import { FaArrowRight, FaDotCircle } from 'react-icons/fa';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      imgSrc: {heroBg},
      alt: "ผลิตภัณฑ์ JSP Metal",
      title: "นวัตกรรมตู้เปล่าสำหรับควบคุมไฟฟ้า",
      subtitle: "มาตรฐานระดับโลก ผลิตในประเทศไทย",
      description: "เรามุ่งมั่นพัฒนาผลิตภัณฑ์คุณภาพสูง ตามมาตรฐานสากล"
    },
    {
      imgSrc: {heroBg},
      alt: "บริการของเรา",
      title: "บริการครบวงจร",
      subtitle: "ออกแบบ ผลิต ติดตั้ง และบำรุงรักษา",
      description: "ให้คำปรึกษาและออกแบบตามความต้องการของลูกค้า"
    },
    {
      imgSrc:{heroBg},
      alt: "เทคโนโลยี",
      title: "เทคโนโลยีล้ำสมัย",
      subtitle: "นวัตกรรมเพื่ออนาคต",
      description: "ใช้เทคโนโลยีล่าสุดเพื่อประสิทธิภาพสูงสุด"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[90vh] overflow-hidden">
      <AnimatePresence mode="wait">
  <motion.div
    key={currentSlide}
    initial={{ scale: 1.1, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 0.95, opacity: 0 }}
    transition={{ duration: 0.7 }}
    className="absolute inset-0"
  >
    {/* พื้นหลังพร้อมเงามืดในตัว */}
    <motion.div
      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      style={{ 
        backgroundImage: `url(${heroBg})`,
        boxShadow: 'inset 0 0 1000px rgba(0,0,0,0.85)'  // เพิ่มความมืด
      }}
      animate={{ y: [-10, 0, -10] }}
      transition={{ duration: 20, repeat: Infinity }}
    />

    {/* ม่านดำซ้ำอีกชั้นเพื่อให้มืดจริง */}
    <div className="absolute inset-0 bg-black/80" />
  </motion.div>
</AnimatePresence>

      <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-green-primary/50 to-transparent" />
      <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-green-primary/50 to-transparent" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="relative h-full flex items-center justify-center text-white px-4"
      >
        <div className="max-w-4xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-accent-orange text-xl md:text-2xl font-medium mb-4"
          >
            {slides[currentSlide].subtitle}
          </motion.h2>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            {slides[currentSlide].title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl mb-8 text-green-bg max-w-2xl mx-auto"
          >
            {slides[currentSlide].description}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-accent-orange hover:bg-accent-orange-dark 
              rounded-lg text-green-primary font-semibold tracking-wide transition duration-300 
              ease-in-out transform hover:-translate-y-1 hover:shadow-xl"
            >
              ติดต่อเรา
              <FaArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 
              ${currentSlide === index ? 'bg-accent-orange scale-125' : 'bg-green-soft hover:bg-accent-orange'}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
