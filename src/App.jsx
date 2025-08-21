import React from 'react';
import Dropdown from './Schoolwebside/Dropdown';
import { Outlet } from 'react-router-dom';
 import Fotter from './Schoolwebside/Fotter';
 import { ToastContainer } from 'react-bootstrap';






export default function App() {
 
  return (
    <>
    <div className='z-50'>
<Dropdown/> 

</div>
<Outlet/>
<Fotter/>
<ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </>
  );
} 
