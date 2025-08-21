import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../config/Axiosconfig";

// Set base API URL based on environment
 console.log(process.env.REACT_APP_API_BASE_URL)

const ShowPrincipal = () => {
  const [principal, setPrincipal] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    principalName: "",
    message: "",
    photo: null,
  });
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const fetchPrincipal = async () => {
      try {
        const res = await axiosInstance.get(`/principal/get-principal`);
        setPrincipal(res.data);
        setFormData({
          principalName: res.data.principalName,
          message: res.data.message,
          photo: null, // Initialize as null for new uploads
        });
      } catch (err) {
        console.error("Failed to load principal data:", err);
        toast.error("Failed to load principal data", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    };

    fetchPrincipal();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, photo: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const updatedFormData = new FormData();
    updatedFormData.append("principalName", formData.principalName);
    updatedFormData.append("message", formData.message);
    if (formData.photo) updatedFormData.append("photo", formData.photo);

    try {
   // GET request with credentials
 await axiosInstance.get(`/principal/get-principal`, {

});

// PUT request with credentials
const response = await axiosInstance.put(
  `/principal/add-updatePrincipal`,
  updatedFormData,
  {
    headers: { "Content-Type": "multipart/form-data" },
    withCredentials: true
  }
);

      toast.success(response.data.message || "Principal updated successfully!", {
        position: "top-right",
        autoClose: 3000,
      });

      // Update the principal data
      setPrincipal({
        ...principal,
        principalName: formData.principalName,
        message: formData.message,
        photo: response.data.photo || principal.photo,
      });

      setIsEditing(false);
      setPreviewImage(null);
    } catch (err) {

       if (err.response) {
                
                toast.error(err.response?.data?.msg || "Server error occurred");
              }
    
    } finally {
      setIsSubmitting(false);
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setFormData({
      principalName: principal.principalName,
      message: principal.message,
      photo: null,
    });
    setPreviewImage(null);
  };

  if (!principal) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 text-lg">Loading principal data...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto  to-white rounded-3xl shadow-2xl border border-[1px] border-black p-8 mt-12">
      <h2 className="text-4xl font-extrabold text-center text-blue-700 mb-6 underline underline-offset-8">
        Principal's Message
      </h2>

      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Image */}
        <div className="flex-shrink-0">
          {isEditing && previewImage ? (
            <img
              src={previewImage}
              alt="New Principal Preview"
              className="w-48 h-48 rounded-full object-cover ring-4 ring-blue-500 shadow-lg"
            />
          ) : (
            <img
              src={`${process.env.REACT_APP_API_BASE_URL}/uploads/${principal.photo}`}
              // src= {`http://localhost:5000/uploads/${principal.photo}`}
              alt="Principal"
              className="w-48 h-48 rounded-full object-cover ring-4 ring-blue-500 shadow-lg"
            />
          )}
        </div>

        {/* Info */}
        <div className="text-center md:text-left space-y-3 flex-1">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Principal Name
                </label>
                <input
                  type="text"
                  name="principalName"
                  value={formData.principalName}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-2"
                  required
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="5"
                  className="w-full border border-gray-300 rounded-lg p-2"
                  required
                />
              </div>

              {/* Photo */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Upload New Photo (Optional)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex-1 bg-blue-600 text-white p-2 rounded-lg ${
                    isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-700"
                  }`}
                >
                  {isSubmitting ? "Updating..." : "Update Principal"}
                </button>
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="flex-1 bg-gray-300 text-gray-800 p-2 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <>
              <h3 className="text-2xl font-semibold text-gray-800">
                {principal.principalName}
              </h3>
              <p className="text-gray-700 leading-relaxed text-justify">
                {principal.message}
              </p>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 text-white p-2 px-4 mt-4 rounded-lg hover:bg-blue-700"
              >
                Edit Principal
              </button>
            </>
          )}
        </div>
      </div>
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default ShowPrincipal;