import React from 'react'
import { Link } from 'react-router-dom'


const AdminHeader = ( {title  ,subtitle ,  to, linkname } ) => {
  return (
    <div>

       <div className=" ">
            {/* Header */}
            <div className="mb-6">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-sm font-bold text-gray-900"> {title || "this is a title "}</h1>
                  <p className="text-gray-600  text-sm mt-1">{subtitle || "Manage system roles and permissions"}</p>
                </div>
                <Link to={to || "#"}>
                  <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors"
                >
                 
   
                  {linkname }
                </button>
                </Link>
              </div>
            </div>
      
    </div>
    </div>
  )
}

export default AdminHeader

// In the button, replace <Plus className="h-4 w-4" /> with:

