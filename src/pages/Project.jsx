import React from 'react';
import { motion } from 'framer-motion';

const Project = () => {
  const projects = [
    {
      id: 1,
      title: "โครงการอาคารสำนักงานใหญ่",
      description: "ติดตั้งตู้ควบคุมไฟฟ้าสำหรับอาคารสำนักงาน 20 ชั้น",
      location: "กรุงเทพมหานคร",
      year: "2023",
      image: "https://via.placeholder.com/400x300?text=Office+Building"
    },
    {
      id: 2,
      title: "โรงงานอุตสาหกรรม",
      description: "ระบบควบคุมไฟฟ้าสำหรับโรงงานผลิตอาหาร",
      location: "สมุทรสาคร",
      year: "2023",
      image: "https://via.placeholder.com/400x300?text=Factory"
    },
    {
      id: 3,
      title: "ศูนย์การค้า",
      description: "ตู้ควบคุมไฟฟ้าสำหรับศูนย์การค้าขนาดใหญ่",
      location: "ชลบุรี",
      year: "2022",
      image: "https://via.placeholder.com/400x300?text=Shopping+Mall"
    }
  ];

  return (
    <main className="py-12 px-4 sm:px-8 lg:px-16 bg-base-light">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="relative inline-block text-4xl md:text-5xl font-bold mb-6">
          <span className="text-green-primary">โปรเจกต์</span>
          <span className="text-green-secondary">ของเรา</span>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-accent-orange to-amber-500"></div>
        </h1>
        <p className="text-black max-w-2xl mx-auto text-lg">
          โปรเจกต์ที่เราได้ร่วมงานกับลูกค้าทั่วประเทศ
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {projects.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-green-soft/20"
          >
            <div className="aspect-w-16 aspect-h-9 bg-green-bg/30">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-green-primary">{project.title}</h3>
              <p className="text-green-secondary mb-4">{project.description}</p>
              <div className="flex justify-between items-center text-sm text-green-secondary">
                <span>{project.location}</span>
                <span>{project.year}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
};

export default Project;