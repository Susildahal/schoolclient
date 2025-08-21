import React, { useEffect, useState } from "react";
import { X, Calendar, User, Quote, MessageCircle, ChevronRight } from "lucide-react";
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
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Skeleton */}
        <div className="text-center mb-12">
          <div className="h-12 bg-gray-200 rounded-lg w-96 mx-auto mb-4 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-64 mx-auto animate-pulse"></div>
        </div>

        {/* Content Skeleton */}
        <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12">
          <div className="flex flex-col xl:flex-row gap-12 items-start">
            {/* Image Skeleton */}
            <div className="flex-shrink-0 mx-auto xl:mx-0">
              <div className="w-64 h-64 rounded-2xl bg-gray-200 animate-pulse"></div>
            </div>

            {/* Content Skeleton */}
            <div className="flex-1 w-full space-y-6">
              <div className="h-8 bg-gray-200 rounded-lg w-3/4 animate-pulse"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-4/5 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              </div>
              <div className="h-6 bg-gray-200 rounded w-48 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Error Component
  const ErrorDisplay = () => (
    <div className="min-h-screen bg-gray-50 py-8 px-4 flex justify-center items-center">
      <div className="text-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );

  if (loading) return <SkeletonLoader />;
  if (error) return <ErrorDisplay />;
  if (!principal) return <ErrorDisplay />;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <MessageCircle className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Principal's Message
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A personal message from our institution's leadership
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          {/* Top accent */}
          <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"></div>
          
          <div className="p-8 md:p-12">
            <div className="flex flex-col xl:flex-row gap-12 items-start">
              {/* Profile Section */}
              <div className="flex-shrink-0 mx-auto xl:mx-0">
                <div className="text-center">
                  {/* Profile Image */}
                  <div className="relative mb-6 group">
                    <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                    <img
                      src={`${process.env.REACT_APP_API_BASE_URL}/uploads/${principal.photo}`}
                      alt="Principal"
                      className="relative w-64 h-64 rounded-2xl object-cover cursor-pointer transition-all duration-300 hover:shadow-2xl shadow-lg"
                      onClick={() => setModalImage(`${process.env.REACT_APP_API_BASE_URL}/uploads/${principal.photo}`)}
                      onError={(e) => {
                        e.target.src = `data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect width="200" height="200" fill="#f1f5f9"/><text x="50%" y="50%" font-family="Arial" font-size="16" fill="#64748b" text-anchor="middle" dy=".3em">No Image</text></svg>')}`;
                      }}
                    />
                  </div>
                  
                  {/* Name and Title */}
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <User className="h-5 w-5 text-gray-600" />
                      <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">Principal</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                      {principal.principalName}
                    </h2>
                  </div>
                </div>
              </div>

              {/* Message Section */}
              <div className="flex-1 w-full">
                {/* Message Header */}
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Quote className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Message</h3>
                    <p className="text-gray-600">Words from our Principal</p>
                  </div>
                </div>

                {/* Message Content */}
                <div className="bg-gray-50 rounded-2xl p-8 mb-8 border border-gray-100 relative">
                  <Quote className="absolute top-6 left-6 h-8 w-8 text-blue-200" />
                  <div className="pl-12">
                    <p className="text-lg md:text-xl text-gray-800 leading-relaxed whitespace-pre-line">
                      {principal.message}
                    </p>
                  </div>
                  <Quote className="absolute bottom-6 right-6 h-8 w-8 text-blue-200 rotate-180" />
                </div>

                {/* Metadata */}
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-gray-200 shadow-sm">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-600">Published on</p>
                      <p className="font-semibold text-gray-900">
                        {new Date(principal.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 bg-green-50 rounded-xl px-4 py-3 border border-green-200">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="font-medium text-green-800">Official Statement</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 text-gray-600 bg-white rounded-full px-6 py-3 shadow-sm border border-gray-200">
            <span className="text-sm font-medium">Stay connected with our updates</span>
            <ChevronRight className="h-4 w-4" />
          </div>
        </div>
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