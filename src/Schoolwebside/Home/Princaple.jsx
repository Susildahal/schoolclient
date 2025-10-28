import React, { useEffect, useState } from "react";
import { X, Calendar, User, Quote, MessageCircle, ChevronRight, Sparkles, Award } from "lucide-react";
import { motion } from "framer-motion";
import axiosInstance from "../config/Axiosconfig";

const ShowPrincipaltoclient = () => {
  const [principal, setPrincipal] = useState(null);
  const [modalImage, setModalImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrincipal = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(`/principal/get-principal`);
        setPrincipal(res.data);
      } catch (err) {
        console.error("Failed to load principal data:", err);
        setError("Failed to load principal data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPrincipal();
  }, []);

  // Skeleton Loading Component
  const SkeletonLoader = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Skeleton */}
        <div className="text-center mb-12">
          <div className="h-14 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 rounded-2xl w-96 mx-auto mb-4 animate-pulse"></div>
          <div className="h-6 bg-purple-200 rounded-xl w-64 mx-auto animate-pulse"></div>
        </div>

        {/* Content Skeleton */}
        <div className="relative bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 border border-white/20">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            {/* Image Skeleton */}
            <div className="flex-shrink-0 mx-auto lg:mx-0">
              <div className="w-72 h-72 rounded-2xl bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 animate-pulse shadow-xl"></div>
            </div>

            {/* Content Skeleton */}
            <div className="flex-1 w-full space-y-6">
              <div className="h-10 bg-gradient-to-r from-blue-200 to-purple-200 rounded-xl w-3/4 animate-pulse"></div>
              <div className="space-y-3">
                <div className="h-5 bg-purple-200 rounded-lg w-full animate-pulse"></div>
                <div className="h-5 bg-purple-200 rounded-lg w-5/6 animate-pulse"></div>
                <div className="h-5 bg-purple-200 rounded-lg w-4/5 animate-pulse"></div>
                <div className="h-5 bg-purple-200 rounded-lg w-3/4 animate-pulse"></div>
              </div>
              <div className="h-8 bg-blue-200 rounded-xl w-48 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Error Component
  const ErrorDisplay = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-16 px-4 flex justify-center items-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-12 max-w-md border border-white/20">
          <div className="text-6xl mb-6">⚠️</div>
          <h3 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent mb-3">
            Oops! Something went wrong
          </h3>
          <p className="text-gray-600 mb-8 text-lg">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2 justify-center">
              Try Again
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </button>
        </div>
      </motion.div>
    </div>
  );

  if (loading) return <SkeletonLoader />;
  if (error) return <ErrorDisplay />;
  if (!principal) return <ErrorDisplay />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-6 bg-white/50 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-lg">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Principal's Message
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">
            A word from our institution's leadership
          </p>
        </motion.div>

        {/* Main Content Card */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20"
        >
          {/* Decorative top gradient */}
          <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
          
          {/* Decorative corner accents */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-200/30 to-purple-200/30 rounded-full blur-3xl -z-10"></div>
          
          <div className="p-8 md:p-12 lg:p-16">
            <div className="flex flex-col lg:flex-row gap-12 items-start">
              {/* Profile Section */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex-shrink-0 mx-auto lg:mx-0"
              >
                <div className="text-center">
                  {/* Profile Image */}
                  <div className="relative mb-6 group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl opacity-75 group-hover:opacity-100 blur group-hover:blur-lg transition-all duration-300"></div>
                    <div className="relative">
                      <img
                        src={`${process.env.REACT_APP_API_BASE_URL}/uploads/${principal.photo}`}
                        alt="Principal"
                        className="relative w-72 h-72 rounded-2xl object-cover cursor-pointer transition-all duration-300 hover:scale-105 shadow-xl border-4 border-white"
                        onClick={() => setModalImage(`${process.env.REACT_APP_API_BASE_URL}/uploads/${principal.photo}`)}
                        onError={(e) => {
                          e.target.src = `data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect width="200" height="200" fill="#f1f5f9"/><text x="50%" y="50%" font-family="Arial" font-size="16" fill="#64748b" text-anchor="middle" dy=".3em">No Image</text></svg>')}`;
                        }}
                      />
                    </div>
                  </div>
                  
                  {/* Name and Title */}
                  <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg border border-gray-100">
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full shadow-lg">
                        <div className="flex items-center gap-2">
                          <Award className="h-4 w-4" />
                          <span className="text-sm font-bold uppercase tracking-wide">Principal</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                        {principal.principalName}
                      </h2>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Message Section */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex-1 w-full"
              >
                {/* Message Header */}
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg">
                    <Quote className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Message</h3>
                    <p className="text-gray-600 font-medium">Words from our Principal</p>
                  </div>
                </div>

                {/* Message Content */}
                <div className="relative bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 mb-8 border border-purple-100 shadow-lg">
                  <Quote className="absolute top-6 left-6 h-8 w-8 text-purple-200" />
                  <div className="pl-12">
                    <p className="text-lg md:text-xl text-gray-800 leading-relaxed whitespace-pre-line font-medium">
                      {principal.message}
                    </p>
                  </div>
                  <Quote className="absolute bottom-6 right-6 h-8 w-8 text-purple-200 rotate-180" />
                </div>

                {/* Metadata */}
                <div className="flex flex-wrap items-center gap-4">
                  <div className="group flex items-center gap-3 bg-white rounded-xl px-5 py-3 border border-gray-200 shadow-md hover:shadow-xl hover:border-blue-300 transition-all duration-300">
                    <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                      <Calendar className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Published on</p>
                      <p className="font-bold text-gray-900">
                        {new Date(principal.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl px-5 py-3 border border-green-200 shadow-md">
                    <div className="relative">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                    </div>
                    <span className="font-bold text-green-800">Official Statement</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-2 text-gray-600 bg-white/50 backdrop-blur-sm rounded-full px-8 py-4 shadow-lg border border-white/20 hover:shadow-xl hover:scale-105 transition-all duration-300">
            <span className="text-sm font-semibold">Stay connected with our updates</span>
            <ChevronRight className="h-4 w-4" />
          </div>
        </motion.div>
      </div>

      {/* Image Modal */}
      {modalImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-full">
            <img
              src={modalImage}
              alt="Principal - Full Size"
              className="max-w-full max-h-full rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="absolute -top-4 -right-4 bg-white hover:bg-gray-100 text-gray-800 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
              onClick={() => setModalImage(null)}
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          {/* Click outside to close */}
          <div 
            className="absolute inset-0 -z-10" 
            onClick={() => setModalImage(null)}
          ></div>
        </div>
      )}
    </div>
  );
};

export default ShowPrincipaltoclient;