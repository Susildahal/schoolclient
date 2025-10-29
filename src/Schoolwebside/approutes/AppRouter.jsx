import React, { Suspense, lazy } from "react";
import ErrorBoundary from "../common/ErrorBoundary";
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from "react-router-dom";

// Lazy load pages
const App = lazy(() => import("../../App.jsx"));
const Adminoutlet = lazy(() => import("../../Schoolwebside/Admin/Adminoutlet.jsx"));
const Spiner =lazy(() => import("../common/Spiner.jsx"));
const PrivateRoutes = lazy(() => import("./PrivateRoutes.jsx"));
const PublicRoute=lazy(() => import("./PublicRoutes.jsx"));

// Public Pages
const Home = lazy(() => import("../../Schoolwebside/Home/Home"));
const Primary = lazy(() => import("../../Schoolwebside/Courses/Primary"));
const Secondary = lazy(() => import("../../Schoolwebside/Courses/Secondary"));
const Gallery = lazy(() => import("../../Schoolwebside/Gallery.jsx"));
const Contactus = lazy(() => import("../../Schoolwebside/Home/Contactus.jsx"));
const OurService = lazy(() => import("../../Schoolwebside/About US/OurService.jsx"));
const Teacher = lazy(() => import("../../Schoolwebside/About US/Teacher.jsx"));
const Student = lazy(() => import("../../Schoolwebside/About US/Students.jsx"));
const AboutAchievements = lazy(() => import("../../Schoolwebside/About US/Achievements.jsx"));
const Aboutpublicnotic = lazy(() => import("../../Schoolwebside/About US/Aboutpublicnotic.jsx"));
const Login = lazy(() => import("../../Schoolwebside/Home/Login.jsx"));
const CheckEmail = lazy(() => import("../../Schoolwebside/Admin/CheckEmail.jsx"));
const PasswordForgetOtp = lazy(() => import("../../Schoolwebside/Admin/PasswordForgetOtp.jsx"));
const Updatepassword = lazy(() => import("../../Schoolwebside/Admin/Updatepassword.jsx"));
const Loginotp = lazy(() => import("../../Schoolwebside/Admin/Loginotp.jsx"));


// Admin Pages

