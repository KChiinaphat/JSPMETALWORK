import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const Certificates = () => {
  const [category, setCategory] = useState('สี');
  const [certificates, setCertificates] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // ฟังก์ชันเปิด PDF ใน Google Docs Viewer
  const openPdf = (url) => {
    const viewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`;
    const win = window.open('', '_blank');
    win.document.write(`
      <html>
        <head><title>ใบรับรอง</title></head>
        <body style="margin:0">
          <iframe src="${viewerUrl}" style="width:100%; height:100vh; border:none;"></iframe>
        </body>
      </html>
    `);
    win.document.close();
  };

  useEffect(() => {
    const fetchCertificates = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/certificates`);
        const categorized = res.data.reduce((acc, cert) => {
          const cat = cert.category || 'อื่น ๆ';
          if (!acc[cat]) acc[cat] = [];
          acc[cat].push(cert);
          return acc;
        }, {});
        setCertificates(categorized);
        setError('');
      } catch (err) {
        console.error(err);
        setError('ไม่สามารถโหลดข้อมูลใบประกาศได้');
      } finally {
        setLoading(false);
      }
    };
    fetchCertificates();
  }, []);

  return (
    <main className="py-12 px-4 sm:px-8 lg:px-16 bg-base-light">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="relative inline-block text-4xl md:text-5xl font-bold mb-6">
          <span className="text-green-primary">ใบรับรอง</span>
          <span className="text-green-secondary">ผลิตภัณฑ์</span>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-accent-orange to-accent-orange-light"></div>
        </h1>
        <p className="text-black max-w-2xl mx-auto text-lg">
          ใบรับรองมาตรฐานผลิตภัณฑ์ที่รับรองคุณภาพสินค้าของเรา
        </p>
      </motion.div>

      {/* Category Selector */}
      <div className="flex justify-center space-x-4 mb-12">
        <button
          onClick={() => setCategory('สี')}
          className={`px-4 py-2 rounded-lg font-medium transition ${category === 'สี' ? 'bg-accent-orange text-black ' : 'bg-green-soft text-green-primary hover:bg-green-secondary hover:text-black'}`}
        >
          ใบรับรองงานสี
        </button>
        <button
          onClick={() => setCategory('เหล็ก')}
          className={`px-4 py-2 rounded-lg font-medium transition ${category === 'เหล็ก' ? 'bg-accent-orange text-black' : 'bg-green-soft text-green-primary hover:bg-green-secondary hover:text-black'}`}
        >
          ใบรับรองงานเหล็ก
        </button>
        <button
        onClick={() => setCategory('สถาบันไฟฟ้าและอิเล็กทรอนิกส์')}
        className={`px-4 py-2 rounded-lg font-medium transition ${category === 'สถาบันไฟฟ้าและอิเล็กทรอนิกส์' ? 'bg-accent-orange text-black' : 'bg-green-soft text-green-primary hover:bg-green-secondary hover:text-black'}`}
        >
          ใบรับรองจากสถาบันไฟฟ้าเเละอิเล็กทรอนิกส์
        </button>
      </div>

      {loading ? (
        <p className="text-center text-green-secondary">กำลังโหลดข้อมูล...</p>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          >
            {certificates[category]?.map((cert, idx) => (
              <motion.div
                key={cert._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-green-soft/20"
              >
                <div className="aspect-w-16 aspect-h-9 bg-green-bg/30">
                  <a href={cert.url} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                    <img
                      src={cert.logo?.url || cert.image || 'https://via.placeholder.com/400x225?text=No+Image'}
                      alt={cert.name}
                      className="w-full h-full object-contain cursor-pointer"
                      loading="lazy"
                    />
                  </a>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-green-primary">{cert.name}</h3>
                  {cert.description && (
                    <p className="text-green-secondary mb-4">{cert.description}</p>
                  )}
                  <button
                    onClick={() => openPdf(cert.url)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-400 hover:bg-accent-orange-dark 
                      text-black hite rounded-lg transition-colors duration-300"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    ดูใบรับรอง
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      )}
    </main>
  );
};

export default Certificates;
