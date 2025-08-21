import React, { useState, useEffect } from 'react';

const examTypes = ['First Term', 'Second Term', 'Mid', 'Final'];

// Grading scale configuration
const gradingScale = [
  { min: 90, grade: 'A+', gradePoint: 4.0 },
  { min: 80, grade: 'A', gradePoint: 3.6 },
  { min: 70, grade: 'B+', gradePoint: 3.2 },
  { min: 60, grade: 'B', gradePoint: 2.8 },
  { min: 50, grade: 'C+', gradePoint: 2.4 },
  { min: 40, grade: 'C', gradePoint: 2.0 },
  { min: 0, grade: 'F', gradePoint: 0.0 },
];

const Marks = () => {
  const [formData, setFormData] = useState({
    name: '',
    symbolNumber: '',
    class: '',
    examType: '',
    subjects: [{ subject: '', marks: '', totalMarks: '' }],
    gpa: 0,
  });

  const [subjectList, setSubjectList] = useState([
    'Nepali', 'English', 'Mathematics', 'Social Studies', 'Science', 
    'Optional Mathematics', 'Physics', 'Chemistry', 'Biology',
  ]);

  const [newSubject, setNewSubject] = useState('');

  // Calculate GPA whenever subjects change
  useEffect(() => {
    const calculateGPA = () => {
      const validSubjects = formData.subjects.filter(sub => {
        const marks = parseFloat(sub.marks);
        const total = parseFloat(sub.totalMarks);
        return !isNaN(marks) && !isNaN(total) && total > 0;
      });

      const totalGradePoints = validSubjects.reduce((sum, sub) => {
        const marks = parseFloat(sub.marks);
        const total = parseFloat(sub.totalMarks);
        const percentage = (marks / total) * 100;
        
        const gradePoint = gradingScale.find(
          grade => percentage >= grade.min
        )?.gradePoint || 0;

        return sum + gradePoint;
      }, 0);

      return validSubjects.length > 0 
        ? (totalGradePoints / validSubjects.length).toFixed(2)
        : 0;
    };

    setFormData(prev => ({ ...prev, gpa: calculateGPA() }));
  }, [formData.subjects]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubjectChange = (index, field, value) => {
    const updatedSubjects = [...formData.subjects];
    updatedSubjects[index][field] = value;
    
    // Validate marks don't exceed total marks
    if (field === 'marks' && updatedSubjects[index].totalMarks) {
      const marks = parseFloat(value);
      const total = parseFloat(updatedSubjects[index].totalMarks);
      if (marks > total) {
        alert("Obtained marks cannot exceed total marks!");
        return;
      }
    }

    setFormData(prev => ({ ...prev, subjects: updatedSubjects }));
  };

  const addSubject = () => {
    setFormData(prev => ({
      ...prev,
      subjects: [...prev.subjects, { subject: '', marks: '', totalMarks: '' }],
    }));
  };

  const removeSubject = (index) => {
    const updatedSubjects = formData.subjects.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, subjects: updatedSubjects }));
  };

  const handleAddNewSubject = (e) => {
    e.preventDefault();
    const trimmed = newSubject.trim();
    if (trimmed && !subjectList.includes(trimmed)) {
      setSubjectList(prev => [...prev, trimmed]);
      setNewSubject('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Final validation
    const isValid = formData.subjects.every(sub => {
      const marks = parseFloat(sub.marks);
      const total = parseFloat(sub.totalMarks);
      return sub.subject && !isNaN(marks) && !isNaN(total) && total > 0 && marks <= total;
    });

    if (!isValid) {
      alert("Please fill all subject fields correctly!");
      return;
    }

    console.log('Submitted Data:', formData);
    // Send data to backend (e.g., axios.post)
  };

  return (
    <div className="min-h-screen  flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-4xl bg-white p-6 sm:p-10 shadow-lg rounded-lg">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-blue-800">
          Student Marks Entry Form
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Student Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* ... (student info inputs remain same) */}
          </div>

          {/* Subjects List */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-blue-700">
              Subjects & Marks
            </h3>
            {formData.subjects.map((entry, index) => {
              const percentage = entry.totalMarks > 0 
                ? ((entry.marks / entry.totalMarks) * 100).toFixed(2)
                : 0;
              const gradeInfo = gradingScale.find(
                grade => percentage >= grade.min
              ) || gradingScale[gradingScale.length - 1];

              return (
                <div key={index} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
                  <select
                    value={entry.subject}
                    onChange={(e) => handleSubjectChange(index, 'subject', e.target.value)}
                    required
                    className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="">-- Select Subject --</option>
                    {subjectList.map((subj, idx) => (
                      <option key={idx} value={subj}>{subj}</option>
                    ))}
                  </select>

                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={entry.marks}
                      onChange={(e) => handleSubjectChange(index, 'marks', e.target.value)}
                      placeholder="Obtained"
                      min="0"
                      max={entry.totalMarks || undefined}
                      required
                      className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                      type="number"
                      value={entry.totalMarks}
                      onChange={(e) => handleSubjectChange(index, 'totalMarks', e.target.value)}
                      placeholder="Total"
                      min="0"
                      required
                      className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <div className="flex flex-col items-center">
                      <span className="text-sm font-semibold">
                        {percentage}% ({gradeInfo.grade})
                      </span>
                      {formData.subjects.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeSubject(index)}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          ✖
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            <button
              type="button"
              onClick={addSubject}
              className="text-blue-600 hover:underline text-sm mt-1"
            >
              + Add Another Subject
            </button>
          </div>

          {/* GPA Display */}
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <h3 className="text-xl font-semibold text-blue-700">
              Overall GPA: {formData.gpa}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Grading Scale: A+ (4.0) - 90%+, A (3.6) - 80-89%, B+ (3.2) - 70-79%, B (2.8) - 60-69%, C+ (2.4) - 50-59%, C (2.0) - 40-49%, F (0.0) - Below 40%
            </p>
          </div>

          {/* Add Custom Subject and Submit */}
          {/* ... (remaining components remain same) */}
        </form>
      </div>
    </div>
  );
};

export default Marks;