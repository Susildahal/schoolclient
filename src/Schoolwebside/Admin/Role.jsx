import React, { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, X, Loader2 } from "lucide-react";
import { updaterole, deletedata, save, fetch} from "../redux/slicer/role.js";
import { useSelector, useDispatch } from "react-redux";
import Spiner from "../common/Spiner.jsx";

const Role = () => {
  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();

  const [errors, setErrors] = useState(null);
  const [success, setSuccess] = useState(null);

  // use redux state
  const { data: roles = [], loading, error } = useSelector((state) => state.role);

  useEffect(() => {
    if(!roles || roles.length===0 ){
    dispatch(fetch());
    }
  }, [dispatch]);

  // Add or update role
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    

    try {
      if (editId) {
        await dispatch(updaterole({ roleId: editId, updatedData: { name } })).unwrap();
      } else {
        await dispatch(save({ name })).unwrap();
      }

      setName("");
      setEditId(null);
      setIsModalOpen(false);
      setSuccess("Role saved successfully");
      // no explicit refetch needed because slice updates state
    } catch (err) {
      setErrors("Failed to save role");
    } finally {
      setSubmitting(false);
    }
  };

  // Delete role
  const handleDelete = async (id) => {
    if (!id) {
      setErrors("Cannot delete role: Invalid ID");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this role?")) {
      return;
    }

    setSuccess(null);
    setErrors(null);
    try {
      await dispatch(deletedata(id)).unwrap();
      setSuccess("Role deleted successfully");
    } catch (err) {
      console.error("Delete error:", err);
      setErrors(err?.message || "Failed to delete role");
    }
  };

  // Edit role
  const handleEdit = (role) => {
    setName(role.name);
    setEditId(role._id);
    setIsModalOpen(true);
  };

  // Open modal for adding new role
  const handleAddNew = () => {
    setName("");
    setEditId(null);
    setErrors(null);
    setSuccess(null);
    setIsModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setName("");
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
            <h1 className="text-sm font-bold text-gray-900">Role Management</h1>
            <p className="text-gray-600  text-sm mt-1">Manage system roles and permissions</p>
          </div>
          <button
            onClick={handleAddNew}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add New Role
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

      {/* Roles Table */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">All Roles</h2>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            <span className="ml-2 text-gray-600">Loading roles...</span>
          </div>
        ) : roles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No roles found. Create your first role to get started.</p>
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
                    Role Name
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
                {(Array.isArray(roles) ? roles : []).filter(Boolean).map((role, index) => (
                  <tr key={role?._id ?? index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{role?.name ?? "Unnamed Role"}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {role?.createdAt ? new Date(role.createdAt).toLocaleDateString() : "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleEdit(role)}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md flex items-center gap-1 text-sm transition-colors"
                          disabled={loading}
                        >
                          <Edit2 className="h-3 w-3" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(role?._id)}
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
                  {editId ? "Edit Role" : "Add New Role"}
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
                <label htmlFor="roleName" className="block text-sm font-medium text-gray-700 mb-2">
                  Role Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="roleName"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter role name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                  {editId ? "Update Role" : "Create Role"}
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

export default Role;