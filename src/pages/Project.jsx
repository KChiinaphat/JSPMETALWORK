import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import ProjectCard from "../components/ProjectCard";

const Project = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/projects` );
        console.log("Response data:", response.data);
        setProjects(response.data);
      } catch (error) {
        console.error('ไม่สามารถดึงข้อมูลได้', error);
      }
    };
    fetchProject();
  }, []);

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
          <ProjectCard key={project._id} {...project} delay={idx * 0.1} />
        ))}
      </div>
    </main>
  );
};

export default Project;
