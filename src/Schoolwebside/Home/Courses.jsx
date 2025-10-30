import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import {  Loader } from 'lucide-react';
import { fetchCourses } from '../redux/slicer/courses';
import { Link } from 'react-router-dom';

export default function AcademicPrograms() {
  const dispatch = useDispatch();
  const { data: courses, loading } = useSelector((state) => state.courses);

  useEffect(() => {
    // Fetch courses from server if not already in state
    if (!courses || courses.length === 0) {
      dispatch(fetchCourses());
    }
  }, [dispatch, courses]);
  console.log(courses);

  // Duplicate courses for infinite scroll effect
  const duplicatedPrograms = courses.length > 0 
    ? [...courses, ...courses, ...courses] 
    : [];

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

        {/* Loading State */}
        {loading && courses.length === 0 ? (
          <div className="flex justify-center items-center py-20">
            <Loader className="w-8 h-8 animate-spin text-blue-600" />
            <span className="ml-3 text-gray-600">Loading programs...</span>
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            No programs available at the moment.
          </div>
        ) : (
          <>
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
                    <div className="h-80 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 cursor-pointer group overflow-hidden relative">
                      {/* Animated background effect */}
                      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />

                      <div className="relative z-10 h-full flex flex-col justify-between">
                      
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-3">
                            {program.programName}
                          </h3>
                          <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">
                            {program.description}
                          </p>
                          {program.details && (
                            <p className="text-gray-500 text-xs mt-2 italic line-clamp-2">
                              {program.details}
                            </p>
                          )}
                        </div>

                        {/* Learn More Button */}
                        <motion.button
                          className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-300"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                         <Link to={`/coursedetails/${program.id}`}>Learn More →</Link>
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
          </>
        )}
      </div>
    </div>
  );
}