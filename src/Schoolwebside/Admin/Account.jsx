import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../config/Axiosconfig';
import AdminHeader from '../common/AdminHeader';

const Account = () => {
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axiosInstance.get("/user/getalluser");
            const filteredUsers = response.data.data.filter(user => user.name !== "Sushil Dahal");

            setUser(filteredUsers);
            setLoading(false);
        } catch (err) {
            setError("Failed to fetch user data.");
            setUser([]);
            setLoading(false);
            toast.error("Error fetching users");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;

        try {
            const response = await axiosInstance.delete(`/user/deleteuser/${id}`);
            toast.success(response.data.msg || "User deleted successfully");
            setUser(prev => prev.filter(user => user._id !== id));
        } catch (error) {
            if (error.response?.status === 403) {
                toast.error("You are not authorized to delete this user");
            }else{
            toast.error(error.response?.data?.msg || "Failed to delete user");
            }
        }
    };

    return (
        <section className="min-h-screen p-1">
                <h1 className="text-2xl pt-2 text-neutral-800 font-bold  text-center">User Accounts</h1>
             <AdminHeader 
             title =" Manage your account"
             subtitle="" 
             to="/Adminoutlet/AddTeacher"
             linkname="Create a new Acount"
             />
            <div className="max-w-4xl mx-auto">
            

                {loading && <p className="text-center text-blue-500">Loading...</p>}
                {error && <p className="text-center text-red-500">{error}</p>}

                {!loading && !error && user.length === 0 && (
                    <p className="text-center text-gray-500">No users found.</p>
                )}

                {!loading && !error && user.length > 0 && (
                    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">#</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Name</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Email</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Role</th>
                                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {user.map((data, index) => (
                                    <tr key={data._id || index} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 text-sm text-gray-600">{index + 1}</td>
                                        <td className="px-4 py-3 text-sm text-gray-900">{data.name}</td>
                                        <td className="px-4 py-3 text-sm text-gray-700">{data.email}</td>
                                        <td className="px-4 py-3 text-sm text-gray-700">{data.role}</td>
                                        <td className="px-4 py-3 text-sm text-center">
                                            <div className="flex items-center justify-center gap-3">
                                                <Link
                                                    to={`/Adminoutlet/Updateaccount/${data._id}`}
                                                    className="bg-orange-400 hover:bg-orange-600 text-white px-3 py-1 rounded-md"
                                                >
                                                    Update
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(data._id)}
                                                    className="bg-red-400 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <ToastContainer position="top-right" autoClose={3000} />


           
        </section>
    );
};

export default Account;
