import React, { useState, useEffect } from 'react';
import { User, Lock, Eye, EyeOff, Save, Edit } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { getdata, updatedata } from '../redux/slicer/mee';

const AdminProfile = () => {
  const dispatch = useDispatch();
  const { data = {}, loading = false, error } = useSelector(state => state.mee || {});

  const [activeTab, setActiveTab] = useState('profile');
  const [showPasswords, setShowPasswords] = useState({ current: false, new: false, confirm: false });
  const [isUpdating, setIsUpdating] = useState(false);
  const [success, setSuccess] = useState('');
  const [errors, setErrors] = useState({});

  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    role: ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    // fetch admin data if not already loaded
    if (!loading && !data?.name) {
      dispatch(getdata());
    }
  }, [dispatch, loading, data]);

  useEffect(() => {
    // populate profile form once data is loaded
    if (data?.name) {
      setProfileData({
        name: data.name || '',
        email: data.email || data.id || '', // Handle both email and id fields
        role: data.role || 'Admin'
      });
    }
  }, [data]);

  const handleProfileChange = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handlePasswordChange = (field, value) => {
    setPasswordData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const validateProfile = () => {
    const newErrors = {};
    if (!profileData.name || !profileData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!profileData.email || !profileData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profileData.email)) {
      newErrors.email = 'Invalid email format';
    }
    return newErrors;
  };

  const validatePassword = () => {
    const newErrors = {};
    if (!passwordData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }
    if (!passwordData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (passwordData.newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters';
    }
    if (!passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your new password';
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (passwordData.currentPassword && passwordData.currentPassword === passwordData.newPassword) {
      newErrors.newPassword = 'New password must be different from current password';
    }
    return newErrors;
  };

  const handleProfileSubmit = async () => {
    const newErrors = validateProfile();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsUpdating(true);
    setErrors({});
    
    try {
      const payload = {
        name: profileData.name.trim(),
        email: profileData.email.trim(),
        role: profileData.role
        // Don't send password fields for profile-only updates
      };
      
      console.log('Sending payload:', payload);
      
      const result = await dispatch(updatedata(payload)).unwrap();
      setSuccess('Profile updated successfully!');
      
      // Refresh data after successful update
      dispatch(getdata());
      setTimeout(() => setSuccess(''), 3000);
      
    } catch (err) {
      console.error('Update error:', err);
      setErrors({ general: err?.msg || 'Failed to update profile. Please try again.' });
    } finally {
      setIsUpdating(false);
    }
  };

  const handlePasswordSubmit = async () => {
    const newErrors = validatePassword();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsUpdating(true);
    setErrors({});
    
    try {
      const payload = {
        name: profileData.name.trim(),
        email: profileData.email.trim(),
        role: profileData.role,
        oldpass: passwordData.currentPassword,
        newpass: passwordData.newPassword
      };
      
      console.log('Sending password update payload:', payload);
      
      const result = await dispatch(updatedata(payload)).unwrap();
      setSuccess('Password updated successfully!');
      
      // Clear password form
      setPasswordData({ 
        currentPassword: '', 
        newPassword: '', 
        confirmPassword: '' 
      });
      
      setTimeout(() => setSuccess(''), 3000);
      
    } catch (err) {
      console.error('Password update error:', err);
      setErrors({ general: err?.msg || 'Failed to update password. Please try again.' });
    } finally {
      setIsUpdating(false);
    }
  };

  // Clear success message when switching tabs
  useEffect(() => {
    setSuccess('');
    setErrors({});
  }, [activeTab]);

  return (
    <div className="  pt-1">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-3">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-2 shadow-lg">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile Settings</h1>
          <p className="text-gray-600">Manage your account and security settings</p>
        </div>

        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-center">
            {success}
          </div>
        )}

        {errors.general && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-center">
            {errors.general}
          </div>
        )}

        {loading && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-700 text-center">
            Loading profile data...
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${
                activeTab === 'profile'
                  ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Edit className="w-4 h-4" /> Profile
              </div>
            </button>
            <button
              onClick={() => setActiveTab('password')}
              className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${
                activeTab === 'password'
                  ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Lock className="w-4 h-4" /> Password
              </div>
            </button>
          </div>

          <div className="p-8">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={e => handleProfileChange('name', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={e => handleProfileChange('email', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your email address"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role
                  </label>
                  <input
                    type="text"
                    value={profileData.role}
                    disabled
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                  />
                  <p className="text-xs text-gray-500 mt-1">Role cannot be changed</p>
                </div>

                <button
                  type="button"
                  onClick={handleProfileSubmit}
                  disabled={isUpdating}
                  className={`w-full py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors ${
                    isUpdating 
                      ? 'bg-gray-400 cursor-not-allowed text-white' 
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  <Save className="w-4 h-4" />
                  {isUpdating ? 'Updating...' : 'Update Profile'}
                </button>
              </div>
            )}

            {activeTab === 'password' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.current ? 'text' : 'password'}
                      value={passwordData.currentPassword}
                      onChange={e => handlePasswordChange('currentPassword', e.target.value)}
                      className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                        errors.currentPassword ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter current password"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('current')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPasswords.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.currentPassword && (
                    <p className="text-red-500 text-sm mt-1">{errors.currentPassword}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.new ? 'text' : 'password'}
                      value={passwordData.newPassword}
                      onChange={e => handlePasswordChange('newPassword', e.target.value)}
                      className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                        errors.newPassword ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter new password"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('new')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.newPassword && (
                    <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.confirm ? 'text' : 'password'}
                      value={passwordData.confirmPassword}
                      onChange={e => handlePasswordChange('confirmPassword', e.target.value)}
                      className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                        errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Confirm new password"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('confirm')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handlePasswordSubmit}
                  disabled={isUpdating}
                  className={`w-full py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors ${
                    isUpdating 
                      ? 'bg-gray-400 cursor-not-allowed text-white' 
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  <Lock className="w-4 h-4" />
                  {isUpdating ? 'Updating...' : 'Change Password'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;