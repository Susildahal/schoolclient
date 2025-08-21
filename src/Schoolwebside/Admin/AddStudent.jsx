import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../config/Axiosconfig";
import Button from "../../components/ui/Button";
import { Input } from "src/components/ui/input";
import { Card } from "src/components/ui/card";


const AddStudent = () => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      className: "",
      status: "Active",
      address: "",
      guardianName: "",
      gender: ""
    },

    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      className: Yup.string().required("Class is required"),
      status: Yup.string().required("Status is required"),
      address: Yup.string().required("Address is required"),
      guardianName: Yup.string().required("Guardian name is required"),
      gender: Yup.string().required("Gender is required"),
    }),

    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axiosInstance.post(`/students/add`, values);
        toast.success(response.data.msg || "Student added successfully");
        resetForm();
      } catch (error) {
        toast.error(error.response?.data?.msg || "Failed to add student");
      }
    }
  });

  return (
    <div className="flex justify-center  lg:max-h-screen">
      <form
        onSubmit={formik.handleSubmit}
        className="w-full max-w-2xl p-6   bg-white shadow-md rounded-lg space-y-3"
      > 
        <h2 className="text-2xl font-bold text-center text-blue-600">Add Student</h2>

        {/* First Name */}

       <div className=" grid lg:grid-cols-2 lg:gap-6"> 
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1"> Enter your first name</label>
          <input
            as="input"
            variant="default"
            type="text"
            name="firstName"
            placeholder="First Name"
            className="w-full border rounded-md p-2 text-black bg-white"
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
          <label className="block text-sm font-medium text-gray-700 mb-1"> Enter a last name</label>
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
        </div>

        {/* Class */}
      
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">  Select Class</label>
          <select
            name="className"
            className="w-full border rounded-md p-2 text-black bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-300 focus:bg-white active:bg-white"
            value={formik.values.className}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="" disabled hidden>Please Select the Grade</option>
            <option value="1">Grade 1</option>
            <option value="2">Grade 2</option>
            <option value="3">Grade 3</option>
            <option value="4">Grade 4</option>
            <option value="5">Grade 5</option>
            <option value="6">Grade 6</option>
            <option value="7">Grade 7</option>
            <option value="8">Grade 8</option>
            <option value="9">Grade 9</option>
            <option value="10">Grade 10</option>
            <option value="11">Grade 11</option>
            <option value="12">Grade 12</option>
          </select>
          
          {formik.touched.className && formik.errors.className && (
            <p className="text-red-500 text-sm">{formik.errors.className}</p>
          )}
        </div>

        {/* Status */}
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            id="status"
            name="status"
            className="w-full border rounded-md p-2 text-black bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-300 focus:bg-white active:bg-white"
            value={formik.values.status}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            aria-describedby={formik.touched.status && formik.errors.status ? "status-error" : undefined}
          >
            <option value="" disabled hidden>Please select a status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">Select whether the student is currently active or inactive.</p>
          {formik.touched.status && formik.errors.status && (
            <p id="status-error" className="text-red-500 text-sm">{formik.errors.status}</p>
          )}
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1"> Enter Address</label>
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
          <label className="block text-sm font-medium text-gray-700 mb-1"> Enter Guardian Name</label>
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
          <Button
            type="submit"
            disabled={formik.isSubmitting}
            className="bg-blue-600 hover:bg-blue-700 text-white  py-2 rounded-md transition"
          >
            {formik.isSubmitting ? "Submitting..." : "Add Student"}
          </Button>
        </div>
      </form>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AddStudent;
