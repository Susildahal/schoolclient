import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { Link, useParams } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from '../config/Axiosconfig';
import Button from 'src/components/Button';



const Updateaccount = () => {
  const { id } = useParams(); // still use 'id' from URL, it's MongoDB ObjectId


  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      roll: '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email format').required('Email is required'),
      name: Yup.string().min(2, 'Name must be at least 2 characters').required('Name is required'),
      roll: Yup.string()
        .oneOf(['superadmin', 'manager', 'teacher'], 'Invalid role')
        .required('Role is required'),
    }),
    onSubmit: async (values) => {
      const confirmed = window.confirm(`Are you sure you want to update ${values.name}?`);
      if (!confirmed) return;

      try {
        const response = await axiosInstance.put(`/user/updateuser/${id}`, values);
        toast.success(response.data.msg);
        formik.resetForm();

      } catch (error) {
        toast.error(error.response?.data?.msg || 'Something went wrong');
      }
    },
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get(`/user/getUserController/${id}`);
        const { id: email, name, roll } = res.data.user;
        formik.setValues({ email, name, roll });
      } catch (err) {
        toast.error("Failed to load user data");
      }
    };
    fetchUser();
  }, [id]);

  return (
    <div className=" flex items-center justify-center py-12 px-4">
      <div className="bg-white text-black p-8  border-black border-[1px] rounded-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">Update User</h2>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-1">User Email</label>
            <input
              type="text"
              name="email"
              className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Role</label>
            <select
              name="roll"
              className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              onChange={formik.handleChange}
              value={formik.values.roll}
            >
              <option value="">Select Role</option>
              <option value="superadmin">Superadmin</option>
              <option value="manager">Manager</option>
              <option value="teacher">Teacher</option>
            </select>
            {formik.touched.roll && formik.errors.roll && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.roll}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md transition duration-300"
          >
            Update User
          </button>
          <Button
            className=""
          >
            <Link to= "/Adminoutlet/Account">Go Back</Link>
    
          </Button>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default Updateaccount;
