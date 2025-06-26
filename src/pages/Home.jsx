import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import { motion } from "framer-motion"; // ต้องติดตั้ง framer-motion ก่อน
import ProductCard from "../components/Productcard";
import FAQ from "../components/FAQ";
import axios from "axios";



const HomePage = () => {
const [category, setCategory] = useState("panel");
const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

  const faqItems = [
    {
      question: "ตู้ควบคุมไฟฟ้าของ JSP Metal มีมาตรฐานรับรองหรือไม่?",
      answer:
        "ตู้ควบคุมไฟฟ้าของเราได้รับการรับรองมาตรฐานสากล IEC และมาตรฐานอุตสาหกรรม (มอก.) พร้อมทั้งผ่านการทดสอบคุณภาพอย่างเข้มงวด",
    },
    {
      question: "สามารถสั่งผลิตตู้ควบคุมไฟฟ้าตามแบบที่ต้องการได้หรือไม่?",
      answer:
        "ได้ครับ เรารับออกแบบและผลิตตู้ควบคุมไฟฟ้าตามความต้องการของลูกค้า โดยทีมวิศวกรผู้เชี่ยวชาญของเรา",
    },
    {
      question: "มีบริการหลังการขายอย่างไรบ้าง?",
      answer:
        "เรามีบริการให้คำปรึกษา ติดตั้ง และบำรุงรักษาตู้ควบคุมไฟฟ้า พร้อมรับประกันสินค้าและบริการ",
    },
  ];
  useEffect(() => {
    const fetchProducts = async () => {
      try{
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);
      }catch(err){
        setError("เกิดข้อผิดพลาดในการดึงข้อมูลสินค้า");
        console.error(err);
      }finally{
        setLoading(false);
      }
    };
    fetchProducts();
  },[]);

  return (
    <main className="overflow-x-hidden">
      <Hero />

      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        id="aboutus"
        className="about-section flex flex-col md:flex-row items-center p-6 md:p-16 gap-8 bg-base-light"
      >
        <div className="md:w-1/2 space-y-6">
          <div className="relative group inline-flex items-center mb-8">
            <span className="absolute -left-4 w-1 h-full bg-green-primary transform group-hover:scale-y-110 transition-transform duration-300"></span>
            <h2 className="text-green-primary md:text-4xl font-bold bg-gradient-to-r from-green-primary to-green-secondary bg-clip-text text-transparent py-4 px-8">
  เกี่ยวกับเรา
</h2>
          </div>

          <p className="text-gray-600 leading-relaxed">
            บริษัท เจเอสพี เมทัล จำกัด
            เป็นผู้นำด้านการออกแบบและผลิตตู้ควบคุมไฟฟ้า ตู้เฟรม และตู้พานล
            สำหรับงานโครงการอาคารสูงและโรงงานอุตสาหกรรม
          </p>
          <p className="text-gray-600 leading-relaxed">
            เรามุ่งมั่นที่จะมอบผลิตภัณฑ์ที่มีคุณภาพสูงและบริการที่เป็นเลิศ
            ทีมวิศวกรของเราทำงานอย่างต่อเนื่องเพื่อพัฒนาตู้ไฟฟ้าตู้เปล่าที่ตอบโจทย์ความต้องการของอลูกค้า
          </p>
          <Link
            to="/about"
            className="inline-block px-8 py-3 bg-accent-orange hover:bg-accent-orange-dark rounded-lg text-green-primary font-semibold
            transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
          >
            อ่านเพิ่มเติม
          </Link>
        </div>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="md:w-1/2 mt-8 md:mt-0"
        >
          <img
            src="/src/assets/img/33453.jpg" // ย้ายรูปไปไว้ใน public/images
            alt="เกี่ยวกับ PowerEmodular"
            className="rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300
            w-full h-[400px] object-cover"
            loading="lazy"
          />
        </motion.div>
      </motion.section>

      <section className="about-section1 p-6 md:p-16 bg-green-bg">
        <div className="max-w-4xl mx-auto">
          <h2 className="relative inline-flex items-center group mb-8">
            <span className="absolute -left-4 w-1 h-full bg-green-primary transform group-hover:scale-y-110 transition-transform duration-300"></span>
            <span
              className="text-green-primary md:text-4xl font-bold bg-gradient-to-r from-green-primary to-green-secondary bg-clip-text text-transparent
              py-4 px-8"
            >
              JSP METAL CO.,LTD ทำอะไร?
            </span>
          </h2>
          <p className="mb-2 text-green-primary font-semibold">บริษัท เจเอสพี เมทัล จำกัด</p>
          <p className="text-green-secondary">
            รับออกแบบและผลิตตู้ไฟฟ้า ตู้เฟรม และตู้เเพเเนล
            สำหรับงานโครงการอาคารสูงและโรงงานอุตสาหกรรม ตามมาตรฐานสากล
            เเละออกเเบบตามที่ลูกค้าต้องการ
          </p>
        </div>
      </section>

      <section id="product" className="product-section p-6 md:p-16 bg-base-light">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <div className="relative group inline-flex items-center mb-8">
            <span className="absolute -left-4 w-1 h-full bg-green-primary transform group-hover:scale-y-110 transition-transform duration-300"></span>
            <h2 className="text-green-primary md:text-4xl font-bold bg-gradient-to-r from-green-primary to-green-secondary bg-clip-text text-transparent py-4 px-8">
              ผลิตภัณฑ์ของเรา
            </h2>
          </div>

          <p className="text-green-secondary">
            ค้นพบผลิตภัณฑ์คุณภาพสูงที่ออกแบบมาเพื่อตอบสนองความต้องการของคลูกค้า
          </p>
        </div>

        {loading ? (
  <p className="text-center col-span-full text-green-secondary">กำลังโหลดสินค้า...</p>
) : error ? (
  <p className="text-center text-red-600 col-span-full">{error}</p>
) : products.length === 0 ? (
  <p className="text-center col-span-full text-green-secondary">ไม่พบรายการสินค้า</p>
) : (
  products.map((product, idx) => (
    <ProductCard key={idx} {...product} />
  ))
)}

      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gradient-to-b from-green-bg to-base-light">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-green-primary text-lg font-semibold mb-2 block">
              FAQ
            </span>
            <section className="text-center py-12 bg-green-soft/20 rounded-lg">
              <h2 className="text-green-primary md:text-4xl font-bold mb-4 bg-gradient-to-r from-green-primary to-green-secondary bg-clip-text text-transparent">
                คำถามที่พบบ่อย
              </h2>
              <div className="w-20 h-1 bg-green-primary mx-auto mb-4"></div>
              <p className="text-green-secondary max-w-lg mx-auto text-sm md:text-base">
                รวบรวมคำถามที่ลูกค้าสอบถามเข้ามาบ่อยๆ
                เพื่อให้ข้อมูลที่เป็นประโยชน์
              </p>
            </section>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {faqItems.map((item, index) => (
              <FAQ key={index} {...item} />
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;