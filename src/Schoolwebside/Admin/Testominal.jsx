import React, { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, X, Loader2 } from "lucide-react";
import { updatedata, deletedata, save, fetch } from "../redux/slicer/testominal.js";
import { useSelector, useDispatch } from "react-redux";
import Spiner from "../common/Spiner.jsx";

const Testimonial = () => {
  const [name, setName] = useState("");
  const [who, setWho] = useState("");
  const [descriptions, setDescriptions] = useState("");
  const [editId, setEditId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();

  const [errors, setErrors] = useState(null);
  const [success, setSuccess] = useState(null);

  // use redux state
  const { data: testimonials = [], loading, error } = useSelector((state) => state.testimonial || { data: [], loading: false, error: null });
  console.log(testimonials);

  useEffect(() => {
    // Fetch testimonials on component mount
    dispatch(fetch());
  }, [dispatch]);

  // Add or update testimonial
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      if (editId) {
        await dispatch(updatedata({ 
          id: editId, 
          data: { name, who, descriptions } 
        })).unwrap();
      } else {
        await dispatch(save({ name, who, descriptions })).unwrap();
      }

      setName("");
      setWho("");
      setDescriptions("");
      setEditId(null);
      setIsModalOpen(false);
      setSuccess("Testimonial saved successfully");
      // no explicit refetch needed because slice updates state
    } catch (err) {
      setErrors("Failed to save testimonial");
    } finally {
      setSubmitting(false);
    }
  };

  // Delete testimonial
  const handleDelete = async (id) => {
    if (!id) {
      setErrors("Cannot delete testimonial: Invalid ID");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this testimonial?")) {
      return;
    }

    setSuccess(null);
    setErrors(null);
    try {
      await dispatch(deletedata(id)).unwrap();
      setSuccess("Testimonial deleted successfully");
    } catch (err) {
      console.error("Delete error:", err);
      setErrors(err?.message || "Failed to delete testimonial");
    }
  };

  // Edit testimonial
  const handleEdit = (testimonial) => {
    setName(testimonial.name || "");
    setWho(testimonial.who || "");
    setDescriptions(testimonial.descriptions || "");
    setEditId(testimonial._id);
    setIsModalOpen(true);
  };

  // Open modal for adding new testimonial
  const handleAddNew = () => {
    setName("");
    setWho("");
    setDescriptions("");
    setEditId(null);
    setErrors(null);
    setSuccess(null);
    setIsModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setName("");
    setWho("");
    setDescriptions("");
    setEditId(null);
    setErrors(null);
    setSuccess(null);
  };
  
  if(loading){
    return <Spiner />;
  }

  return (
   <>
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-sm font-bold text-gray-900">Add new testimonial</h1>
            <p className="text-gray-600 text-sm mt-1">Manage system testimonials</p>
          </div>
          <button
            onClick={handleAddNew}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add New testimonial
          </button>
        </div>
      </div>
      <div className="p-6 max-w-6xl mx-auto">
        {/* Success Message */}
        {success && (
          <div className="mb-4 bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-5 w-5 text-green-400">✓</div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">{success}</p>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {errors && (
          <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <X className="h-5 w-5 text-red-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-red-800">{errors}</p>
              </div>
            </div>
          </div>
        )}

        {/* Redux Error Message */}
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <X className="h-5 w-5 text-red-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-red-800">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Testimonial Table */}
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">All Testimonials</h2>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
              <span className="ml-2 text-gray-600">Loading testimonials...</span>
            </div>
          ) : testimonials.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No testimonials found. Create your first testimonial to get started.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      #
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Position/Who
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created Date
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {(Array.isArray(testimonials) ? testimonials : []).filter(Boolean).map((testimonial, index) => (
                    <tr key={testimonial?._id ?? index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{testimonial?.name ?? "Unnamed"}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{testimonial?.who ?? "N/A"}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500 truncate max-w-xs">
                          {testimonial?.descriptions ?? "No description"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {testimonial?.createdAt ? new Date(testimonial.createdAt).toLocaleDateString() : "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleEdit(testimonial)}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md flex items-center gap-1 text-sm transition-colors"
                            disabled={loading}
                          >
                            <Edit2 className="h-3 w-3" />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(testimonial?._id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md flex items-center gap-1 text-sm transition-colors disabled:bg-red-300 disabled:cursor-not-allowed"
                            disabled={loading}
                          >
                            {loading ? (
                              <Loader2 className="h-3 w-3 animate-spin" />
                            ) : (
                              <Trash2 className="h-3 w-3" />
                            )}
                            {loading ? "Deleting..." : "Delete"}
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

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {editId ? "Edit Testimonial" : "Add New Testimonial"}
                  </h3>
                  <button
                    onClick={handleCloseModal}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <form onSubmit={handleSubmit} className="px-6 py-4">
                {/* Error Message in Modal */}
                {errors && (
                  <div className="mb-4 bg-red-50 border border-red-200 rounded-md p-3">
                    <p className="text-sm text-red-600">{errors}</p>
                  </div>
                )}

                <div className="mb-4">
                  <label htmlFor="testimonialName" className="block text-sm font-medium text-gray-700 mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="testimonialName"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                    disabled={submitting}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="who" className="block text-sm font-medium text-gray-700 mb-2">
                    Position or Who <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="who"
                    type="text"
                    value={who}
                    onChange={(e) => setWho(e.target.value)}
                    placeholder="Enter position or who"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                    disabled={submitting}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="descriptions" className="block text-sm font-medium text-gray-700 mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="descriptions"
                    value={descriptions}
                    onChange={(e) => setDescriptions(e.target.value)}
                    placeholder="Enter description"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows="4"
                    required
                    disabled={submitting}
                  />
                </div>

                {/* Modal Footer */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    disabled={submitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
                    disabled={submitting}
                  >
                    {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                    {editId ? "Update Testimonial" : "Create Testimonial"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Testimonial;