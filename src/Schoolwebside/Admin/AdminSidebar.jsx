// Sidebar.jsx
import React, { useState, useRef, useEffect, useMemo, startTransition } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {getdata,logoutMee} from "../redux/slicer/mee.js";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  HomeIcon,
  UserIcon,
  ShoppingCartIcon,
  CubeIcon,
  UserGroupIcon,
  Bars3Icon,
  XMarkIcon,
  TagIcon,
  BuildingStorefrontIcon,
  MagnifyingGlassIcon,
  BanknotesIcon,
  Cog6ToothIcon,
  LifebuoyIcon,
  ChatBubbleLeftRightIcon,
  AcademicCapIcon,
  ClipboardDocumentListIcon,
  TrophyIcon,
  BellIcon,
  UsersIcon,
  UserPlusIcon,
  BookOpenIcon,
  ChartBarIcon,
  PlusCircleIcon,
  PencilSquareIcon,
  EyeIcon,
} from '@heroicons/react/24/outline';
import {
  Table2Icon,
  ShieldCheckIcon,
  BadgeDollarSignIcon,
  Settings2Icon,
  LogOut as LogoutIcon,
  GraduationCap,
  Users,
  MessageSquare,
} from 'lucide-react';

import { motion, AnimatePresence } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

const cn = (...inputs) => twMerge(clsx(inputs));

export const SidebarContext = React.createContext();

const Sidebar = ({ children }) => {
  const dispatch = useDispatch();
  const { data = [], loading = false, error, students } = useSelector(state => state.mee || {});
  console.log(data);
  
  useEffect(() => {
    if (loading) return;
    if (data.length === 0) {
      dispatch(getdata());
    }
  }, [dispatch]);

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredItem, setHoveredItem] = useState(null);
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  /* ---------- helpers ---------- */
  const isMenuItemActive = (path) =>
    location.pathname === path ||
    (location.pathname.startsWith(path) && (path !== '/' || location.pathname === '/'));

  const toggleCategory = (categoryId) =>
    setExpandedCategory((prev) => (prev === categoryId ? null : categoryId));

