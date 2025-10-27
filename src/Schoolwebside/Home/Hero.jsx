import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Zap, Users } from 'lucide-react';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const heroSlides = [
    {
      title: "Fly your way",
      titleBold: "to education",
      description: "Providing quality education from Primary to Technical Secondary level with modern facilities and experienced faculty members.",
      buttonText: "Get Started",
      gradient: "from-purple-600 to-purple-700",
      accentColor: "from-orange-400 to-orange-500",
      icon: BookOpen,
      iconColor: "text-orange-400"
    },
    {
      title: "Build your",
      titleBold: "future here",
      description: "State-of-the-art technical programs preparing students for the modern engineering world.",
      buttonText: "Explore Now",
      gradient: "from-blue-600 to-blue-700",
      accentColor: "from-cyan-400 to-cyan-500",
      icon: Zap,
      iconColor: "text-cyan-400"
    },
    {
      title: "Learn and",
      titleBold: "grow together",
      description: "Fostering creativity, leadership, and character development through comprehensive education programs.",
      buttonText: "Join Us",
      gradient: "from-indigo-600 to-indigo-700",
      accentColor: "from-pink-400 to-pink-500",
      icon: Users,
      iconColor: "text-pink-400"
    }
  ];

  useEffect(() => {
    if (!isAutoPlay) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isAutoPlay]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const moveX = (clientX - centerX) * 0.02;
      const moveY = (clientY - centerY) * 0.02;
      setMousePosition({ x: moveX, y: moveY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };

  const slideVariants = {
    enter: { opacity: 0, x: -50 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50 }
  };

  const CurrentIcon = heroSlides[currentSlide].icon;

  return (
    <div className="relative min-h-screen bg-white overflow-hidden pt-0">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative"
      >
        <div className={`relative h-screen bg-gradient-to-br ${heroSlides[currentSlide].gradient} overflow-hidden flex items-center transition-all duration-500`}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          
          {/* Background Beams */}
          <svg className="absolute inset-0 w-full h-full opacity-30" preserveAspectRatio="none">
            <defs>
              <linearGradient id="beam1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.5)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              </linearGradient>
              <linearGradient id="beam2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              </linearGradient>
              <linearGradient id="beam3" x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              </linearGradient>
            </defs>
            <motion.line x1="0" y1="0" x2="1440" y2="900" stroke="url(#beam1)" strokeWidth="2" animate={{ opacity: [0.2, 0.6, 0.2] }} transition={{ duration: 4, repeat: Infinity }} />
            <motion.line x1="1440" y1="0" x2="0" y2="900" stroke="url(#beam2)" strokeWidth="2" animate={{ opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 5, repeat: Infinity, delay: 0.5 }} />
            <motion.line x1="720" y1="0" x2="720" y2="900" stroke="url(#beam3)" strokeWidth="3" animate={{ opacity: [0.15, 0.4, 0.15] }} transition={{ duration: 6, repeat: Infinity, delay: 1 }} />
            <motion.line x1="200" y1="0" x2="1000" y2="900" stroke="url(#beam1)" strokeWidth="2" animate={{ opacity: [0.1, 0.4, 0.1] }} transition={{ duration: 5.5, repeat: Infinity, delay: 0.3 }} />
            <motion.line x1="1200" y1="0" x2="400" y2="900" stroke="url(#beam2)" strokeWidth="2" animate={{ opacity: [0.15, 0.45, 0.15] }} transition={{ duration: 6.5, repeat: Infinity, delay: 0.8 }} />
          </svg>

          {/* Background Elements - Clouds */}
          <motion.div 
            animate={{ x: [0, 20, 0], y: [0, 10, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
            style={{ x: mousePosition.x * 0.5, y: mousePosition.y * 0.5 }}
            className="absolute top-20 left-1/4 w-24 h-12 bg-white rounded-full opacity-20 blur-md"
          />
          <motion.div 
            animate={{ x: [0, -15, 0], y: [0, -8, 0] }}
            transition={{ duration: 10, repeat: Infinity }}
            style={{ x: mousePosition.x * 0.3, y: mousePosition.y * 0.3 }}
            className="absolute top-1/3 right-1/4 w-32 h-16 bg-white rounded-full opacity-15 blur-md"
          />
          <motion.div 
            animate={{ x: [0, 25, 0], y: [0, 15, 0] }}
            transition={{ duration: 12, repeat: Infinity }}
            style={{ x: mousePosition.x * 0.4, y: mousePosition.y * 0.4 }}
            className="absolute bottom-1/3 left-1/3 w-20 h-10 bg-white rounded-full opacity-10 blur-md"
          />

          {/* Content Grid */}
          <div className="w-full h-full flex items-center">
            <div className="max-w-7xl mx-auto w-full px-0">
              <div className="grid lg:grid-cols-2 gap-0 items-center h-full">
                
                {/* Left Side - Text Content */}
                <motion.div 
                  variants={itemVariants}
                  className="px-8 sm:px-12 lg:px-16 py-16 lg:py-0 flex flex-col justify-center"
                  style={{ x: mousePosition.x * 0.3 }}
                >
                  <motion.div
                    key={`content-${currentSlide}`}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.6 }}
                    className="space-y-8"
                  >
                    <div>
                      <motion.p 
                        className="text-white/80 text-lg sm:text-xl font-light tracking-wide"
                      >
                        {heroSlides[currentSlide].title}
                      </motion.p>
                      <motion.h1 
                        className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-tight mt-2"
                      >
                        {heroSlides[currentSlide].titleBold}
                      </motion.h1>
                    </div>

                    <motion.p 
                      className="text-white/90 text-base sm:text-lg leading-relaxed max-w-md font-light"
                    >
                      {heroSlides[currentSlide].description}
                    </motion.p>

                    <motion.button
                      whileHover={{ scale: 1.08, boxShadow: "0 10px 30px rgba(0,0,0,0.2)" }}
                      whileTap={{ scale: 0.95 }}
                      onMouseEnter={() => setIsAutoPlay(false)}
                      onMouseLeave={() => setIsAutoPlay(true)}
                      className={`inline-block px-8 py-4 rounded-full font-bold text-white bg-gradient-to-r ${heroSlides[currentSlide].accentColor} shadow-xl hover:shadow-2xl transition-all duration-300 text-base sm:text-lg cursor-pointer`}
                    >
                      {heroSlides[currentSlide].buttonText}
                    </motion.button>
                  </motion.div>
                </motion.div>

                {/* Right Side - Icon Illustration */}
                <motion.div 
                  variants={itemVariants}
                  className="relative h-full hidden lg:flex items-center justify-center"
                  style={{ x: mousePosition.x * 0.5, y: mousePosition.y * 0.5 }}
                >
                  <motion.div
                    key={`illustration-${currentSlide}`}
                    initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
                    transition={{ duration: 0.6 }}
                    className="relative w-full h-full flex items-center justify-center"
                  >
                    {/* Glowing Background Circle */}
                    <motion.div
                      animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute w-64 h-64 bg-white/10 rounded-full blur-3xl"
                    />

                    {/* Icon Container */}
                    <motion.div
                      animate={{ y: [-15, 15, -15] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="relative z-10"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 w-48 h-48 border border-white/10 rounded-full"
                      />
                      <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-4 w-40 h-40 border border-white/5 rounded-full"
                      />
                      
                      <div className={`relative w-48 h-48 rounded-full bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm flex items-center justify-center shadow-2xl border border-white/30`}>
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2.5, repeat: Infinity }}
                        >
                          <CurrentIcon size={120} className={`${heroSlides[currentSlide].iconColor} drop-shadow-lg`} strokeWidth={1.5} />
                        </motion.div>
                      </div>
                    </motion.div>

                    {/* Floating Particles */}
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{
                          x: [0, Math.cos(i * 60 * Math.PI / 180) * 80, 0],
                          y: [0, Math.sin(i * 60 * Math.PI / 180) * 80, 0],
                          opacity: [0, 0.6, 0]
                        }}
                        transition={{
                          duration: 3 + i * 0.3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="absolute w-2 h-2 bg-white rounded-full"
                      />
                    ))}
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Curved Bottom Shape */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 200" preserveAspectRatio="none" className="w-full h-auto">
              <path d="M0,50 Q360,0 720,50 T1440,50 L1440,200 L0,200 Z" fill="white" />
            </svg>
          </div>

          {/* Mouse Glow Effect */}
          {isHovering && (
            <motion.div
              animate={{
                x: mousePosition.x * 2,
                y: mousePosition.y * 2,
              }}
              transition={{ type: "spring", stiffness: 500, damping: 28 }}
              className="pointer-events-none fixed w-40 h-40 rounded-full bg-white/5 blur-3xl"
              style={{
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
          )}
        </div>
      </motion.div>

      {/* Slide Indicators */}
      <div className="relative z-20 -mt-20 flex justify-center pb-8">
        <div className="flex space-x-3 bg-white px-6 py-4 rounded-full shadow-lg border border-gray-100">
          {heroSlides.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => {
                setCurrentSlide(index);
                setIsAutoPlay(false);
                setTimeout(() => setIsAutoPlay(true), 8000);
              }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className={`rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? `w-8 h-3 bg-gradient-to-r ${heroSlides[index].gradient}`
                  : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;