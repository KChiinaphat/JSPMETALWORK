import { 
  Facebook, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ChevronRight 
} from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/JSP_Logo.jpg"; 

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Content */}
      <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Company Info */}
        <div>
          <Link to="/">
            <img
              src={logo}
              alt="JSP Logo"
              className="h-16 w-16 object-cover rounded-lg"
            />
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-gray-400">
            บริษัท JSP METAL WORKS CO.,LTD เป็นผู้เชี่ยวชาญในการผลิตตู้ไฟฟ้าเปล่าคุณภาพสูง มากกว่า 5 ปี เรามุ่งมั่นพัฒนาผลิตภัณฑ์ที่ตอบโจทย์ความต้องการของลูกค้า ด้วยมาตรฐานและคุณภาพระดับสากล
          </p>
          <div className="mt-4 flex space-x-4">
            <a href="https://web.facebook.com/p/D-100051458839623" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-yellow-500">
              <Facebook size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">ลิงค์ด่วน</h3>
          <ul className="space-y-3 text-sm">
            {[
              { to: "/", label: "หน้าเเรก" },
              { to: "/about", label: "เกี่ยวกับเรา" },
              { to: "/product", label: "สินค้า" },
              { to: "/certificate", label: "ใบประกาศ" },

              { to: "/project", label: "โปรเจกต์" },
              { to: "/csr", label: "ช่วยเหลือสังคม (CSR)" },
            ].map((item, index) => (
              <li key={index}>
                <Link
                  to={item.to}
                  className="relative flex items-center text-gray-300 hover:text-yellow-500 transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:w-0 after:h-[2px] after:bg-yellow-500 after:transition-all after:duration-1000 hover:after:w-full"
                >
                  <ChevronRight className="mr-2 flex-shrink-0" size={12} />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white font-semibold mb-4">ติดต่อ</h3>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <MapPin className="text-yellow-500 mt-1" size={16} />
              <span>M7MF+MJW ตำบล อ้อมน้อย อำเภอกระทุ่มแบน สมุทรสาคร 74130</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="text-yellow-500" size={16} />
              <a href="tel:+66819879729" className="hover:text-yellow-500 transition-colors">081-987-9729</a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="text-yellow-500" size={16} />
              <a href="mailto:power.modular@gmail.com" className="hover:text-yellow-500 transition-colors">power.modular@gmail.com</a>
            </li>
            <li className="flex items-center gap-3">
              <Clock className="text-yellow-500" size={16} />
              <span>จันทร์ - ศุกร์, 08:00 - 17:00 น.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-4">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            © {currentYear} JSP METAL WORKS CO.,LTD. สงวนลิขสิทธิ์ทั้งหมด
          </p>
          <div className="mt-2 md:mt-0 flex space-x-6 text-sm">
            <Link
              to="/privacy"
              className="relative hover:text-yellow-500 after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:w-0 after:h-[2px] after:bg-yellow-500 after:transition-all after:duration-700 hover:after:w-full"
            >
              นโยบายความเป็นส่วนตัว
            </Link>
           
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;