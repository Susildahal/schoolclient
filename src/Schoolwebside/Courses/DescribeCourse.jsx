import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { BookOpen, Clock, ArrowLeft, Loader, CheckCircle2, BookMarked } from 'lucide-react';
import { fetchCourses } from '../redux/slicer/courses';

function DescribeCourse() {
  const { id } = useParams(); // Get course ID from URL
  const dispatch = useDispatch();
  const { data: courses, loading } = useSelector((state) => state.courses);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [otherCourses, setOtherCourses] = useState([]);

  useEffect(() => {
    // Fetch courses from server if not already in state
    if (!courses || courses.length === 0) {
      dispatch(fetchCourses());
    }
  }, [dispatch, courses]);

  useEffect(() => {
    // Filter the selected course and other courses when data is available
    if (courses && courses.length > 0 && id) {
      const selected = courses.find(course => course.id === id);
      const others = courses.filter(course => course.id !== id);
      setSelectedCourse(selected);
      setOtherCourses(others);
    }
  }, [courses, id]);

  if (loading && courses.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading course details...</p>
        </div>
      </div>
    );
  }

  if (!selectedCourse) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Course Not Found</h2>
          <p className="text-gray-600 mb-6">The course you're looking for doesn't exist.</p>
          <Link 
            to="/" 
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}


      {/* Course Details Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden mb-16"
        >
          {/* Course Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-8 md:p-12">
            <div className="flex items-center mb-4">
              <div className="bg-white/20 p-3 rounded-full mr-4">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold capitalize text-white">
                {selectedCourse.programName}
              </h1>
            </div>
            <p className="text-blue-100 text-lg">
              Comprehensive program designed for academic excellence
            </p>
          </div>

          {/* Course Content */}
          <div className="p-8 md:p-12">
            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <BookMarked className="w-6 h-6 mr-2 text-blue-600" />
                Program Overview
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                {selectedCourse.description}
              </p>
            </div>

            {/* Details */}
            {selectedCourse.details && (
              <div className="mb-8 bg-blue-50 p-6 rounded-lg border border-blue-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Program Details</h3>
                <p className="text-gray-700 leading-relaxed">
                  {selectedCourse.details}
                </p>
              </div>
            )}

            {/* Subjects */}
            {selectedCourse.subjects && selectedCourse.subjects.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <CheckCircle2 className="w-5 h-5 mr-2 text-green-600" />
                  Subjects Covered
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {selectedCourse.subjects.map((subject, index) => (
                    <div 
                      key={index}
                      className="flex items-center bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200"
                    >
                      <CheckCircle2 className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                      <span className="text-gray-800 font-medium">{subject}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Call to Action */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-center">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Ready to Start Your Journey?
                </h3>
                <p className="text-blue-100 mb-4">
                  Join us and unlock your potential in {selectedCourse.programName}
                </p>
                <Link
                  to="/Contactus"
                  className="inline-block px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
                >
                  Contact Us for Admission
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Other Courses Section - Blog Style */}
        {otherCourses.length > 0 && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Explore Other Programs
              </h2>
              <p className="text-gray-600 text-lg">
                Discover more opportunities for your academic journey
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link to={`/coursedetails/${course.id}`}>
                    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col group">
                      {/* Card Header */}
                      <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
                        <div className="flex items-center justify-between mb-3">
                          <div className="bg-white/20 p-2 rounded-lg">
                            <BookOpen className="w-6 h-6 text-white" />
                          </div>
                        </div>
                        <h3 className="text-xl font-bold text-white group-hover:text-blue-50 transition-colors">
                          {course.programName}
                        </h3>
                      </div>

                      {/* Card Body */}
                      <div className="p-6 flex-grow flex flex-col">
                        <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
                          {course.description}
                        </p>

                        {/* Subject Count */}
                        {course.subjects && course.subjects.length > 0 && (
                          <div className="flex items-center text-sm text-gray-500 mb-4">
                            <CheckCircle2 className="w-4 h-4 mr-2 text-green-600" />
                            <span>{course.subjects.length} subjects covered</span>
                          </div>
                        )}

                        {/* View Details Button */}
                        <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors group-hover:scale-105 transform duration-200">
                          View Details →
                        </button>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DescribeCourse;
