import React from "react";
import { motion } from "framer-motion";
import { Star, Award, Users, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const Why = () => {
  const features = [
    { 
      src: "/api/placeholder/300/300", 
      alt: "Building Bright Futures", 
      text: "Building Bright Futures",
      icon: Star,
      description: "Nurturing tomorrow's leaders with innovative teaching methods"
    },
    { 
      src: "/api/placeholder/300/300", 
      alt: "Empowering Young Minds", 
      text: "Empowering Young Minds",
      icon: Users,
      description: "Fostering creativity and critical thinking in every student"
    },
    { 
      src: "/api/placeholder/300/300", 
      alt: "Knowledge in Action", 
      text: "Knowledge in Action",
      icon: BookOpen,
      description: "Practical learning experiences that make a difference"
    },
    { 
      src: "/api/placeholder/300/300", 
      alt: "Smart Learning Hub", 
      text: "Smart Learning Hub",
      icon: Award,
      description: "Modern facilities equipped with latest technology"
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    hover: {
      y: -10,
      transition: { duration: 0.3, ease: "easeInOut" }
    }
  };

  return (
    <div className="bg-white py-16 lg:py-24">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto px-6 lg:px-8"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <motion.h1 
            className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Why Choose Bagh Bhairav?
          </motion.h1>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
          <motion.p 
            className="text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Shree Bagh Bhairav Technical Secondary School is a renowned institution in Nepal, 
            dedicated to providing quality education with a strong technical foundation. 
            We consistently achieve outstanding academic results, preparing students for both 
            higher education and skilled careers.
          </motion.p>
          <motion.p 
            className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed mt-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            With a unique blend of traditional values and modern educational approaches, 
            we equip students with the knowledge and skills needed to excel in an increasingly 
            competitive world.
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover="hover"
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              <div className="relative">
                {/* Image Container */}
                <div className="relative h-48 overflow-hidden">
                  <motion.img
                    src={feature.src}
                    alt={feature.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Icon Overlay */}
                <div className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                  {feature.text}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Hover Effect Border */}
              <motion.div
                className="absolute inset-0 border-2 border-blue-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
              />
            </motion.div>
          ))}
        </motion.div>

        
          <motion.div 
            variants={itemVariants}
            className="bg-gray-50 rounded-3xl p-8 lg:p-12"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Achievements
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Numbers that reflect our commitment to educational excellence and student success
              </p>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { number: "1,200+", label: "Alumni Worldwide", color: "text-blue-600" },
                { number: "120+", label: "Career Programs", color: "text-green-600" },
                { number: "98%", label: "Exam Pass Rate", color: "text-purple-600" },
                { number: "40+", label: "Student Clubs", color: "text-orange-600" },
              ].map((stat, index) => (
                <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.12 }}
            className="text-center"
                >
            <div className={`text-4xl lg:text-5xl font-bold ${stat.color} mb-2`}>
              {stat.number}
            </div>
            <div className="text-gray-700 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Call to Action */}
        <motion.div 
          variants={itemVariants}
          className="text-center mt-16"
        >
          <div className="bg-blue-600 rounded-2xl p-8 lg:p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">
              Ready to Start Your Journey?
            </h3>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join our community of learners and discover the difference quality education makes
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105">
                 Apply Now
              </button>
              <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105">
               <Link to="/OurService" >Learn More</Link>
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Why;