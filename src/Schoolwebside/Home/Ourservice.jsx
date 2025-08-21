import React from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const services = [
  "Good Reading Environment",
  "Experienced and Supportive Teachers",
  "Regular Revision Classes",
  "Access to Computer Labs",
  "Clean and Safe School Premises",
  "Organized Study Materials",
  "Empowerment to Learn Something New",
];

const Ourservice = () => {
  return (
    <div className="min-h-screen  py-10 px-5 lg:px-20">
      {/* Header */}
      <motion.h1
        className="text-3xl lg:text-5xl font-bold text-center mb-12 text-white"
        initial={{ y: -50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Our Services
      </motion.h1>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <motion.img
          src="/image/1.jpg"
          alt="Our Services"
          className="w-full h-[70vh] object-fill rounded-3xl shadow-xl"
          initial={{ x: "-100%", opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />

        {/* Text */}
        <motion.div
          initial={{ x: 10, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-2xl lg:text-3xl font-semibold  mb-5">
            We are committed to providing:
          </h2>

          <ul className="space-y-3 text-lg lg:text-2xl">
            {services.map((item, index) => (
              <motion.li
                key={index}
                className="flex items-start gap-3"
                whileHover={{ scale: 1.02 ,color: "#3b82f6" }} // Tailwind blue-500
                transition={{ duration: 0.3 }}
              >
                <CheckCircle className="text-blue-500 mt-1" size={22} />
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
      
    </div>
  );
};

export default Ourservice;
