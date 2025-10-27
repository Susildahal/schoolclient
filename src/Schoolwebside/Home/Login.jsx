import React, { useState } from "react";
import { startTransition } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../config/Axiosconfig";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState(null);

  const formik = useFormik({
    initialValues: {
      id: "",
      password: ""
    },
    validationSchema: Yup.object({
      id: Yup.string().email("Invalid email format").required("Email is required"),
      password: Yup.string().required("Password is required")
    }),
    onSubmit: async (values, { setSubmitting }) => {
      setApiError(null);
      try {
        const response = await axiosInstance.post(`/user/login`, values);
     
  startTransition(() => navigate("/Loginotp", { state: { email: values.id } }));
      } catch (error) {
        if (error.response && error.response.status === 429) {
          setApiError(error.response?.data?.msg || "Too many requests, please try again later.");
         
        } else {
          setApiError(error.response?.data?.msg || "Something went wrong");
      
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
     
      <div className="absolute inset-0 bg-black opacity-30"></div>

      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-sm border relative z-10">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Login</h2>
          <p className="text-sm text-gray-600">Please enter your credentials</p>
        </div>

        {/* API Error Message */}
        {apiError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{apiError}</p>
          </div>
        )}

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Email / ID Field */}
          <div>
            <label htmlFor="id" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="id"
              name="id"
              type="email"
              autoComplete="username"
              placeholder="your@email.com"
              value={formik.values.id}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full pl-3 pr-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            />
            {formik.touched.id && formik.errors.id && (
              <div className="text-xs text-red-600 mt-1">{formik.errors.id}</div>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Enter password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full pr-10 pl-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowPassword(prev => !prev)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-400 hover:text-gray-600"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {formik.touched.password && formik.errors.password && (
              <div className="text-xs text-red-600 mt-1">{formik.errors.password}</div>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 text-sm text-gray-700">
                Remember me
              </label>
            </div>
            <Link to="/CheckEmail" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {formik.isSubmitting ? "Logging in..." : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
