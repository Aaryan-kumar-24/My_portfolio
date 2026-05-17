import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { FiGithub } from 'react-icons/fi';

const ProjectCard = ({ project, index }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      style={{ perspective: 1000 }}
      className="w-full"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="glass rounded-2xl p-5 sm:p-8 lg:p-10 border border-white/10 hover:border-neonCyan/50 transition-colors duration-500 relative flex flex-col lg:flex-row gap-6 lg:gap-10 overflow-hidden group"
      >
        {/* Glow Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-electricBlue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Content Side */}
        <div className="flex-1 flex flex-col z-10" style={{ transform: "translateZ(20px)" }}>
          <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">{project.title}</h3>
          <p className="text-neonCyan font-space tracking-widest text-xs uppercase mb-4 sm:mb-6">{project.subtitle}</p>
          
          <ul className="space-y-2 mb-6 text-gray-400 text-sm">
            {project.features.map((feature, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-electricBlue" />
                {feature}
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-6 flex flex-wrap gap-2 mb-8">
            {project.tech.map((t, idx) => (
              <span key={idx} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300 font-space uppercase tracking-wider">
                {t}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4 mt-auto">
            <a href={project.github} className="flex items-center gap-2 text-white hover:text-electricBlue transition-colors font-space text-sm tracking-wider uppercase">
              <FiGithub size={18} /> GitHub
            </a>
            {project.live && (
              <a href={project.live} className="flex items-center gap-2 text-white hover:text-neonCyan transition-colors font-space text-sm tracking-wider uppercase">
                <ExternalLink size={18} /> Live Demo
              </a>
            )}
          </div>
        </div>

        {/* Video Demo Side */}
        <div className="flex-1 relative rounded-xl overflow-hidden min-h-[220px] sm:min-h-[280px] lg:min-h-[300px] border border-white/10 bg-[#0a0a12]" style={{ transform: "translateZ(30px)" }}>
          {project.video ? (
            <video
              src={project.video}
              autoPlay
              muted
              loop
              playsInline
              controls
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1a] flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
              <div className="w-3/4 h-3/4 border-2 border-electricBlue/20 rounded-lg relative flex flex-col overflow-hidden">
                <div className="w-full h-6 bg-white/5 flex items-center px-2 gap-1 border-b border-white/10">
                  <div className="w-2 h-2 rounded-full bg-red-500/50" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                  <div className="w-2 h-2 rounded-full bg-green-500/50" />
                </div>
                <div className="flex-1 p-4 flex flex-col gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                  <div className="w-full h-4 bg-white/10 rounded" />
                  <div className="w-3/4 h-4 bg-electricBlue/20 rounded" />
                  <div className="w-full flex-1 bg-white/5 rounded mt-2 border border-neonCyan/20 flex items-center justify-center text-neonCyan font-space tracking-widest uppercase text-xs">
                    {project.title.split(' ')[0]} Interface
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;
