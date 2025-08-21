import React, { useState } from 'react';
import axios from 'axios';

const Student = () => {
  const [selectedClass, setSelectedClass] = useState('');
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const classOptions = [
    'All', 1, 2, 3, 4, 5,
    6, 7, 8, 9, 10, 11, 12
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
  `${process.env.REACT_APP_API_BASE_URL}/api/students/all`,
        { className: selectedClass === 'All' ? null : selectedClass },
        { withCredentials: true }
      );
      setStudents(response.data.data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen   mt-20 p-4">
      <div className="max-w-7xl mx-auto">
        <div className=" rounded-lg shadow-md p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white text-center mb-4 sm:mb-6">
            Class Student List
          </h2>

          <form onSubmit={handleSubmit} className="mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-lg text-white text-center  mb-1">
                  Select Class To See Students Details
                </label>
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="w-full p-2 border rounded-md bg-slate-800 focus:ring-blue-500 focus:border-blue-500"
                  disabled={loading}
                >
                  <option value="">-- Select a Class --</option>
                  {classOptions.map((className, index) => (
                    <option key={index} value={className}>
                      {className === 'All' ? 'All Classes' : `Grade ${className}`}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="sm:self-end">
                <button
                  type="submit"
                  disabled={loading || !selectedClass}
                  className={`w-full sm:w-auto px-4 py-2 rounded-md text-white ${
                    loading || !selectedClass 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-blue-600 hover:bg-blue-700'
                  } transition-colors`}
                >
                  {loading ? 'Loading...' : 'Get Students'}
                </button>
              </div>
            </div>
          </form>

          {loading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : students.length > 0 ? (
            <div className=" overflow-x-auto">
              {/* Desktop Table */}
              <table className="hidden  sm:table min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                  
                    <th className="px-4 py-3 text-left text-xs text-black  uppercase tracking-wider">Name</th>
                    <th className="px-4 py-3 text-left text-xs text-black  uppercase tracking-wider">Class</th>
                    <th className="px-4 py-3 text-left text-xs text-black uppercase tracking-wider">Gender</th>
                    <th className="px-4 py-3 text-left text-xs text-black uppercase tracking-wider">Guardian Name</th>
                    <th className="px-4 py-3 text-left text-xs text-black  uppercase tracking-wider">Address</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {students.map((student,index) => (
                    <tr key={student._id} className= {`${index %2 ===1?"bg-red-100 text-white":"bg-red-300 text-black"} hover:bg-gray-50`} >
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className='text-slate-800 text-xl mr-3'>{index+1}.</div>
                          <div className="text-sm text-black capitalize ">
                            {student.firstName} {student.lastName}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 text-black ">
                          Grade {student.className}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-black capitalize">
                        {student.gender}
                      </td>
                      <td className="px-4 py-3  capitalizewhitespace-nowrap text-sm text-black">
                        {student.guardianName}
                      </td>
                      <td className="px-4 py-3 text-sm capitalize text-black max-w-xs truncate">
                        {student.address}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Mobile Cards */}
              <div className="sm:hidden space-y-4">
                {students.map((student,index) => (
                  <div key={student._id} className={`${index %2 ===1?"bg-red-300":"bg-red-100"} p-4 rounded-lg shadow border `}>
                    <div className="flex justify-between items-start">
                      <h3 className="text-black capitalize">
                        {index+1} {student.firstName} {student.lastName}
                      </h3>
                      <span className="px-2 inline-flex text-lg  capitalize leading-5 ">
                        Grade {student.className}
                      </span>
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-black">Gender</p>
                        <p className="text-black capitalize">{student.gender}</p>
                      </div>
                      <div>
                        <p className="text-black">Guardian Name</p>
                        <p className=" capitalize text-black ">{student.guardianName}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-black">Address</p>
                        <p className="text-black capitalize">{student.address}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : selectedClass && !loading ? (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-2 text-sm text-black ">No students found</h3>
              <p className="mt-1 text-sm text-black">
                {selectedClass === 'All' ? 
                  'No students in any class' : 
                  `No students in Grade ${selectedClass}`
                }
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Student;