import React from 'react';
import { motion } from 'framer-motion';
import { FaHandHoldingHeart, FaLeaf, FaGraduationCap, FaUsers } from 'react-icons/fa';

const CSR = () => {
  const csrInitiatives = [
    {
      icon: <FaHandHoldingHeart className="text-green-primary" />,
      title: "การช่วยเหลือชุมชน",
      description: "เรามุ่งมั่นช่วยเหลือชุมชนท้องถิ่นผ่านโครงการต่างๆ เช่น การบริจาคอุปกรณ์การศึกษา และการสนับสนุนกิจกรรมชุมชน"
    },
    {
      icon: <FaLeaf className="text-green-primary" />,
      title: "การอนุรักษ์สิ่งแวดล้อม",
      description: "ใช้กระบวนการผลิตที่เป็นมิตรต่อสิ่งแวดล้อม และส่งเสริมการใช้พลังงานสะอาดในโรงงาน"
    },
    {
      icon: <FaGraduationCap className="text-green-primary" />,
      title: "การสนับสนุนการศึกษา",
      description: "ให้ทุนการศึกษาแก่นักเรียนที่ขาดแคลน และสนับสนุนกิจกรรมการเรียนรู้ในชุมชน"
    },
    {
      icon: <FaUsers className="text-green-primary" />,
      title: "การพัฒนาพนักงาน",
      description: "ส่งเสริมการพัฒนาทักษะและความรู้ของพนักงาน รวมถึงการดูแลสวัสดิการอย่างครบถ้วน"
    }
  ];

  return (
    <main className="bg-base-light">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-green-primary text-white py-16"
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            ช่วยเหลือสังคม (CSR)
          </motion.h1>
          <motion.p 
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-green-bg max-w-3xl mx-auto"
          >
            เรามุ่งมั่นสร้างผลกระทบเชิงบวกต่อสังคมและสิ่งแวดล้อม ผ่านโครงการต่างๆ ที่ส่งเสริมการพัฒนาที่ยั่งยืน
          </motion.p>
        </div>
      </motion.section>

      {/* CSR Initiatives */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-green-primary mb-4">โครงการ CSR ของเรา</h2>
            <p className="text-black   max-w-2xl mx-auto">
              เรามุ่งมั่นสร้างความเปลี่ยนแปลงเชิงบวกในสังคมผ่านโครงการต่างๆ ที่ครอบคลุมทุกด้าน
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {csrInitiatives.map((initiative, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-green-bg/20 rounded-xl p-8 border border-green-soft/30 hover:shadow-lg transition-shadow"
              >
                <div className="text-accent-orange mb-4 flex justify-center">
                  {initiative.icon}
                </div>
                <h3 className="text-xl font-semibold text-green-primary mb-4 text-center">
                  {initiative.title}
                </h3>
                <p className="text-green-secondary text-center">
                  {initiative.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="py-16 bg-green-bg">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-green-primary mb-6">พันธสัญญาของเรา</h2>
            <p className="text-black text-lg mb-8">
              เรามุ่งมั่นที่จะเป็นส่วนหนึ่งในการสร้างสังคมที่ดีขึ้น ผ่านการดำเนินธุรกิจอย่างรับผิดชอบ 
              และการให้ความสำคัญกับการพัฒนาที่ยั่งยืน
            </p>
            <div className="bg-white rounded-xl p-8 shadow-lg border border-green-soft/20">
              <p className="text-green-primary text-lg font-semibold mb-4">
                "ร่วมสร้างอนาคตที่ดีกว่า เพื่อสังคมที่ยั่งยืน"
              </p>
              <p className="text-black">
                JSP Metal Works Co., Ltd.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default CSR;