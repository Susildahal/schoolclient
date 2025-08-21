import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminHeader from '../common/AdminHeader';
const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];

const Publicnotic = () => {
  const [preview, setPreview] = useState(null);

  const formik = useFormik({
    initialValues: {
      message: '',
      title: '',
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
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('message', values.message);
      formData.append('photo', values.photo);

      try {
        const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}
/PublicNotic/savePublicNotic`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,  // Include credentials like cookies
        });
        toast.success('Notice submitted successfully!');
        // Handle the response here
        console.log('Form submitted successfully:', response.data);

        // Reset the form after submission
        formik.resetForm();
        setPreview(null);
      } catch (err) {
        console.error('Error submitting form:', err);
        toast.error(err.response?.data?.msg);
      }
    },
  });

  const handleImageChange = (event) => {
    const file = event.currentTarget.files[0];

    if (file) {
      formik.setFieldValue('photo', file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <>
    <AdminHeader
    title=' Notic'  
    subtitle=" Mange your notic and add new notic "
    to='/Adminoutlet/DisplayPublicnotic'
    linkname=' View Notic'
    />
    <div className="   flex items-center justify-center p-4">
      <div className="w-full max-w-2xl border border-black border-[1px]  bg-white shadow-2xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">Notice Form</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-6">

                <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input type='text'
              name="title"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
              className="w-full border text-black border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formik.touched.title && formik.errors.title && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.title}</p>
            )}
          </div>
          {/* Message */}
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
              accept="image/*"
              onChange={handleImageChange}
              className="w-full"
            />
            {formik.errors.photo && formik.touched.photo && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.photo}</p>
            )}
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-4 w-40 h-auto rounded-lg shadow-md border border-gray-200"
              />
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white text-lg font-semibold py-3 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

    </div>
    </>
  );
};

export default Publicnotic;
