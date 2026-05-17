import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const navLinks = [
  { id: 'about', title: 'About' },
  { id: 'skills', title: 'Skills' },
  { id: 'projects', title: 'Projects' },
  { id: 'experience', title: 'Experience' },
  { id: 'contact', title: 'Contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`fixed top-0 w-full z-[50] transition-all duration-300 ${
        scrolled ? 'glass py-4 shadow-[0_4px_30px_rgba(0,229,255,0.1)]' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 flex justify-between items-center">
        <a href="#hero" className="flex items-center gap-3">
          <motion.img
            src="/logo.png"
            alt="Aryan Kumar Logo"
            whileHover={{ scale: 1.08, filter: 'drop-shadow(0 0 12px #00e5ff)' }}
            transition={{ duration: 0.3 }}
            className="h-12 w-auto object-contain"
            style={{ filter: 'drop-shadow(0 0 6px #00e5ff66)' }}
          />
          <span className="text-white font-space font-bold text-xl tracking-widest hidden sm:block">
            Aryan<span className="text-electricBlue">.</span>
          </span>
        </a>

        <ul className="list-none hidden md:flex flex-row gap-8">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className="text-gray-300 hover:text-white font-medium text-sm tracking-wide transition-colors duration-300 relative group"
              >
                {link.title}
                <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-electricBlue transition-all duration-300 group-hover:w-full shadow-[0_0_8px_#00e5ff]" />
              </a>
            </li>
          ))}
        </ul>

        <div className="md:hidden flex flex-1 justify-end items-center">
          {/* Mobile menu toggle button placeholder */}
          <div className="w-8 h-8 flex flex-col justify-around items-center cursor-pointer">
            <span className="w-full h-[2px] bg-electricBlue shadow-[0_0_5px_#00e5ff]"></span>
            <span className="w-full h-[2px] bg-electricBlue shadow-[0_0_5px_#00e5ff]"></span>
            <span className="w-full h-[2px] bg-electricBlue shadow-[0_0_5px_#00e5ff]"></span>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
