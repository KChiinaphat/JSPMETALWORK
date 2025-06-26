import React, { useState } from "react";
import { motion } from "framer-motion";
import logo from "../assets/JSP_logo.png"; 
import founder from "../assets/Aboutimg/founder.jpg";
import heroBackground from "../assets/img/hero-bg.jpg"; // เพิ่ม import รูปพื้นหลัง
import ImageSlideshow from '../components/ImageSlideshow';

const images = [
  "https://source.unsplash.com/800x600/?electricity,power",
  "https://source.unsplash.com/800x600/?technology",
  "https://source.unsplash.com/800x600/?industry",
  "https://source.unsplash.com/800x600/?machine",
  "https://source.unsplash.com/800x600/?factory",
];

const About = () => {
  const [current, setCurrent] = useState(0);

  return (
    <main className="bg-base-light">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-[60vh] flex items-center"
      >
        <div 
  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
  style={{
    backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${heroBackground})`
  }}
/>

        <div className="absolute inset-0 bg-green-primary/60 backdrop-blur-sm"></div>
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <motion.img
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            src={logo}
            alt="โลโก้ JSP Metal"
            className="mx-auto mb-8 h-48"
          />
          <motion.h1 
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            className="text-4xl md:text-5xl font-bold max-w-3xl mx-auto leading-tight"
          >
            รับออกแบบและผลิตตู้ควบคุมไฟฟ้าที่ได้มาตรฐาน
          </motion.h1>
        </div>
      </motion.section>
        
      {/* Quote Section */}
      <section className="mt-20 py-20 bg-light-green rounded-1xl shadow-lg">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="text-2xl font-semibold mb-8 text-green-primary">
            "ทำไมต้องเลือกเรา? ทำไมต้องตู้ควบคุมไฟฟ้าที่ได้มาตรฐาน?"
          </div>
          <div className="mb-8">
            <img
              src={founder}
              alt="ผู้ก่อตั้ง"
              className="w-32 h-32 rounded-full mx-auto object-cover ring-4 ring-accent-orange"
            />
          </div>
          <blockquote className="text-green-primary text-lg italic">
            "รวมพลังพัฒนา ผลิตสินค้าได้มาตรฐาน บริการฉับไว ใส่ใจลูกค้า รักษาคุณภาพ"
          </blockquote>
          <cite className="mt-4 block text-green-primary">
            — คุณสิทธิชัย มานะจิต, ผู้ก่อตั้ง
          </cite>
        </div>
      </section>

     

      {/* About Section */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="py-20 bg-light-green rounded-1xl shadow-lg"
      >
        <div className="container mx-auto px-4 flex flex-col md:flex-row gap-12">
          {/* Text Content */}
          <div className="md:w-1/2 space-y-6 text-center">
            <div className="relative inline-block">
              <h2 className="text-4xl font-bold text-green-primary mb-6">เกี่ยวกับเรา</h2>
              <div className="absolute -bottom-2 left-0 w-1/2 h-1 bg-green-secondary"></div>
            </div>
            <p className="text-green-secondary leading-relaxed text-lg">
              บริษัท JSP Metal จำกัด เป็นบริษัทที่เเยกตัวออกมาจาก พาวเวอร์อี โมดูลาร์ จำกัด 
              เป็นบริษัทที่ทำการผลิตตู้ไฟฟ้าเปล่าคุณภาพสูง โดยมีประสบการณ์มากกว่า 5 ปีในอุตสาหกรรมนี้ 
              เรามุ่งมั่นที่จะพัฒนาผลิตภัณฑ์ที่ตอบโจทย์ความต้องการของลูกค้า
            </p>
            <p className="text-green-secondary leading-relaxed text-lg">
              เราใช้เทคโนโลยีและวัสดุที่มีคุณภาพสูงในการผลิตตู้ไฟฟ้าเปล่า 
              เพื่อให้มั่นใจว่าผลิตภัณฑ์ของเรามีความทนทานและปลอดภัย 
              ทีมงานของเราประกอบด้วยวิศวกรและช่างเทคนิคที่มีความเชี่ยวชาญในการออกแบบ
              และผลิตตู้ไฟฟ้าเปล่าที่ได้มาตรฐานสากล
            </p>
          </div>

          {/* Images */}
          <div className="md:w-1/2 space-y-6">
            <motion.img
              whileHover={{ scale: 1.02 }}
              src="public/aboutimg/AboutUs_2-1-1024x768.jpg"
              alt="การผลิตตู้ไฟฟ้า JSP Metal"
              className="rounded-lg shadow-lg w-full h-[300px] object-cover"
            />
            <motion.img
              whileHover={{ scale: 1.02 }}
              src="public/aboutimg/AboutUs_1-1-1024x768.jpg"
              alt="โรงงาน JSP Metal"
              className="rounded-lg shadow-lg w-full h-[300px] object-cover"
            />
          </div>
        </div>
      </motion.section>

      {/* Slideshow Section */}
      <section className="py-20 bg-base-light">
        <div className="container mx-auto px-4">
          <ImageSlideshow 
            images={images} 
            current={current} 
            setCurrent={setCurrent}
          />
        </div>
      </section>
    </main>
  );
};

export default About;
