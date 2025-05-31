import React from 'react';
import {
  FaGavel,
  FaPlusCircle,
  FaFileAlt,
  FaUsers,
  FaPaperclip,
  FaSyncAlt,
  FaFolderOpen, // ✅ ไอคอนใหม่สำหรับเมนูจัดการไฟล์
} from 'react-icons/fa';
import logo from '../assets/logolaw.png';

export default function Sidebar({ selectedPage, onSelectPage }) {
  const menu = [
    {
      group: 'OVERVIEW',
      items: [
        { key: 'all-cases', label: 'คดีทั้งหมด', icon: <FaGavel /> },
        { key: 'add-case', label: 'เพิ่มคดีใหม่', icon: <FaPlusCircle /> },
        { key: 'reports', label: 'รายงานคดี', icon: <FaFileAlt /> },
      ],
    },
    {
      group: 'MANAGEMENT',
      items: [
        { key: 'users', label: 'ผู้ใช้งาน', icon: <FaUsers /> },
        { key: 'attachments', label: 'เอกสารแนบ', icon: <FaPaperclip /> },
        { key: 'file-manager', label: 'จัดการไฟล์', icon: <FaFolderOpen /> }, // ✅ เมนูใหม่
        { key: 'updates', label: 'อัปเดตสถานะ', icon: <FaSyncAlt /> },
      ],
    },
  ];

  return (
    <aside className="w-64 h-screen bg-gradient-to-b from-white to-gray-50 shadow-xl border-r border-gray-200 p-5 font-prompt">
      {/* LOGO */}
      <div className="flex items-center gap-3 mb-10 px-2">
        <img src={logo} alt="Lawjaz Logo" className="w-10 h-10 object-contain drop-shadow" />
        <h1 className="text-2xl font-extrabold text-gray-700 tracking-wide">
          <span className="text-green-500">LAW</span><span className="text-gray-800">JAZ</span>
        </h1>
      </div>

      {/* Menu */}
      <nav className="space-y-8">
        {menu.map((group, idx) => (
          <div key={idx}>
            <h4 className="text-[11px] font-semibold text-gray-400 uppercase mb-2 px-2">
              {group.group}
            </h4>
            <ul className="space-y-1">
              {group.items.map((item) => {
                const isActive = selectedPage === item.key;
                return (
                  <li
                    key={item.key}
                    onClick={() => onSelectPage(item.key)}
                    className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 group
                      ${isActive
                        ? 'bg-green-100 text-green-700 font-semibold shadow-sm'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-green-600'}
                    `}
                  >
                    <div className="text-[16px]">{item.icon}</div>
                    <div className="text-sm">{item.label}</div>
                    <div
                      className={`ml-auto h-2 w-2 rounded-full transition ${
                        isActive ? 'bg-green-500 scale-100' : 'scale-0'
                      }`}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
