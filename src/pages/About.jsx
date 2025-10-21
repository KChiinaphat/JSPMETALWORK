import React, { useState } from "react";
import { motion } from "framer-motion";
import logo from "../assets/JSP_logo.png"; 
import founder from "../assets/Aboutimg/founder.jpg";
import heroBackground from "../assets/img/hero-bg.jpg"; 
import ImageSlideshow from '../components/ImageSlideshow';
import {
  FaIndustry,
  FaUsers,
  FaAward,
  FaCogs,
  FaCheckCircle,
  FaLightbulb,
  FaHandshake,
  FaShieldAlt,
  FaChartLine,
  FaGlobe,
  FaQuoteLeft,
  FaCertificate,
  FaTools,
  FaRocket
} from 'react-icons/fa';

const About = () => {
  const [current, setCurrent] = useState(0);

  // Company values
  const values = [
    {
      icon: FaShieldAlt,
      title: "คุณภาพ",
      description: "มุ่งมั่นผลิตสินค้าที่มีคุณภาพสูงตามมาตรฐานสากล"
    },
    {
      icon: FaLightbulb,
      title: "นวัตกรรม",
      description: "พัฒนาเทคโนโลยีและผลิตภัณฑ์อย่างต่อเนื่อง"
    },
    {
      icon: FaHandshake,
      title: "ความไว้วางใจ",
      description: "สร้างความสัมพันธ์ที่ยั่งยืนกับลูกค้าและพาร์ทเนอร์"
    },
    {
      icon: FaRocket,
      title: "ความรวดเร็ว",
      description: "ตอบสนองความต้องการด้วยความฉับไวและมีประสิทธิภาพ"
    }
  ];

  // Timeline data
  const timeline = [
    {
      year: "2020",
      title: "ก่อตั้งบริษัท",
      description: "แยกตัวออกมาจาก บจก. พาวเวอร์อี โมดูลาร์ จำกัด"
    },
    {
      year: "2021",
      title: "ขยายฐานลูกค้า",
      description: "เริ่มรับงานโครงการอาคารสูงและโรงงานอุตสาหกรรม"
    },
    {
      year: "2022",
      title: "พัฒนาเทคโนโลยี",
      description: "เพิ่มเเละนำเข้าเครื่องจักรและเทคโนโลยีการผลิตที่ทันสมัย"
    },
    {
      year: "2023",
      title: "มาตรฐานสากล",
      description: "ได้รับการรับรองมาตรฐาน ISO "
    },
    {
      year:"2025",
      title : "สถาบันการไฟฟ้าเเละอิเล็กทรอนิกส์",
      description : "ได้รับการรับรองจากสถาบันไฟฟ้าและอิเล็กทรอนิกส์"
    }
  ];

  // Stats data
  const stats = [
    { icon: FaUsers, value: "1000+", label: "โครงการที่เสร็จสิ้น" },
    { icon: FaIndustry, value: "30+", label: "ลูกค้าองค์กร" },
    { icon: FaAward, value: "5+", label: "ปีประสบการณ์ทีม" },
    { icon: FaCertificate, value: "100%", label: "มาตรฐานคุณภาพ" }
  ];

  // Expertise areas
  const expertise = [
    {
      icon: FaCogs,
      title: "ออกแบบและผลิต",
      description: "ตู้ควบคุมไฟฟ้า ตู้เฟรม และตู้พาเนล"
    },
    {
      icon: FaTools,
      title: "ติดตั้งและบำรุงรักษา",
      description: "บริการติดตั้งและดูแลรักษาโดยช่างผู้เชี่ยวชาญ"
    },
    {
      icon: FaGlobe,
      title: "มาตรฐานสากล",
      description: "ผลิตภัณฑ์ที่ได้รับรองมาตรฐาน IEC และ มอก."
    },
    {
      icon: FaChartLine,
      title: "การพัฒนาอย่างต่อเนื่อง",
      description: "R&D และปรับปรุงผลิตภัณฑ์ตามเทคโนโลยีใหม่"
    }
  ];

  const images = [
    "aboutimg/IMG_2129.JPG",
    "aboutimg/IMG_0783.JPG",
    "aboutimg/IMG_0784.JPG",
    "aboutimg/IMG_2135.JPG",
    "aboutimg/IMG_2345.JPG",
    "aboutimg/IMG_2353.JPG",
  ];

  const ISOCER =[
    "aboutimg/ISOCER.jpg"
  ];

  const ukaslogo =[
    "aboutimg/ukas.jpg"
  ];
  

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${heroBackground})`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 via-green-800/70 to-emerald-800/80"></div>
        
        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-20, -100, -20],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 text-center text-white">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <motion.img
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              src={logo}
              alt="โลโก้ JSP Metal"
              className="mx-auto mb-8 h-32 md:h-48 max-w-xs filter drop-shadow-2xl"
            />
            
            <motion.h1 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-3xl md:text-6xl font-bold mb-6 leading-tight"
            >
              ผู้เชี่ยวชาญด้าน
              <span className="block text-yellow-400">ตู้ควบคุมไฟฟ้า</span>
            </motion.h1>
            
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl md:text-2xl mb-8 text-green-100 max-w-3xl mx-auto"
            >
              รับออกแบบและผลิตตู้ควบคุมไฟฟ้าที่ได้มาตรฐานสากล 
              พร้อมบริการครบวงจรสำหรับทุกโครงการ
            </motion.p>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a href="/project"
              className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold rounded-lg transform hover:scale-105 transition-all duration-300 shadow-xl"
              > ดูผลงานของเรา
              </a>
              <a href="/contact"
               className="px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-green-800 font-bold rounded-lg transition-all duration-300">
                ติดต่อเรา
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
          </div>
        </motion.div>
      </motion.section>

      {/* Stats Section */}
      <section className="py-20 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full mb-4 shadow-lg">
                  <stat.icon className="text-2xl" />
                </div>
                <div className="text-4xl font-bold text-gray-800 mb-2">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Quote Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <FaQuoteLeft className="mx-auto text-4xl mb-8 opacity-50" />
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="mb-8"
            >
              <img
                src={founder}
                alt="ผู้ก่อตั้ง"
                className="w-32 h-32 rounded-full mx-auto object-cover ring-4 ring-white/30 shadow-2xl"
              />
            </motion.div>
            
            <blockquote className="text-2xl md:text-3xl font-light italic mb-8 leading-relaxed">
              "สินค้าดี มีคุณภาพ ส่งตรงเวลา พัฒนาอย่างต่อเนื่อง"
            </blockquote>
            
            <div className="text-center">
              <cite className="text-xl font-semibold block">คุณสิทธิชัย มานะจิต</cite>
              <span className="text-green-200">ผู้ก่อตั้งและกรรมการผู้จัดการ</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Content Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2 space-y-8"
            >
              <div>
                <span className="px-4 py-2 bg-green-100 text-green-700 text-sm font-semibold rounded-full">
                  เกี่ยวกับเรา
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mt-4 mb-6">
                  <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    JSP Metal
                  </span>
                  <br />มากกว่าแค่ผู้ผลิต
                </h2>
              </div>

              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p className="text-lg">
                  <strong className="text-gray-800">บริษัท JSP Metal จำกัด</strong> เป็นบริษัทที่แยกตัวออกมาจาก 
                  พาวเวอร์อี โมดูลาร์ จำกัด ด้วยวิสัยทัศน์ที่จะเป็นผู้นำด้านการผลิต
                  ตู้ไฟฟ้าเปล่าคุณภาพสูง
                </p>
                
                <p>
                  ด้วยประสบการณ์กว่า <strong className="text-green-600">15 ปี</strong> ในอุตสาหกรรมนี้ 
                  เรามุ่งมั่นพัฒนาผลิตภัณฑ์ที่ตอบโจทย์ความต้องการของลูกค้า 
                  ใช้เทคโนโลยีและวัสดุคุณภาพสูงเพื่อความทนทานและปลอดภัย
                </p>
                
                <p>
                  ทีมงานของเราประกอบด้วยวิศวกรและช่างเทคนิคผู้เชี่ยวชาญ
                  ในการออกแบบและผลิตตู้ไฟฟ้าตามมาตรฐานสากล 
                  พร้อมให้บริการครบวงจรตั้งแต่การปรึกษา การออกแบบ 
                  ไปจนถึงการติดตั้งและบำรุงรักษา
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {expertise.slice(0, 2).map((item, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm border border-green-100">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg flex items-center justify-center">
                      <item.icon className="text-lg" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">{item.title}</h4>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Images */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2 space-y-6"
            >
              <div className="grid grid-cols-2 gap-4">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  src="public/aboutimg/IMG_1022.jpg"
                  alt="การผลิตตู้ไฟฟ้า JSP Metal"
                  className="rounded-2xl shadow-xl w-full h-48 object-cover"
                  loading="lazy"
                />
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  src="public/aboutimg/IMG_1021.jpg"
                  alt="โรงงาน JSP Metal"
                  className="rounded-2xl shadow-xl w-full h-48 object-cover mt-8"
                  loading="lazy"
                />
              </div>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 rounded-2xl text-white shadow-xl"
              >
                <h3 className="text-xl font-bold mb-2">มาตรฐานสากล</h3>
                <p className="text-green-100">
                  ผลิตภัณฑ์ทุกชิ้นผ่านการรับรองมาตรฐาน ISO เเละการรับรองจากสถาบันไฟฟ้าเเละอิเล็กทรอนิกส์. 
                  เพื่อความปลอดภัยสูงสุด
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-base sm:text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8 sm:mb-12">
          มาตรฐานการรับรองจาก{" "}
          <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent text-2xl sm:text-4xl md:text-5xl">
            ISO
          </span>
        </h2>

        <div className="flex flex-col md:flex-row justify-between items-start gap-6 sm:gap-8">
          {/* ISO Certificates */}
          <div className="space-y-8 w-full md:w-2/3">
            {ISOCER.map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="flex justify-center"
              >
                <img
                  src={img}
                  alt={`ISO Certificate ${index + 1}`}
                  className="rounded-xl shadow-lg w-full h-auto max-w-md sm:max-w-lg"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>

          {/* UKAS Logo */}
          <div className="space-y-8 w-full md:w-1/3 flex justify-center mt-8 md:mt-0">
            {ukaslogo.map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="flex justify-center"
              >
                <img
                  src={img}
                  alt={`UKAS Logo ${index + 1}`}
                  className="rounded-xl shadow-lg w-full h-auto max-w-xs sm:max-w-sm"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* บทความ / ข้อความด้านล่าง */}
        <div className="mt-12 sm:mt-16 bg-gradient-to-br from-gray-50 to-gray-100 p-6 sm:p-8 rounded-2xl shadow-xl max-w-xl sm:max-w-2xl mx-auto">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
            มาตรฐานและการรับรองคุณภาพ
          </h2>
          <div className="space-y-4 sm:space-y-6 text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">
            <p>
              บริษัทของเรามุ่งมั่นในการผลิตและควบคุมคุณภาพตามมาตรฐาน 
              <span className="font-semibold text-green-700"> ISO </span>
              ทุกขั้นตอน เพื่อให้ลูกค้าได้รับสินค้าที่มีคุณภาพสูงสุด
            </p>
            <p>
              นอกจากนี้ เรายังได้รับการรับรองจาก 
              <span className="font-semibold text-blue-700"> UKAS </span>
              ซึ่งยืนยันความน่าเชื่อถือและความสามารถในการดำเนินงานตามมาตรฐานสากล
            </p>
            <p>
              ข้อมูลเพิ่มเติมเกี่ยวกับมาตรฐานและการรับรอง 
              สามารถติดต่อเราได้ผ่านทางหน้า 
              <a href="/contact" className="text-green-600 hover:underline font-medium"> Contact </a> 
              หรืออีเมลของบริษัท
            </p>
          </div>
        </div>
      </div>
    </section>


      {/* Company Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="px-4 py-2 bg-green-100 text-green-700 text-sm font-semibold rounded-full">
              ค่านิยม
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                ค่านิยม
              </span>
              <span className="text-gray-800">ของเรา</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              หลักการทำงานที่เราถือมั่นและนำไปปฏิบัติในทุกโครงการ
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group text-center p-6 bg-gray-50 hover:bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full mb-6 group-hover:scale-110 transition-transform">
                  <value.icon className="text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-green-600 transition-colors">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="px-4 py-2 bg-green-100 text-green-700 text-sm font-semibold rounded-full">
              ประวัติความเป็นมา
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                เส้นทาง
              </span>
              <span className="text-gray-800">การเติบโต</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`flex items-center gap-8 mb-12 ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                  <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-green-500">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
                
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full flex items-center justify-center shadow-lg">
                  <span className="font-bold">{item.year}</span>
                </div>
                
                <div className="flex-1"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Slideshow Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="px-4 py-2 bg-green-100 text-green-700 text-sm font-semibold rounded-full">
              ผลงานของเรา
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                ภาพบรรยากาศ
              </span>
              <span className="text-gray-800">การทำงาน</span>
            </h2>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gray-50 p-8 rounded-2xl"
          >
            <ImageSlideshow 
              images={images} 
              current={current} 
              setCurrent={setCurrent}
            />
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default About;