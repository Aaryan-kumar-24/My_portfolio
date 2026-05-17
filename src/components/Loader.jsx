import React from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-deepBlack"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50, transition: { duration: 0.8, ease: "easeInOut" } }}
    >
      <div className="relative w-32 h-32 flex items-center justify-center">
        {/* Outer Ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-t-2 border-electricBlue opacity-50"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        />
        {/* Inner Ring */}
        <motion.div
          className="absolute inset-2 rounded-full border-b-2 border-neonCyan opacity-80"
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
        />
        {/* Core Glow */}
        <motion.div
          className="w-4 h-4 rounded-full bg-electricBlue shadow-[0_0_20px_#00e5ff]"
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
        />
      </div>
      <motion.div 
        className="mt-8 text-electricBlue font-space tracking-[0.3em] text-sm uppercase"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        System Initializing
      </motion.div>
    </motion.div>
  );
};

export default Loader;