const Notic = lazy(() => import("../../Schoolwebside/Admin/Notic.jsx"));
const TeacherForm = lazy(() => import("../../Schoolwebside/Admin/TeacherForm.jsx"));
const AddTeacher = lazy(() => import("../../Schoolwebside/Admin/AddTeacher.jsx"));
const AddStudent = lazy(() => import("../../Schoolwebside/Admin/AddStudent.jsx"));
const ClassStudentList = lazy(() => import("../../Schoolwebside/Admin/ClassStudentList.jsx"));
const Marks = lazy(() => import("../../Schoolwebside/Admin/Marks.jsx"));
const Princaple = lazy(() => import("../../Schoolwebside/Admin/Princaple.jsx"));
const Achievement = lazy(() => import("../../Schoolwebside/Admin/Achivement.jsx"));
const Publicnotic = lazy(() => import("../../Schoolwebside/Admin/Publicnotic.jsx"));
const ShowPrincipal = lazy(() => import("../../Schoolwebside/Admin/Displayprincaple.jsx"));
const DisplayAchievementsadmin = lazy(() => import("../../Schoolwebside/Admin/DisplayAchievements.jsx"));
const DisplayPublicnotic = lazy(() => import("../../Schoolwebside/Admin/DisplayPublicnotic.jsx"));
const AdminHome = lazy(() => import("../../Schoolwebside/Admin/Home.jsx"));
const Account = lazy(() => import("../../Schoolwebside/Admin/Account.jsx"));
const Updateaccount = lazy(() => import("../../Schoolwebside/Admin/Updateaccount.jsx"));
const Updatestudents = lazy(() => import("../../Schoolwebside/Admin/Updatestudents.jsx"));
const Role = lazy(() => import("../../Schoolwebside/Admin/Role.jsx"));
const AdminProfile = lazy(() => import("../../Schoolwebside/Admin/Profile.jsx"));
const Testimonials = lazy(() => import("../../Schoolwebside/Admin/Testominal.jsx"));
const AdminGallery = lazy(() => import("../../Schoolwebside/Admin/Gallery.jsx"));
const Settings = lazy(() => import("../../Schoolwebside/Admin/Setting.jsx"));
const MissionAndVision = lazy(() => import("../../Schoolwebside/Admin/Missionandvisson.jsx"));
const Course = lazy(() => import("../../Schoolwebside/Admin/Course.jsx"));
const AppRouter = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
       <Route path="login/" element={<Suspense fallback={<div><Spiner/></div>}> <PublicRoute><Login /></PublicRoute></Suspense>} />
          <Route path="CheckEmail/" element={<Suspense fallback={<div><Spiner/></div>}><CheckEmail /></Suspense>} />
          <Route path="PasswordForgetOtp/" element={<Suspense fallback={<div><Spiner/></div>}><PasswordForgetOtp /></Suspense>} />
          <Route path="Updatepassword/" element={<Suspense fallback={<div><Spiner/></div>}><Updatepassword /></Suspense>} />
          <Route path="Loginotp/" element={<Suspense fallback={<div><Spiner/></div>}><Loginotp /></Suspense>} />
        {/* Public Routes */}

        <Route path="/" element={<Suspense fallback={<div><Spiner/></div>}><App /></Suspense>}>
          <Route index element={<Suspense fallback={<div><Spiner/></div>}><Home /></Suspense>} />
          <Route path="Primary/" element={<Suspense fallback={<div><Spiner/></div>}><Primary /></Suspense>} />
          <Route path="Secondary/" element={<Suspense fallback={<div><Spiner/></div>}><Secondary /></Suspense>} />
          <Route path="Gallery/" element={<Suspense fallback={<div><Spiner/></div>}><Gallery /></Suspense>} />
          <Route path="Contactus/" element={<Suspense fallback={<div><Spiner/></div>}><Contactus /></Suspense>} />
          <Route path="OurService/" element={<Suspense fallback={<div><Spiner/></div>}><OurService /></Suspense>} />
          <Route path="Teacher/" element={<Suspense fallback={<div><Spiner/></div>}><Teacher /></Suspense>} />
          <Route path="Student/" element={<Suspense fallback={<div><Spiner/></div>}><Student /></Suspense>} />
          <Route path="AboutAchievements/" element={<Suspense fallback={<div><Spiner/></div>}><AboutAchievements /></Suspense>} />
          <Route path="Aboutpublicnotic/" element={<Suspense fallback={<div><Spiner/></div>}><Aboutpublicnotic /></Suspense>} />
         
        </Route>

        {/* Admin Routes */}
        <Route path="/Adminoutlet" element={<Suspense fallback={<div><Spiner/></div>}> <PrivateRoutes><Adminoutlet /></PrivateRoutes></Suspense>}>
          <Route path="Notic" element={<Suspense fallback={<div><Spiner/></div>}> <PrivateRoutes><Notic /></PrivateRoutes></Suspense>} />
          <Route path="TeacherForm" element={<Suspense fallback={<div><Spiner/></div>}><PrivateRoutes><TeacherForm /></PrivateRoutes></Suspense>} />
          <Route path="AddTeacher" element={<Suspense fallback={<div><Spiner/></div>}><PrivateRoutes><AddTeacher /></PrivateRoutes></Suspense>} />
          <Route path="AddStudent" element={<Suspense fallback={<div><Spiner/></div>}><PrivateRoutes><AddStudent /></PrivateRoutes></Suspense>} />
          <Route path="ClassStudentList" element={<Suspense fallback={<div><Spiner/></div>}><PrivateRoutes><ClassStudentList /></PrivateRoutes></Suspense>} />
          <Route path="Marks" element={<Suspense fallback={<div><Spiner/></div>}><PrivateRoutes><Marks /></PrivateRoutes></Suspense>} />
          <Route path="Princaple" element={<Suspense fallback={<div><Spiner/></div>}><Princaple /></Suspense>} />
          <Route path="Achievements" element={<Suspense fallback={<div><Spiner/></div>}><Achievement /></Suspense>} />
          <Route path="Publicnotic" element={<Suspense fallback={<div><Spiner/></div>}><Publicnotic /></Suspense>} />
          <Route path="ShowPrincipal" element={<Suspense fallback={<div><Spiner/></div>}><ShowPrincipal /></Suspense>} />
          <Route path="DisplayPublicnotic" element={<Suspense fallback={<div><Spiner/></div>}><DisplayPublicnotic /></Suspense>} />
          <Route path="DisplayAchievements" element={<Suspense fallback={<div><Spiner/></div>}><DisplayAchievementsadmin /></Suspense>} />
          <Route path="AdminHome" element={<Suspense fallback={<div><Spiner/></div>}><AdminHome /></Suspense>} />
          <Route path="Account" element={<Suspense fallback={<div><Spiner/></div>}><Account /></Suspense>} />
          <Route path="Updateaccount/:id" element={<Suspense fallback={<div><Spiner/></div>}><Updateaccount /></Suspense>} />
          <Route path="Updatestudents/:id" element={<Suspense fallback={<div><Spiner/></div>}><Updatestudents /></Suspense>} />
          <Route path="role" element={<Suspense fallback={<div><Spiner/></div>}><Role /></Suspense>} />
          <Route path="Profile" element={<Suspense fallback={<div><Spiner/></div>}><AdminProfile /></Suspense>} />
              <Route path="ShowTestimonials" element={<Suspense fallback={<div><Spiner/></div>}><Testimonials /></Suspense>} />
              <Route path="ShowGallery" element={<Suspense fallback={<div><Spiner/></div>}><AdminGallery /></Suspense>} />
          <Route path="settings" element={<Suspense fallback={<div><Spiner/></div>}><Settings /></Suspense>} />
          <Route path="MissionAndVision" element={<Suspense fallback={<div><Spiner/></div>}><MissionAndVision /></Suspense>} />
          <Route path="Course" element={<Suspense fallback={<div><Spiner/></div>}><Course /></Suspense>} />
        </Route>
      </>
    )
  );

  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
};

export default AppRouter;
