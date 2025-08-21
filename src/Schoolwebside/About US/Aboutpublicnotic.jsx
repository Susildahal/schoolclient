import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Aboutpublicnotic = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/Publicnotic/getPublicnotic`
        );
        const sorted = response.data.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setNotices(sorted);
      } catch (err) {
        console.error("Error fetching public notices:", err);
        setError(err.message);
        setNotices([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
        <p>Error loading Public Notices: {error}</p>
      </div>
    );
  }

  if (notices.length === 0) {
    return (
      <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4" role="alert">
        <p>No Public Notices found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen xl:ml-64 mt-10 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Our Public Notices</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notices.map((notice) => (
            <div
              key={notice._id || notice.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                {notice.photo && (
                  <img
                    src={`${process.env.REACT_APP_API_BASE_URL}/uploads/${notice.photo}`}
                    alt="Public Notice"
                    className="w-full h-[500px] object-cover mb-4 rounded cursor-pointer"
                    onClick={() =>
                      setModalImage(`${process.env.REACT_APP_API_BASE_URL}/uploads/${notice.photo}`)
                    }
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/500x400?text=Image+Not+Available";
                    }}
                  />
                )}
                <p className="text-gray-700 h-[300px] overflow-y-auto text-justify mb-4">
                  {notice.message}
                </p>
                <div className="text-sm text-gray-500">
                  {new Date(notice.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🔍 Modal for full-size image preview */}
      {modalImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setModalImage(null)}
        >
          <img
            src={modalImage}
            alt="Full size"
            className="max-w-full max-h-full rounded shadow-lg"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute top-4 right-4 text-white text-3xl font-bold"
            onClick={() => setModalImage(null)}
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
};

export default Aboutpublicnotic;
