import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { FiGithub, FiLinkedin } from 'react-icons/fi';
import { SiLeetcode } from 'react-icons/si';
import { Float } from '@react-three/drei';

/* ─── Floating 3D orbs in the background ─── */
const FloatingOrbs = () => {
  const group = useRef();
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.getElapsedTime() * 0.08;
      group.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.05) * 0.1;
    }
  });
  const orbData = [
    { pos: [3, 1, -2], r: 0.18, color: '#00e5ff', emissive: '#00e5ff', speed: 2.0 },
    { pos: [-3, -1, -1], r: 0.12, color: '#9d00ff', emissive: '#9d00ff', speed: 1.6 },
    { pos: [0, 3, -3], r: 0.22, color: '#00e5ff', emissive: '#00e5ff', speed: 2.4 },
    { pos: [-2, 2, -2], r: 0.1, color: '#ffffff', emissive: '#ffffff', speed: 1.8 },
    { pos: [2, -2, -1], r: 0.14, color: '#9d00ff', emissive: '#9d00ff', speed: 2.2 },
    { pos: [0, -3, -2], r: 0.16, color: '#00e5ff', emissive: '#00e5ff', speed: 1.4 },
  ];
  return (
    <group ref={group}>
      {orbData.map((o, i) => (
        <Float key={i} speed={o.speed} rotationIntensity={1} floatIntensity={2}>
          <mesh position={o.pos}>
            <sphereGeometry args={[o.r, 16, 16]} />
            <meshStandardMaterial color={o.color} emissive={o.emissive} emissiveIntensity={3} />
          </mesh>
        </Float>
      ))}
      {/* Ring */}
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[4.5, 0.012, 12, 120]} />
        <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={1.5} transparent opacity={0.3} />
      </mesh>
      <mesh rotation={[-Math.PI / 4, Math.PI / 5, 0]}>
        <torusGeometry args={[3.5, 0.009, 12, 120]} />
        <meshStandardMaterial color="#9d00ff" emissive="#9d00ff" emissiveIntensity={1.5} transparent opacity={0.25} />
      </mesh>
    </group>
  );
};

/* ─── Magnetic tilt card ─── */
const TiltCard = ({ children, glowColor = '#00e5ff', className = '' }) => {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 200, damping: 25 });
  const rotY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 200, damping: 25 });
  const glowX = useSpring(useTransform(x, [-0.5, 0.5], [0, 100]), { stiffness: 150, damping: 20 });
  const glowY = useSpring(useTransform(y, [-0.5, 0.5], [0, 100]), { stiffness: 150, damping: 20 });

  const handleMouse = (e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); x.set(0); y.set(0); }}
      style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d', perspective: 1200 }}
      className={`relative ${className}`}
    >
      {/* Spotlight cursor follow */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none z-20"
        style={{
          opacity: hovered ? 1 : 0,
          background: useTransform(
            [glowX, glowY],
            ([gx, gy]) => `radial-gradient(320px circle at ${gx}% ${gy}%, ${glowColor}20 0%, transparent 65%)`
          ),
        }}
      />
      {/* Border glow on hover */}
      <motion.div
        animate={hovered ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 rounded-2xl pointer-events-none z-10"
        style={{ boxShadow: `0 0 0 1px ${glowColor}50, 0 0 30px ${glowColor}18` }}
      />
      {children}
    </motion.div>
  );
};

/* ─── Social link with ripple ─── */
const SocialLink = ({ href, icon: Icon, color, label, delay }) => {
  const [ripple, setRipple] = useState(false);
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4 }}
      whileHover={{ scale: 1.15, y: -4 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => { setRipple(true); setTimeout(() => setRipple(false), 600); }}
      className="relative w-12 h-12 rounded-full flex items-center justify-center border border-white/10 text-white overflow-hidden"
      style={{ background: 'rgba(255,255,255,0.04)' }}
      title={label}
    >
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={ripple ? { scale: 2.5, opacity: 0 } : { scale: 0, opacity: 0.4 }}
        transition={{ duration: 0.5 }}
        style={{ background: color }}
      />
      <motion.div
        className="absolute inset-0 rounded-full opacity-0"
        whileHover={{ opacity: 1 }}
        style={{ background: `${color}20`, boxShadow: `0 0 18px ${color}60` }}
      />
      <Icon size={18} style={{ color, position: 'relative', zIndex: 1 }} />
    </motion.a>
  );
};

