import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminHeader from '../common/AdminHeader';

const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];

const Achievement = () => {
  const [preview, setPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      message: '',
      title:"",
      photo: null,
    },
    validationSchema: Yup.object({
      message: Yup.string().required('Message is required'),
      title: Yup.string().required('Title is required'),
      photo: Yup.mixed()
        .required('A photo is required')
        .test('fileType', 'Unsupported file type. Only JPG, PNG, WEBP allowed.', (value) => {
          return value && ALLOWED_TYPES.includes(value.type);
        })
        .test('fileSize', 'Image must be less than 2MB', (value) => {
          return value && value.size <= MAX_IMAGE_SIZE;
        }),
    }),
    onSubmit: async (values, { resetForm }) => {
      setIsSubmitting(true);
      
      // Verify file exists
      if (!values.photo) {
        toast.error("No file selected");
        setIsSubmitting(false);
        return;
      }

      const formdata = new FormData();
      formdata.append("message", values.message);
      formdata.append("photo", values.photo);
      formdata.append("title", values.title);

      // Debug FormData contents
      for (let [key, value] of formdata.entries()) {
        console.log(`${key}:`, value);
      }

      try {
        const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/Achivement/saveAchivement`,
          formdata,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            },
            withCredentials: true
          }
        );
        
        toast.success(response.data.msg);
        resetForm();
        setPreview(null);
      } catch (error) {
        console.error('Full error:', error);
        
        if (error.response) {
          // Server responded with error status
          console.error('Response data:', error.response.data);
          toast.error(error.response.data?.msg || "Server error occurred");
        } else if (error.request) {
          // Request was made but no response
          
          toast.error("No response from server. Check your connection.");
        } else {
          // Request setup error
          console.error('Request setup error:', error.message);
          toast.error("Request configuration error");
        }
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const handleImageChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      console.log('Selected file:', file.name, file.type, file.size);
      formik.setFieldValue('photo', file);
      setPreview(URL.createObjectURL(file));
    } else {
      formik.setFieldValue('photo', null);
      setPreview(null);
    }
  };

  return (
    <>
    <AdminHeader
    title="Achievement"
    subtitle="Create and manage achievements"
    linkname="View Achievements"
    to="/Adminoutlet/DisplayAchievements"
   
  />
    <div className=" flex items-center justify-center p-4">
      <div className="w-full max-w-2xl border border-black border-[1px]  bg-white shadow-2xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">Achievement Form</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-6" encType="multipart/form-data">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
            type='text'
              name="title"
              rows="5"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
              className="w-full border text-black border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formik.touched.title && formik.errors.title && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.title}</p>
            )}
          </div>
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              name="message"
              rows="5"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.message}
              className="w-full border text-black border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formik.touched.message && formik.errors.message && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.message}</p>
            )}
          </div>

          {/* Photo Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload Photo</label>
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full"
            />
            {formik.touched.photo && formik.errors.photo && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.photo}</p>
            )}
            {preview && (
              <div className="mt-4">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-40 h-auto rounded-lg shadow-md border border-gray-200"
                />
                <button
                  type="button"
                  onClick={() => {
                    formik.setFieldValue('photo', null);
                    setPreview(null);
                  }}
                  className="mt-2 text-sm text-red-500 hover:text-red-700"
                >
                  Remove Image
                </button>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-blue-600 text-white text-lg font-semibold py-3 rounded-md hover:bg-blue-700 transition duration-200 ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
      <ToastContainer position='top-right' autoClose={3000}/>
    </div>
    </>
  );
};

export default Achievement;