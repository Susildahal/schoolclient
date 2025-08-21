import React, { useEffect, useState, startTransition } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../config/Axiosconfig";



const Updatestudents = () => {
  const { id } = useParams();
  const [studentsdata, setstudentsdata] = useState(null);
  const navigate=useNavigate();

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(
        `/students/getAllStudentsbyid/${id}`,
        { withCredentials: true }
      );
      setstudentsdata(response.data.data);
    } catch (error) {
      setstudentsdata(null);
      if (error.response?.status===403){
        toast.error("You are not authorized to update this student");
              }
        else{
          toast.error(error.response?.data?.msg || "Failed to fetch student data");
        }


    }
  };

  fetchData();
}, [id]);


 

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: studentsdata?.firstName || "",
      lastName: studentsdata?.lastName || "",
      className: studentsdata?.className || "",
      status: studentsdata?.status || "Active",
      address: studentsdata?.address || "",
      guardianName: studentsdata?.guardianName || "",
      gender: studentsdata?.gender || ""
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      className: Yup.string().required("Class is required"),
      status: Yup.string().required("Status is required"),
      address: Yup.string().required("Address is required"),
      guardianName: Yup.string().required("Guardian name is required"),
      gender: Yup.string().required("Gender is required")
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await axiosInstance.put(
          `/students/Updatestudents/${id}`,
          values,
          { withCredentials: true }
        );
        if(response.data.success){
            formik.resetForm();
            startTransition(() => navigate('/Adminoutlet/ClassStudentList'))

        }
      
        toast.success(response.data.msg || "Student updated successfully");
      } catch (error) {
        toast.error(error.response?.data?.msg || "Failed to update student");
      } finally {
        setSubmitting(false);
      }
    }
  });

  if (!studentsdata) return <p className="text-center mt-10">Loading student data...</p>;

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <form
        onSubmit={formik.handleSubmit}
        className="w-full max-w-lg p-6 bg-white shadow-md rounded-lg space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-blue-600">Update Student</h2>

        {/* First Name */}
        <div>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            className="w-full border rounded-md p-2 text-black"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.firstName && formik.errors.firstName && (
            <p className="text-red-500 text-sm">{formik.errors.firstName}</p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            className="w-full border rounded-md p-2 text-black"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.lastName && formik.errors.lastName && (
            <p className="text-red-500 text-sm">{formik.errors.lastName}</p>
          )}
        </div>

        {/* Class */}
        <div>
          <select
            name="className"
            className="w-full border rounded-md p-2 text-black"
            value={formik.values.className}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="">Please Select the Grade</option>
            {[...Array(12)].map((_, i) => (
              <option key={i + 1} value={i + 1}>Grade {i + 1}</option>
            ))}
          </select>
          {formik.touched.className && formik.errors.className && (
            <p className="text-red-500 text-sm">{formik.errors.className}</p>
          )}
        </div>

        {/* Status */}
        <div>
          <select
            name="status"
            className="w-full border rounded-md p-2 text-black"
            value={formik.values.status}
            onChange={formik.handleChange}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* Address */}
        <div>
          <textarea
            name="address"
            placeholder="Address"
            className="w-full border rounded-md p-2 text-black"
            rows={3}
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.address && formik.errors.address && (
            <p className="text-red-500 text-sm">{formik.errors.address}</p>
          )}
        </div>

        {/* Guardian Name */}
        <div>
          <input
            type="text"
            name="guardianName"
            placeholder="Guardian Name"
            className="w-full border rounded-md p-2 text-black"
            value={formik.values.guardianName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.guardianName && formik.errors.guardianName && (
            <p className="text-red-500 text-sm">{formik.errors.guardianName}</p>
          )}
        </div>

        {/* Gender */}
        <div className="flex space-x-4">
          {["Male", "Female", "Other"].map((g) => (
            <label key={g} className="flex items-center space-x-2 text-black">
              <input
                type="radio"
                name="gender"
                value={g}
                checked={formik.values.gender === g}
                onChange={formik.handleChange}
              />
              <span>{g}</span>
            </label>
          ))}
        </div>
        {formik.touched.gender && formik.errors.gender && (
          <p className="text-red-500 text-sm">{formik.errors.gender}</p>
        )}

        {/* Submit Button */}
        <div className="text-center pt-2">
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition"
          >
            {formik.isSubmitting ? "Submitting..." : "Update Student"}
          </button>
        </div>
      </form>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Updatestudents;
