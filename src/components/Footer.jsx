import {
  Facebook,
  Phone,
  Mail,
  MapPin,
  Clock,
  ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";
import logo from "../assets/JSP_logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-green-primary text-green-bg"
    >
      {/* Main Content */}
      <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Company Info */}
        <div>
          <img
            src={logo}
            alt="JSP Logo"
            className="h-16 w-16 object-cover rounded-lg cursor-pointer"
            onDoubleClick={() => (window.location.href = "/login")}
          />
          <p className="mt-4 text-sm leading-relaxed text-green-bg">
            บริษัท JSP METAL WORKS CO.,LTD เป็นผู้เชี่ยวชาญในการผลิตตู้ไฟฟ้าเปล่าคุณภาพสูง มากกว่า 5 ปี
            เรามุ่งมั่นพัฒนาผลิตภัณฑ์ที่ตอบโจทย์ความต้องการของลูกค้า ด้วยมาตรฐานและคุณภาพระดับสากล
          </p>
          <div className="mt-4 flex space-x-4">
            <a
              href="https://web.facebook.com/p/D-100051458839623"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-accent-orange transition-transform transform hover:scale-110"
            >
              <Facebook size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-green-bg font-semibold mb-4">ลิงค์ด่วน</h3>
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
                  className="group relative flex items-center text-green-bg hover:text-accent-orange transition-all duration-300"
                >
                  <ChevronRight className="mr-2 flex-shrink-0" size={12} />
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
          <h3 className="text-green-bg font-semibold mb-4">ติดต่อ</h3>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <MapPin className="text-green-bg mt-1" size={16} />
              <span>M7MF+MJW ตำบล อ้อมน้อย อำเภอกระทุ่มแบน สมุทรสาคร 74130</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="text-green-bg" size={16} />
              <a href="tel:+66819879729" className="hover:text-accent-orange transition-colors transform hover:scale-105">
                081-987-9729
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="text-green-bg" size={16} />
              <a href="mailto:jsp.metal2517@gmail.com" className="hover:text-accent-orange transition-colors transform hover:scale-105">
                jsp.metal2517@gmail.com
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Clock className="text-green-bg" size={16} />
              <span>จันทร์ - เสาร์, 08:00 - 17:00 น.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-green-secondary py-4">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-green-bg">
            © {currentYear} JSP METAL WORKS CO.,LTD. สงวนลิขสิทธิ์ทั้งหมด
          </p>
          <div className="mt-2 md:mt-0 flex space-x-6 text-sm">
            <a
              href="/privacy"
              className="group relative text-green-bg hover:text-accent-orange transition-all duration-300"
            >
              <span className="relative">
                นโยบายความเป็นส่วนตัว
                <span className="absolute left-0 -bottom-0.5 h-[2px] w-0 bg-accent-orange transition-all duration-500 group-hover:w-full" />
              </span>
            </a>
            <a
              href="/contact"
              className="group relative text-green-bg hover:text-accent-orange transition-all duration-300"
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
