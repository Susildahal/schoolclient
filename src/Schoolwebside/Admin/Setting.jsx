import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  AlertCircle, 
  CheckCircle2, 
  Trash2, 
  Plus,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  Globe,
  MessageCircle,
  Send,
  Phone
} from 'lucide-react';
import { fetchSchoolSettings, saveSchoolSettings, clearSuccess } from '../redux/slicer/setting';

export default function SchoolSettings() {
  const dispatch = useDispatch();
  const { data, loading, success, error, isEditing } = useSelector((state) => state.setting);
  const [initialLoad, setInitialLoad] = useState(true);

  // Social media platform options with icons
  const socialPlatforms = [
    { name: 'Facebook', icon: Facebook, color: 'text-blue-600' },
    { name: 'Twitter', icon: Twitter, color: 'text-sky-500' },
    { name: 'Instagram', icon: Instagram, color: 'text-pink-600' },
    { name: 'LinkedIn', icon: Linkedin, color: 'text-blue-700' },
    { name: 'YouTube', icon: Youtube, color: 'text-red-600' },
    { name: 'WhatsApp', icon: MessageCircle, color: 'text-green-600' },
    { name: 'Telegram', icon: Send, color: 'text-blue-500' },
    { name: 'Email', icon: Mail, color: 'text-gray-600' },
    { name: 'Website', icon: Globe, color: 'text-indigo-600' },
    { name: 'Phone', icon: Phone, color: 'text-gray-700' },
  ];

  const defaultForm = {
    schoolName: '',
    schoolDescription: '',
    phoneNumber: '',
    email: '',
    address: '',
    principalName: '',
    establishedYear: '',
    studentCount: '',
    teacherCount: '',
    socialMedia: [{ name: '', url: '', icon: '' }],
  };

  const [formData, setFormData] = useState(defaultForm);

  // Get icon component for a platform name
  const getIconForPlatform = (platformName) => {
    const platform = socialPlatforms.find(p => p.name === platformName);
    return platform || { icon: Globe, color: 'text-gray-500' };
  };

  // Fetch school settings from Firebase on component mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        if (!data || data.length === 0) {
          await dispatch(fetchSchoolSettings()).unwrap();
        }
      } catch (err) {
        console.error('Error fetching settings:', err);
      } finally {
        setInitialLoad(false);
      }
    };

    loadSettings();
  }, [dispatch]);

  // Update form when Redux data changes
  useEffect(() => {
    if (data) {
      const socialArray = data.socialMedia
        ? Object.entries(data.socialMedia).map(([name, value]) => {
            // Handle both old format (string) and new format (object with url and icon)
            if (typeof value === 'string') {
              return { name, url: value, icon: '' };
            } else {
              return { 
                name, 
                url: value.url || '', 
                icon: value.icon || '' 
              };
            }
          })
        : [{ name: '', url: '', icon: '' }];

      setFormData({
        schoolName: data.schoolName || '',
        schoolDescription: data.schoolDescription || '',
        phoneNumber: data.phoneNumber || '',
        email: data.email || '',
        address: data.address || '',
        principalName: data.principalName || '',
        establishedYear: data.establishedYear || '',
        studentCount: data.studentCount || '',
        teacherCount: data.teacherCount || '',
        socialMedia: socialArray.length ? socialArray : [{ name: '', url: '', icon: '' }],
      });
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSocialMediaChange = (index, field, value) => {
    const newSocialMedia = [...formData.socialMedia];
    newSocialMedia[index][field] = value;
    
    // If platform name is changed, also update the icon name
    if (field === 'name') {
      // Store the platform name as the icon identifier
      newSocialMedia[index].icon = value;
    }
    
    setFormData(prev => ({
      ...prev,
      socialMedia: newSocialMedia
    }));
  };

  const addSocialMedia = () => {
    setFormData(prev => ({
      ...prev,
      socialMedia: [...prev.socialMedia, { name: '', url: '', icon: '' }]
    }));
  };

  const removeSocialMedia = (index) => {
    setFormData(prev => ({
      ...prev,
      socialMedia: prev.socialMedia.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Convert social media array to key-value pairs (object)
      const socialMediaObj = {};
      formData.socialMedia.forEach(item => {
        if (item.name && item.url) {
          socialMediaObj[item.name] = {
            url: item.url,
            icon: item.icon || ''
          };
        }
      });

      const settingsObj = {
        schoolName: formData.schoolName,
        schoolDescription: formData.schoolDescription,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        address: formData.address,
        principalName: formData.principalName,
        establishedYear: formData.establishedYear,
        studentCount: formData.studentCount,
        teacherCount: formData.teacherCount,
        socialMedia: socialMediaObj,
      };

      // Dispatch Redux action to save to Firebase
      await dispatch(saveSchoolSettings(settingsObj)).unwrap();
      
      console.log('Settings saved successfully to Firebase');
    } catch (err) {
      console.error('Error saving settings:', err);
    }
  };

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Card */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200">
          {/* Card Header */}
          <div className="border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">School Settings</h2>
                <p className="text-gray-600 text-sm mt-1">
                  {isEditing ? 'Edit your school information and social media links' : 'Create your school information and social media links'}
                </p>
              </div>
            </div>
          </div>

          {/* Card Content */}
          <div className="px-6 py-6">
            {initialLoad && loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <p className="mt-4 text-gray-600">Loading settings...</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Success Message */}
                {success && (
                  <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-green-800">Settings saved successfully!</span>
                  </div>
                )}

                {/* Error Message */}
                {error && (
                  <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                    <span className="text-red-800">{error}</span>
                  </div>
                )}

                {/* Basic Information Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* School Name */}
                    <div>
                      <label htmlFor="schoolName" className="block text-sm font-medium text-gray-700 mb-2">
                        School Name *
                      </label>
                      <input
                        id="schoolName"
                        name="schoolName"
                        type="text"
                        value={formData.schoolName}
                        onChange={handleChange}
                        placeholder="Enter your school name"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {/* School Description */}
                    <div>
                      <label htmlFor="schoolDescription" className="block text-sm font-medium text-gray-700 mb-2">
                        School Description
                      </label>
                      <input
                        id="schoolDescription"
                        name="schoolDescription"
                        type="text"
                        value={formData.schoolDescription}
                        onChange={handleChange}
                        placeholder="Brief description of your school"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="contact@school.edu"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        id="phoneNumber"
                        name="phoneNumber"
                        type="tel"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {/* Address */}
                    <div className="lg:col-span-2">
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                        Address
                      </label>
                      <input
                        id="address"
                        name="address"
                        type="text"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="School address"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* School Details Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">School Details</h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Principal Name */}
                    <div>
                      <label htmlFor="principalName" className="block text-sm font-medium text-gray-700 mb-2">
                        Principal Name
                      </label>
                      <input
                        id="principalName"
                        name="principalName"
                        type="text"
                        value={formData.principalName}
                        onChange={handleChange}
                        placeholder="Enter principal's name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {/* Established Year */}
                    <div>
                      <label htmlFor="establishedYear" className="block text-sm font-medium text-gray-700 mb-2">
                        Established Year
                      </label>
                      <input
                        id="establishedYear"
                        name="establishedYear"
                        type="text"
                        value={formData.establishedYear}
                        onChange={handleChange}
                        placeholder="e.g., 2000"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {/* Student Count */}
                    <div>
                      <label htmlFor="studentCount" className="block text-sm font-medium text-gray-700 mb-2">
                        Total Students
                      </label>
                      <input
                        id="studentCount"
                        name="studentCount"
                        type="number"
                        value={formData.studentCount}
                        onChange={handleChange}
                        placeholder="e.g., 500"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {/* Teacher Count */}
                    <div>
                      <label htmlFor="teacherCount" className="block text-sm font-medium text-gray-700 mb-2">
                        Total Teachers
                      </label>
                      <input
                        id="teacherCount"
                        name="teacherCount"
                        type="number"
                        value={formData.teacherCount}
                        onChange={handleChange}
                        placeholder="e.g., 50"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Social Media Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Social Media</h3>
                    <button
                      type="button"
                      onClick={addSocialMedia}
                      className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Add Social Media
                    </button>
                  </div>

                  <div className="space-y-3">
                    {formData.socialMedia.map((social, index) => {
                      const { icon: IconComponent, color } = getIconForPlatform(social.name);
                      
                      return (
                        <div key={index} className="grid grid-cols-1 lg:grid-cols-2 gap-3 items-end">
                          <div>
                            <label htmlFor={`social-name-${index}`} className="block text-sm font-medium text-gray-700 mb-2">
                              Platform Name
                            </label>
                            <div className="relative">
                              <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                <IconComponent className={`w-5 h-5 ${color}`} />
                              </div>
                              <select
                                id={`social-name-${index}`}
                                value={social.name}
                                onChange={(e) => handleSocialMediaChange(index, 'name', e.target.value)}
                                className="w-full pl-11 pr-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
                              >
                                <option value="">Select Platform</option>
                                {socialPlatforms.map((platform) => (
                                  <option key={platform.name} value={platform.name}>
                                    {platform.name}
                                  </option>
                                ))}
                              </select>
                              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                              </div>
                            </div>
                          </div>

                          <div className="relative">
                            <label htmlFor={`social-url-${index}`} className="block text-sm font-medium text-gray-700 mb-2">
                              URL
                            </label>
                            <div className="flex gap-2">
                              <input
                                id={`social-url-${index}`}
                                type="url"
                                value={social.url}
                                onChange={(e) => handleSocialMediaChange(index, 'url', e.target.value)}
                                placeholder={`https://${social.name ? social.name.toLowerCase() : 'example'}.com/profile`}
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                              {formData.socialMedia.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => removeSocialMedia(index)}
                                  className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg transition-colors"
                >
                  {loading ? 'Saving...' : (isEditing ? 'Update Settings' : 'Save Settings')}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}