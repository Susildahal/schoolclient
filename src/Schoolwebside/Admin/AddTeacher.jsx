import React, { useState, startTransition } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../config/Axiosconfig';
import Button from 'src/components/Button';
const AddTeacher = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      id: '',
      name: '',
      roll: '',
      password: '',
    },
    validationSchema: Yup.object({
      id: Yup.string().email('Invalid email format').required('ID is required'),
      name: Yup.string().min(2, 'Name must be at least 2 characters').required('Name is required'),
      roll: Yup.string()
        .oneOf(['Superadmin', 'manager', 'teacher'], 'Invalid role')
        .required('Role is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: async (values) => {
      const confirmed = window.confirm(`Are you sure you want to create this ${values.name}?`);
      if (!confirmed) return;
    
      try {
        const response = await axiosInstance.post(
          `/user/createuser`,
          values,
          { withCredentials: true }
        );
        toast.success(response.data.msg);
        formik.resetForm();
      } catch (error) {
        toast.error(error.response?.data?.msg || 'Something went wrong');
        // Redirect to login if unauthorized (401)
        if (error.response?.status === 401) {
          startTransition(() => navigate('/login'));
        }
      }
    },
  });

  return (
    <div className=" justify-center flex   px-4">
      <div className="bg-white text-black p-8 rounded-2xl  border border-black border-[1px] rounded-md  w-full max-w-md transition-all duration-300 hover:shadow-xl">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">Create User</h2>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* ID Field */}
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium text-sm"> Enter User Email</label>
            <div className="relative">
              <input
                type="text"
                name="id"
                placeholder="email@example.com"
                className="w-full p-3 pl-4 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none"
                onChange={formik.handleChange}
                value={formik.values.id}
              />
              <span className="absolute right-3 top-3 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </span>
            </div>
            {formik.touched.id && formik.errors.id && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.id}</p>
            )}
          </div>

          {/* Name Field */}
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium text-sm">Teacher Name</label>
            <div className="relative">
              <input
                type="text"
                name="name"
                placeholder="Enter full name"
                className="w-full p-3 pl-4 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
              <span className="absolute right-3 top-3 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </span>
            </div>
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.name}</p>
            )}
          </div>

          {/* Role Dropdown */}
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium text-sm">Role</label>
            <div className="relative">
              <select
                name="roll"
                className="w-full p-3 pl-4 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white appearance-none transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none"
                onChange={formik.handleChange}
                value={formik.values.roll}
              >
                <option value="">Select Role</option>
                <option value="Superadmin">Superadmin</option>
                <option value="manager">Manager</option>
                <option value="teacher">Teacher</option>
              </select>
              <span className="absolute right-3 top-3 text-gray-400 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </span>
            </div>
            {formik.touched.roll && formik.errors.roll && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.roll}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium text-sm">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Enter password"
                className="w-full p-3 pl-4 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-700 transition-colors"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                )}
              </button>
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.password}</p>
            )}
          </div>

          <div className="pt-2 flex justify-center items-center">
            <Button
              type="submit"
              className=""
            >
              Create User
            </Button>
          </div>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default AddTeacher;