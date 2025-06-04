import { useState } from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaFacebookMessenger, FaCommentDots, FaTimes } from 'react-icons/fa';

const ButtonContract = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-15 right-8 z-50 flex flex-col items-start gap-3">
      {isOpen && (
        <div className="flex flex-col gap-3">
          <a href="mailto:example@email.com" className="bg-red-500 p-3 rounded-full text-white shadow-lg hover:scale-110 transition">
            <FaEnvelope size={20} />
          </a>
          <a href="https://maps.google.com?q=Your+Location" target="_blank" className="bg-green-500 p-3 rounded-full text-white shadow-lg hover:scale-110 transition">
            <FaMapMarkerAlt size={20} />
          </a>
          <a href="tel:+1234567890" className="bg-emerald-400 p-3 rounded-full text-white shadow-lg hover:scale-110 transition">
            <FaPhone size={20} />
          </a>
          <a href="https://m.me/yourpage" target="_blank" className="bg-blue-500 p-3 rounded-full text-white shadow-lg hover:scale-110 transition">
            <FaFacebookMessenger size={20} />
          </a>
        </div>
      )}

      {/* ปุ่ม toggle แสดง/ซ่อน */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-yellow-600 p-4 rounded-full text-gray-900 shadow-lg hover:scale-110 transition"
      >
        {isOpen ? <FaTimes size={20} /> : <FaCommentDots size={20} />}
      </button>
    </div>
  );
};

export default ButtonContract;
