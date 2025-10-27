import React, { useState, useEffect } from 'react';
import { Mail, Phone, BookOpen, ChevronLeft, ChevronRight, Search, Filter, Users, MapPin, Calendar, Award, Star, MoreHorizontal, Grid3X3, LayoutGrid, List } from 'lucide-react';
import axiosInstance from '../config/Axiosconfig.js';

// Modern Teacher Card Component
const TeacherCard = ({ teacher }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-blue-200">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-transparent to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Card Content */}
      <div className="relative p-6">
        {/* Header Section */}
        <div className="flex items-start justify-between mb-4">
          {/* Profile Section */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              {teacher.photo ? (
                <img
                  src={typeof teacher.photo === 'string' ? teacher.photo : URL.createObjectURL(teacher.photo)}
                  alt={teacher.name}
                  className="w-16 h-16 rounded-xl object-cover border-3 border-white shadow-lg group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-105 transition-transform duration-300">
                  {teacher.name ? teacher.name.charAt(0).toUpperCase() : '?'}
                </div>
              )}
              
              {/* Online Status Indicator */}
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 border-2 border-white rounded-full animate-pulse"></div>
              
              {/* Order Badge */}
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg">
                {teacher.order}
              </div>
            </div>
            
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-blue-600 transition-colors duration-300">
                {teacher.name}
              </h3>
              <div className="flex items-center space-x-2">
                <div className="inline-flex items-center bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-sm">
                  <BookOpen className="w-3 h-3 mr-1" />
                  {teacher.subject}
                </div>
                <div className="flex items-center text-yellow-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-xs text-gray-600 ml-1">4.8</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Action Menu */}
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
            <MoreHorizontal className="w-4 h-4 text-gray-400" />
          </button>
        </div>
        
        {/* Stats Section */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-blue-50 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-blue-600">5+</div>
            <div className="text-xs text-gray-600">Years Exp.</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-purple-600">150+</div>
            <div className="text-xs text-gray-600">Students</div>
          </div>
        </div>
        
        {/* Contact Information */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center space-x-3 text-gray-600 text-sm">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Mail className="w-4 h-4 text-blue-600" />
            </div>
            <span className="truncate flex-1">{teacher.email}</span>
          </div>
          <div className="flex items-center space-x-3 text-gray-600 text-sm">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <Phone className="w-4 h-4 text-green-600" />
            </div>
            <span>{teacher.phone}</span>
          </div>
        </div>
        
        {/* Description */}
        {teacher.description && (
          <div className="relative">
            <div className={`text-gray-700 text-sm leading-relaxed ${!isExpanded ? 'line-clamp-3' : ''}`}>
              {teacher.description}
            </div>
            {teacher.description.length > 150 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-blue-600 text-xs font-medium mt-2 hover:text-blue-700"
              >
                {isExpanded ? 'Show Less' : 'Read More'}
              </button>
            )}
          </div>
        )}
        
        {/* Action Buttons */}
        <div className="flex space-x-2 mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
            View Profile
          </button>
          <button className="bg-gray-100 text-gray-600 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
            Contact
          </button>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-blue-400/20 to-transparent rounded-bl-full"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-purple-400/20 to-transparent rounded-tr-full"></div>
    </div>
  );
};