const menuCategories = useMemo(
  () => [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: ChartBarIcon,
      items: [{ icon: HomeIcon, label: 'Overview', to: '/Adminoutlet/AdminHome' }],
    },
    {
      id: 'Teachers',
      label: 'Teachers',
      icon: AcademicCapIcon,
      items: [
        { icon: UsersIcon, label: 'Teacher List', to: '/Adminoutlet/TeacherForm' },
        { icon: Table2Icon, label: 'Role and Position', to: '/Adminoutlet/role' },
      ],
    },
    {
      id: 'Account',
      label: 'Account',
      icon: UserPlusIcon,
      items: [
        { icon: PlusCircleIcon, label: 'Create New Account', to: '/Adminoutlet/Account' },
        { icon: UserPlusIcon, label: 'Add Teacher', to: '/Adminoutlet/AddTeacher' },
      ],
    },
    {
      id: 'User Message',
      label: 'User Message',
      icon: MessageSquare,
      items: [
        { icon: ChatBubbleLeftRightIcon, label: 'View Messages', to: '/Adminoutlet/notic' },
        { icon: ShieldCheckIcon, label: 'Principal', to: '/Adminoutlet/Princaple' },
        { icon: EyeIcon, label: 'Display Principal', to: '/Adminoutlet/ShowPrincipal' },
        { icon: MessageSquare, label: 'Testimonials', to: '/Adminoutlet/ShowTestimonials' },
        { icon: MessageSquare, label: 'Gallery', to: '/Adminoutlet/ShowGallery' },
      ],
    },
    {
      id: 'Students',
      label: 'Students',
      icon: GraduationCap,
      items: [
        { icon: Users, label: 'Student List', to: '/Adminoutlet/ClassStudentList' },
        { icon: BookOpenIcon, label: 'Student Marks', to: '/Adminoutlet/Marks' },
        { icon: UserPlusIcon, label: 'Add Students', to: '/Adminoutlet/AddStudent' },
      ],
    },
    {
      id: 'view and edit Notice',
      label: 'Notice Management',
      icon: BellIcon,
      items: [
        { icon: PlusCircleIcon, label: 'Add New Notice', to: '/Adminoutlet/Publicnotic' },
        { icon: PencilSquareIcon, label: 'Edit Notice', to: '/Adminoutlet/DisplayPublicnotic' },
      ],
    },
    {
      id: 'achievements',
      label: 'Achievements',
      icon: TrophyIcon,
      items: [
        { icon: PlusCircleIcon, label: 'Add New Achievements', to: '/Adminoutlet/Achievements' },
        { icon: PencilSquareIcon, label: 'Edit Achievements', to: '/Adminoutlet/DisplayAchievements' },
      ],
    },
  ],
  []
);

  /* ---------- filtered menu ---------- */
  const filteredCategories = useMemo(() => {
    if (!searchQuery) return menuCategories;
    return menuCategories
      .map((cat) => ({
        ...cat,
        items: cat.items.filter((item) =>
          item.label.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      }))
      .filter((cat) => cat.items.length > 0);
  }, [searchQuery, menuCategories]);

  /* ---------- side effects ---------- */
  useEffect(() => {
    const activeCat = menuCategories.find((cat) =>
      cat.items.some((item) => isMenuItemActive(item.to))
    );
    if (activeCat) setExpandedCategory(activeCat.id);
  }, [location.pathname, menuCategories]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setIsProfileOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => setIsMobileOpen(false), [location.pathname]);

  /* ---------- logout ---------- */
  const handleLogout = async () => {
    try {
      dispatch(logoutMee());
      startTransition(() => navigate('/login'));
    } catch {
      dispatch(logoutMee());
      startTransition(() => navigate('/login'));
    }
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey) {
        if (e.key === 'k') {
          e.preventDefault();
          setIsCollapsed(false);
          setTimeout(() => searchRef.current?.focus(), 300);
        }
        if (e.key === '.') {
          e.preventDefault();
          setIsCollapsed((c) => !c);
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <SidebarContext.Provider value={{ isCollapsed }}>
      {/* mobile overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-30 lg:hidden backdrop-blur-sm"
            onClick={() => setIsMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* SIDEBAR */}
      <motion.aside
        animate={{ width: isCollapsed ? 64 : 230 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className={cn(
          'fixed top-0 left-0 h-screen bg-white border-r border-gray-200 z-40 flex flex-col shadow-lg',
          'text-gray-800',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* header */}
        <div className="flex items-center h-11 px-3 border-b border-gray-200 shrink-0">
          {isCollapsed ? (
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-sm">
              <span className="font-bold text-white text-xs">A</span>
            </div>
          ) : (
            <span className="font-bold text-xs">
              <div className="flex">
                <Link to="/" className="flex items-center space-x-2">
                  <HomeIcon className="h-4 w-4 text-blue-600" />
                  <span className="text-blue-600">Admin Panel</span>
                </Link>
              </div>
            </span>
          )}
          <button
            onClick={() => setIsMobileOpen(false)}
            className="ml-auto text-gray-500 hover:text-gray-900 lg:hidden"
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
        </div>

        {/* search */}
        {!isCollapsed && (
          <div className="px-3 py-2">
            <input
              ref={searchRef}
              type="text"
              placeholder="Search… (⌘+K)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 rounded-md px-2 py-1 text-xs placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        )}

        {/* navigation */}
        <nav className="flex-1 px-2 space-y-1 overflow-y-auto custom-scrollbar py-2">
          {filteredCategories.map((cat) => (
            <div key={cat.id}>
              {!isCollapsed && (
                <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-2 pt-3 pb-1">
                  {cat.label}
                </div>
              )}
              {isCollapsed && <div className="h-3" />}

              <AnimatePresence>
                {cat.items.map((item) => (
                  <motion.div
                    key={item.to}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.15 }}
                    className="my-0.5 relative"
                    onMouseEnter={() => setHoveredItem(item.to)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <Link
                      to={item.to}
                      className={cn(
                        'flex items-center p-2 rounded-md text-xs transition-all duration-200',
                        isMenuItemActive(item.to)
                          ? 'bg-blue-50 text-blue-700 font-medium border-l-3 border-blue-500 shadow-sm'
                          : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600',
                        isCollapsed ? 'justify-center' : ''
                      )}
                      title={isCollapsed ? item.label : ''}
                    >
                      <item.icon className="w-4 h-4 shrink-0" />
                      {!isCollapsed && <span className="ml-2">{item.label}</span>}
                    </Link>
                    
                    {/* Tooltip for collapsed sidebar */}
                    {isCollapsed && hoveredItem === item.to && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded-md shadow-lg z-50 whitespace-nowrap top-1/2 transform -translate-y-1/2"
                      >
                        {item.label}
                        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-800 rotate-45"></div>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ))}

          {/* "Not found" state */}
          {filteredCategories.length === 0 && searchQuery && (
            <div className="px-3 py-8 text-center text-gray-400 text-xs">
              <MagnifyingGlassIcon className="w-8 h-8 mx-auto mb-2 opacity-40" />
              No results for "{searchQuery}".
            </div>
          )}
        </nav>

        {/* footer toggle */}
        <div className="px-2 py-2 border-t border-gray-200">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex w-full items-center justify-center p-1.5 rounded-md text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition-colors"
          >
            {isCollapsed ? (
              <ChevronRightIcon className="w-4 h-4" />
            ) : (
              <ChevronLeftIcon className="w-4 h-4" />
            )}
          </button>
        </div>
      </motion.aside>

      {/* HEADER BAR */}
      <header
        className={cn(
          'fixed top-0 right-0 h-11 bg-white border-b border-gray-200 z-30 flex items-center shadow-sm',
          'left-0 lg:left-[230px]',
          isCollapsed && 'lg:left-16'
        )}
      >
        <button
          onClick={() => setIsMobileOpen(true)}
          className="p-1 rounded-md text-gray-500 hover:text-gray-900 lg:hidden ml-2"
        >
          <Bars3Icon className="w-4 h-4" />
        </button>

        {/* profile dropdown */}
        <div className="ml-auto relative mr-3" ref={dropdownRef}>
          <button
            onClick={() => setIsProfileOpen((p) => !p)}
            className="flex items-center space-x-2 p-1 rounded-lg hover:bg-blue-50 transition-colors"
          >
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-xs">
              {data?.name?.[0] || 'A'}
            </div>
            <div className="hidden md:block text-left">
              <p className="text-[10px] font-medium text-gray-800">{data.name}</p>
              <p className="text-[10px] text-gray-500">{data.role}</p>
            </div>
          </button>

          <AnimatePresence>
            {isProfileOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden"
              >
                <div className="p-3 border-b border-gray-100">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-xs">
                      {data?.name?.[0] || 'A'}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-800">{data.name}</p>
                      <p className="text-[10px] text-gray-500">{data.email}</p>
                      <p className="text-[10px] text-gray-500">{data.role}</p>
                    </div>
                  </div>
                </div>
                <div className="p-1">
                  <Link
                    to="/Adminoutlet/profile"
                    className="flex items-center space-x-2 px-2 py-1.5 rounded-md text-xs text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  >
                    <UserIcon className="w-3 h-3" />
                    <span>My Profile</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-2 px-2 py-1.5 rounded-md text-xs text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  >
                    <LogoutIcon className="w-3 h-3" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main
        className={cn(
          'min-h-screen pt-11',
          'ml-0 lg:ml-[230px]',
          isCollapsed && 'lg:ml-16'
        )}
      >
        <div className="p-3 md:p-4">{children}</div>
      </main>
    </SidebarContext.Provider>
  );
};

export default Sidebar;