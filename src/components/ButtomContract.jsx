import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaFacebookMessenger, FaCommentDots, FaTimes } from 'react-icons/fa';

const ButtonContract = () => {
  const [isOpen, setIsOpen] = useState(false);

  const contactButtons = [
    {
      href: "mailto:jsp.metal2517@gmail.com",
      icon: FaEnvelope,
      label: "อีเมล"
    },
    {
      href: "https://maps.google.com?q=M7MF+MJW+ตำบล+อ้อมน้อย+อำเภอกระทุ่มแบน+สมุทรสาคร+74130",
      icon: FaMapMarkerAlt,
      label: "แผนที่",
      target: "_blank"
    },
    {
      href: "tel:+66819879729",
      icon: FaPhone,
      label: "โทรศัพท์"
    },
    {
      href: "https://web.facebook.com/p/D-100051458839623",
      icon: FaFacebookMessenger,
      label: "Facebook",
      target: "_blank"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      scale: 0,
      y: 20,
      rotate: -180
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 25,
        mass: 0.8
      }
    },
    exit: {
      opacity: 0,
      scale: 0,
      y: 20,
      rotate: 180,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  const mainButtonVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: { 
      scale: 1.1,
      rotate: isOpen ? 180 : 0,
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.9 }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      {/* Contact Buttons */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="flex flex-col items-end gap-3"
          >
            {contactButtons.map((button, index) => {
              const IconComponent = button.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.1,
                    x: -5,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative"
                >
                  <a
                    href={button.href}
                    target={button.target}
                    className="
                      relative overflow-hidden
                      bg-green-soft hover:bg-orange-600
                      p-4 rounded-full text-green-800 shadow-lg
                      transition-all duration-300
                      hover:shadow-2xl hover:shadow-orange-500/20
                      flex items-center justify-center
                    "
                  >
                    <IconComponent size={20} className="relative z-10" />
                    
                    {/* Ripple effect background */}
                    <div className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
                    
                    {/* Glow effect */}
                    <div className="absolute -inset-1 bg-orange-500 rounded-full opacity-0 group-hover:opacity-30 blur transition-opacity duration-300" />
                  </a>
                  
                  {/* Tooltip */}
                  <motion.div
                    initial={{ opacity: 0, x: 10, scale: 0.8 }}
                    whileHover={{ opacity: 1, x: 0, scale: 1 }}
                    className="absolute right-full top-1/2 transform -translate-y-1/2 mr-3 pointer-events-none"
                  >
                    <div className="bg-gray-800 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap shadow-lg">
                      {button.label}
                      <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-800" />
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Toggle Button */}
      <motion.button
        variants={mainButtonVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        onClick={() => setIsOpen(!isOpen)}
        className="
          relative overflow-hidden
          bg-green-soft hover:bg-green-light
          p-5 rounded-full text-green-800 shadow-2xl
          transition-all duration-300
          hover:shadow-orange-500/30
        "
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {isOpen ? <FaTimes size={24} /> : <FaCommentDots size={24} />}
        </motion.div>
        
        {/* Pulsing ring effect */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-green-primary"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 0.3, 0.7]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Background ripple */}
        <div className="absolute inset-0 bg-green-800/10 rounded-full scale-0 hover:scale-100 transition-transform duration-300" />
      </motion.button>
    </div>
  );
};

export default ButtonContract;