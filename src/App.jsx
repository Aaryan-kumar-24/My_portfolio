import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Loader from './components/Loader';
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Hobbies from './components/Hobbies';
import Education from './components/Education';
import Contact from './components/Contact';
import BackgroundGrid from './canvas/BackgroundGrid';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for 3D assets
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Cursor />
      <AnimatePresence mode="wait">
        {loading ? (
          <Loader key="loader" />
        ) : (
          <motion.div key="content" className="relative z-0 bg-deepBlack min-h-screen">
            <BackgroundGrid />
            <Navbar />
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Hobbies />
            <Education />
            <Contact />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
