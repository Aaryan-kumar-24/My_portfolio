import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { id: 'about', title: 'About' },
  { id: 'skills', title: 'Skills' },
  { id: 'projects', title: 'Projects' },
  { id: 'education', title: 'Education' },
  { id: 'contact', title: 'Contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      if (menuOpen) setMenuOpen(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [menuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={`fixed top-0 w-full z-[50] transition-all duration-300 ${
          scrolled || menuOpen
            ? 'glass py-4 shadow-[0_4px_30px_rgba(0,229,255,0.1)]'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 flex justify-between items-center">
          <a href="#hero" className="flex items-center gap-3" onClick={handleLinkClick}>
            <motion.img
              src="/logo.png"
              alt="Aryan Kumar Logo"
              whileHover={{ scale: 1.08, filter: 'drop-shadow(0 0 12px #00e5ff)' }}
              transition={{ duration: 0.3 }}
              className="h-10 w-auto object-contain"
              style={{ filter: 'drop-shadow(0 0 6px #00e5ff66)' }}
            />
            <span className="text-white font-space font-bold text-xl tracking-widest">
              Aryan<span className="text-electricBlue">.</span>
            </span>
          </a>

          {/* Desktop links */}
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

          {/* Hamburger button */}
          <button
            className="md:hidden flex flex-col justify-center items-center gap-[5px] w-9 h-9 relative z-[60] cursor-pointer focus:outline-none"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="block w-7 h-[2px] bg-electricBlue shadow-[0_0_6px_#00e5ff] origin-center"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
              className="block w-7 h-[2px] bg-electricBlue shadow-[0_0_6px_#00e5ff]"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="block w-7 h-[2px] bg-electricBlue shadow-[0_0_6px_#00e5ff] origin-center"
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-0 z-[40] flex flex-col items-center justify-center md:hidden"
            style={{
              background: 'rgba(5,5,8,0.97)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
          >
            {/* Ambient glow */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-electricBlue/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purpleGlow/10 rounded-full blur-[100px] pointer-events-none" />

            <nav className="relative z-10 flex flex-col items-center gap-8">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={handleLinkClick}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: idx * 0.07, duration: 0.35 }}
                  className="text-3xl font-black tracking-widest uppercase text-white hover:text-electricBlue transition-colors duration-300"
                  style={{ textShadow: '0 0 20px rgba(0,229,255,0.3)' }}
                >
                  {link.title}
                </motion.a>
              ))}
            </nav>

            {/* Decorative bottom line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="absolute bottom-16 h-px w-32 bg-gradient-to-r from-electricBlue via-purpleGlow to-transparent origin-left"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
