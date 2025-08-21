import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AboutAchievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalImage, setModalImage] = useState(null);

  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  //useQuery
  // Saroj9823Dangol

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/Achivement/getAchivement`);
        const sortedData = response.data.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setAchievements(sortedData);
      } catch (err) {
        console.error("Error fetching achievements:", err);
        setError(err.message);
        setAchievements([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
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
        <p>Error loading achievements: {error}</p>
      </div>
    );
  }

  if (achievements.length === 0) {
    return (
      <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4" role="alert">
        <p>No achievements found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen xl:ml-64 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* 🔥 Intro Section */}
        <div className="mb-10 mt-10 flex flex-col justify-center items-center text-center">
          <h2 className="text-4xl font-bold mb-3">
            Shree Bagh Bhairav Technical Secondary School
          </h2>
          <p className="text-xl max-w-3xl mx-auto">
            We take immense pride in the achievements of our students and faculty.
            These accomplishments reflect our commitment to excellence in education,
            innovation, and community service. Here's a glimpse of what makes our school outstanding.
          </p>
        </div>

        <h1 className="text-3xl font-bold text-center mb-8">Our Recent Achievements</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {achievements.map((achievement) => (
    <div
      key={achievement._id || achievement.id}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <div className="p-6">
        {achievement.photo && (
          <img
            src={`${BASE_URL}/uploads/${achievement.photo}`}
            alt="Achievement"
            className="w-full h-[500px] object-cover mb-4 rounded cursor-pointer"
            onClick={() => setModalImage(`${BASE_URL}/uploads/${achievement.photo}`)}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/500x400?text=Image+Not+Available";
            }}
          />
        )}
        <p className="text-gray-700 h-[300px] overflow-x-hidden text-justify mb-4">
          {achievement.message}
        </p>
        <div className="text-sm text-gray-500">
          {new Date(achievement.createdAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  ))}
</div>


        {/* 🌟 NEW Special Card */}
        
      </div>

      {/* 🔍 Modal Image Preview */}
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

export default AboutAchievements;
