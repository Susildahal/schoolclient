import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Plus, Edit, Trash2, X, User, Mail, Phone, BookOpen, FileText, Camera, Hash, List, Grid } from 'lucide-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Pagination from '../common/Pagination';
import { 
  fetchTeachers, 
  addTeacher, 
  updateTeacher, 
  deleteTeacher, 
  clearError,
  setPage,
  selectAllTeachers,
  selectTeachersLoading,
  selectTeachersError,
  selectPagination
} from '../redux/slicer/teacherSlice';

// Validation Schema
const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  phone: Yup.string().required('Phone number is required'),
  subject: Yup.string().required('Subject is required'),
  description: Yup.string().max(500, 'Description must be less than 500 characters').required('Description is required'),
  photo: Yup.mixed().required('Photo is required'),
  order: Yup.number().required('Display order is required').typeError('Order must be a number')
});

// Dialog Component
const Dialog = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

// Teacher Form Component
const TeacherForm = ({ teacher, onSubmit, onClose, isEdit, existingOrders }) => {
  const [imagePreview, setImagePreview] = useState(teacher?.photo || null);

  const formik = useFormik({
    initialValues: {
      name: teacher?.name || '',
      email: teacher?.email || '',
      phone: teacher?.phone || '',
      subject: teacher?.subject || '',
      description: teacher?.description || '',
      photo: teacher?.photo || null,
      order: teacher?.order?.toString() || ''
    },
    validationSchema,
    onSubmit: (values) => {
      const formattedValues = {
        ...values,
        order: parseInt(values.order)
      };
      onSubmit(formattedValues);
    }
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      formik.setFieldValue('photo', file);
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const getAvailableOrders = () => {
    const maxOrder = Math.max(...existingOrders, 0);
    const orders = [];
    
    if (isEdit) {
      orders.push(teacher.order);
    }
    
    for (let i = 1; i <= maxOrder + 5; i++) {
      if (!existingOrders.includes(i) || (isEdit && i === teacher.order)) {
        orders.push(i);
      }
    }
    
    return orders.sort((a, b) => a - b);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {isEdit ? 'Edit Teacher' : 'Add New Teacher'}
        </h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Display Order */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Hash className="inline w-4 h-4 mr-1" />
            Display Order
          </label>
          <select
            name="order"
            value={formik.values.order}
            onChange={formik.handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          >
            <option value="">Select display order</option>
            {getAvailableOrders().map(order => (
              <option key={order} value={order}>
                Position {order}
              </option>
            ))}
          </select>
          {formik.errors.order && <p className="text-red-500 text-xs mt-1">{formik.errors.order}</p>}
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <User className="inline w-4 h-4 mr-1" />
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            placeholder="Enter full name"
          />
          {formik.errors.name && <p className="text-red-500 text-xs mt-1">{formik.errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Mail className="inline w-4 h-4 mr-1" />
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            placeholder="Enter email address"
          />
          {formik.errors.email && <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Phone className="inline w-4 h-4 mr-1" />
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            placeholder="Enter phone number"
          />
          {formik.errors.phone && <p className="text-red-500 text-xs mt-1">{formik.errors.phone}</p>}
        </div>

        {/* Subject */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <BookOpen className="inline w-4 h-4 mr-1" />
            Subject
          </label>
          <input
            type="text"
            name="subject"
            value={formik.values.subject}
            onChange={formik.handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            placeholder="Enter teaching subject"
          />
          {formik.errors.subject && <p className="text-red-500 text-xs mt-1">{formik.errors.subject}</p>}
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <FileText className="inline w-4 h-4 mr-1" />
            Description
          </label>
          <textarea
            name="description"
            rows="4"
            value={formik.values.description}
            onChange={formik.handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
            placeholder="Enter teacher description (max 500 characters)"
          />
          <div className="flex justify-between items-center mt-1">
            {formik.errors.description && <p className="text-red-500 text-xs">{formik.errors.description}</p>}
            <p className="text-xs text-gray-500 ml-auto">
              {formik.values.description.length}/500 characters
            </p>
          </div>
        </div>

        {/* Photo Upload */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Camera className="inline w-4 h-4 mr-1" />
            Profile Photo
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
          />
          {formik.errors.photo && <p className="text-red-500 text-xs mt-1">{formik.errors.photo}</p>}
          
          {imagePreview && (
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Photo Preview:</p>
              <div className="w-32 h-32 rounded-lg overflow-hidden border border-gray-300">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-3 mt-8">
        <button
          onClick={onClose}
          className="flex-1 px-6 py-3 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={formik.handleSubmit}
          className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
        >
          {isEdit ? 'Update Teacher' : 'Add Teacher'}
        </button>
      </div>
    </div>
  );
};

// Teacher Card Component
const TeacherCard = ({ teacher, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100">
      <div className="flex items-start gap-4 mb-4">
        <div className="flex-shrink-0">
          <div className="relative">
            {teacher.photo ? (
              <img
                src={teacher.photo}
                alt={teacher.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
              />
            ) : (
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-xl">
                {teacher.name ? teacher.name.charAt(0) : '?'}
              </div>
            )}
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
              {teacher.order}
            </div>
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-800 text-lg mb-1">{teacher.name}</h3>
          <p className="text-blue-600 text-sm font-medium mb-2">{teacher.subject}</p>
          
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <Mail className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{teacher.email}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <Phone className="w-4 h-4 flex-shrink-0" />
              <span>{teacher.phone}</span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(teacher)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Edit Teacher"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(teacher.id || teacher._id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete Teacher"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {teacher.description && (
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
          {teacher.description}
        </p>
      )}
    </div>
  );
};

// Main App Component
const TeacherManagement = () => {
  const dispatch = useDispatch();
  const teachers = useSelector(selectAllTeachers);
  const loading = useSelector(selectTeachersLoading);
  const error = useSelector(selectTeachersError);
  const pagination = useSelector(selectPagination);
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'card'

  useEffect(() => {
    // Fetch teachers with pagination params
    dispatch(fetchTeachers({ 
      page: pagination.currentPage, 
      limit: pagination.itemsPerPage 
    }));
  }, [dispatch, pagination.currentPage, pagination.itemsPerPage]);

  const handleAddTeacher = () => {
    setEditingTeacher(null);
    setIsDialogOpen(true);
  };

  const handleEditTeacher = (teacher) => {
    setEditingTeacher(teacher);
    setIsDialogOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editingTeacher) {
        await dispatch(updateTeacher({
          id: editingTeacher.id || editingTeacher._id,
          data: formData
        })).unwrap();
      } else {
        await dispatch(addTeacher(formData)).unwrap();
      }
      setIsDialogOpen(false);
      
      // Refresh the list after an add or update
      dispatch(fetchTeachers({ 
        page: pagination.currentPage, 
        limit: pagination.itemsPerPage 
      }));
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const handleDeleteTeacher = async (id) => {
    if (window.confirm('Are you sure you want to delete this teacher?')) {
      try {
        // Make sure we have a valid ID before dispatching
        if (!id) {
          console.error('Delete error: Invalid teacher ID');
          return;
        }
        
        await dispatch(deleteTeacher(id)).unwrap();
        
        // If we deleted the last item on a page, go to previous page
        if (teachers.length === 1 && pagination.currentPage > 1) {
          dispatch(setPage(pagination.currentPage - 1));
        } else {
          // Otherwise refresh the current page
          dispatch(fetchTeachers({ 
            page: pagination.currentPage, 
            limit: pagination.itemsPerPage 
          }));
        }
      } catch (error) {
        console.error('Delete error:', error);
      }
    }
  };

  const handlePageChange = (page) => {
    dispatch(setPage(page));
  };

  const getExistingOrders = () => {
    return teachers.map(teacher => teacher.order);
  };

  if (loading && teachers.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading teachers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Teacher Management</h1>
            <p className="text-gray-600 mt-1">
              Manage your teaching staff {pagination.totalItems}( teacher{pagination.totalItems !== 1 ? 's' : ''})
            </p>
            {loading && (
              <div className="flex items-center gap-2 mt-2">
                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm text-blue-600">Syncing...</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-gray-100 rounded-lg p-1 flex">
              <button
                onClick={() => setViewMode('table')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'table' ? 'bg-white shadow text-blue-600' : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                <List className="w-4 h-4" />
                Table
              </button>
              <button
                onClick={() => setViewMode('card')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'card' ? 'bg-white shadow text-blue-600' : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Grid className="w-4 h-4" />
                Cards
              </button>
            </div>
            <button
              onClick={handleAddTeacher}
              disabled={loading}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Plus className="w-5 h-5" />
              Add Teacher
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6 flex items-center justify-between">
            <span>Error: {error}</span>
            <button
              onClick={() => dispatch(clearError())}
              className="text-red-600 hover:text-red-800 font-medium"
            >
              Dismiss
            </button>
          </div>
        )}

        {teachers.length === 0 && !loading ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Teachers Added</h3>
            <p className="text-gray-500 mb-6">Get started by adding your first teacher</p>
            <button
              onClick={handleAddTeacher}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Add First Teacher
            </button>
          </div>
        ) : (
          <>
            {viewMode === 'table' ? (
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Order
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Teacher
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Subject
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Contact
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Description
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {[...teachers]
                        .sort((a, b) => a.order - b.order)
                        .map(teacher => (
                          <tr key={teacher.id || teacher._id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-medium">
                                {teacher.order}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                  {teacher.photo ? (
                                    <img className="h-10 w-10 rounded-full object-cover" src={teacher.photo} alt={teacher.name} />
                                  ) : (
                                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium">
                                      {teacher.name ? teacher.name.charAt(0) : '?'}
                                    </div>
                                  )}
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{teacher.name}</div>
                                  <div className="text-sm text-gray-500">{teacher.email}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-blue-600 font-medium">{teacher.subject}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{teacher.phone}</div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm text-gray-500 line-clamp-2 max-w-xs">
                                {teacher.description}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button
                                onClick={() => handleEditTeacher(teacher)}
                                className="text-blue-600 hover:text-blue-900 mr-3"
                              >
                                <Edit className="w-4 h-4 inline" /> Edit
                              </button>
                              <button
                                onClick={() => handleDeleteTeacher(teacher.id || teacher._id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                <Trash2 className="w-4 h-4 inline" /> Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...teachers]
                  .sort((a, b) => a.order - b.order)
                  .map(teacher => (
                    <TeacherCard
                      key={teacher.id || teacher._id}
                      teacher={teacher}
                      onEdit={handleEditTeacher}
                      onDelete={handleDeleteTeacher}
                    />
                  ))}
              </div>
            )}
            
            {/* Pagination component */}
            <div className="mt-6">
              <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
                totalItems={pagination.totalItems}
                itemsPerPage={pagination.itemsPerPage}
              />
            </div>
          </>
        )}

        <Dialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
          <TeacherForm
            teacher={editingTeacher}
            onSubmit={handleFormSubmit}
            onClose={() => setIsDialogOpen(false)}
            isEdit={!!editingTeacher}
            existingOrders={getExistingOrders()}
          />
        </Dialog>
      </div>
    </div>
  );
};

export default TeacherManagement;
