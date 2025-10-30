import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { fetchCourses } from '../Schoolwebside/redux/slicer/courses.js';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom'; 
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef(null);
  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);
  const scrollTimeoutRef = useRef(null);
  const dispatch = useDispatch();
  const { data: courses } = useSelector((state) => state.courses);
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  useEffect(() => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
    setIsScrolling(true);
    
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, 800);
    
    lastScrollY.current = latest;
  });

  const handleLogin = () => {
    const flag = localStorage.getItem("flag");
    navigate(flag === "true" ? "/Adminoutlet/AdminHome" : "/login");
  };

  const toggleDropdown = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

   useEffect(() => {
    // Fetch courses from server if not already in state
    if (!courses || courses.length === 0) {
      dispatch(fetchCourses());
    }
  }, [dispatch, courses]);



  const courseSubItems = (courses && courses.length > 0)
    ? courses.map((c) => ({
        to: `/coursedetails/${c._id || c.id}`,
        text: c.programName || c.name || "Untitled Course",
        id: c._id || c.id,
      }))
    : [{ to: "/coursedetails", text: "Loading courses..." }];

  const navigationItems = [
    { to: "/", text: "Home" },
    {
      text: "About Us",
      key: "about",
      subItems: [
        { to: "/OurService", text: "Services" },
        { to: "/Student", text: "Students Details" },
        { to: "/AboutAchievements", text: "Our Achievements" },
        { to: "/Aboutpublicnotic", text: "Notices" },
      ],
    },
    {
      text: "Our Courses",
      key: "courses",
      subItems: courseSubItems,
    },
    { to: "/Gallery", text: "Our Gallery" },
    { to: "/Contactus", text: "Contact Us" },
  ];

  return (
    <>
      <motion.nav
        ref={navRef}
        animate={isMenuOpen ? { opacity: 0, pointerEvents: 'none' } : "visible"}
        variants={{
          visible: { y: 0, opacity: 1 },
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className={`fixed top-3 left-0 right-0 mx-auto z-50 px-4 sm:px-6 py-3 sm:py-3.5 rounded-2xl sm:rounded-full transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 backdrop-blur-xl shadow-lg border border-white/50"
            : "bg-white/70 backdrop-blur-md shadow-md border border-white/40"
        }`}
        style={{
          width: isScrolling ? "clamp(300px, 80%, 1000px)" : "clamp(300px, 95%, 1280px)",
        }}
      >
        <div className="flex items-center justify-between w-full">
          <motion.div 
            className="flex items-center gap-2 sm:gap-3 flex-shrink-0"
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              className="h-9 w-9 sm:h-10 sm:w-10 lg:h-12 lg:w-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-xs sm:text-sm lg:text-base shadow-md ring-2 ring-blue-300/30"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.2 }}
            >
              B
            </motion.div>
            <div className="hidden xs:block sm:block">
              <motion.h1 
                className="text-xs sm:text-sm lg:text-base xl:text-lg font-bold text-gray-900 leading-tight"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                Bagh Bhairav
                
              </motion.h1>
              <p className="text-xs text-gray-500 hidden lg:block">School of Excellence</p>
            </div>
          </motion.div>

          <div className="hidden lg:flex items-center gap-1">
            {navigationItems.map((item, index) => (
              <motion.div 
                key={index} 
                className="relative group"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                {item.to ? (
                  <Link
                    to={item.to}
                    className={`px-4 py-2 capitalize rounded-lg text-sm font-medium transition-all duration-300 ${
                      currentPath === item.to
                        ? "text-blue-600 bg-blue-50/50 font-semibold"
                        : "text-gray-700 hover:text-blue-600 hover:bg-blue-50/50"
                    }`}
                  >
                    {item.text}
                  </Link>
                ) : (
                  <>
                    <button
                      onClick={() => toggleDropdown(item.key)}
                      className="flex items-center gap-1.5 px-4 py-2  capitalize rounded-lg text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50/50 transition-all duration-300"
                    >
                      {item.text}
                      <ChevronDown 
                        size={16}
                        className={`transition-transform duration-300 ${
                          openDropdown === item.key ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.95 }}
                      animate={{
                        opacity: openDropdown === item.key ? 1 : 0,
                        y: openDropdown === item.key ? 8 : -8,
                        scale: openDropdown === item.key ? 1 : 0.95,
                        pointerEvents: openDropdown === item.key ? 'auto' : 'none'
                      }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute top-full left-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden"
                    >
                      <div className="py-3">
                        {item.subItems?.map((subItem, subIndex) => (
                          <motion.div
                            key={subIndex}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: subIndex * 0.05 }}
                          >
                            <Link
                              to={subItem.to}
                              onClick={() => setOpenDropdown(null)}
                              className={`block px-4 py-2.5 text-sm  capitalize transition-all duration-200 hover:pl-5 hover:translate-x-0.5 rounded ${
                                currentPath === subItem.to
                                  ? "text-blue-600 bg-blue-50/60 font-semibold"
                                  : "text-gray-700 hover:text-blue-600 hover:bg-blue-50/60"
                              }`}
                            >
                              {subItem.text}
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </>
                )}
              </motion.div>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <motion.button
              onClick={handleLogin}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden lg:flex px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              Login
            </motion.button>

            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="lg:hidden p-2 text-gray-700 rounded-lg hover:bg-blue-50/50 hover:text-blue-600 transition-all duration-300"
            >
              <motion.div
                animate={{ rotate: isMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.div>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      <motion.div
        initial={false}
        animate={{
          opacity: isMenuOpen ? 1 : 0,
          pointerEvents: isMenuOpen ? 'auto' : 'none'
        }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-40 lg:hidden"
        onClick={() => setIsMenuOpen(false)}
      >
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
      </motion.div>

      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isMenuOpen ? 0 : "100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 right-0 bottom-0 z-40 w-1/2 bg-white shadow-2xl lg:hidden overflow-y-auto"
      >
        <motion.div 
          className="py-6 px-4 space-y-2"
          initial={false}
          animate={isMenuOpen ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.2, delay: isMenuOpen ? 0.1 : 0 }}
        >
          <motion.button
            onClick={() => setIsMenuOpen(false)}
            className="flex justify-end w-full p-2 mb-4"
          >
            <X size={24} className="text-gray-700" />
          </motion.button>

          {navigationItems.map((item, index) => (
            <motion.div 
              key={index}
              initial={false}
              animate={isMenuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ delay: isMenuOpen ? index * 0.06 : 0 }}
            >
              {item.to ? (
                <Link
                  to={item.to}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                    currentPath === item.to
                      ? "text-blue-600 bg-blue-100/50 font-semibold"
                      : "text-gray-700 hover:text-blue-600 hover:bg-blue-100/50"
                  }`}
                >
                  {item.text}
                </Link>
              ) : (
                <>
                  <button
                    onClick={() => toggleDropdown(item.key)}
                    className="flex items-center justify-between w-full px-4 py-3 text-base font-medium text-gray-700 hover:bg-blue-100/50 hover:text-blue-600 rounded-lg transition-all duration-300"
                  >
                    <span>{item.text}</span>
                    <ChevronDown 
                      size={18}
                      className={`transition-transform duration-300 ${
                        openDropdown === item.key ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  
                  <motion.div
                    initial={false}
                    animate={{
                      height: openDropdown === item.key ? "auto" : 0,
                      opacity: openDropdown === item.key ? 1 : 0
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden bg-blue-100/30 rounded-lg ml-4 mr-1 mt-1 border border-blue-200/30"
                  >
                    <div className="py-2 space-y-1">
                      {item.subItems?.map((subItem, subIndex) => (
                        <motion.div
                          key={subIndex}
                          initial={false}
                          animate={openDropdown === item.key ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                          transition={{ delay: openDropdown === item.key ? subIndex * 0.05 : 0 }}
                        >
                          <Link
                            to={subItem.to}
                            onClick={() => {
                              setIsMenuOpen(false);
                              setOpenDropdown(null);
                            }}
                            className="block px-4 py-2.5 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-200/50 rounded-lg transition-all duration-300"
                          >
                            {subItem.text}
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </>
              )}
            </motion.div>
          ))}

          <motion.button
            onClick={() => {
              handleLogin();
              setIsMenuOpen(false);
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            className="w-full px-4 py-3.5 mt-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-base font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          >
            Login
          </motion.button>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Navbar;