// Dynamic Pagination Component
const DynamicPagination = ({ currentPage, totalPages, onPageChange, totalItems, itemsPerPage, onItemsPerPageChange }) => {
  const [jumpToPage, setJumpToPage] = useState('');
  
  const itemsPerPageOptions = [6, 9, 12, 18, 24];
  
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    // Always show first page
    if (totalPages <= 1) return [1];
    
    // Calculate range around current page
    const start = Math.max(2, currentPage - delta);
    const end = Math.min(totalPages - 1, currentPage + delta);

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    // Add first page
    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    // Add middle range
    rangeWithDots.push(...range);

    // Add last page
    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const handleJumpToPage = (e) => {
    e.preventDefault();
    const page = parseInt(jumpToPage);
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
      setJumpToPage('');
    }
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  if (totalPages <= 1) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
        {/* Items per page selector */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">Show:</span>
          <select
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(parseInt(e.target.value))}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
          >
            {itemsPerPageOptions.map(option => (
              <option key={option} value={option}>
                {option} per page
              </option>
            ))}
          </select>
        </div>

        {/* Page info */}
        <div className="text-sm text-gray-600 text-center">
          Showing <span className="font-semibold text-blue-600">{startItem}</span> to{' '}
          <span className="font-semibold text-blue-600">{endItem}</span> of{' '}
          <span className="font-semibold text-blue-600">{totalItems}</span> teachers
        </div>
        
        {/* Pagination controls */}
        <div className="flex items-center gap-2">
          {/* Previous Button */}
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center gap-1 px-4 py-2 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Previous</span>
          </button>

          {/* Page Numbers */}
          <div className="flex items-center gap-1">
            {getVisiblePages().map((page, index) => (
              <React.Fragment key={index}>
                {page === '...' ? (
                  <span className="px-3 py-2 text-gray-400 text-sm">...</span>
                ) : (
                  <button
                    onClick={() => onPageChange(page)}
                    className={`w-10 h-10 text-sm rounded-lg transition-all duration-200 ${
                      currentPage === page
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-lg scale-110'
                        : 'text-gray-600 bg-gray-100 hover:bg-gray-200 hover:scale-105'
                    }`}
                  >
                    {page}
                  </button>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1 px-4 py-2 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        
        {/* Jump to page */}
        <form onSubmit={handleJumpToPage} className="flex items-center gap-2">
          <span className="text-sm text-gray-600 whitespace-nowrap">Go to:</span>
          <input
            type="number"
            min="1"
            max={totalPages}
            value={jumpToPage}
            onChange={(e) => setJumpToPage(e.target.value)}
            placeholder="Page"
            className="w-16 px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm text-center"
          />
          <button
            type="submit"
            className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            Go
          </button>
        </form>
      </div>
      
      {/* Progress bar */}
      <div className="mt-4">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(currentPage / totalPages) * 100}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Page {currentPage}</span>
          <span>{Math.round((currentPage / totalPages) * 100)}% Complete</span>
          <span>Page {totalPages}</span>
        </div>
      </div>
    </div>
  );
};

// Main Teacher Cards Component
const TeacherCards = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [viewMode, setViewMode] = useState('grid'); // grid, compact, list
  
  // Debounce search
  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (searchTerm !== undefined) {
        setCurrentPage(1);
        fetchTeachers(1, searchTerm, selectedSubject);
      }
    }, 300);
    
    return () => clearTimeout(delayedSearch);
  }, [searchTerm]);

  // Fetch teachers with pagination and filters
  const fetchTeachers = async (page = 1, search = '', subject = '') => {
    try {
      setLoading(true);
      setError(null);
      
      const params = {
        page,
        limit: itemsPerPage,
        ...(search && { search }),
        ...(subject && { subject })
      };
      
      const response = await axiosInstance.get('/teacher', { params });
      
      if (response.data && response.data.success) {
        setTeachers(response.data.data.teachers || response.data.data || []);
        setTotalPages(response.data.data.totalPages || 1);
        setTotalItems(response.data.data.totalItems || 0);
        setCurrentPage(response.data.data.currentPage || page);
        
        // Extract unique subjects for filter
        const uniqueSubjects = [...new Set((response.data.data.teachers || response.data.data || []).map(teacher => teacher.subject))];
        setSubjects(uniqueSubjects);
      } else {
        setTeachers([]);
        setTotalPages(1);
        setTotalItems(0);
      }
    } catch (error) {
      console.error('Error fetching teachers:', error);
      setError('Failed to load teachers. Please try again.');
      setTeachers([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchTeachers(page, searchTerm, selectedSubject);
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle items per page change
  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
    fetchTeachers(1, searchTerm, selectedSubject);
  };

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle subject filter
  const handleSubjectFilter = (subject) => {
    setSelectedSubject(subject);
    setCurrentPage(1);
    fetchTeachers(1, searchTerm, subject);
  };

  // Clear filters
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedSubject('');
    setCurrentPage(1);
    fetchTeachers(1, '', '');
  };

  // Get grid classes based on view mode
  const getGridClasses = () => {
    switch (viewMode) {
      case 'compact':
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5';
      case 'list':
        return 'grid-cols-1';
      default:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, [itemsPerPage]);

  // Loading State
  if (loading && teachers.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading our amazing teachers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Meet Our Teachers
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Dedicated educators committed to nurturing young minds and shaping the future
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 text-blue-600">
            <Users className="w-5 h-5" />
            <span className="font-medium">{totalItems} Teachers</span>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col xl:flex-row gap-4 items-center justify-between">
            {/* Left side - Search and Filter */}
            <div className="flex flex-col lg:flex-row gap-4 items-center flex-1">
              {/* Search Input */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search teachers by name..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                )}
              </div>

              {/* Subject Filter */}
              <div className="flex items-center gap-3">
                <Filter className="text-gray-400 w-5 h-5" />
                <select
                  value={selectedSubject}
                  onChange={(e) => handleSubjectFilter(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                >
                  <option value="">All Subjects</option>
                  {subjects.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </div>

              {/* Clear Filters */}
              {(searchTerm || selectedSubject) && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium whitespace-nowrap"
                >
                  Clear Filters
                </button>
              )}
            </div>

            {/* Right side - View Mode Toggle */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600 whitespace-nowrap">View:</span>
              <div className="bg-gray-100 rounded-lg p-1 flex">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'grid' ? 'bg-white shadow text-blue-600' : 'text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <LayoutGrid className="w-4 h-4" />
                  <span className="hidden sm:inline">Grid</span>
                </button>
                <button
                  onClick={() => setViewMode('compact')}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'compact' ? 'bg-white shadow text-blue-600' : 'text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Grid3X3 className="w-4 h-4" />
                  <span className="hidden sm:inline">Compact</span>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'list' ? 'bg-white shadow text-blue-600' : 'text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <List className="w-4 h-4" />
                  <span className="hidden sm:inline">List</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-lg mb-8 text-center">
            <p className="font-medium">{error}</p>
            <button
              onClick={() => fetchTeachers(currentPage, searchTerm, selectedSubject)}
              className="mt-2 text-red-600 hover:text-red-800 font-medium underline"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Loading State for Filtered Results */}
        {loading && (
          <div className="text-center py-8">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading teachers...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && teachers.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-600 mb-2">
              {searchTerm || selectedSubject ? 'No Teachers Found' : 'No Teachers Available'}
            </h3>
            <p className="text-gray-500 mb-6">
              {searchTerm || selectedSubject 
                ? 'Try adjusting your search or filter criteria' 
                : 'Teachers will appear here once they are added'
              }
            </p>
            {(searchTerm || selectedSubject) && (
              <button
                onClick={clearFilters}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}

        {/* Teachers Grid */}
        {!loading && teachers.length > 0 && (
          <>
            <div className={`grid gap-6 ${getGridClasses()}`}>
              {teachers
                .sort((a, b) => (a.order || 0) - (b.order || 0))
                .map((teacher) => (
                  <TeacherCard
                    key={teacher.id || teacher._id || Math.random()}
                    teacher={teacher}
                  />
                ))}
            </div>

            {/* Dynamic Pagination */}
            <DynamicPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              onItemsPerPageChange={handleItemsPerPageChange}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default TeacherCards;
