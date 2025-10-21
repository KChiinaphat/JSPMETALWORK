import { useState, useEffect } from "react";
import {
  FaPhone,
  FaEnvelope,
  FaBuilding,
  FaUser,
  FaMapMarkerAlt,
  FaHeadset,
} from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    company: "",
    subject: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [popup, setPopup] = useState({ show: false, message: "", type: "" }); // popup state

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setSubmitted(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/contract`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setPopup({
          show: true,
          message:
            "👍เราได้ส่งข้อความติดต่อของคุณไปยังอีเมลย์ของบริฐัทเเล้วกรุณารอเราติดต่อกลับ",
          type: "success",
        });
        setFormData({
          email: "",
          phone: "",
          firstName: "",
          lastName: "",
          company: "",
        });
      } else {
        setPopup({
          show: true,
          message: "❌ เกิดข้อผิดพลาดในการส่งข้อมูล",
          type: "error",
        });
      }
    } catch (error) {
      setPopup({
        show: true,
        message: "❌ ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้",
        type: "error",
      });
    } finally {
      setSubmitted(false);
    }
  };

  // ปิด popup อัตโนมัติหลัง 3 วินาที
  useEffect(() => {
    if (popup.show) {
      const timer = setTimeout(() => setPopup({ ...popup, show: false }), 3000);
      return () => clearTimeout(timer);
    }
  }, [popup]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-base-light to-white relative">
      {/* Popup แจ้งเตือน */}
      {popup.show && (
        <div
          className={`fixed top-6 right-6 z-50 flex items-start space-x-3 p-4 rounded-xl shadow-xl w-full max-w-sm
      text-white animate-fade-in-up
      ${popup.type === "success" ? "bg-green-500/90" : "bg-red-500/90"}`}
        >
          <div className="text-2xl">
            {popup.type === "success" ? "✅" : "❌"}
          </div>
          <div className="text-sm font-medium">{popup.message}</div>
        </div>
      )}

      {/* Hero Section */}
     <div className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 text-white py-16 shadow-md">
  <div className="container mx-auto px-4 max-w-4xl text-center">
    <FaHeadset className="mx-auto text-5xl mb-6 animate-bounce text-white" />
    <h1 className="text-4xl font-bold mb-4">ติดต่อเรา</h1>
    <p className="text-xl text-white/90">
      เรายินดีให้คำปรึกษาและช่วยเหลือคุณ
    </p>
  </div>
</div>


      <div className="container mx-auto px-4 py-8 -mt-5 ">
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300 border border-green-soft/20">
            <h2 className="text-2xl font-semibold text-green-primary mb-6">
              ส่งข้อความถึงเรา
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="transform transition-all duration-300 hover:scale-[1.02]">
                  <label
                    htmlFor="firstName"
                    className="block text-green-primary mb-2 font-medium"
                  >
                    ชื่อ
                  </label>
                  <div className="relative group">
                    <span className="absolute left-3 top-3 text-green-secondary group-hover:text-accent-orange transition-colors">
                      <FaUser />
                    </span>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-2 rounded-lg border border-green-soft/30 focus:outline-none focus:border-accent-orange focus:ring-2 focus:ring-accent-orange/20 transition-all"
                      required
                    />
                  </div>
                </div>
                <div className="transform transition-all duration-300 hover:scale-[1.02]">
                  <label
                    htmlFor="lastName"
                    className="block text-green-primary mb-2 font-medium"
                  >
                    นามสกุล
                  </label>
                  <div className="relative group">
                    <span className="absolute left-3 top-3 text-green-secondary group-hover:text-accent-orange transition-colors">
                      <FaUser />
                    </span>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-2 rounded-lg border border-green-soft/30 focus:outline-none focus:border-accent-orange focus:ring-2 focus:ring-accent-orange/20 transition-all"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-green-primary mb-2"
                >
                  อีเมล
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-green-secondary">
                    <FaEnvelope />
                  </span>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2 rounded-lg border border-green-soft/30 focus:outline-none focus:border-accent-orange focus:ring-2 focus:ring-accent-orange/20 transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-green-primary mb-2"
                >
                  หัวข้อที่ติดต่อ
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-green-secondary">
                    <FaEnvelope />
                  </span>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2 rounded-lg border border-green-soft/30 focus:outline-none focus:border-accent-orange focus:ring-2 focus:ring-accent-orange/20 transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-green-primary mb-2"
                >
                  เบอร์โทรศัพท์
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-green-secondary">
                    <FaPhone />
                  </span>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2 rounded-lg border border-green-soft/30 focus:outline-none focus:border-accent-orange focus:ring-2 focus:ring-accent-orange/20 transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="company"
                  className="block text-green-primary mb-2"
                >
                  บริษัท
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-green-secondary">
                    <FaBuilding />
                  </span>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2 rounded-lg border border-green-soft/30 focus:outline-none focus:border-accent-orange focus:ring-2 focus:ring-accent-orange/20 transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitted}
                className={`w-full py-3 rounded-lg text-light-green font-medium shadow-lg transform hover:scale-[1.02] transition-all duration-300 ${
                  submitted
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-secondary hover:bg-accent-orange-dark"
                }`}
              >
                {submitted ? "กำลังส่ง..." : "ส่งข้อความ"}
              </button>
            </form>
          </div>

          {/* Map and Contact Info */}
          <div className="bg-white rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 border border-green-soft/20">
            <div className="h-[400px] relative">
              <iframe
                title="Google Map"
                aria-label="ที่อยู่บริษัท"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3876.5639213753625!2d100.27149357513528!3d13.684259986700589!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e2bf421918aa03%3A0x38179a79948eed85!2z4Lia4Lij4Li04Lip4Lix4LiXIOC5gOC4iOC5gOC4reC4quC4nuC4tSDguYDguKHguJfguLHguKXguYDguKfguK3guKPguYzguIQg4LiI4Liz4LiB4Lix4LiU!5e0!3m2!1sth!2sth!4v1754450467320!5m2!1sth!2sth"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              />
            </div>
            <div className="p-8 bg-gradient-to-br from-white to-green-bg/20">
              <h2 className="text-2xl font-semibold text-green-primary mb-6">
                ข้อมูลการติดต่อ
              </h2>
              <div className="space-y-6">
                <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-green-soft/20">
                  <div className="bg-green-bg p-3 rounded-full">
                    <FaMapMarkerAlt className="text-green-primary text-xl" />
                  </div>
                  <div>
                    <h3 className="font-medium text-green-primary">ที่อยู่</h3>
                    <p className="text-green-secondary">
                      JSP เลขที่ 11/43 หมู่ที่ 1 ตำบลอ้อมน้อย ตำบลอ้อมน้อย
                      อำเภอกระทุ่มแบน จังหวัดสมุทรสาคร 74130
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-green-soft/20">
                  <div className="bg-green-bg p-3 rounded-full">
                    <FaPhone className="text-green-primary text-xl" />
                  </div>
                  <div>
                    <h3 className="font-medium text-green-primary">โทรศัพท์</h3>
                    <p className="text-green-secondary">06-1767-1333</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-green-soft/20">
                  <div className="bg-green-bg p-3 rounded-full">
                    <FaEnvelope className="text-green-primary text-xl" />
                  </div>
                  <div>
                    <h3 className="font-medium text-green-primary">อีเมล</h3>
                    <p className="text-green-secondary">
                      jsp.metal2517@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