/* ─── Animated info card ─── */
const InfoCard = ({ icon: Icon, label, value, color, href, delay, className = '' }) => {
  const content = (
    <TiltCard glowColor={color} className={`h-full ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
        className="h-full p-7 rounded-2xl border border-white/10 flex flex-col gap-3 cursor-default"
        style={{ background: 'rgba(10,10,18,0.85)', backdropFilter: 'blur(12px)' }}
      >
        <motion.div
          whileHover={{ rotate: [0, -10, 10, 0], scale: 1.2 }}
          transition={{ duration: 0.5 }}
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{ background: `${color}18`, border: `1px solid ${color}30` }}
        >
          <Icon size={20} style={{ color }} />
        </motion.div>
        <span className="text-gray-500 font-space tracking-widest uppercase text-[10px]">{label}</span>
        <span className="text-white font-medium text-base break-all">{value}</span>
      </motion.div>
    </TiltCard>
  );
  return href ? <a href={href} className="h-full block">{content}</a> : content;
};

/* ─── Main Component ─── */
const Contact = () => {
  const sectionRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const headerY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const orbsY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const formY = useTransform(scrollYProgress, [0, 1], [60, -40]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3500);
  };

  const fields = [
    { id: 'name',    label: 'Identify — Name',      type: 'text',  color: '#00e5ff' },
    { id: 'email',   label: 'Return Address — Email', type: 'email', color: '#9d00ff' },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-32 min-h-screen relative overflow-hidden border-t border-white/5 z-10"
      style={{ background: '#050508' }}
    >
      {/* ── Ambient glows ── */}
      <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-electricBlue/8 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purpleGlow/8 rounded-full blur-[140px] pointer-events-none" />

      {/* ── 3D Orb Canvas (full-section background) ── */}
      <motion.div style={{ y: orbsY }} className="absolute inset-0 z-0 pointer-events-none opacity-60">
        <Canvas camera={{ position: [0, 0, 8], fov: 55 }}>
          <ambientLight intensity={0.3} />
          <pointLight position={[5, 5, 5]} intensity={2} color="#00e5ff" />
          <pointLight position={[-5, -5, 5]} intensity={1.5} color="#9d00ff" />
          <FloatingOrbs />
        </Canvas>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 w-full relative z-10">

        {/* ── Section Header ── */}
        <motion.div style={{ y: headerY }} className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-space text-xs tracking-[0.4em] uppercase text-electricBlue mb-4"
          >
            Transmission Terminal
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl lg:text-7xl font-black text-white mb-4 tracking-tight"
          >
            Initialize{' '}
            <span className="bg-gradient-to-r from-electricBlue via-cyan-400 to-purpleGlow bg-clip-text text-transparent">
              Connection
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 font-space tracking-[0.35em] uppercase text-sm"
          >
            Let's build the future together
          </motion.p>

          {/* Animated divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mx-auto mt-6 h-px w-48 bg-gradient-to-r from-electricBlue via-purpleGlow to-transparent origin-left"
          />
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">

          {/* ── Left: Info Panel ── */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 w-full flex flex-col gap-6"
          >
            {/* Email — full-width */}
            <InfoCard
              icon={Mail} label="Secure Channel"
              value="amankumarjanuary@gmail.com"
              color="#00ffcc"
              href="mailto:amankumarjanuary@gmail.com"
              delay={0.1}
            />

            {/* Phone + Location — side by side */}
            <div className="grid grid-cols-2 gap-6">
              <InfoCard
                icon={Phone} label="Comms Link"
                value="+91 9310625964"
                color="#00e5ff"
                delay={0.2}
              />
              <InfoCard
                icon={MapPin} label="Coordinates"
                value="Bengaluru, India"
                color="#9d00ff"
                delay={0.3}
              />
            </div>

            {/* Socials */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center gap-4 pt-2"
            >
              <SocialLink href="https://www.linkedin.com/in/aryan-kumar-8b91a340b/" icon={FiLinkedin} color="#00ffcc" label="LinkedIn" delay={0.5} />
              <SocialLink href="https://github.com/Aaryan-kumar-24"               icon={FiGithub}   color="#00e5ff" label="GitHub"   delay={0.55} />
              <SocialLink href="https://leetcode.com/u/__aaryan__24/"             icon={SiLeetcode} color="#9d00ff" label="LeetCode"  delay={0.6} />
            </motion.div>
          </motion.div>

          {/* ── Right: Contact Form ── */}
          <motion.div style={{ y: formY }} className="flex-1 w-full">
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <TiltCard glowColor="#00e5ff" className="w-full">
                <form
                  onSubmit={handleSubmit}
                  className="p-10 rounded-2xl border border-white/10 flex flex-col gap-8 relative overflow-hidden"
                  style={{ background: 'rgba(8,8,16,0.92)', backdropFilter: 'blur(16px)' }}
                >
                  {/* Animated top scanning bar */}
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-electricBlue via-purpleGlow to-electricBlue bg-[length:200%_auto]"
                    style={{ animation: 'gradientShift 3s linear infinite' }}
                  />

                  {/* Text fields */}
                  {fields.map(({ id, label, type, color }, i) => (
                    <motion.div
                      key={id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="relative flex flex-col gap-1"
                    >
                      <label
                        htmlFor={id}
                        className="font-space tracking-widest uppercase text-[10px] transition-colors duration-300"
                        style={{ color: focused === id ? color : '#6b7280' }}
                      >
                        {label}
                      </label>
                      <div className="relative">
                        <input
                          id={id}
                          type={type}
                          required
                          onFocus={() => setFocused(id)}
                          onBlur={() => setFocused(null)}
                          className="w-full py-3 px-4 rounded-lg text-white focus:outline-none transition-all duration-300 font-space text-sm"
                          style={{
                            background: 'rgba(255,255,255,0.05)',
                            border: `1px solid ${focused === id ? color : 'rgba(255,255,255,0.1)'}`,
                            boxShadow: focused === id ? `0 0 0 2px ${color}20` : 'none',
                            caretColor: color,
                          }}
                        />
                        {/* Bottom glow sweep */}
                        <motion.div
                          className="absolute bottom-0 left-2 right-2 h-px rounded-full"
                          animate={{ opacity: focused === id ? 1 : 0, background: color }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </motion.div>
                  ))}

                  {/* Textarea */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="relative flex flex-col gap-1 mt-2"
                  >
                    <label
                      htmlFor="message"
                      className="font-space tracking-widest uppercase text-[10px] transition-colors duration-300"
                      style={{ color: focused === 'message' ? '#9d00ff' : '#6b7280' }}
                    >
                      Payload — Message
                    </label>
                    <div className="relative">
                    <textarea
                      id="message"
                      required
                      rows={4}
                      onFocus={() => setFocused('message')}
                      onBlur={() => setFocused(null)}
                      className="w-full py-3 px-4 rounded-lg text-white focus:outline-none transition-all duration-300 resize-none font-space text-sm"
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: `1px solid ${focused === 'message' ? '#9d00ff' : 'rgba(255,255,255,0.1)'}`,
                        boxShadow: focused === 'message' ? '0 0 0 2px rgba(157,0,255,0.2)' : 'none',
                        caretColor: '#9d00ff',
                      }}
                    />
                    <motion.div
                      className="absolute bottom-0 left-2 right-2 h-px rounded-full bg-purpleGlow"
                      animate={{ width: focused === 'message' ? '100%' : '0%' }}
                      transition={{ duration: 0.3 }}
                    />
                    </div>
                  </motion.div>

                  {/* Submit button */}
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="relative mt-2 w-full px-8 py-4 rounded font-bold uppercase tracking-widest overflow-hidden group flex items-center justify-center gap-3"
                    style={{
                      border: '1px solid rgba(0,229,255,0.5)',
                      color: '#00e5ff',
                      background: 'rgba(0,229,255,0.05)',
                    }}
                  >
                    {/* Sweep fill on hover */}
                    <motion.div
                      className="absolute inset-0 origin-left"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                      style={{ background: 'rgba(0,229,255,0.12)' }}
                    />
                    <AnimatePresence mode="wait">
                      {submitted ? (
                        <motion.span
                          key="done"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex items-center gap-2 relative z-10 text-green-400"
                        >
                          <CheckCircle size={18} /> Transmitted!
                        </motion.span>
                      ) : (
                        <motion.span
                          key="send"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex items-center gap-2 relative z-10"
                        >
                          Transmit
                          <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </form>
              </TiltCard>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Gradient shift keyframe + autofill dark override */}
      <style>{`
        @keyframes gradientShift {
          0%   { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        textarea:-webkit-autofill,
        textarea:-webkit-autofill:hover,
        textarea:-webkit-autofill:focus {
          -webkit-text-fill-color: #ffffff !important;
          -webkit-box-shadow: 0 0 0px 1000px rgba(255,255,255,0.05) inset !important;
          transition: background-color 5000s ease-in-out 0s;
          caret-color: #00e5ff;
        }
      `}</style>
    </section>
  );
};

export default Contact;
