import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';

import Breadcrumb from '../common/Breadcrume';

const Adminoutlet = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
    <div className="flex min-h-screen  lg:pr-8">
    
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
  
        
        {/* Content */}
        <main className=" flex-1 pt-16 ">

          <Breadcrumb />
          <Outlet />
        </main>
      </div>
  
  
    </>
  );
};

export default Adminoutlet;