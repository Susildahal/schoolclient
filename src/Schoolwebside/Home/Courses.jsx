import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Code, Microscope, Globe, Music, Award } from 'lucide-react';

const programs = [
  {
    id: 1,
    title: 'Computer Science',
    description: 'Learn programming, algorithms, and software development.',
    icon: Code,
    color: 'from-gray-50 to-gray-100',
  },
  {
    id: 2,
    title: 'Business Administration',
    description: 'Master business strategies and organizational management.',
    icon: Award,
    color: 'from-gray-50 to-gray-100',
  },
  {
    id: 3,
    title: 'Sciences',
    description: 'Explore physics, chemistry, and biological sciences.',
    icon: Microscope,
    color: 'from-gray-50 to-gray-100',
  },
  {
    id: 4,
    title: 'Languages',
    description: 'Study multiple languages and international communication.',
    icon: Globe,
    color: 'from-gray-50 to-gray-100',
  },
  {
    id: 5,
    title: 'Literature',
    description: 'Discover classics and contemporary literary works.',
    icon: BookOpen,
    color: 'from-gray-50 to-gray-100',
  },
  {
    id: 6,
    title: 'Performing Arts',
    description: 'Express yourself through music, dance, and theater.',
    icon: Music,
    color: 'from-gray-50 to-gray-100',
  },
];

export default function AcademicPrograms() {
  const duplicatedPrograms = [...programs, ...programs, ...programs];

  return (
    <div className="w-full min-h-screen bg-white flex items-center justify-center py-16 overflow-hidden">
      <div className="w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Our Academic Programs
          </h1>
          <p className="text-xl text-gray-600">
            Explore our diverse range of educational excellence
          </p>
        </div>

        {/* Scrolling Container */}
        <div className="relative w-full overflow-hidden">
          <motion.div
            className="flex gap-6 px-4"
            animate={{ x: [0, -1500] }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {duplicatedPrograms.map((program, index) => (
              <motion.div
                key={`${program.id}-${index}`}
                className="flex-shrink-0 w-80"
                whileHover={{ y: -10 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className={`h-80 bg-gradient-to-br ${program.color} rounded-2xl p-8  cursor-pointer group overflow-hidden relative`}>
                  {/* Animated background effect */}
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />

                  <div className="relative z-10 h-full flex flex-col justify-between">
                    {/* Icon */}
                    <div className="mb-4">
                      <program.icon className="w-14 h-14 text-gray-800 drop-shadow-lg" />
                    </div>

                    {/* Content */}
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        {program.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {program.description}
                      </p>
                    </div>

                    {/* Learn More Button */}
                    <motion.button
                      className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Learn More →
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Gradient masks for smooth edges */}
        <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-white to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-white to-transparent pointer-events-none" />
      </div>
    </div>
  );
}