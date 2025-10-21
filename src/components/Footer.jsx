import { Facebook } from "lucide-react";
import { SiLine } from "react-icons/si";
import { motion } from "framer-motion";
import logo from "../assets/JSP_logo.png";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 shadow-md rounded-t-2xl"
    >
      {/* Main Content */}
      <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Company Info */}
        <div>
          <Link to="/" className="group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3"
            >
              <img 
                src={logo} 
                alt="JSP Logo" 
                className="w-10 h-10 rounded-lg shadow-lg object-cover"
                onDoubleClick={() => (window.location.href = "/login")}
              />
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-white transition-colors">
                  JSP METAL WORKS CO., LTD.
                </h1>
                <p className="text-sm text-emerald-100 transition-colors">
                  ผลิตตู้ไฟฟ้าเปล่าคุณภาพสูง
                </p>
              </div>
            </motion.div>
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-white/90">
            บริษัท JSP METAL WORKS CO.,LTD เป็นผู้เชี่ยวชาญในการผลิตตู้ไฟฟ้าเปล่าคุณภาพสูง มากกว่า 5 ปี
            เรามุ่งมั่นพัฒนาผลิตภัณฑ์ที่ตอบโจทย์ความต้องการของลูกค้า ด้วยมาตรฐานและคุณภาพระดับสากล
          </p>

          {/* Social Icons */}
          <div className="mt-4 flex space-x-4">
            {/* Facebook */}
            <a
              href="https://web.facebook.com/p/D-100051458839623"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-white hover:text-accent-orange transition-transform transform hover:scale-110"
            >
              <Facebook size={24} strokeWidth={2.2} />
            </a>

            {/* LINE */}
            <a
              href="https://line.me/ti/p/mA7VhhHmaa" // 👉 เปลี่ยนเป็นลิงก์ LINE Official ของบริษัทคุณ
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LINE"
              className="text-white hover:text-accent-orange transition-transform transform hover:scale-110"
            >
              <SiLine size={24} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-lg">ลิงค์ด่วน</h3>
          <ul className="space-y-3 text-sm">
            {[
              { href: "/", label: "หน้าเเรก" },
              { href: "/about", label: "เกี่ยวกับเรา" },
              { href: "/product", label: "สินค้า" },
              { href: "/certificates", label: "ใบประกาศ" },
              { href: "/project", label: "โปรเจกต์" },
              { href: "/csr", label: "ช่วยเหลือสังคม (CSR)" },
            ].map((item, index) => (
              <li key={index}>
                <a
                  href={item.href}
                  className="group relative flex items-center text-white hover:text-accent-orange transition-all duration-300 font-medium"
                >
                  <span className="mr-2 h-2 w-2 rounded-full bg-white group-hover:bg-accent-orange transition-all duration-300" />
                  <span className="relative">
                    {item.label}
                    <span className="absolute left-0 -bottom-0.5 h-[2px] w-0 bg-accent-orange transition-all duration-500 group-hover:w-full" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-lg">ติดต่อ</h3>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <MapPin className="text-white mt-1" size={36} />
              <div className="text-white/90">
                JSP เลขที่ 11/43 หมู่ที่ 1 ตำบลอ้อมน้อย อำเภอกระทุ่มแบน จังหวัดสมุทรสาคร 74130
              </div>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="text-white" size={18} />
              <a
                href="tel:+66617671333"
                className="text-white hover:text-accent-orange transition duration-200 transform hover:scale-105 font-medium"
              >
                06-1767-1333
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="text-white" size={18} />
              <a
                href="mailto:jsp.metal2517@gmail.com"
                className="text-white hover:text-accent-orange transition duration-200 transform hover:scale-105 font-medium"
              >
                jsp.metal2517@gmail.com
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Clock className="text-white" size={18} />
              <span className="text-white/90">จันทร์ - เสาร์, 08:00 - 17:00 น.</span>
            </li>
          </ul>
        </div>

        {/* Map */}
        <div className="hidden lg:block">
          <div className="rounded-xl overflow-hidden shadow-md border border-white/30">
            <iframe
              title="JSP Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248097.05604252894!2d100.12586707699383!3d13.68713825205672!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e2bf421918aa03%3A0x38179a79948eed85!2z4Lia4Lij4Li04Lip4Lix4LiXIOC5gOC4iOC5gOC4reC4quC4nuC4tSDguYDguKHguJfguLHguKXguYDguKfguK3guKPguYzguIQg4LiI4Liz4LiB4Lix4LiU!5e0!3m2!1sth!2sth!4v1754551158151!5m2!1sth!2sth"
              width="100%"
              height="160"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20 py-4 bg-white/10 rounded-b-2xl">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-white font-medium">
            © {currentYear} JSP METAL WORKS CO.,LTD. สงวนลิขสิทธิ์ทั้งหมด
          </p>
          <div className="mt-2 md:mt-0 flex space-x-6 text-sm">
            <a
              href="/privacy"
              className="group relative text-white hover:text-accent-orange transition-all duration-300 font-medium"
            >
              <span className="relative">
                นโยบายความเป็นส่วนตัว
                <span className="absolute left-0 -bottom-0.5 h-[2px] w-0 bg-accent-orange transition-all duration-500 group-hover:w-full" />
              </span>
            </a>
            <a
              href="/contact"
              className="group relative text-white hover:text-accent-orange transition-all duration-300 font-medium"
            >
              <span className="relative">
                ติดต่อเรา
                <span className="absolute left-0 -bottom-0.5 h-[2px] w-0 bg-accent-orange transition-all duration-500 group-hover:w-full" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
