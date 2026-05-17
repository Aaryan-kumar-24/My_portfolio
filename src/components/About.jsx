import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const stats = [
  { id: 1, label: 'CGPA', value: '9.26', desc: 'Dayananda Sagar Academy' },
  { id: 2, label: 'Smart System', value: 'Problem Solving', desc: 'DSA & Logical Thinking' },
  { id: 3, label: 'Domain', value: 'Full Stack', desc: 'Development with AI & ML' },
  { id: 4, label: 'Artist & Flutist', value: 'Creative Mind', desc: 'Art, Music & Creativity' },
];

const About = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.2 1"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <section id="about" ref={ref} className="relative py-32 min-h-screen flex items-center bg-transparent overflow-hidden z-10">
      
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-electricBlue/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10 w-full">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Left Content */}
          <motion.div 
            style={{ y: y1, opacity: opacity1 }}
            className="flex-1"
          >

            
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-8">
<span className="text-gradient">Intelligence</span> into the Web
            </h3>
            
            <p className="text-gray-400 text-lg leading-relaxed mb-8 border-l border-white/10 pl-6 glass p-6 rounded-r-2xl">
              Problem-solving Full-Stack Web Developer skilled in MERN stack, Django, Machine Learning, Deep Learning, and Computer Vision. I specialize in designing scalable AI-powered web applications with RESTful APIs, real-time data processing, and optimized data architectures to deliver secure, intelligent, and user-centric solutions for real-world challenges.
            </p>
            

          </motion.div>

          {/* Right Stats Cards */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="glass p-6 rounded-xl border border-white/5 hover:border-electricBlue/50 transition-all duration-300 relative group overflow-hidden"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-electricBlue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <h4 className="text-3xl md:text-4xl font-black text-white mb-2 relative z-10">{stat.value}</h4>
                <p className="text-neonCyan font-space text-sm tracking-wider uppercase mb-1 relative z-10">{stat.label}</p>
                <p className="text-gray-500 text-xs relative z-10">{stat.desc}</p>
                
                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-white/10 to-transparent"></div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
