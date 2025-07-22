import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import heroBg from "../assets/img/hero-bg.jpg";
import { FaArrowRight } from 'react-icons/fa';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      imgSrc: heroBg,
      alt: "ผลิตภัณฑ์ JSP Metal",
      title: "นวัตกรรมตู้เปล่าสำหรับควบคุมไฟฟ้า",
      subtitle: "มาตรฐานระดับโลก ผลิตในประเทศไทย",
      description: "เรามุ่งมั่นพัฒนาผลิตภัณฑ์คุณภาพสูง ตามมาตรฐานสากล"
    },
    {
      imgSrc: heroBg,
      alt: "บริการของเรา",
      title: "บริการครบวงจร",
      subtitle: "ออกแบบ ผลิต ติดตั้ง และบำรุงรักษา",
      description: "ให้คำปรึกษาและออกแบบตามความต้องการของลูกค้า"
    },
    {
      imgSrc: heroBg,
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
  }, [slides.length]);

  return (
    <section className="relative h-[90vh] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${slides[currentSlide].imgSrc})`
            }}
          />
          <div className="absolute inset-0 bg-black/90" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-emerald-800/60 to-transparent" />
      <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-emerald-800/60 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.9, ease: "easeOut" }}
        className="relative z-10 h-full flex items-center justify-center text-white px-4"
      >
        <div className="max-w-4xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-green-500 text-lg md:text-2xl font-semibold mb-3"
          >
            {slides[currentSlide].subtitle}
          </motion.h2>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold leading-tight mb-6"
          >
            {slides[currentSlide].title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-md md:text-xl text-white/80 mb-8 max-w-2xl mx-auto"
          >
            {slides[currentSlide].description}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 px-6 py-3 bg-green-800 hover:bg-green-500 rounded-full text-white font-semibold shadow-md transition transform hover:-translate-y-1 hover:shadow-xl"
            >
              ติดต่อเรา
              <FaArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </motion.div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-accent-orange scale-125' : 'bg-white/40 hover:bg-accent-orange'}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
