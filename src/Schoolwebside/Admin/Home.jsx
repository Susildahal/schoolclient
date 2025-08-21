import React, { useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Users } from 'lucide-react';
import { getdata } from "../redux/slicer/mee.js";
import { useDispatch ,useSelector } from 'react-redux';
const Home = () => {




  const { data = [], loading = false, error, students } = useSelector(state => state.mee || {});
 

  const adminName = data.name || "Admin";
  const totalStudents = data.students?.total;
  const totalBoys = data.students?.boys;
  const totalGirls = data.students?.girls;

  const chartData = [
    { name: 'Boys', value: totalBoys, color: '#3B82F6' },
    { name: 'Girls', value: totalGirls, color: '#EC4899' }
  ];
  return (
    <div className="h-screen flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-4xl w-full">
          {/* Welcome Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6 shadow-lg">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome, <span className="text-blue-600">{adminName}</span>!
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Manage your student database efficiently. Track enrollments, monitor statistics, and oversee all administrative tasks from your dashboard.
            </p>
          </div>

          {/* Stats and Chart Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Student Stats */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
                Student Overview
              </h2>
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-900 mb-2">{totalStudents}</div>
                  <div className="text-gray-600">Total Students</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 mb-1">{totalBoys}</div>
                    <div className="text-sm text-gray-600">Boys</div>
                  </div>
                  <div className="text-center p-4 bg-pink-50 rounded-lg">
                    <div className="text-2xl font-bold text-pink-600 mb-1">{totalGirls}</div>
                    <div className="text-sm text-gray-600">Girls</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pie Chart */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
                Gender Distribution
              </h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value, name) => [`${value} students`, name]}
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Legend 
                      verticalAlign="bottom" 
                      height={36}
                      formatter={(value, entry) => (
                        <span style={{ color: entry.color, fontWeight: '500' }}>
                          {value}: {entry.payload.value}
                        </span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Bottom Message */}
          <div className="mt-12 text-center">
            <div className="bg-white/70 backdrop-blur-sm rounded-lg p-6 border border-white/20 shadow-lg">
              <p className="text-gray-700">
                All systems are running smoothly. Have a productive day managing your institution!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;