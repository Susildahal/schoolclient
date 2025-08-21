import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../config/Axiosconfig';
import AdminHeader from '../common/AdminHeader';
const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];

const Principal = () => {
  const [preview, setPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      principalName: '',
      message: '',
      photo: null,
    },
    validationSchema: Yup.object({
      principalName: Yup.string().required('Principal name is required'),
      message: Yup.string().required('Message is required') .min(100, 'Message must be at least 100 characters'),
      photo: Yup.mixed()
        .required('A photo is required')
        .test(
          'fileType',
          'Unsupported file type. Only JPG, PNG, WEBP allowed.',
          (value) => value && ALLOWED_TYPES.includes(value.type)
        )
        .test('fileSize', 'Image must be less than 2MB', (value) => {
          return value && value.size <= MAX_IMAGE_SIZE;
        }),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleImageChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      formik.setFieldTouched('photo', true); // trigger validation
      formik.setFieldValue('photo', file);
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    }
  };

  useEffect(() => {
    return () => {
      // Clean up preview image URL
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('principalName', values.principalName);
    formData.append('message', values.message);
    formData.append('photo', values.photo);

    try {
      const response = await axiosInstance.post(
        `/principal/add-principal`,
        formData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message || 'Principal added successfully!');
        formik.resetForm();
        formik.setTouched({});
        setPreview(null);
      } else {
        toast.error(response.data.error || 'Failed to add principal');
      }
    } catch (error) {
      console.error('Error:', error);
      let errorMessage = 'An error occurred while submitting the form or Roll decline';

      if (error.response) {
        errorMessage =
          error.response.data.error || error.response.data.message || errorMessage;
      } else if (error.request) {
        errorMessage = 'No response from server';
      }

      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen     items-center justify-center p-4">
      <AdminHeader
      title=' Manage and  '
      subtitle=' view your Pincaple message '
      to='/Adminoutlet/ShowPrincipal'
      linkname="view your princaple message "

      />
      <div className=' flex justify-center'>
      <div className="w-full max-w-2xl border border-black border-[1px] rounded-xl bg-white shadow-2xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">Principal Form</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Principal Name */}
          <div>
            <label htmlFor="principalName" className="block text-sm font-medium text-gray-700 mb-1">
              Principal Name
            </label>
            <input
              id="principalName"
              type="text"
              name="principalName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.principalName}
              className="w-full border text-black border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formik.touched.principalName && formik.errors.principalName && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.principalName}</p>
            )}
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              id="message"
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
            <label htmlFor="photo" className="block text-sm font-medium text-gray-700 mb-1">
              Upload Photo
            </label>
            <input
              id="photo"
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
            disabled={isSubmitting || !formik.isValid}
            className={`w-full text-lg font-semibold py-3 rounded-md transition duration-200 ${
              isSubmitting || !formik.isValid
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
    </div>
  );
};

export default Principal;
