import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Sidebar from './Sidebar';
import Header from './Header';
import { Home, Users, ClipboardList, LogOut } from 'lucide-react';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!user) return null;

  // Define navigation items based on user role
  const getNavItems = () => {
    const commonItems = [
      { name: 'Dashboard', href: '/', icon: Home },
    ];

    if (user.role === 'admin') {
      return [
        ...commonItems,
        { name: 'Doctors', href: '/doctors', icon: Users },
        { name: 'Patients', href: '/patients', icon: ClipboardList },
      ];
    }

    if (user.role === 'doctor') {
      return [
        ...commonItems,
        { name: 'Patient Records', href: '/records', icon: ClipboardList },
      ];
    }

    // Patient
    return [
      ...commonItems,
      { name: 'My Record', href: '/my-record', icon: ClipboardList },
    ];
  };

  const navItems = getNavItems();

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar for mobile */}
      <div 
        className={`fixed inset-0 z-40 md:hidden ${
          sidebarOpen ? 'block' : 'hidden'
        }`}
      >
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
        <div className="relative flex flex-col flex-1 w-full max-w-xs pt-5 pb-4 bg-cyan-800">
          <div className="flex items-center justify-between px-4">
            <div className="flex items-center">
              <span className="text-white text-xl font-bold">EHR System</span>
            </div>
            <button
              className="text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="mt-5 flex-1 h-0 overflow-y-auto">
            <nav className="px-2 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-white hover:bg-cyan-900"
                >
                  <item.icon className="mr-4 h-6 w-6 text-cyan-200" />
                  {item.name}
                </a>
              ))}
              <button
                onClick={handleLogout}
                className="w-full group flex items-center px-2 py-2 text-base font-medium rounded-md text-white hover:bg-cyan-900"
              >
                <LogOut className="mr-4 h-6 w-6 text-cyan-200" />
                Logout
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1">
            <div className="flex items-center h-16 flex-shrink-0 px-4 bg-cyan-800">
              <span className="text-white text-xl font-bold">EHR System</span>
            </div>
            <div className="flex-1 flex flex-col overflow-y-auto bg-cyan-800">
              <nav className="flex-1 px-2 py-4 space-y-1">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-white hover:bg-cyan-900"
                  >
                    <item.icon className="mr-3 h-6 w-6 text-cyan-200" />
                    {item.name}
                  </a>
                ))}
                <button
                  onClick={handleLogout}
                  className="w-full group flex items-center px-2 py-2 text-base font-medium rounded-md text-white hover:bg-cyan-900"
                >
                  <LogOut className="mr-3 h-6 w-6 text-cyan-200" />
                  Logout
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
          <button
            className="px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex items-center">
              <h1 className="text-2xl font-semibold text-gray-900">
                {user.role === 'admin' ? 'Admin Dashboard' : 
                 user.role === 'doctor' ? 'Doctor Dashboard' : 'Patient Dashboard'}
              </h1>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              <div className="flex items-center">
                <span className="text-gray-700 mr-2">{user.name}</span>
                <div className="h-8 w-8 rounded-full bg-cyan-700 flex items-center justify-center text-white">
                  {user.name.charAt(0)}
                </div>
              </div>
            </div>
          </div>
        </div>

        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;