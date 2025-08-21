import axios from "axios";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import React, { useState, useEffect, startTransition, useRef } from "react";
import { useNavigate, NavLink, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [hidden, setHidden] = useState(false);
  const navRef = useRef(null);
  const { scrollY } = useScroll();
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  // Click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setOpenDropdown(null);
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Navbar hide/show on scroll
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > 100 && latest > previous) setHidden(true);
    else if (latest < previous) setHidden(false);
  });

  const handleLogin = async () => {
    try {
      const flag = localStorage.getItem("flag");
      console.log("Flag status:", flag);  

      if (flag === "true") {
        startTransition(() => navigate("/Adminoutlet/AdminHome"));
      } else {
        startTransition(() => navigate("/login"));
      }
    } catch (error) {
      console.error("Error checking login status:", error);
      startTransition(() => navigate("/login"));
    }
  };

  const toggleDropdown = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

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
      ]
    },
    {
      text: "Our Courses",
      key: "courses",
      subItems: [
        { to: "/Primary", text: "Primary" },
        { to: "/Secondary", text: "Secondary" },
        { to: "/technical", text: "Engineering" },
      ]
    },
    { to: "/Gallery", text: "Our Gallery" },
    { to: "/Contactus", text: "Contact Us" },
  ];

  return (
    <motion.nav
      ref={navRef}
      animate={hidden ? "hidden" : "visible"}
      variants={{
        hidden: { y: "-100%", opacity: 0 },
        visible: { y: 0, opacity: 1 },
      }}
      transition={{ duration: 0.3 }}
      className="bg-white/95 backdrop-blur-md shadow-lg px-4 py-3 fixed top-0 left-0 right-0 z-50 border-b border-blue-200/50"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.02 }}
          >
            <motion.img
              src="/image/logo.webp"
              alt="School Logo"
              className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover ring-2 ring-blue-500/40 shadow-md"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.2 }}
            />
            <div className="hidden sm:block text-gray-800">
              <motion.h1 
                className="text-sm lg:text-base xl:text-lg font-bold leading-tight text-gray-800"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                Shree Bagh Bhairav Technical Secondary School
              </motion.h1>
              <p className="text-xs text-gray-600">Mahankal-4, Kaleshowar, Lalitpur</p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item, index) => (
              <motion.div 
                key={index} 
                className="relative"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {item.to ? (
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-blue-50 hover:shadow-md hover:scale-105 ${
                        isActive 
                          ? "text-blue-600 bg-blue-100 shadow-inner ring-1 ring-blue-300/50" 
                          : "text-gray-700 hover:text-blue-600"
                      }`
                    }
                  >
                    {item.text}
                  </NavLink>
                ) : (
                  <>
                    <button
                      onClick={() => toggleDropdown(item.key)}
                      className="flex items-center px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 hover:shadow-md transition-all duration-300 hover:scale-105"
                    >
                      {item.text}
                      <motion.svg
                        animate={{ rotate: openDropdown === item.key ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="ml-1 h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </motion.svg>
                    </button>
                    
                    {/* Desktop Dropdown */}
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{
                        opacity: openDropdown === item.key ? 1 : 0,
                        y: openDropdown === item.key ? 0 : -10,
                        scale: openDropdown === item.key ? 1 : 0.95
                      }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className={`absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 backdrop-blur-md ${
                        openDropdown === item.key ? 'visible' : 'invisible'
                      }`}
                    >
                      <div className="py-3">
                        {item.subItems?.map((subItem, subIndex) => (
                          <motion.div
                            key={subIndex}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: subIndex * 0.05 }}
                          >
                            <NavLink
                              to={subItem.to}
                              onClick={() => setOpenDropdown(null)}
                              className={({ isActive }) =>
                                `block px-4 py-2 text-sm transition-all duration-200 hover:bg-blue-50 hover:pl-6 ${
                                  isActive 
                                    ? "text-blue-600 bg-blue-100 border-l-2 border-blue-500" 
                                    : "text-gray-700 hover:text-blue-600"
                                }`
                              }
                            >
                              {subItem.text}
                            </NavLink>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </>
                )}
              </motion.div>
            ))}
          </div>

          {/* Login Button & Mobile Menu Toggle */}
          <div className="flex items-center space-x-3">
            <motion.button
              onClick={handleLogin}
              whileHover={{ scale: 1.05, boxShadow: "0 8px 20px rgba(59, 130, 246, 0.25)" }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg shadow-md transition-all duration-300"
            >
              Login
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="lg:hidden p-2 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-300"
            >
              <motion.svg
                animate={{ rotate: isMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </motion.svg>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{
            height: isMenuOpen ? "auto" : 0,
            opacity: isMenuOpen ? 1 : 0
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="lg:hidden overflow-hidden"
        >
          <motion.div 
            className="py-4 space-y-2 border-t border-gray-200 mt-3 bg-gray-50/50 rounded-lg"
            initial={false}
            animate={isMenuOpen ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3, delay: isMenuOpen ? 0.1 : 0 }}
          >
            {navigationItems.map((item, index) => (
              <motion.div 
                key={index}
                initial={false}
                animate={isMenuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: isMenuOpen ? index * 0.1 : 0 }}
              >
                {item.to ? (
                  <NavLink
                    to={item.to}
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-blue-100 hover:pl-6 hover:shadow-md ${
                        isActive 
                          ? "text-blue-600 bg-blue-100 border-l-4 border-blue-500 shadow-inner" 
                          : "text-gray-700 hover:text-blue-600"
                      }`
                    }
                  >
                    <span className="flex items-center">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 opacity-60"></span>
                      {item.text}
                    </span>
                  </NavLink>
                ) : (
                  <>
                    <button
                      onClick={() => toggleDropdown(item.key)}
                      className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-gray-700 hover:bg-blue-100 hover:text-blue-600 rounded-xl transition-all duration-300 hover:shadow-md"
                    >
                      <span className="flex items-center">
                        <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 opacity-60"></span>
                        {item.text}
                      </span>
                      <motion.svg
                        animate={{ rotate: openDropdown === item.key ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </motion.svg>
                    </button>
                    
                    {/* Mobile Dropdown */}
                    <motion.div
                      initial={false}
                      animate={{
                        height: openDropdown === item.key ? "auto" : 0,
                        opacity: openDropdown === item.key ? 1 : 0
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden bg-blue-50 rounded-lg ml-4 mr-2 mt-2 border border-blue-200"
                    >
                      <div className="py-2 space-y-1">
                        {item.subItems?.map((subItem, subIndex) => (
                          <motion.div
                            key={subIndex}
                            initial={false}
                            animate={openDropdown === item.key ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                            transition={{ delay: openDropdown === item.key ? subIndex * 0.05 : 0 }}
                          >
                            <NavLink
                              to={subItem.to}
                              onClick={() => {
                                setIsMenuOpen(false);
                                setOpenDropdown(null);
                              }}
                              className={({ isActive }) =>
                                `block px-4 py-2 text-sm rounded-lg transition-all duration-300 hover:bg-blue-100 hover:pl-6 ${
                                  isActive 
                                    ? "text-blue-600 bg-blue-200 border-l-2 border-blue-500" 
                                    : "text-gray-600 hover:text-blue-600"
                                }`
                              }
                            >
                              <span className="flex items-center">
                                <span className="w-1.5 h-1.5 bg-blue-300 rounded-full mr-3 opacity-70"></span>
                                {subItem.text}
                              </span>
                            </NavLink>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </>
                )}
              </motion.div>
            ))}
            
            {/* Mobile School Info */}
            <motion.div 
              className="sm:hidden mt-6 pt-4 border-t border-gray-200"
              initial={false}
              animate={isMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ delay: 0.3 }}
            >
              <div className="px-4 py-2 text-center">
                <h2 className="text-sm font-semibold text-gray-800 leading-tight">
                  Shree Bagh Bhairav Technical Secondary School
                </h2>
                <p className="text-xs text-gray-600 mt-1">Mahankal-4, Kaleshowar, Lalitpur</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;