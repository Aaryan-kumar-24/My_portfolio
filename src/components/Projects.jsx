import React from 'react';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';

const projectsList = [
  {
    id: 1,
    title: 'Mitra',
    subtitle: 'AI-Powered Student Community Platform',
    features: [
      'AI chatbot with ~95% accuracy',
      'Emotion detection & real-time chat',
      'Skills roadmap generation',
      'Notes simplification & marketplace',
      'Scalable to 100+ concurrent users'
    ],
    tech: ['MERN', 'Socket.io', 'LangChain', 'PyTorch', 'DistilBERT'],
    video: '/mitra.mp4',
    github: '#',
    live: '#'
  },
  {
    id: 2,
    title: 'Aryavarta Suraksha',
    subtitle: 'Intelligent Smart Surveillance System',
    features: [
      'Face recognition (~96% accuracy)',
      'Crowd heatmaps & intrusion detection',
      'Wait-time detection & 4-screen monitoring',
      '<200ms latency with real-time alerts',
      'Dynamic thresholds processing'
    ],
    tech: ['Django', 'OpenCV', 'Python', 'JavaScript'],
    video: '/Aryavarta_suraksha.mp4',
    github: '#',
    live: '#'
  },
  {
    id: 3,
    title: 'Aryavarta E-Kheti',
    subtitle: 'AI-Enabled Farm Management Platform',
    features: [
      'Crop recommendation AI',
      'Crop marketplace & threat detection alerts',
      'Face recognition attendance & real-time video',
      'Profit/loss analytics & chat system',
      'Supporting 50+ crops/farmers'
    ],
    tech: ['Django', 'OpenCV', 'Bootstrap', 'SQLite', 'Python'],
    video: '/Aryavarta_ekheti.mp4',
    github: '#',
    live: '#'
  },
  {
    id: 4,
    title: 'Aryavarta Artist',
    subtitle: 'Artwork Buying & Learning Platform',
    features: [
      'Artwork marketplace & personalized commissions',
      'Interactive tutorials',
      'Search/cart/payment system',
      'Artist growth analytics',
      'Hosting 50+ artworks'
    ],
    tech: ['Django', 'MySQL', 'Bootstrap', 'JavaScript'],
    video: '/aryavarta_artist.mp4',
    github: '#',
    live: '#'
  }
];

const Projects = () => {
  return (
    <section id="projects" className="py-32 min-h-screen bg-transparent relative z-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <p className="text-neonCyan font-space tracking-widest uppercase text-sm mb-4">Case Studies</p>
          <h2 className="text-5xl md:text-6xl font-black text-white">
            Featured <span className="text-gradient">Innovations</span>
          </h2>
        </motion.div>

        <div className="flex flex-col gap-16">
          {projectsList.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Projects;
