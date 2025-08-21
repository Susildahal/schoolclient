import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminHeader from "../common/AdminHeader";


const DisplayAchievementsAdmin = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}
/Achivement/getAchivement`, {
        withCredentials: true,
      });
      setAchievements(res.data.data || []);
    } catch (err) {
      toast.error(err.response?.data?.msg || "Failed to load achievements");
      setAchievements([])
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this achievement?")) return;

    try {
      setDeletingId(id);
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}
/Achivement/deleteAchivement/${id}`, {
        withCredentials: true,
      });
      toast.success("Deleted successfully");
      setAchievements((prev) => prev.filter((a) => a._id !== id));
    } catch (err) {
      toast.error(err.response?.data?.msg || "Delete failed");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  if (achievements.length === 0)
    return <p className="text-center mt-10">No achievements found.</p>;

  return (
    <>
      <AdminHeader
        title="Achievements"
        subtitle="Manage your Achievements"
        linkname="Add New Achievements"
        to="/Adminoutlet/Achievements"
      />
      <div className="max-w-5xl mx-auto mt-6">
         <table className="min-w-full bg-white border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 border text-left">#</th>
              <th className="px-4 py-2 border text-left">Image</th>
              <th className="px-4 py-2 border text-left">Message</th>
                 <th className="px-4 py-2 border text-left">Title</th>
              <th className="px-4 py-2 border text-left">Date</th>
              <th className="px-4 py-2 border text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {achievements.map((ach, index) => (
              
              <tr key={ach._id} className="even:bg-gray-50">
                <td className="px-4 py-2 border align-middle">{index + 1}</td>
                <td className="px-4 py-2 border align-middle">
                  <img
                    src={`${process.env.REACT_APP_API_BASE_URL}/uploads/${ach.photo}`}
                    alt="Notic"
                    className="w-24 h-16 object-cover rounded mx-auto"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/400x300?text=No+Image";
                    }}
                  />
                </td>
                <td className="px-4 py-2 border align-middle">{ach.message}</td>
                <td className="px-4 py-2 border align-middle">{ach.title}</td>
                <td className="px-4 py-2 border align-middle">
                  {new Date(ach.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 border align-middle">
                  <button
                    onClick={() => handleDelete(ach._id)}
                    disabled={deletingId === ach._id}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                  >
                    {deletingId === ach._id ? "Deleting..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ToastContainer />
      </div>
    </>
  );
};

export default DisplayAchievementsAdmin;