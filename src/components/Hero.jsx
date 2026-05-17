import React from 'react';
import { motion } from 'framer-motion';
import AvatarCanvas from '../canvas/AvatarCanvas';

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative w-full min-h-screen mx-auto flex items-center pt-[72px]"
    >
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10 py-10 md:py-0 md:absolute md:inset-0">

        {/* Text Content */}
        <div className="flex-1 flex flex-col justify-center z-10 text-center md:text-left order-2 md:order-1">

          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
            className="font-black text-4xl sm:text-6xl lg:text-8xl text-white mb-4 tracking-tighter"
          >
            ARYAN <br />
            <span className="text-gradient">KUMAR</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-sm sm:text-lg lg:text-xl text-gray-400 font-light mb-6 md:mb-8 max-w-xl mx-auto md:mx-0 border-l-2 border-electricBlue pl-4 text-left"
          >
            Full Stack Developer <span className="text-neonCyan"> | </span> Computer Vision OpenCV{' '}
            <span className="text-neonCyan"> | </span> Machine Learning{' '}
            <span className="text-neonCyan"> | </span> Deep Learning
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="flex flex-wrap gap-4 justify-center md:justify-start"
          >
            <a
              href="#projects"
              className="relative px-6 sm:px-8 py-3 bg-electricBlue text-black font-bold uppercase tracking-wider rounded-none hover:bg-neonCyan transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(0,229,255,0.4)] group overflow-hidden text-sm sm:text-base"
            >
              <span className="relative z-10">View Projects</span>
              <div className="absolute inset-0 h-full w-0 bg-white opacity-20 group-hover:w-full transition-all duration-300 ease-out"></div>
            </a>

            <a
              href="#contact"
              className="relative px-6 sm:px-8 py-3 bg-transparent border border-electricBlue text-electricBlue font-bold uppercase tracking-wider rounded-none hover:bg-electricBlue/10 transition-all duration-300 transform hover:scale-105 shadow-[inset_0_0_10px_rgba(0,229,255,0.2)] text-sm sm:text-base"
            >
              Contact Me
            </a>
          </motion.div>
        </div>

        {/* 3D Hologram Area */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="flex-1 w-full h-[38vh] sm:h-[45vh] md:h-full relative z-0 pointer-events-none flex items-center justify-center order-1 md:order-2"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] sm:w-[140%] h-[120%] sm:h-[140%] max-w-[600px] max-h-[600px] md:max-w-[800px] md:max-h-[800px]">
            <AvatarCanvas />
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
