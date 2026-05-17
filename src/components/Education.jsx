import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

const Education = () => {
  return (
    <section id="education" className="py-24 bg-deepBlack border-t border-white/5 z-10 relative">
      <div className="max-w-4xl mx-auto px-6 sm:px-10">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <GraduationCap size={48} className="text-electricBlue mx-auto mb-6" />
          <h2 className="text-4xl font-black text-white">
            Academic <span className="text-gradient">Foundation</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass p-10 rounded-2xl border border-white/10 hover:border-neonCyan/50 transition-colors duration-500 relative overflow-hidden"
        >
          {/* Glowing Accents */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-electricBlue/10 rounded-full blur-[50px]"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-purpleGlow/10 rounded-full blur-[50px]"></div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                BE – Information Science & Engineering
              </h3>
              <p className="text-lg text-electricBlue font-space tracking-wide mb-4">
                Dayananda Sagar Academy of Technology and Management
              </p>
              <div className="flex items-center gap-4">
                <span className="px-3 py-1 bg-white/5 border border-white/10 rounded text-sm text-gray-300 font-space uppercase">
                  Expected 2027
                </span>
              </div>
            </div>
            
            <div className="text-center bg-black/40 p-6 rounded-xl border border-white/5 min-w-[150px]">
              <p className="text-gray-400 font-space tracking-widest uppercase text-xs mb-2">Current CGPA</p>
              <p className="text-5xl font-black text-neonCyan drop-shadow-[0_0_10px_rgba(0,255,204,0.5)]">
                9.26
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Education;
