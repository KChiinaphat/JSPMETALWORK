  import React, { useState, useEffect } from "react";
  import { Link } from "react-router-dom";
  import Hero from "../components/Hero";
  import { motion } from "framer-motion";
  import ProductCard from "../components/Productcard";
  import FAQ from "../components/FAQ";
  import axios from "axios";
  import { 
    FaIndustry, 
    FaCogs, 
    FaCheckCircle, 
    FaAward, 
    FaUsers, 
    FaClipboardCheck,
    FaArrowRight,
    FaQuoteLeft,
    FaStar
  } from "react-icons/fa";

  const HomePage = () => {
    const [category, setCategory] = useState("panel");
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Stats data
    const stats = [
      { icon: FaUsers, value: "1000+", label: "โครงการที่เสร็จสิ้น" },
      { icon: FaAward, value: "5+", label: "ปีประสบการณ์" },
      { icon: FaCheckCircle, value: "100%", label: "คุณภาพมาตรฐาน" },
      { icon: FaIndustry, value: "30+", label: "ลูกค้าองค์กร" }
    ];

    // Services data
    const services = [
      {
        icon: FaCogs,
        title: "ออกแบบตู้ควบคุมไฟฟ้า",
        description: "ออกแบบตู้ควบคุมไฟฟ้าตามความต้องการเฉพาะของลูกค้า พร้อมระบบป้องกันและควบคุมที่ทันสมัย",
        features: ["แบบ 3D เสมือนจริง", "คำนวณโหลดไฟฟ้า", "เลือกอุปกรณ์คุณภาพสูง"]
      },
      {
        icon: FaIndustry,
        title: "ผลิตตู้เฟรม & ตู้แพนเนล",
        description: "ผลิตตู้เฟรมและตู้แพนเนลคุณภาพสูงสำหรับอาคารสูงและโรงงานอุตสาหกรรม",
        features: ["วัสดุเกรด A", "มาตรฐาน IP Rating", "ทนทานต่อสภาพแวดล้อม"]
      },
      {
        icon: FaClipboardCheck,
        title: "ติดตั้งและบำรุงรักษา",
        description: "บริการติดตั้งโดยช่างผู้เชี่ยวชาญ พร้อมบำรุงรักษาเพื่อประสิทธิภาพสูงสุด",
        features: ["ทีมช่างมืออาชีพ", "รับประกันงานติดตั้ง", "บริการ 24/7"]
      }
    ];

    const faqItems = [
      {
        question: "ตู้ควบคุมไฟฟ้าของ JSP Metal มีมาตรฐานรับรองหรือไม่?",
        answer: "ตู้ควบคุมไฟฟ้าของเราได้รับการรับรองมาตรฐานสากล  ISO  พร้อมทั้งผ่านการทดสอบคุณภาพอย่างเข้มงวด",
      },
      {
        question: "สามารถสั่งผลิตตู้ควบคุมไฟฟ้าตามแบบที่ต้องการได้หรือไม่?",
        answer: "ได้ครับ เรารับออกแบบและผลิตตู้ควบคุมไฟฟ้าตามความต้องการของลูกค้า โดยทีมวิศวกรผู้เชี่ยวชาญของเรา",
      },
      {
        question: "มีบริการหลังการขายอย่างไรบ้าง?",
        answer: "เรามีบริการให้คำปรึกษา ติดตั้ง และบำรุงรักษาตู้ควบคุมไฟฟ้า พร้อมรับประกันสินค้าและบริการ",
      },
    ];

    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`);
          setProducts(res.data);
        } catch (err) {
          setError("เกิดข้อผิดพลาดในการดึงข้อมูลสินค้า");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchProducts();
    }, []);

    return (
      <main className="overflow-x-hidden bg-gray-50 text-gray-800">
        <Hero />

        {/* Stats Section */}
        <section className="py-16 bg-white border-b border-gray-100">
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
                  <div className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          id="aboutus"
          className="py-20 bg-gradient-to-br from-slate-50 to-gray-100"
        >
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              {/* Content */}
              <div className="lg:w-1/2 space-y-8">
                <div className="space-y-4">
                  <div className="inline-block">
                    <span className="px-4 py-2 bg-green-100 text-green-700 text-sm font-semibold rounded-full">
                      เกี่ยวกับเรา
                    </span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                    <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                      ผู้เชี่ยวชาญด้าน
                    </span>
                    <br />
                    <span className="text-gray-800">ตู้ควบคุมไฟฟ้า</span>
                  </h2>
                </div>

                <div className="space-y-6 text-gray-600 leading-relaxed">
                  <p className="text-lg">
                    <strong className="text-gray-800">บริษัท เจเอสพี เมทัล จำกัด</strong> เป็นผู้นำด้านการออกแบบและผลิต
                    ตู้ควบคุมไฟฟ้า ตู้เฟรม และตู้แพนเนล สำหรับงานโครงการอาคารสูงและโรงงานอุตสาหกรรม
                  </p>
                  <p>
                    ด้วยประสบการณ์กว่า <strong className="text-green-600">15 ปี</strong> เรามุ่งมั่นที่จะมอบผลิตภัณฑ์
                    ที่มีคุณภาพสูงและบริการที่เป็นเลิศ ทีมวิศวกรของเราทำงานอย่างต่อเนื่องเพื่อพัฒนา
                    ตู้ไฟฟ้าที่ตอบโจทย์ความต้องการของลูกค้า
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
    onClick={() => window.location.href = '/about'}
    className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
  >
    อ่านเพิ่มเติม
    <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
  </button>
                  <button
    onClick={() => window.location.href = '/product'}
    className="inline-flex items-center gap-2 px-8 py-4 border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white rounded-lg font-semibold transition-all duration-300"
  >
    ดูสินค้าทั้งหมด
    <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
  </button>
                </div>
              </div>

              {/* Image */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="lg:w-1/2 relative"
              >
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <img
                    src="src\assets\img\33453.jpg"
                    alt="เกี่ยวกับ JSP Metal"
                    className="w-full h-[500px] object-cover"
                    loading ="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl">
                  <div className="flex items-center gap-3">
                    <FaStar className="text-yellow-500 text-2xl" />
                    <div>
                      <div className="font-bold text-gray-800">มาตรฐานสากล</div>
                      <div className="text-sm text-gray-600">ISO , สถาบันไฟฟ้าและอิเล็กทรอนิกส์
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Services Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <div className="inline-block mb-4">
                <span className="px-4 py-2 bg-green-100 text-green-700 text-sm font-semibold rounded-full">
                  บริการของเรา
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  JSP METAL
                </span>
                <span className="text-gray-800"> ทำอะไร?</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                รับออกแบบและผลิตตู้ไฟฟ้า ตู้เฟรม ตู้แพนเนล และ งานเหล็กต่างๆ สำหรับงานโครงการอาคารสูง
                และโรงงานอุตสาหกรรมตามมาตรฐานสากล และออกแบบตามที่ลูกค้าต้องการ
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-green-200"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl mb-6 group-hover:scale-110 transition-transform">
                    <service.icon className="text-2xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-green-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                        <FaCheckCircle className="text-green-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section id="product" className="py-12 sm:py-16 bg-gradient-to-br from-gray-50 to-slate-100">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-12 sm:mb-16">
      <div className="inline-block mb-4">
        <span className="px-4 py-2 bg-green-100 text-green-700 text-sm font-semibold rounded-full">
          ผลิตภัณฑ์
        </span>
      </div>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
        <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
          ผลิตภัณฑ์
        </span>
        <span className="text-gray-800">คุณภาพสูง</span>
      </h2>
      <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
        ค้นพบผลิตภัณฑ์คุณภาพสูงที่ออกแบบมาเพื่อตอบสนองความต้องการของลูกค้า
      </p>
    </div>

    {loading ? (
      <div className="flex justify-center items-center py-12 sm:py-20">
        <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-green-600"></div>
        <span className="ml-4 text-green-700 font-medium">กำลังโหลดสินค้า...</span>
      </div>
    ) : error ? (
      <div className="text-center py-12 sm:py-20">
        <div className="text-red-600 text-base sm:text-lg font-medium">{error}</div>
      </div>
    ) : products.length === 0 ? (
      <div className="text-center py-12 sm:py-20">
        <FaIndustry className="mx-auto text-5xl sm:text-6xl text-gray-400 mb-4" />
        <p className="text-base sm:text-lg text-gray-600">ไม่พบรายการสินค้า</p>
      </div>
    ) : (
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="grid gap-2 sm:gap-2 md:gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      >
        {products.slice(0, 3).map((product, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="flex"
          >
            <ProductCard {...product} />
          </motion.div>
        ))}
      </motion.div>
    )}

    <div className="text-center mt-8 sm:mt-12">
      <button
        onClick={() => window.location.href = '/product'}
        className="group inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
      >
        ดูสินค้าทั้งหมด
        <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  </div>
</section>
      </main>
    );
  };

  export default HomePage;