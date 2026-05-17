import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import Flute3D from '../canvas/Flute3D';
import Artwork3D from '../canvas/Artwork3D';

/* ─── Magnetic 3D tilt card ─── */
const TiltCard = ({ children, glowColor = '#00e5ff', className = '' }) => {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), { stiffness: 200, damping: 20 });
  const glowX = useSpring(useTransform(x, [-0.5, 0.5], [0, 100]), { stiffness: 200, damping: 20 });
  const glowY = useSpring(useTransform(y, [-0.5, 0.5], [0, 100]), { stiffness: 200, damping: 20 });

  const handleMouse = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1000 }}
      className={`relative ${className}`}
    >
      {/* Spotlight follow glow */}
      <motion.div
        className="absolute inset-0 rounded-[3rem] pointer-events-none z-20 transition-opacity duration-300"
        style={{
          opacity: hovered ? 1 : 0,
          background: useTransform(
            [glowX, glowY],
            ([gx, gy]) => `radial-gradient(400px circle at ${gx}% ${gy}%, ${glowColor}18 0%, transparent 60%)`
          ),
        }}
      />
      {/* Animated border trace */}
      <motion.div
        className="absolute inset-0 rounded-[3rem] pointer-events-none z-10"
        animate={hovered ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          boxShadow: `0 0 0 1px ${glowColor}40, inset 0 0 60px ${glowColor}08`,
        }}
      />
      {children}
    </motion.div>
  );
};


/* ─── Floating tag chip ─── */
const TagChip = ({ label, color, delay }) => (
  <motion.span
    initial={{ opacity: 0, y: 8 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.4 }}
    whileHover={{ scale: 1.1, y: -2 }}
    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-space tracking-wider border cursor-default"
    style={{ borderColor: `${color}40`, color, background: `${color}12` }}
  >
    {label}
  </motion.span>
);

const Hobbies = () => {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Parallax for section header
  const headerY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  // Parallax for cards (slight depth separation)
  const card1Y = useTransform(scrollYProgress, [0, 1], [40, -20]);
  const card2Y = useTransform(scrollYProgress, [0, 1], [80, -40]);

  return (
    <section
      ref={sectionRef}
      id="hobbies"
      className="py-24 min-h-screen bg-transparent relative z-10"
    >
      {/* Ambient background blobs */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-electricBlue/5 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purpleGlow/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-20 w-full">

        {/* ── Section Header ── */}
        <motion.div style={{ y: headerY }} className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-space text-xs tracking-[0.35em] uppercase text-electricBlue mb-3"
          >
            Beyond the Code
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl lg:text-6xl font-serif text-white leading-tight"
          >
            My Creative{' '}
            <span className="bg-gradient-to-r from-electricBlue to-purpleGlow bg-clip-text text-transparent">
              Soul
            </span>
          </motion.h2>

          {/* Animated divider line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mx-auto mt-6 h-px w-32 bg-gradient-to-r from-electricBlue via-purpleGlow to-transparent origin-left"
          />
        </motion.div>

        {/* ── Cards Row ── */}
        <div className="flex flex-col lg:flex-row gap-8 w-full">

          {/* ── ART CARD ── */}
          <motion.div style={{ y: card1Y }} className="flex-1">
            <TiltCard glowColor="#00e5ff" className="h-[520px] lg:h-[560px]">
              <div className="h-full rounded-[3rem] border border-white/5 bg-gradient-to-br from-white/[0.04] to-transparent overflow-hidden shadow-2xl">

                {/* 3D canvas — right side, masked */}
                <div className="absolute right-0 top-0 w-[75%] h-full z-0"
                  style={{
                    WebkitMaskImage: 'linear-gradient(to right, transparent, black 35%)',
                    maskImage: 'linear-gradient(to right, transparent, black 35%)',
                  }}>
                  <Artwork3D />
                </div>

                {/* Foreground content */}
                <div className="absolute inset-0 p-10 lg:p-12 flex flex-col justify-between z-10 pointer-events-none">
                  <div>
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="text-electricBlue font-space tracking-widest uppercase text-xs mb-4"
                    >
                      My Art
                    </motion.p>

                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                      className="text-3xl lg:text-4xl font-serif text-white mb-4 leading-tight"
                    >
                      Charcoal &<br />Pencil Realism
                    </motion.h3>

                    <motion.p
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="text-gray-400 font-space text-sm leading-relaxed max-w-[220px]"
                    >
         I am a passionate hyperrealism charcoal artist. Every artwork trains my patience, observation, and precision. Capturing microscopic details on paper naturally reflects in my pixel-perfect UI design approach. Art heals me by slowing my mind, sharpening focus, and giving emotions a visual form. Creativity becomes my way of thinking, building, and expressing beyond limitations.

            </motion.p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    <TagChip label="Hyperrealism" color="#00e5ff" delay={0.3} />
                    <TagChip label="Charcoal" color="#00e5ff" delay={0.35} />
                    <TagChip label="Pencil" color="#00e5ff" delay={0.4} />
                    <TagChip label="Portrait" color="#00e5ff" delay={0.45} />
                  </div>


                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* ── FLUTE CARD ── */}
          <motion.div style={{ y: card2Y }} className="flex-1">
            <TiltCard glowColor="#9d00ff" className="h-[520px] lg:h-[560px]">
              <div className="h-full rounded-[3rem] border border-white/5 bg-gradient-to-br from-white/[0.04] to-transparent overflow-hidden shadow-2xl">

                {/* 3D canvas — right side, masked */}
                <div className="absolute right-0 top-0 w-[75%] h-full z-0"
                  style={{
                    WebkitMaskImage: 'linear-gradient(to right, transparent, black 35%)',
                    maskImage: 'linear-gradient(to right, transparent, black 35%)',
                  }}>
                  <Flute3D />
                </div>

                {/* Foreground content */}
                <div className="absolute inset-0 p-10 lg:p-12 flex flex-col justify-between z-10 pointer-events-none">
                  <div>
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="text-purpleGlow font-space tracking-widest uppercase text-xs mb-4"
                    >
                      My Music
                    </motion.p>

                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="text-3xl lg:text-4xl font-serif text-white mb-4 leading-tight"
                    >
                      Where Music<br />Meets Soul
                    </motion.h3>

                    <motion.p
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className="text-gray-400 font-space text-sm leading-relaxed max-w-[220px]"
                    >
                   
I play the flute to disconnect from noise and reconnect with clarity. Music heals me by calming stress, balancing emotions, and creating mental peace during intense work. Every melody pushes me deeper into creativity and imagination. The flute helps me think artistically, feel rhythm in design, and transform emotions into meaningful creative experiences.     </motion.p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    <TagChip label="Flute" color="#9d00ff" delay={0.35} />
                    <TagChip label="Classical" color="#9d00ff" delay={0.4} />
                    <TagChip label="Hindustani" color="#9d00ff" delay={0.45} />
                    <TagChip label="Melody" color="#9d00ff" delay={0.5} />
                  </div>


                </div>
              </div>
            </TiltCard>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hobbies;
