import { useState } from "react";
import { FaShieldAlt, FaUserLock, FaHistory } from "react-icons/fa";

const Privacy = () => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-emerald-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 text-white py-16 shadow-md">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <FaShieldAlt className="mx-auto text-6xl mb-6 animate-bounce" />
          <h1 className="text-5xl font-bold mb-4">นโยบายความเป็นส่วนตัว</h1>
          <p className="text-xl text-emerald-100">
            เราให้ความสำคัญกับการปกป้องข้อมูลส่วนบุคคลของคุณ
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6 border border-white/30">
          <div className="flex items-start space-x-4 mb-6">
            <FaUserLock className="text-4xl text-emerald-600 mt-1" />
            <div>
              <p className="text-lg text-gray-700 leading-relaxed">
                นโยบายความเป็นส่วนตัวนี้อธิบายถึงวิธีการที่เราเก็บรวบรวม ใช้ และปกป้องข้อมูลส่วนบุคคลของคุณเมื่อเข้าใช้งานเว็บไซต์ของเรา
              </p>
            </div>
          </div>

          <div className="border-l-4 border-emerald-500 pl-6 mb-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              เรามุ่งมั่นที่จะปกป้องความเป็นส่วนตัวของคุณ หากเราขอข้อมูลที่สามารถระบุตัวตนของคุณ เราจะใช้ข้อมูลดังกล่าวตามนโยบายนี้เท่านั้น
            </p>
          </div>

          <button
            onClick={() => setShowMore(!showMore)}
            className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition-all duration-300 flex items-center space-x-2 hover:scale-[1.02]"
          >
            <FaHistory />
            <span>{showMore ? "แสดงน้อยลง" : "อ่านเพิ่มเติม"}</span>
          </button>

          {showMore && (
            <div className="mt-8 space-y-6">
              <div className="border-t border-white/30 pt-6">
                <h2 className="text-2xl font-semibold mb-4 text-emerald-600 flex items-center">
                  <span className="bg-emerald-100 p-2 rounded-lg mr-3">
                    <FaHistory className="text-emerald-600" />
                  </span>
                  การเปลี่ยนแปลงนโยบาย
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed pl-14">
                  เราอาจปรับปรุงนโยบายนี้เป็นครั้งคราวโดยการอัปเดตหน้านี้ ขอแนะนำให้คุณตรวจสอบหน้านี้เป็นระยะเพื่อให้มั่นใจว่าคุณพอใจกับการเปลี่ยนแปลง
                </p>
              </div>

              <div className="border-t border-white/30 pt-6">
                <h2 className="text-2xl font-semibold mb-4 text-emerald-600">วันที่มีผลบังคับใช้</h2>
                <p className="text-lg text-gray-700 leading-relaxed pl-14">
                  นโยบายนี้มีผลบังคับใช้ตั้งแต่วันที่ 1 มกราคม 2567
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Privacy;
