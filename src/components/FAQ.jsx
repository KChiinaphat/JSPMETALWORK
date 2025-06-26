import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQ = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-green-soft/20"
      whileHover={{ scale: 1.01 }}
    >
      <button
        className="w-full px-6 py-4 flex justify-between items-center gap-4 hover:bg-green-bg/10 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-semibold text-left flex items-center gap-3 text-green-primary">
          <span className="text-green-primary text-2xl">Q.</span>
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-green-secondary text-xl"
        >
          ▼
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-4 pt-2">
              <div className="flex gap-3">
                <span className="text-2xl text-green-secondary">A.</span>
                <p className="text-green-secondary">{answer}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FAQ;
