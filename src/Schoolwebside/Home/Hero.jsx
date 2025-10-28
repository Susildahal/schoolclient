import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Palette, Users, PenTool } from 'lucide-react';

const ArtHeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const slides = [
    {
      title: "Learn",
      titleBold: "Creatively",
      description: "Unleash your potential through artistic and innovative education programs designed for creative minds.",
      buttonText: "Explore Art",
      icon: Palette,
      accentColor: "#1E40AF",
      lightColor: "#DBEAFE",
      secondaryColor: "#3B82F6"
    },
    {
      title: "Read",
      titleBold: "and Write",
      description: "Master the art of communication through literature and creative writing. Develop your voice and express your thoughts powerfully.",
      buttonText: "Start Writing",
      icon: PenTool,
      accentColor: "#0369A1",
      lightColor: "#CFFAFE",
      secondaryColor: "#06B6D4"
    },
    {
      title: "Grow",
      titleBold: "Together",
      description: "Build meaningful connections and develop leadership skills in a supportive community.",
      buttonText: "Join Community",
      icon: Users,
      accentColor: "#3B82F6",
      lightColor: "#DBEAFE",
      secondaryColor: "#1E40AF"
    }
  ];

  useEffect(() => {
    if (!isAutoPlay) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlay]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const CurrentIcon = slides[currentSlide].icon;

  return (
    <div className="relative h-screen bg-white overflow-hidden">
      {/* Interactive Background Boxes */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Box 1 - Top Left - Follows mouse */}
        <motion.div
          animate={{
            x: mousePos.x * 0.02,
            y: mousePos.y * 0.02,
            rotate: [0, 5, 0]
          }}
          transition={{ 
            x: { type: "spring", stiffness: 50, damping: 20 },
            y: { type: "spring", stiffness: 50, damping: 20 },
            rotate: { duration: 4, repeat: Infinity }
          }}
          className="absolute top-20 left-10 w-32 h-32 md:w-48 md:h-48 opacity-20 rounded-2xl"
          style={{
            background: `linear-gradient(135deg, ${slides[currentSlide].accentColor}60, ${slides[currentSlide].secondaryColor}40)`,
            transform: 'rotate(15deg)'
          }}
        />

        {/* Box 2 - Top Right - Counter mouse */}
        <motion.div
          animate={{
            x: -mousePos.x * 0.015,
            y: mousePos.y * 0.015,
            rotate: [0, -10, 0]
          }}
          transition={{ 
            x: { type: "spring", stiffness: 40, damping: 20 },
            y: { type: "spring", stiffness: 40, damping: 20 },
            rotate: { duration: 5, repeat: Infinity }
          }}
          className="absolute top-32 right-16 w-24 h-24 md:w-40 md:h-40 opacity-15 rounded-3xl"
          style={{
            background: `linear-gradient(45deg, ${slides[currentSlide].secondaryColor}50, ${slides[currentSlide].accentColor}30)`,
            transform: 'rotate(-20deg)'
          }}
        />

        {/* Box 3 - Bottom Left - Circular motion */}
        <motion.div
          animate={{
            x: [0, mousePos.x * 0.01, 0],
            y: [0, -mousePos.y * 0.01, 0],
            rotate: 360
          }}
          transition={{ 
            x: { duration: 6, repeat: Infinity },
            y: { duration: 6, repeat: Infinity },
            rotate: { duration: 20, repeat: Infinity, ease: "linear" }
          }}
          className="absolute bottom-32 left-20 w-36 h-36 md:w-52 md:h-52 opacity-10 rounded-xl"
          style={{
            background: `linear-gradient(225deg, ${slides[currentSlide].accentColor}40, ${slides[currentSlide].lightColor}60)`,
            transform: 'rotate(45deg)'
          }}
        />

        {/* Box 4 - Bottom Right - Inverse mouse */}
        <motion.div
          animate={{
            x: -mousePos.x * 0.025,
            y: -mousePos.y * 0.025,
            rotate: [0, 15, 0]
          }}
          transition={{ 
            x: { type: "spring", stiffness: 60, damping: 25 },
            y: { type: "spring", stiffness: 60, damping: 25 },
            rotate: { duration: 3, repeat: Infinity }
          }}
          className="absolute bottom-20 right-10 w-28 h-28 md:w-44 md:h-44 opacity-25 rounded-2xl"
          style={{
            background: `linear-gradient(315deg, ${slides[currentSlide].secondaryColor}50, ${slides[currentSlide].accentColor}30)`,
            transform: 'rotate(-10deg)'
          }}
        />

        {/* Box 5 - Center - Subtle pulse */}
        <motion.div
          animate={{
            x: mousePos.x * 0.008,
            y: mousePos.y * 0.008,
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            x: { type: "spring", stiffness: 30, damping: 20 },
            y: { type: "spring", stiffness: 30, damping: 20 },
            scale: { duration: 8, repeat: Infinity }
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-96 md:h-96 opacity-5 rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, ${slides[currentSlide].accentColor}30, transparent)`,
          }}
        />

        {/* Box 6 - Small accent top */}
        <motion.div
          animate={{
            x: mousePos.x * 0.03,
            y: mousePos.y * 0.02,
            rotate: -360
          }}
          transition={{ 
            x: { type: "spring", stiffness: 70, damping: 15 },
            y: { type: "spring", stiffness: 70, damping: 15 },
            rotate: { duration: 15, repeat: Infinity, ease: "linear" }
          }}
          className="absolute top-10 left-1/3 w-16 h-16 md:w-24 md:h-24 opacity-20"
          style={{
            background: slides[currentSlide].secondaryColor,
            clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
          }}
        />

        {/* Box 7 - Small accent bottom */}
        <motion.div
          animate={{
            x: -mousePos.x * 0.02,
            y: -mousePos.y * 0.03,
            rotate: 360
          }}
          transition={{ 
            x: { type: "spring", stiffness: 50, damping: 18 },
            y: { type: "spring", stiffness: 50, damping: 18 },
            rotate: { duration: 12, repeat: Infinity, ease: "linear" }
          }}
          className="absolute bottom-40 right-1/4 w-20 h-20 md:w-32 md:h-32 opacity-15 rounded-full"
          style={{
            background: `linear-gradient(180deg, ${slides[currentSlide].accentColor}50, ${slides[currentSlide].secondaryColor}30)`,
          }}
        />
      </div>

      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke={slides[currentSlide].accentColor} strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Main Hero Container - 100vh */}
      <div className="relative h-full flex items-center z-10">
        {/* Content Grid */}
        <div className="w-full px-4 sm:px-6 lg:px-12 py-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
            >
              {/* Left Content */}
              <motion.div
                key={`content-${currentSlide}`}
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                className="space-y-6 md:space-y-8 order-2 lg:order-1"
              >
                {/* Animated Tag */}
                <motion.div 
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="inline-flex items-center space-x-3 px-5 py-3 border-2 w-fit rounded-full"
                  style={{ borderColor: slides[currentSlide].accentColor }}
                >
                  <motion.div 
                    animate={{ scale: [1, 1.3, 1], rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: slides[currentSlide].accentColor }}
                  ></motion.div>
                  <span className="text-gray-700 text-xs font-bold uppercase tracking-widest">
                  Aim high for Success in your Career
                  </span>
                </motion.div>

                {/* Heading with Gradient */}
                <div className="space-y-4">
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-gray-400 text-lg md:text-xl font-light tracking-widest"
                  >
                    {slides[currentSlide].title}
                  </motion.p>
                  <motion.h1 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-5xl sm:text-6xl md:text-7xl font-black leading-tight"
                    style={{ color: slides[currentSlide].accentColor }}
                  >
                    {slides[currentSlide].titleBold}
                  </motion.h1>
                </div>

                {/* Decorative Line */}
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: 80 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="h-1 rounded-full"
                  style={{ backgroundColor: slides[currentSlide].secondaryColor }}
                ></motion.div>

                {/* Description */}
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-gray-600 text-base md:text-lg leading-relaxed max-w-xl font-light"
                >
                  {slides[currentSlide].description}
                </motion.p>

                {/* CTA Button with Hover Effects */}
                <motion.button
                  whileHover={{ scale: 1.08, boxShadow: `0 20px 40px ${slides[currentSlide].accentColor}30` }}
                  whileTap={{ scale: 0.95 }}
                  onMouseEnter={() => setIsAutoPlay(false)}
                  onMouseLeave={() => setIsAutoPlay(true)}
                  className="inline-block px-10 py-4 font-bold text-white rounded-xl hover:shadow-2xl transition-all duration-300 text-base md:text-lg relative overflow-hidden group"
                  style={{ backgroundColor: slides[currentSlide].accentColor }}
                >
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-20"
                    style={{ backgroundColor: 'white' }}
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.5 }}
                  ></motion.div>
                  <span className="relative z-10">{slides[currentSlide].buttonText}</span>
                </motion.button>
              </motion.div>

              {/* Right Side - Artistic Icon Display */}
              <motion.div
                key={`illustration-${currentSlide}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 80 }}
                className="relative h-64 md:h-80 lg:h-96 order-1 lg:order-2 flex items-center justify-center"
              >
                {/* Outer Rotating Ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute w-80 h-80 md:w-96 md:h-96"
                >
                  <div className="w-full h-full border-2 border-dashed opacity-40" style={{ borderColor: slides[currentSlide].secondaryColor, borderRadius: '50%' }}></div>
                </motion.div>

                {/* Middle Rotating Ring */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  className="absolute w-64 h-64 md:w-72 md:h-72"
                >
                  <div className="w-full h-full border opacity-30" style={{ borderColor: slides[currentSlide].accentColor, borderRadius: '50%' }}></div>
                </motion.div>

                {/* Main Artistic Frame - Tilted */}
                <motion.div
                  animate={{ y: [-8, 8, -8], rotate: [-5, 5, -5] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative w-64 h-64 md:w-80 md:h-80"
                >
                  {/* Outer Border Shadow */}
                  <div 
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      boxShadow: `20px 20px 0px ${slides[currentSlide].accentColor}25, -5px -5px 20px rgba(0,0,0,0.05)`,
                      border: `3px solid ${slides[currentSlide].accentColor}`
                    }}
                  ></div>
                  
                  {/* Inner Content */}
                  <div 
                    className="absolute inset-4 rounded-lg flex items-center justify-center relative overflow-hidden"
                    style={{ backgroundColor: slides[currentSlide].lightColor }}
                  >
                    {/* Animated Background Pattern */}
                    <div className="absolute inset-0 opacity-20">
                      <svg width="100%" height="100%">
                        <defs>
                          <pattern id={`dots-${currentSlide}`} width="20" height="20" patternUnits="userSpaceOnUse">
                            <circle cx="10" cy="10" r="2" fill={slides[currentSlide].accentColor} />
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill={`url(#dots-${currentSlide})`} />
                      </svg>
                    </div>

                    {/* Icon */}
                    <motion.div
                      animate={{ scale: [1, 1.15, 1], y: [0, -5, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      className="relative z-10"
                    >
                      <CurrentIcon size={120} style={{ color: slides[currentSlide].accentColor }} strokeWidth={1.2} />
                    </motion.div>
                  </div>
                </motion.div>

                {/* Corner Accent Shapes */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute top-0 right-0 w-20 h-20 opacity-20"
                  style={{
                    background: slides[currentSlide].accentColor,
                    clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
                  }}
                ></motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Slide Indicators - Positioned absolutely */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-6 z-20">
        {slides.map((slide, index) => (
          <motion.button
            key={index}
            onClick={() => {
              setCurrentSlide(index);
              setIsAutoPlay(false);
              setTimeout(() => setIsAutoPlay(true), 7000);
            }}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
            className="relative group"
          >
            <motion.div
              animate={{ scale: currentSlide === index ? 1 : 0.6 }}
              transition={{ duration: 0.3 }}
              className="w-4 h-4 rounded-full border-3 transition-all"
              style={{
                borderColor: slide.accentColor,
                backgroundColor: currentSlide === index ? slide.accentColor : 'transparent'
              }}
            />
            {currentSlide === index && (
              <motion.div
                layoutId="indicator-pulse"
                className="absolute inset-0 rounded-full border-3"
                style={{ borderColor: slide.accentColor }}
                animate={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default ArtHeroSection;