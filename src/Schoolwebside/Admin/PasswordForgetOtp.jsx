import axios from "axios";
import React, { startTransition } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axiosInstance from "../config/Axiosconfig";

const PasswordForgetOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email1 = location.state?.email || "";

  React.useEffect(() => {
    if (!email1) {
      toast.error("Invalid request. Email is missing.");
    }
  }, [email1]);

  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: Yup.object({
      otp: Yup.string()
        .required("Enter your OTP")
        .length(6, "Your OTP must be exactly 6 digits"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await axiosInstance.post("/user/passwordcheckotp", {
          otp: values.otp,
          id: email1,
        });

        if (response.data.success) {
          toast.success(response.data.msg || "OTP Verified ");
          startTransition(() => navigate("/Updatepassword", { state: { email1 } }));
        }
      } catch (error) {
        if(error.response && error.response.status === 429) {
                 // Rate limit hit
                 toast.error(error.response?.data?.msg || "You are doing too much  wrong request please try again next day");
               } else{
                 toast.error(error.response?.data?.msg || "Something went wrong");
               }
      } finally {
        setSubmitting(false);
      }
    },
  });


  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-80 text-center">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Enter OTP</h2>

        <form onSubmit={formik.handleSubmit}>
          <input
            type="text"
            id="otp"
            name="otp"
            maxLength={6}
            placeholder="Enter OTP"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:text-black text-center"
            value={formik.values.otp}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.otp && formik.errors.otp && (
            <p className="text-red-500 text-sm mt-2">{formik.errors.otp}</p>
          )}

          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full mt-4 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            {formik.isSubmitting ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <button
          type="button"
          className="w-full mt-4 bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 transition duration-200"
        >
          <Link to="/CheckEmail">Didn’t receive OTP? Resend OTP</Link>
          
        </button>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default PasswordForgetOtp;
