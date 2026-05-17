import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import SkillsSphere from '../canvas/SkillsSphere';

const skillCategories = [
  {
    title: "Programming Languages",
    skills: "TypeScript, JavaScript, Python, C, C++, Java, HTML, CSS"
  },
  {
    title: "Frameworks & Libraries",
    skills: "React.js, Node.js, Express.js, Django, OpenCV, NumPy, Pandas, Scikit-learn, SciPy, Matplotlib, Seaborn, PyTorch, Bootstrap, Tailwind CSS, Figma"
  },
  {
    title: "Databases & Cloud Services",
    skills: "MongoDB, MySQL, PostgreSQL, SQLite, Firebase"
  },
  {
    title: "Developer Tools & Platforms",
    skills: "Git, GitHub, VS Code, Ubuntu, Jupyter Notebook, Google Colab"
  },
  {
    title: "Cloud & DevOps",
    skills: "AWS (EC2, S3, RDS), Docker, Kubernetes, CI/CD (GitHub Actions, Jenkins), Ansible"
  }
];

const SkillCard = ({ cat, idx }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["100%", "0%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["100%", "0%"]);

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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: idx * 0.15 }}
      style={{ perspective: 1000 }}
      className="pointer-events-auto"
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.02 }}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="p-6 bg-deepBlack/60 border border-white/5 border-l-4 border-l-electricBlue rounded-r-xl shadow-lg hover:shadow-[0_0_30px_rgba(0,229,255,0.2)] hover:border-neonCyan transition-all duration-300 relative group overflow-hidden"
      >
        {/* Dynamic Glare Effect */}
        <motion.div 
          className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: "radial-gradient(circle at center, rgba(255,255,255,0.15) 0%, transparent 60%)",
            left: glareX,
            top: glareY,
            transform: "translate(-50%, -50%)",
            width: "200%",
            height: "200%"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-electricBlue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />
        
        <div style={{ transform: "translateZ(40px)" }} className="relative z-10">
          <h3 className="text-xl font-space font-bold text-white mb-2 tracking-wide uppercase drop-shadow">{cat.title}</h3>
          <p className="text-neonCyan leading-relaxed text-sm drop-shadow-md font-medium">
            {cat.skills}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="relative py-16 lg:py-24 min-h-screen flex items-center bg-transparent z-10">
      
      {/* 3D Galaxy Background Spreading and Blending into Neighboring Sections */}
      <div 
        className="absolute -top-[25%] left-0 w-full h-[150%] z-0 pointer-events-none flex items-center justify-center"
        style={{
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)'
        }}
      >
        <SkillsSphere />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 flex flex-col lg:flex-row items-center justify-end w-full h-full relative z-20 pointer-events-none">
        
        {/* Right Side: Skills Text Categories */}
        <div className="w-full lg:w-[55%] flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
              Core <span className="text-gradient">Competencies</span>
            </h2>
            <p className="text-gray-300 mb-10 text-lg drop-shadow-md">
              A comprehensive toolkit spanning from frontend architecture to deep learning models and cloud deployments.
            </p>
          </motion.div>

          <div className="flex flex-col gap-6">
            {skillCategories.map((cat, idx) => (
              <SkillCard key={idx} cat={cat} idx={idx} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Skills;
