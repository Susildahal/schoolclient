import axios from 'axios';
import React, { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import { useSelector, useDispatch } from 'react-redux';
import { fetch, deletedata } from '../redux/slicer/userMessageSlicer';

const Notic = () => {
  const dispatch = useDispatch();
  const userMessage = useSelector((state) => state.message?.data ?? []);

  useEffect(() => {
    if (userMessage.length === 0) {
      dispatch(fetch());
    }
  }, [dispatch, userMessage.length]);

  const handleDelete = async (id) => {
    try {
      await dispatch(deletedata(id));
      toast.success("Message deleted");
    } catch (error) {
      console.error("Error deleting item", error);
      toast.error(error?.response?.data?.msg || "Something went wrong");
    }
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-2 text-center ">User Messages</h1>

      {userMessage.length === 0 ? (
        <p className="text-center text-gray-500">No messages found.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Message
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {userMessage.map((item) => (
                <tr key={item._id || item.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {item.firstName} {item.lastName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-700">{item.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-700">{item.phone}</div>
                  </td>
                  <td className="px-6 py-4 max-w-xs whitespace-normal">
                    <div
                      className="text-sm text-gray-700 truncate"
                      title={item.message}
                    >
                      {item.message}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button
                      type="button"
                      onClick={() => handleDelete(item._id || item.id)}
                      className="inline-flex items-center px-3 py-1.5 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Notic;
