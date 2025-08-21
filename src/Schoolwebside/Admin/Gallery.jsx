import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  PlusIcon,
  XMarkIcon,
  PhotoIcon,
  TrashIcon,
  CloudArrowUpIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import { ToastContainer } from 'react-bootstrap';

import axiosInstance from '../../Schoolwebside/config/Axiosconfig.js';


const imageValidationSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Title must be at least 3 characters')
    .max(50, 'Title must be less than 50 characters')
    .required('Title is required'),
  image: Yup.mixed()
    .required('Image is required')
    .test('fileSize', 'File size must be less than 5MB', (value) => {
      if (!value) return false;
      return value.size <= 5 * 1024 * 1024; // 5MB
    })
    .test('fileType', 'Only JPEG, PNG, and GIF images are allowed', (value) => {
      if (!value) return false;
      return ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'].includes(value.type);
    })
});

const AdminImageCRUD = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');

  // Initial form values
  const initialValues = {
    title: '',
    image: null
  };

  // Selected filter state
  const [selectedFilter, setSelectedFilter] = useState('All');

  // Available filter options
  const filterOptions = ['All', 'Sports', 'Events', 'Campus', 'Students', 'Teachers'];

  // Fetch images with filter
  const fetchImages = async (filter = selectedFilter) => {
    try {
      setLoading(true);
      const requestBody = {
        title: filter === 'All' ? '' : filter
      };
      const response = await axiosInstance.post('/gallery/filter', requestBody);
      setImages(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching images:', error);
      setLoading(false);
    }
  };

  // Handle filter change
  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    fetchImages(filter);
  };

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting, resetForm, setFieldError }) => {
    try {
      const uploadData = new FormData();
      uploadData.append('title', values.title);
      uploadData.append('image', values.image);
      const limit = 1;

      const response = await axiosInstance.post('/gallery?limit=1', uploadData);
      setImages(prev => [...prev, response.data.data]);
      
      // Reset form and close dialog
      resetForm();
      setPreviewUrl('');
      setIsDialogOpen(false);
      
    } catch (error) {
      console.error('Error uploading image:', error);
      setFieldError('image', 'Failed to upload image. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Handle file selection and preview
  const handleFileChange = (event, setFieldValue, setFieldError) => {
    const file = event.target.files[0];
    
    if (!file) {
      setFieldValue('image', null);
      setPreviewUrl('');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setFieldError('image', 'File size must be less than 5MB');
      return;
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      setFieldError('image', 'Only JPEG, PNG, and GIF images are allowed');
      return;
    }

    // Set file value
    setFieldValue('image', file);

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  // Handle delete image
  const handleDeleteImage = async (id) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;
    
    try {
      // await axiosInstance.delete(`/api/images/${id}`);
      setImages(prev => prev.filter(img => img.id !== id));
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  // Close dialog and reset
  const closeDialog = () => {
    setIsDialogOpen(false);
    setPreviewUrl('');
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Image Management</h2>
          <p className="text-xs text-gray-500 mt-1">Add and manage images with validation</p>
        </div>
           <button
          onClick={() => setIsDialogOpen(true)}
          className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs font-medium"
        >
          <PlusIcon className="w-4 h-4" />
          <span>Add Image</span>
        </button>
      </div>

      {/* Filter Navigation Bar */}
      <div className="flex flex-wrap gap-2 bg-gray-100 p-3 rounded-lg">
        {filterOptions.map((filter) => (
          <button
            key={filter}
            onClick={() => handleFilterChange(filter)}
            className={`px-4 py-2 rounded-md transition-colors text-xs ${
              selectedFilter === filter
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-200'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between">
        
     
      </div>

      {/* Images Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full mr-2"></div>
            <span className="text-xs text-gray-500">Loading...</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Preview
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Title
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Date
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {images.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-4 py-8 text-center text-xs text-gray-500">
                      <PhotoIcon className="w-8 h-8 mx-auto mb-2 opacity-30" />
                      <p>No images found</p>
                    </td>
                  </tr>
                ) : (
                  images.map((image) => (
                    <tr key={image.id} className="hover:bg-blue-50">
                      <td className="px-4 py-3">
                        {console.log(image.imageUrl)}
                        <img
                          src={`http://localhost:5000/api/${image.imageUrl}`}
                          alt={image.title}
                          className="w-12 h-12 rounded-lg object-cover border"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-xs font-medium text-gray-900">{image.title}</p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-xs text-gray-500">
                          {new Date(image.createdAt).toLocaleDateString()}
                        </p>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => handleDeleteImage(image.id)}
                          className="inline-flex items-center px-2 py-1 text-xs text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors"
                        >
                          <TrashIcon className="w-3 h-3 mr-1" />
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Image Dialog with Formik */}
      {isDialogOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={closeDialog}
          ></div>
          
          {/* Dialog */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900">Add New Image</h3>
                <button
                  onClick={closeDialog}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>

              {/* Formik Form */}
              <Formik
                initialValues={initialValues}
                validationSchema={imageValidationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, setFieldValue, setFieldError, errors, touched }) => (
                  <Form className="p-4 space-y-4">
                    {/* Title Field */}
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-2">
                        Image Title *
                      </label>

                      <Field
                        as="select"
                        name="title"
                        className={`w-full px-3 py-2 border rounded-md text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.title && touched.title ? 'border-red-300 focus:ring-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select title...</option>
                        <option value="Sports">Sports</option>
                        <option value="Events">Events</option>
                        <option value="Campus">Campus</option>
                        <option value="Students">Students</option>
                        <option value="Teachers">Teachers</option>
                      </Field>

                      <ErrorMessage name="title">
                        {msg => (
                          <div className="flex items-center mt-1 text-xs text-red-600">
                            <ExclamationTriangleIcon className="w-3 h-3 mr-1" />
                            {msg}
                          </div>
                        )}
                      </ErrorMessage>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-2">
                        Select Image *
                      </label>
                      <div className="space-y-2">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileChange(e, setFieldValue, setFieldError)}
                          className="hidden"
                          id="image-upload"
                        />
                        <label
                          htmlFor="image-upload"
                          className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                            errors.image && touched.image
                              ? 'border-red-300 hover:border-red-400'
                              : 'border-gray-300 hover:border-blue-400'
                          }`}
                        >
                          {previewUrl ? (
                            <div className="relative w-full h-full">
                              <img
                                src={previewUrl}
                                alt="Preview"
                                className="w-full h-full object-cover rounded-lg"
                              />
                              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-lg">
                                <p className="text-white text-xs">Click to change</p>
                              </div>
                            </div>
                          ) : (
                            <div className="text-center p-4">
                              <CloudArrowUpIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                              <p className="text-xs text-gray-500 font-medium">Click to upload image</p>
                              <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF up to 5MB</p>
                            </div>
                          )}
                        </label>
                        
                        <ErrorMessage name="image">
                          {msg => (
                            <div className="flex items-center text-xs text-red-600">
                              <ExclamationTriangleIcon className="w-3 h-3 mr-1" />
                              {msg}
                            </div>
                          )}
                        </ErrorMessage>
                      </div>
                    </div>

                    {/* Form Actions */}
                    <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
                      <button
                        type="button"
                        onClick={closeDialog}
                        className="px-4 py-2 text-xs text-gray-600 hover:text-gray-800"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-xs font-medium"
                      >
                        {isSubmitting && (
                          <div className="animate-spin w-3 h-3 border-2 border-white border-t-transparent rounded-full"></div>
                        )}
                        <span>{isSubmitting ? 'Uploading...' : 'Add Image'}</span>
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </>
      )}

      <ToastContainer />
    </div>
  );
};

export default AdminImageCRUD;