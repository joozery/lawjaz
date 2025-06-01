import React, { useState } from 'react';
import { FaUser, FaSignOutAlt, FaCogs, FaFileAlt } from 'react-icons/fa';

export default function UserDrawer() {
  const [open, setOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user')) || {
    name: 'ชื่อผู้ใช้',
    email: 'user@example.com',
    avatar: 'https://i.pravatar.cc/40?img=12',
  };

  const handleLogout = () => {
    localStorage.removeItem('admin-auth');
    localStorage.removeItem('user');
    window.location.href = '/admin/login';
  };

  return (
    <div className="relative">
      {/* Avatar button */}
      <img
        src={user.avatar || 'https://i.pravatar.cc/40?img=12'}
        onClick={() => setOpen(!open)}
        className="w-9 h-9 rounded-full border border-gray-200 object-cover hover:ring-2 hover:ring-green-500 transition cursor-pointer"
        alt="avatar"
      />

      {/* Drawer */}
      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border z-50 font-prompt">
          <div className="p-4 border-b">
            <div className="font-semibold text-gray-800">{user.name}</div>
            <div className="text-sm text-gray-500">{user.email}</div>
          </div>

          <ul className="p-2 text-sm text-gray-700">
            <li className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded cursor-pointer">
              <FaUser /> โปรไฟล์
            </li>
            <li className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded cursor-pointer">
              <FaFileAlt /> เอกสารของฉัน
            </li>
            <li className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded cursor-pointer">
              <FaCogs /> การตั้งค่า
            </li>
          </ul>

          <div className="p-2 border-t">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 justify-center text-red-600 font-semibold py-2 hover:bg-red-50 rounded"
            >
              <FaSignOutAlt /> ออกจากระบบ
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
