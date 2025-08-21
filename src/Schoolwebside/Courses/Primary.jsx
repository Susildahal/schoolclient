import { motion } from "framer-motion";
import React from "react";

const Primary = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen xl:ml-48 mt-9  bg-slate-800  text-white px-5 lg:px-24 py-16"
    >
      <main className="max-w-7xl mx-auto">
        <motion.h1
          className="text-center text-2xl md:text-4xl font-bold mb-4"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
        >
          Primary Education
        </motion.h1>

        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="h-2 w-40 bg-red-400 mx-auto rounded-full mb-10"
        ></motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left - Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="text-lg leading-relaxed"
          >
            <p className="mb-4">
              Primary schooling is a time of rapid intellectual and personal change.
              <strong> Bagh Bhairav School</strong>, located in Mahankal-4, Kaleshwor,
              Lalitpur, helps students strengthen their independent learning skills.
              As a result, students begin to pursue specific learning interests.
            </p>
            <p className="mb-4">
              We ensure the broad-based development of students—cognitive, social,
              emotional, cultural, and physical—preparing them for future success.
              Our primary level includes classes from 1 to 6, where the foundation
              of strong learning habits is laid.
            </p>
            <p className="mb-4">
              Since children during this period are active, creative, and filled with
              curiosity, we ensure that learning is engaging and interactive.
            </p>
            <p>
              Our approach also emphasizes parental involvement. Bagh Bhairav School
              recognizes the vital role of parents in shaping the educational journey
              of their children.
            </p>
          </motion.div>

          {/* Right - Image */}
          <motion.div
            initial={{ x: 50, scale: 0.9, opacity: 0 }}
            whileInView={{ x: 0, scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <img
              src="/image/Newprimary.jpeg"
              alt="Primary"
              className="rounded-xl shadow-xl w-full max-w-md mx-auto"
            />
          </motion.div>
        </div>
      </main>
    </motion.div>
  );
};

export default Primary;
