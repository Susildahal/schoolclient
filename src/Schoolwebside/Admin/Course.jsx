import React, { useState } from 'react';
import { Plus, Trash2, Edit2, X, Save, Loader } from 'lucide-react';

const AcademicProgramsCRUD = () => {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    programName: '',
    description: '',
    details: '',
    subjects: []
  });
  const [newSubject, setNewSubject] = useState('');

  const [programs, setPrograms] = useState([
    {
      id: 1,
      programName: 'Bachelor of Science in Computer Science',
      description: 'Learn programming, web development, and software engineering',
      details: '4 years, Full-time',
      subjects: ['C++', 'Java', 'Python', 'Web Development', 'Database Management']
    },
    {
      id: 2,
      programName: 'Bachelor of Arts in English',
      description: 'Study literature, writing, and communication skills',
      details: '4 years, Full-time',
      subjects: ['English Literature', 'Creative Writing', 'Grammar', 'Communication']
    }
  ]);

  const resetForm = () => {
    setFormData({
      programName: '',
      description: '',
      details: '',
      subjects: []
    });
    setNewSubject('');
    setEditingId(null);
  };

  const handleOpenModal = (program = null) => {
    if (program) {
      setFormData(program);
      setEditingId(program.id);
    } else {
      resetForm();
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    resetForm();
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddSubject = () => {
    if (newSubject.trim()) {
      setFormData(prev => ({
        ...prev,
        subjects: [...prev.subjects, newSubject]
      }));
      setNewSubject('');
    }
  };

  const handleRemoveSubject = (index) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async () => {
    if (!formData.programName || !formData.description || !formData.details || formData.subjects.length === 0) {
      alert('Please fill all fields and add at least one subject');
      return;
    }

    setLoading(true);
    
    try {
      if (editingId) {
        // Update
        setPrograms(programs.map(p => p.id === editingId ? { ...formData, id: editingId } : p));
      } else {
        // Create
        const newProgram = {
          ...formData,
          id: Date.now()
        };
        setPrograms([...programs, newProgram]);
      }
      handleCloseModal();
    } catch (error) {
      console.error('Error saving:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this program?')) {
      setPrograms(programs.filter(p => p.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Academic Programs</h1>
              <p className="text-gray-600">Manage your school's courses and curriculum</p>
            </div>
            <button
              onClick={() => handleOpenModal()}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-sm"
            >
              <Plus size={20} />
              Add Program
            </button>
          </div>
        </div>

        {/* Programs Grid/Cards */}
        {programs.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center shadow-sm">
            <div className="max-w-sm mx-auto">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus size={32} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No programs yet</h3>
              <p className="text-gray-500 mb-6">Get started by adding your first academic program</p>
              <button
                onClick={() => handleOpenModal()}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                <Plus size={18} />
                Add Your First Program
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((program) => (
              <div
                key={program.id}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 group"
              >
                {/* Card Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {program.programName}
                    </h3>
                    <p className="text-sm text-gray-500">{program.details}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {program.description}
                </p>

                {/* Subjects Tags */}
                <div className="mb-5">
                  <div className="flex flex-wrap gap-2">
                    {program.subjects.slice(0, 3).map((subject, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium"
                      >
                        {subject}
                      </span>
                    ))}
                    {program.subjects.length > 3 && (
                      <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                        +{program.subjects.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => handleOpenModal(program)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                  >
                    <Edit2 size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(program.id)}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-sm font-medium transition-colors"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Program Count */}
        {programs.length > 0 && (
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Showing {programs.length} {programs.length === 1 ? 'program' : 'programs'}
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {editingId ? 'Edit Program' : 'Add New Program'}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {editingId ? 'Update program information' : 'Fill in the details below'}
                </p>
              </div>
              <button
                onClick={handleCloseModal}
                className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-600" />
              </button>
            </div>

            {/* Form */}
            <div className="p-6 space-y-5 overflow-y-auto max-h-[calc(90vh-140px)]">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Program Name *
                </label>
                <input
                  type="text"
                  value={formData.programName}
                  onChange={(e) => handleInputChange('programName', e.target.value)}
                  placeholder="e.g., Bachelor of Science in Computer Science"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Brief description of the program..."
                  rows="3"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Program Details *
                </label>
                <input
                  type="text"
                  value={formData.details}
                  onChange={(e) => handleInputChange('details', e.target.value)}
                  placeholder="e.g., 4 years, Full-time"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Subjects *
                </label>
                
                {/* Subject List */}
                {formData.subjects.length > 0 && (
                  <div className="space-y-2 mb-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    {formData.subjects.map((subject, index) => (
                      <div
                        key={index}
                        className="flex gap-3 items-center bg-white p-3 rounded-lg border border-gray-200"
                      >
                        <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                          {index + 1}
                        </div>
                        <span className="flex-1 text-gray-900 font-medium">{subject}</span>
                        <button
                          onClick={() => handleRemoveSubject(index)}
                          className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                          title="Remove subject"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add Subject Form */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddSubject();
                      }
                    }}
                    placeholder="Enter subject name (e.g., Mathematics)"
                    className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleAddSubject}
                    disabled={!newSubject.trim()}
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-medium flex items-center gap-2 transition-colors"
                  >
                    <Plus size={18} />
                    Add
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Press Enter or click Add to include a subject
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="flex gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
              <button
                onClick={handleCloseModal}
                className="flex-1 px-5 py-2.5 border-2 border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
              >
                {loading ? (
                  <>
                    <Loader size={18} className="animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    {editingId ? 'Update Program' : 'Create Program'}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AcademicProgramsCRUD;