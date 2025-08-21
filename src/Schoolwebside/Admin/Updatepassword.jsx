import React, { useState, useEffect, startTransition } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Eye, EyeOff } from "lucide-react"; // Optional: use any icon library
import axiosInstance from "../config/Axiosconfig";

const Updatepassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email2 = location.state?.email1;

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!email2) {
      toast.error("Email is required");
    }
  }, [email2]);
  console.log(email2)

  const initialValues = {
    password: "",
  };

  const validationSchema = Yup.object({
    password: Yup.string()
      .required("Password is required")
      .min(8, "The password must be at least 8 characters")
      .max(20, "Password must be less than 20 characters"),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axiosInstance.put("/user/passwordUpdate", {
        id: email2,
        password: values.password
      });

      toast.success(response.data.msg || "Password updated successfully!");

      if (response.data.success) {
        startTransition(() => navigate("/"));
      }
    } catch (error) {
      toast.error(error.response?.data?.msg || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          🔒 Reset Your Password
        </h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-4">
              <div className="relative">
                <Field
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="New Password"
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500   focus:text-black outline-none text-lg"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700 transition duration-200 text-white text-lg font-semibold py-3 rounded-xl shadow-md"
              >
                {isSubmitting ? "Updating..." : "Update Password"}
              </button>
            </Form>
          )}
        </Formik>
      </div>

      <ToastContainer autoClose={3000} position="top-right" />
    </div>
  );
};

export default Updatepassword;
