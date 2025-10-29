import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Save, Loader, Plus, Trash2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { fetchMVV, saveMVV, clearSuccess } from '../redux/slicer/missionVisionValues';

const MVVForm = () => {
  const dispatch = useDispatch();
  const { data, loading, success, error } = useSelector((state) => state.mvv);
  const [activeTab, setActiveTab] = useState('vision');
  const [formData, setFormData] = useState({
    vision: {
      title: 'Our Vision',
      description: 'To be a leading educational institution that nurtures future leaders through innovative teaching, character development, and technical excellence.',
      points: ['Nurture future leaders', 'Innovative teaching methods', 'Technical excellence']
    },
    mission: {
      title: 'Our Mission',
      description: 'To provide quality education that integrates academic excellence with practical skills, preparing students for successful careers.',
      points: ['Quality education delivery', 'Academic excellence', 'Practical skills training']
    },
    values: {
      title: 'Our Values',
      description: 'Integrity, Excellence, Innovation, and Inclusivity form the foundation of our educational philosophy and culture.',
      points: ['Unwavering integrity', 'Pursuit of excellence', 'Innovation in learning', 'Inclusive environment']
    }
  });

  const [newPoint, setNewPoint] = useState('');

  // Character limits
  const TITLE_LIMIT = 100;
  const DESCRIPTION_LIMIT = 500;
  const POINT_LIMIT = 100;

  // Count words in a string
  const countWords = (text) => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  // Fetch data from Firebase on component mount
  useEffect(() => {
    dispatch(fetchMVV());
  }, [dispatch]);

  // Update form when Redux data changes
  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

  // Auto-dismiss success message after 5 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        dispatch(clearSuccess());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success, dispatch]);

  const handleInputChange = (field, value) => {
    // Apply character limits
    if (field === 'title' && value.length > TITLE_LIMIT) {
      return;
    }
    if (field === 'description' && value.length > DESCRIPTION_LIMIT) {
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        [field]: value
      }
    }));
  };

  const handleAddPoint = () => {
    const trimmedPoint = newPoint.trim();
    if (trimmedPoint && trimmedPoint.length <= POINT_LIMIT) {
      setFormData(prev => {
        // Ensure points array exists
        const currentPoints = Array.isArray(prev[activeTab]?.points) 
          ? prev[activeTab].points 
          : [];
        
        return {
          ...prev,
          [activeTab]: {
            ...prev[activeTab],
            points: [...currentPoints, trimmedPoint]
          }
        };
      });
      setNewPoint('');
    }
  };

  const handleRemovePoint = (index) => {
    setFormData(prev => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        points: prev[activeTab].points.filter((_, i) => i !== index)
      }
    }));
  };

  const handlePointChange = (index, value) => {
    // Apply character limit for points
    if (value.length > POINT_LIMIT) {
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        points: prev[activeTab].points.map((point, i) => i === index ? value : point)
      }
    }));
  };

  const handleSubmit = async () => {
    try {
      await dispatch(saveMVV(formData)).unwrap();
      console.log('Data saved successfully to Firebase');
    } catch (err) {
      console.error('Error saving data:', err);
    }
  };

  const current = formData[activeTab];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Mission, Vision & Values</h1>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-200">
          {['vision', 'mission', 'values'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium text-sm transition-colors ${
                activeTab === tab
                  ? 'border-b-2 border-gray-900 text-gray-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
          {/* Success Message */}
          {success && (
            <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
              <span className="text-green-800">Data saved successfully!</span>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <span className="text-red-800">{error}</span>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Title
            </label>
            <input
              type="text"
              value={current.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              maxLength={TITLE_LIMIT}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-900"
            />
            <div className="flex justify-between mt-1">
              <span className="text-xs text-gray-500">
                Character limit: {TITLE_LIMIT}
              </span>
              <span className={`text-xs ${current.title.length > TITLE_LIMIT * 0.9 ? 'text-orange-500' : 'text-gray-500'}`}>
                {current.title.length}/{TITLE_LIMIT}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Description
            </label>
            <textarea
              value={current.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              maxLength={DESCRIPTION_LIMIT}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-900 resize-none"
            />
            <div className="flex justify-between mt-1">
              <span className="text-xs text-gray-500">
                Character limit: {DESCRIPTION_LIMIT}
              </span>
              <span className={`text-xs ${current.description.length > DESCRIPTION_LIMIT * 0.9 ? 'text-orange-500' : 'text-gray-500'}`}>
                {current.description.length}/{DESCRIPTION_LIMIT}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-3">
              Key Points
            </label>
            <div className="space-y-2 mb-3">
              {current.points && current.points.length > 0 ? (
                current.points.map((point, index) => (
                  <div key={index} className="flex gap-2 items-start">
                    <input
                      type="text"
                      value={point}
                      onChange={(e) => handlePointChange(index, e.target.value)}
                      maxLength={POINT_LIMIT}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-900"
                    />
                    <button
                      onClick={() => handleRemovePoint(index)}
                      className="p-2 hover:bg-red-50 text-red-600 rounded transition-colors mt-0.5"
                      title="Remove point"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 italic">No points added yet. Add your first point below.</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newPoint}
                  onChange={(e) => setNewPoint(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddPoint();
                    }
                  }}
                  maxLength={POINT_LIMIT}
                  placeholder="Add new point..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-900"
                />
                <button
                  onClick={handleAddPoint}
                  disabled={!newPoint.trim() || newPoint.length > POINT_LIMIT}
                  className="px-3 py-2 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg text-sm flex items-center gap-1 transition-colors"
                >
                  <Plus size={16} />
                  Add
                </button>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">
                  Character limit per point: {POINT_LIMIT}
                </span>
                <span className={`text-xs ${newPoint.length > POINT_LIMIT * 0.9 ? 'text-orange-500' : 'text-gray-500'}`}>
                  {newPoint.length}/{POINT_LIMIT}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full mt-6 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-400 text-white font-medium py-2 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm"
        >
          {loading ? (
            <>
              <Loader size={16} className="animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save size={16} />
              Submit Changes
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default MVVForm;