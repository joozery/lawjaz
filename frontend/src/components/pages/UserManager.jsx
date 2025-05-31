import React, { useEffect, useState } from 'react';
import { FaUsers, FaUserEdit, FaTrash } from 'react-icons/fa';
import { Toaster } from 'react-hot-toast';

export default function UserManager() {
  const [users, setUsers] = useState([]);

  // ✅ ข้อมูล mockup สำหรับทนาย
  const mockLawyers = [
    { id: 1, name: 'ทนาย สมชาย พิทักษ์สิทธิ์', email: 'somchai@lawjaz.com', role: 'ทนายแพ่ง' },
    { id: 2, name: 'ทนาย สุนีย์ วรากุล', email: 'sunee@lawjaz.com', role: 'ทนายอาญา' },
    { id: 3, name: 'ทนาย พิเชษฐ์ ทนายแรงงาน', email: 'pichet@lawjaz.com', role: 'ทนายแรงงาน' },
    { id: 4, name: 'ทนาย ณิชา พงศ์ธนากร', email: 'nicha@lawjaz.com', role: 'ทนายปกครอง' },
    { id: 5, name: 'ทนาย ธนพล นิติธรรม', email: 'thanapon@lawjaz.com', role: 'ทนายที่ปรึกษา' },
  ];

  useEffect(() => {
    setUsers(mockLawyers);
  }, []);

  return (
    <div className="p-6 font-prompt bg-gray-50 min-h-screen">
      <Toaster position="top-right" />

      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <FaUsers className="text-blue-700 text-2xl" />
          <h1 className="text-2xl font-bold text-blue-800">จัดการผู้ใช้งาน</h1>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-gray-200">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2 text-left">#</th>
                <th className="px-4 py-2 text-left">ชื่อผู้ใช้งาน</th>
                <th className="px-4 py-2 text-left">อีเมล</th>
                <th className="px-4 py-2 text-left">บทบาท</th>
                <th className="px-4 py-2 text-right">การจัดการ</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, idx) => (
                <tr key={u.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2 text-gray-500">{idx + 1}</td>

                  <td className="px-4 py-2 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-400 text-white flex items-center justify-center font-bold uppercase">
                      {u.name[6] || u.name[0]}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">{u.name}</div>
                      <div className="text-xs text-gray-500 italic">{u.email}</div>
                    </div>
                  </td>

                  <td className="px-4 py-2">{u.email}</td>

                  <td className="px-4 py-2">
                    <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                      {u.role}
                    </span>
                  </td>

                  <td className="px-4 py-2 text-right">
                    <button className="text-blue-600 hover:text-blue-800 mr-3">
                      <FaUserEdit />
                    </button>
                    <button className="text-red-500 hover:text-red-700">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-500">
                    ไม่พบข้อมูลผู้ใช้งาน
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
