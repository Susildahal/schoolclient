import React, { useState, useEffect, useCallback, useRef, startTransition } from 'react';
import { Trash2, Edit3, Users, Search, Loader2, Filter } from 'lucide-react';
import axiosInstance from '../config/Axiosconfig';
import DeleteConfirmationModal from '../common/Confirmdelte';
import Pagination from '../common/Pagination';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../common/AdminHeader';

const ClassStudentList = () => {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState('');
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchInputValue, setSearchInputValue] = useState('');
  const [totalResults, setTotalResults] = useState(0);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10
  });
  
  // Create useRef at the component level, not inside effects
  const isInitialSearchRender = useRef(true);
  const isInitialPageRender = useRef(true);

  const classOptions = [
    'All', 1, 2, 3, 4, 5,
    6, 7, 8, 9, 10, 11, 12
  ];

  // Define a fetchData function that we can reuse
  const fetchData = useCallback(async (options = {}) => {
    // Prevent concurrent requests
    if (loading) {
      console.log("Request blocked: Already loading");
      return;
    }
    
    const requestId = Date.now(); // Generate unique ID for this request
    console.log(`[Request ${requestId}] Starting fetch request`);
    
    setLoading(true);
    try {
      const { 
        page = pagination.currentPage, 
        searchTermValue = searchTerm,
        classValue = selectedClass
      } = options;
      
      console.log(`[Request ${requestId}] Fetching page ${page} with class ${classValue} and search term "${searchTermValue}"`);
      
      // Ensure we have a valid page number
      const pageToFetch = Math.max(1, page);
      
      const response = await axiosInstance.post(
        `/students/all`,
        {
          className: classValue === 'All' ? null : classValue,
          searchTerm: searchTermValue ? searchTermValue.trim() : null,
          page: pageToFetch,
          limit: pagination.itemsPerPage
        },
        { withCredentials: true }
      );
      
      setStudents(response.data.data || []);
      setTotalResults(response.data.totalCount || response.data.data?.length || 0);
      
      // Ensure correct pagination state
      if (response.data.pagination) {
        // If backend returns empty data but has pagination info and we're not on page 1
        if (response.data.data?.length === 0 && response.data.pagination.totalPages > 0 && pagination.currentPage > 1) {
          console.log("No data on current page, going to previous page");
          setPagination(prev => ({
            ...prev,
            currentPage: Math.max(1, pagination.currentPage - 1),
            totalPages: response.data.pagination.totalPages || 1,
            totalItems: response.data.pagination.totalItems || 0,
            itemsPerPage: response.data.pagination.itemsPerPage || 10
          }));
        } else {
          setPagination(prev => ({
            ...prev,
            totalPages: response.data.pagination.totalPages || 1,
            totalItems: response.data.pagination.totalItems || response.data.data?.length || 0,
            itemsPerPage: response.data.pagination.itemsPerPage || 10
          }));
        }
      }
      
      return response;
    } catch (error) {
      console.error("Error fetching students:", error);
      setStudents([]);
      return null;
    } finally {
      setLoading(false);
    }
  // Removed dependencies that cause loop problems
  }, [loading]);

  // Primary data fetching effect - only runs on initial mount
  useEffect(() => {
    console.log("Initial data fetch");
    fetchData();
    // Only run on mount, don't include fetchData or it will cause loops
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  // Separate effect for pagination changes
  useEffect(() => {
    // Skip on initial render - the initial data fetch effect will handle it
    if (isInitialPageRender.current) {
      isInitialPageRender.current = false;
      return;
    }
    
    // Now we only run for actual pagination changes, not on mount
    console.log("Pagination changed, fetching data for page", pagination.currentPage);
    fetchData({
      page: pagination.currentPage,
      searchTermValue: searchTerm,
      classValue: selectedClass
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.currentPage]);
  
  // Handle search term changes with debounce
  useEffect(() => {
    // Skip if nothing has changed or it's the initial render with empty value
    if (searchInputValue === searchTerm || (searchInputValue === '' && isInitialSearchRender.current)) {
      if (isInitialSearchRender.current) {
        isInitialSearchRender.current = false;
      }
      return;
    }
    
    const timer = setTimeout(() => {
      console.log("Search debounce complete, updating search term");
      setSearchTerm(searchInputValue);
      
      // Only reset page and fetch if we have a real change
      if (searchTerm !== searchInputValue) {
        setPagination(prev => ({ ...prev, currentPage: 1 }));
        // Explicitly call fetchData with the new search term to avoid dependency issues
        fetchData({ 
          page: 1,
          searchTermValue: searchInputValue 
        });
      }
    }, 500); // 500ms debounce
    
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInputValue]);
  
  // Explicit effect for search term changes (when triggered by form submit)
  useEffect(() => {
    // Skip this on the first render
    if (isInitialSearchRender.current) {
      isInitialSearchRender.current = false;
      return;
    }
    
    console.log("Search term state changed");
    // We already fetch in the debounce handler, so no need for another fetch here
  }, [searchTerm]);

  // Form submission handler for immediate search
  const handleSubmit = (e) => {
    if (e) {
      e.preventDefault();
      console.log("Form submitted, immediate search");
      
      // Skip if nothing changed
      if (searchInputValue === searchTerm) return;
      
      // Set the search term from the input value
      setSearchTerm(searchInputValue);
      
      // Reset to page 1 and fetch explicitly
      setPagination(prev => ({
        ...prev,
        currentPage: 1
      }));
      
      // Explicitly call fetchData with the new term
      fetchData({ 
        page: 1,
        searchTermValue: searchInputValue 
      });
    }
  };
  
  // Handle page change
  const handlePageChange = (page) => {
    console.log(`Page change requested: ${page}`);
    
    // Skip if already on this page or invalid page
    if (pagination.currentPage === page || page < 1 || page > pagination.totalPages) {
      console.log("Invalid page change request", {
        currentPage: pagination.currentPage,
        requestedPage: page,
        totalPages: pagination.totalPages
      });
      return;
    }
    
    // Only update the state - useEffect will handle the API call
    setPagination(prev => ({
      ...prev,
      currentPage: page
    }));
  };
  
  // Handle class change
  const handleClassChange = (e) => {
    const newClass = e.target.value;
    console.log(`Class change: ${newClass}`);
    
    // Skip if nothing changed
    if (selectedClass === newClass) return;
    
    setSelectedClass(newClass);
    
    // Reset pagination when class changes
    setPagination(prev => ({ ...prev, currentPage: 1 }));
    
    // Immediately fetch with the new class
    fetchData({ 
      page: 1, 
      classValue: newClass,
      searchTermValue: searchTerm
    });
  };
  const handleDeleteClick = (student) => {
    // First set the student to delete
    setStudentToDelete(student);
    setDeletingId(student._id);
    // Then open the modal
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!studentToDelete || !deletingId) return;
    
    setIsDeleting(true);
    try {
      // Replace this with your actual API call
      await axiosInstance.delete(`/students/delete/${deletingId}`);

      // Update the UI after successful deletion
      setStudents(students.filter(student => student._id !== deletingId));
      console.log("Student deleted successfully");
      
    } catch (error) {
      console.error("Delete error:", error);
      console.error("Failed to delete student");
    } finally {
      // Reset all states regardless of success or failure
      setIsDeleting(false);
      setDeletingId(null);
      setStudentToDelete(null);
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div className="min-h-screen">
      <AdminHeader 
      title=" Students"
      subtitle="View Edit and Delete your students "
      to="/Adminoutlet/AddStudent"
      linkname="Add New Students "
      />
      <div className="max-w-7xl mx-auto">
       
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <h1 className="text-lg font-bold text-gray-900">Student Management</h1>
                 <h2> Total {pagination.totalItems} </h2>
                </div>

                <form onSubmit={handleSubmit} className="flex items-center gap-3 flex-1">
                <div className="relative">
                  <select
                  value={selectedClass}
                  onChange={handleClassChange}
                  className="pl-3 pr-8 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white appearance-none w-40"
                  disabled={loading}
                  >
                  <option value="">All Classes</option>
                  {[1,2,3,4,5,6,7,8,9,10,11,12].map(c => (
                    <option key={c} value={c}>Grade {c}</option>
                  ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <Filter className="h-4 w-4 text-gray-400" />
                  </div>
                </div>

                <div className="relative flex-1">
                  <input
                  type="text"
                  value={searchInputValue}
                  onChange={(e) => setSearchInputValue(e.target.value)}
                  placeholder="Search by name, guardian, address..."
                  className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={loading}
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`px-3 py-2 rounded-md text-xs font-medium flex items-center gap-1 text-white transition-all ${
                  loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:shadow-sm'
                  }`}
                >
                  {loading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Searching...
                  </>
                  ) : (
                  <>
                    <Search className="w-3.5 h-3.5" />
                    Search
                  </>
                  )}
                </button>
                </form>
              </div>
              </div>

            {/* Results */}
        {loading ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8">
            <div className="flex flex-col items-center justify-center">
              <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-3" />
              <p className="text-sm text-gray-600">Searching for students...</p>
            </div>
          </div>
        ) : students.length > 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            {/* Table Header */}
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-base font-medium text-gray-900">
                  {selectedClass ? `Grade ${selectedClass} Students` : 'All Students'}
                  <span className="ml-2 text-xs font-normal text-gray-500">
                    ({totalResults} result{totalResults !== 1 ? 's' : ''})
                  </span>
                </h2>
                <div className="flex items-center space-x-3">
                  {searchTerm && (
                    <span className="text-xs text-gray-500">
                      Search: "{searchTerm}"
                    </span>
                  )}
                  {pagination.totalPages > 1 && (
                    <span className="text-xs text-gray-500">
                      Page {pagination.currentPage} of {pagination.totalPages}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Class
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Gender
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Guardian
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Address
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {students.map((student, index) => (
                    <tr key={student._id} className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8">
                            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                              <span className="text-white font-medium text-xs">
                                {student.firstName?.charAt(0)}{student.lastName?.charAt(0)}
                              </span>
                            </div>
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">
                              {student.firstName} {student.lastName}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Grade {student.className}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="text-sm text-gray-700 capitalize">
                          {student.gender}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="text-sm text-gray-700">
                          {student.guardianName}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-sm text-gray-700 max-w-xs">
                          <span className="line-clamp-2">{student.address}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => startTransition(() => navigate(`/Adminoutlet/Updatestudents/${student._id}`))}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded-md transition-all duration-200 hover:shadow-sm"
                            title="Update Student"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Update</span>
                          </button>
                          <button
                            onClick={() => handleDeleteClick(student)}
                            disabled={isDeleting}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs rounded-md transition-all duration-200 hover:shadow-sm disabled:bg-red-400 disabled:cursor-not-allowed"
                            title="Delete Student"
                          >
                            {isDeleting && deletingId === student._id ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <Trash2 className="w-3.5 h-3.5" />
                            )}
                            <span className="hidden sm:inline">
                              {isDeleting && deletingId === student._id ? 'Deleting...' : 'Delete'}
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="lg:hidden">
              <div className="divide-y divide-gray-200">
                {students.map(student => (
                  <div key={student._id} className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                            <span className="text-white font-medium text-xs">
                              {student.firstName?.charAt(0)}{student.lastName?.charAt(0)}
                            </span>
                          </div>
                        </div>
                        <div className="ml-3">
                          <h3 className="text-base font-medium text-gray-900">
                            {student.firstName} {student.lastName}
                          </h3>
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1">
                            Grade {student.className}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <p className="text-xs font-medium text-gray-500">Gender</p>
                        <p className="text-sm text-gray-700 capitalize">{student.gender}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-500">Guardian</p>
                        <p className="text-sm text-gray-700">{student.guardianName}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-xs font-medium text-gray-500">Address</p>
                        <p className="text-sm text-gray-700">{student.address}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => console.log(`Update student ${student._id}`)}
                        className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded-md transition-all duration-200"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        Update
                      </button>
                      <button
                        onClick={() => handleDeleteClick(student)}
                        disabled={isDeleting}
                        className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs rounded-md transition-all duration-200 disabled:bg-red-400"
                      >
                        {isDeleting && deletingId === student._id ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Trash2 className="w-3.5 h-3.5" />
                        )}
                        {isDeleting && deletingId === student._id ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Pagination */}
            <div className="border-t border-gray-200 px-4 py-3">
              <Pagination 
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                totalItems={pagination.totalItems}
                itemsPerPage={pagination.itemsPerPage}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        ) : selectedClass && !loading ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12">
            <div className="text-center">
              <div className="mx-auto h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">No students found</h3>
              <p className="text-lg text-gray-500">
                {searchTerm ? 
                  `No results for "${searchTerm}"` : 
                  selectedClass === 'All' ? 
                    'No students found in any class' : 
                    `No students found in Grade ${selectedClass}`
                }
              </p>
            </div>
          </div>
        ) : !loading ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12">
            <div className="text-center">
              <div className="mx-auto h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">No students found</h3>
              <p className="text-lg text-gray-500">
                Please select a class or search for students
              </p>
            </div>
          </div>
        ) : null}
      </div>

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onCancel={() => {
          setIsDeleteModalOpen(false);
          setDeletingId(null);
          setStudentToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        loading={isDeleting}
        items="student"
        data={studentToDelete}
      />

   
    </div>
  );
};

export default ClassStudentList;