import React, { useState } from "react";
import { motion, useInView } from "framer-motion";
import { Eye, Target, Heart, Sparkles, ChevronDown } from "lucide-react";

const Mission = () => {
  const [expandedCard, setExpandedCard] = useState(null);

  const sections = [
    {
      id: "vision",
      title: "Vision",
      subtitle: "Looking Forward",
      icon: Eye,
      color: "from-blue-500 to-blue-700",
      bgColor: "bg-blue-50",
      iconBg: "bg-blue-600",
      description: "To be a leading educational institution that nurtures future leaders through innovative teaching, character development, and technical excellence.",
      details: [
        "Pioneering educational methodologies",
        "Developing global competencies",
        "Creating ethical leaders",
        "Fostering innovation mindset"
      ]
    },
    {
      id: "mission",
      title: "Mission",
      subtitle: "Our Purpose",
      icon: Target,
      color: "from-emerald-500 to-emerald-700",
      bgColor: "bg-emerald-50",
      iconBg: "bg-emerald-600",
      description: "To provide quality education that integrates academic excellence with practical skills, preparing students for successful careers.",
      details: [
        "Comprehensive technical education",
        "Industry-aligned curriculum",
        "Practical skill development",
        "Career-focused training"
      ]
    },
    {
      id: "values",
      title: "Values",
      subtitle: "Our Foundation",
      icon: Heart,
      color: "from-purple-500 to-purple-700",
      bgColor: "bg-purple-50",
      iconBg: "bg-purple-600",
      description: "Integrity, Excellence, Innovation, and Inclusivity form the foundation of our educational philosophy and culture.",
      details: [
        "Unwavering integrity",
        "Pursuit of excellence",
        "Innovation in learning",
        "Inclusive environment"
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.7,
        type: "spring",
        bounce: 0.3
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        type: "spring",
        bounce: 0.4,
        delay: 0.3
      }
    },
    hover: {
      scale: 1.1,
      rotate: 10,
      transition: { duration: 0.3 }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const expandVariants = {
    collapsed: { height: 0, opacity: 0 },
    expanded: { 
      height: "auto", 
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="relative bg-white py-16 lg:py-24 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.03, 0.08, 0.03]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500 rounded-full"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.05, 0.1, 0.05]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -bottom-32 -left-32 w-80 h-80 bg-purple-500 rounded-full"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative max-w-7xl mx-auto px-6 lg:px-8"
      >
        {/* Animated Header */}
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            variants={floatingVariants}
            animate="animate"
            className="inline-block mb-4"
          >
            <Sparkles className="w-12 h-12 text-yellow-500 mx-auto" />
          </motion.div>
          
          <motion.h1 
            className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Our Foundation
          </motion.h1>
          
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "6rem" }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-1 bg-gradient-to-r from-blue-500 via-emerald-500 to-purple-500 mx-auto mb-8 rounded-full"
          />
          
          <motion.p 
            className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            The guiding principles that shape excellence at 
            <span className="font-semibold text-blue-600"> Shree Bagh Bhairav Technical Secondary School</span>
          </motion.p>
        </motion.div>

        {/* Interactive Cards */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              variants={cardVariants}
              whileHover={{ 
                y: -12, 
                transition: { duration: 0.3 }
              }}
              className="group relative"
            >
              <div className={`relative ${section.bgColor} rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden`}>
                
                {/* Animated Background Gradient */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${section.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  initial={false}
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Animated Icon */}
                  <motion.div 
                    variants={iconVariants}
                    whileHover="hover"
                    className="text-center mb-8"
                  >
                    <div className={`w-20 h-20 ${section.iconBg} rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                      <section.icon className="w-10 h-10 text-white" />
                    </div>
                    
                    <motion.h2 
                      className="text-3xl font-bold text-gray-900 mt-6 mb-2"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      Our {section.title}
                    </motion.h2>
                    
                    <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                      {section.subtitle}
                    </p>
                  </motion.div>

                  {/* Main Description */}
                  <motion.p 
                    className="text-lg text-gray-700 leading-relaxed mb-6 text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    {section.description}
                  </motion.p>

                  {/* Expandable Details */}
                  <motion.div
                    variants={expandVariants}
                    initial="collapsed"
                    animate={expandedCard === section.id ? "expanded" : "collapsed"}
                    className="overflow-hidden"
                  >
                    <div className="space-y-3 mb-6">
                      {section.details.map((detail, detailIndex) => (
                        <motion.div
                          key={detailIndex}
                          initial={{ opacity: 0, x: -20 }}
                          animate={expandedCard === section.id ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                          transition={{ delay: detailIndex * 0.1 }}
                          className="flex items-center space-x-3"
                        >
                          <div className={`w-2 h-2 ${section.iconBg} rounded-full flex-shrink-0`} />
                          <span className="text-gray-700">{detail}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Toggle Button */}
                  <motion.button
                    onClick={() => setExpandedCard(expandedCard === section.id ? null : section.id)}
                    className={`w-full flex items-center justify-center space-x-2 py-3 px-4 bg-white hover:${section.bgColor} rounded-xl border border-gray-200 transition-all duration-300 group/btn`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="font-medium text-gray-700 group-hover/btn:text-gray-900">
                      {expandedCard === section.id ? 'Show Less' : 'Learn More'}
                    </span>
                    <motion.div
                      animate={{ rotate: expandedCard === section.id ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-5 h-5 text-gray-600" />
                    </motion.div>
                  </motion.button>
                </div>

                {/* Decorative Elements */}
                <motion.div
                  className="absolute top-4 right-4 w-16 h-16 border-2 border-gray-200 rounded-full opacity-20"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Animated Quote Section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-24 relative"
        >
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-12 lg:p-16 text-center relative overflow-hidden">
            
            {/* Background Animation */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 bg-gradient-to-br from-blue-100/30 to-purple-100/30 rounded-3xl"
            />

            <div className="relative z-10">
              <motion.blockquote 
                className="text-2xl lg:text-3xl font-light text-gray-800 italic mb-8"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                "Education is the most powerful weapon which you can use to change the world."
              </motion.blockquote>
              
              <motion.cite 
                className="text-lg text-gray-600 block mb-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                - Nelson Mandela
              </motion.cite>
              
              <motion.p 
                className="text-lg text-gray-700 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                At <span className="font-semibold text-blue-600">Shree Bagh Bhairav Technical Secondary School</span>, 
                we embrace this philosophy as we prepare students to make meaningful contributions to society.
              </motion.p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Mission;