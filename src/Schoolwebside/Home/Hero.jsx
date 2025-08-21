import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Users, BookOpen, Award, MapPin, Play, ArrowDown, Star, Calendar, Clock } from 'lucide-react';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      image: "/api/placeholder/1920/1080",
      title: "Excellence in Education",
      subtitle: "Shaping Tomorrow's Leaders",
      description: "Providing quality education from Primary to Technical Secondary level with modern facilities and experienced faculty.",
      highlight: "CBSE Affiliated"
    },
    {
      image: "/api/placeholder/1920/1080",
      title: "Technical Education",
      subtitle: "Building Future Engineers",
      description: "State-of-the-art technical programs preparing students for the modern engineering world.",
      highlight: "Modern Labs"
    },
    {
      image: "/api/placeholder/1920/1080",
      title: "Holistic Development",
      subtitle: "Beyond Academic Excellence",
      description: "Fostering creativity, leadership, and character development through comprehensive education programs.",
      highlight: "15+ Years Experience"
    }
  ];

  const stats = [
    { icon: Users, number: "500+", label: "Students" },
    { icon: BookOpen, number: "25+", label: "Expert Teachers" },
    { icon: Award, number: "15+", label: "Years of Excellence" },
  ];

  const features = [
    { icon: Star, text: "Top Rated School" },
    { icon: Calendar, text: "Admission Open" },
    { icon: Clock, text: "Flexible Timings" }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-hidden mt-16">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Geometric shapes */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 right-20 w-32 h-32 border-2 border-blue-200/30 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-32 left-16 w-24 h-24 border-2 border-indigo-200/40 rounded-full"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-1/3 right-1/4 w-16 h-16 bg-blue-100/50 rounded-lg transform rotate-45"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: "1.5s" }}
          className="absolute bottom-1/3 left-1/4 w-12 h-12 bg-indigo-100/50 rounded-full"
        />
      </div>

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16"
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[calc(100vh-8rem)]">
          
          {/* Left Content */}
          <div className="space-y-8">
            {/* Location Badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
              <MapPin className="w-4 h-4" />
              <span>Mahankal-4, Kaleshowar, Lalitpur</span>
            </motion.div>

            {/* Main Headlines */}
            <motion.div variants={itemVariants} className="space-y-6">
              <motion.div 
                key={currentSlide}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-1 rounded-full text-sm font-semibold"
              >
                {heroSlides[currentSlide].highlight}
              </motion.div>
              
              <motion.h1 
                key={`title-${currentSlide}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight"
              >
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  {heroSlides[currentSlide].title}
                </span>
              </motion.h1>
              
              <motion.h2
                key={`subtitle-${currentSlide}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-2xl sm:text-3xl text-gray-600 font-medium"
              >
                {heroSlides[currentSlide].subtitle}
              </motion.h2>
              
              <motion.p
                key={`desc-${currentSlide}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-lg text-gray-600 leading-relaxed max-w-xl"
              >
                {heroSlides[currentSlide].description}
              </motion.p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Explore Our Programs
                <ChevronRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center justify-center border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 text-gray-700 hover:text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300"
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Video Tour
              </motion.button>
            </motion.div>

            {/* Features */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md border border-gray-200"
                >
                  <feature.icon className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div variants={itemVariants} className="grid grid-cols-3 gap-8 pt-8">
              {stats.map((stat, index) => (
                <motion.div 
                  key={index} 
                  whileHover={{ scale: 1.05 }}
                  className="text-center bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-gray-200"
                >
                  <stat.icon className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <div className="text-3xl font-bold text-gray-900">{stat.number}</div>
                  <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Content - School Info Card */}
          <motion.div variants={itemVariants} className="lg:justify-self-end">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 border border-gray-200 shadow-2xl max-w-md relative overflow-hidden"
            >
              {/* Background Pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full -mr-16 -mt-16 opacity-50" />
              
              <div className="relative">
                <div className="text-center mb-8">
                  <motion.img
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    src="/image/logo.webp"
                    alt="School Logo"
                    className="w-24 h-24 mx-auto rounded-full border-4 border-blue-200 shadow-lg mb-4"
                  />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Shree Bagh Bhairav Technical Secondary School
                  </h3>
                  <div className="flex items-center justify-center space-x-2 text-blue-600">
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    <span className="text-sm font-medium">Est. 2008 • CBSE Affiliated</span>
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center text-gray-700 p-3 bg-blue-50 rounded-xl">
                    <BookOpen className="w-5 h-5 mr-3 text-blue-600" />
                    <span className="font-medium">Primary to Technical Secondary</span>
                  </div>
                  <div className="flex items-center text-gray-700 p-3 bg-indigo-50 rounded-xl">
                    <Users className="w-5 h-5 mr-3 text-indigo-600" />
                    <span className="font-medium">Expert Faculty & Modern Labs</span>
                  </div>
                  <div className="flex items-center text-gray-700 p-3 bg-purple-50 rounded-xl">
                    <Award className="w-5 h-5 mr-3 text-purple-600" />
                    <span className="font-medium">Excellence in Education</span>
                  </div>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg"
                >
                  Download Prospectus
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Slide Indicators */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-3">
          {heroSlides.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentSlide(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? 'bg-blue-600 scale-125 shadow-lg'
                  : 'bg-gray-400 hover:bg-blue-400'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 right-8 flex flex-col items-center text-gray-500"
      >
        <span className="text-sm mb-2 font-medium">Scroll Down</span>
        <ArrowDown className="w-5 h-5" />
      </motion.div>

      {/* Image Slideshow (Hidden, for reference) */}
      <div className="hidden">
        {heroSlides.map((slide, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: currentSlide === index ? 0.1 : 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 pointer-events-none"
          >
            <img
              src={slide.image}
              alt={`Background ${index + 1}`}
              className="w-full h-full object-cover opacity-10"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;