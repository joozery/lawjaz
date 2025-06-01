import React from 'react';
import { FaSearch, FaBell, FaUsers, FaCog } from 'react-icons/fa';
import UserDrawer from './UserDrawer'; // ✅ import component

export default function Header() {
  return (
    <header className="w-full bg-white h-16 flex items-center justify-end px-4 md:px-6 border-b shadow-sm font-prompt">
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="bg-gray-100 px-3 py-1.5 rounded-md flex items-center gap-2 text-sm text-gray-600 hover:shadow-sm cursor-pointer">
          <FaSearch />
          <kbd className="text-xs font-medium">⌘ K</kbd>
        </div>

        {/* Notifications */}
        <div className="relative cursor-pointer hover:scale-105 transition-transform">
          <FaBell className="text-gray-600 text-lg" />
          <span className="absolute -top-1 -right-2 text-[10px] bg-red-500 text-white rounded-full px-1.5 font-semibold">
            4
          </span>
        </div>

        {/* Users + Settings */}
        <FaUsers className="text-gray-600 hover:text-blue-500 cursor-pointer" />
        <FaCog className="text-gray-600 hover:text-blue-500 cursor-pointer" />

        {/* ✅ Avatar with dropdown */}
        <UserDrawer />
      </div>
    </header>
  );
}
