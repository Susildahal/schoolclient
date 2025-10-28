import React, { useState } from "react";
import { motion } from "framer-motion";
import { Star, Award, Users, BookOpen, ArrowRight, Zap, Target, Lightbulb } from "lucide-react";

const Why = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });

  const features = [
    { 
      icon: Star,
      text: "Building Bright Futures",
      description: "Nurturing tomorrow's leaders with innovative teaching methods",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50"
    },
    { 
      icon: Users,
      text: "Empowering Young Minds",
      description: "Fostering creativity and critical thinking in every student",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50"
    },
    { 
      icon: BookOpen,
      text: "Knowledge in Action",
      description: "Practical learning experiences that make a difference",
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50"
    },
    { 
      icon: Award,
      text: "Smart Learning Hub",
      description: "Modern facilities equipped with latest technology",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50"
    },
  ];

  const stats = [
    { number: "1,200+", label: "Alumni Worldwide", icon: Users, color: "text-blue-600" },
    { number: "120+", label: "Career Programs", icon: Target, color: "text-purple-600" },
    { number: "98%", label: "Exam Pass Rate", icon: Zap, color: "text-orange-600" },
    { number: "40+", label: "Student Clubs", icon: Lightbulb, color: "text-green-600" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { y: -10, transition: { duration: 0.3 } }
  };

  const handleMouseMove = (e, index) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setSpotlightPos({ x, y });
    setHoveredCard(index);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20"
      >
        <motion.div variants={itemVariants} className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-6"
          >
            <span className="px-4 py-2 bg-blue-100 border border-blue-300 rounded-full text-blue-700 text-sm font-semibold">
              Excellence in Education
            </span>
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            className="text-5xl lg:text-7xl font-bold text-gray-900 mb-8"
          >
            Why Choose Bagh Bhairav?
          </motion.h1>
          
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8"></div>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-6"
          >
            A renowned institution in Nepal, dedicated to providing quality education with a strong technical foundation and modern educational approaches.
          </motion.p>

          <motion.p 
            variants={itemVariants}
            className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            With a unique blend of traditional values and modern methods, we equip students with the knowledge and skills needed to excel in an increasingly competitive world.
          </motion.p>
        </motion.div>

        {/* 3D Features Grid with Spotlight */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseLeave={handleMouseLeave}
                className="group h-full"
                style={{ perspective: "1200px" }}
              >
                <motion.div
                  whileHover={{ rotateY: 8, rotateX: -8, z: 50 }}
                  transition={{ type: "spring", stiffness: 400, damping: 60 }}
                  className="w-full h-full relative"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="relative h-full overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 p-8">
                    {/* Spotlight effect */}
                    {hoveredCard === index && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background: `radial-gradient(circle 150px at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(255,255,255,0.4), transparent 80%)`,
                        }}
                      />
                    )}

                    {/* Gradient background that appears on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-95 transition-opacity duration-500`}></div>
                    
                    {/* Card shine effect for 3D */}
                    <div className="absolute inset-0 rounded-2xl shadow-inner group-hover:shadow-2xl transition-shadow duration-300"></div>

                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col">
                      <motion.div
                        whileHover={{ scale: 1.15, rotate: 8, y: -5 }}
                        className={`w-16 h-16 rounded-xl ${feature.bgColor} flex items-center justify-center mb-6 group-hover:shadow-xl transition-all duration-300 group-hover:bg-white/90`}
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        <Icon className={`w-8 h-8  ${feature.color}  group-hover:text-white transition-all`} />
                      </motion.div>

                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-white transition-colors duration-300">
                        {feature.text}
                      </h3>
                      
                      <p className="text-gray-600 text-sm leading-relaxed flex-grow group-hover:text-white/90 transition-colors duration-300">
                        {feature.description}
                      </p>

                      <motion.div
                        initial={{ x: -10, opacity: 0 }}
                        whileHover={{ x: 0, opacity: 1 }}
                        className="flex items-center text-blue-600 group-hover:text-white text-sm font-semibold mt-6 transition-colors duration-300 cursor-pointer"
                      >
                        Learn more <ArrowRight className="w-4 h-4 ml-2" />
                      </motion.div>
                    </div>

                    {/* Top shine for 3D depth */}
                    <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/10 to-transparent rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="mb-20"
        >
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-gray-50 to-white border border-gray-200 p-12 lg:p-16 shadow-lg">
            <div className="relative z-10">
              <motion.h2 
                variants={itemVariants}
                className="text-4xl font-bold text-gray-900 text-center mb-4"
              >
                Our Achievements
              </motion.h2>
              <motion.p 
                variants={itemVariants}
                className="text-gray-600 text-center mb-16 max-w-2xl mx-auto"
              >
                Excellence reflected in numbers that showcase our commitment to student success
              </motion.p>

              <motion.div 
                variants={containerVariants}
                className="grid grid-cols-2 lg:grid-cols-4 gap-8"
              >
                {stats.map((stat, index) => {
                  const StatIcon = stat.icon;
                  return (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="text-center group"
                    >
                      <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-all">
                        <StatIcon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className={`text-4xl lg:text-5xl font-bold ${stat.color} mb-2`}>
                        {stat.number}
                      </div>
                      <div className="text-gray-600 font-medium group-hover:text-gray-900 transition-colors">
                        {stat.label}
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
};

export default Why;