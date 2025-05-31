import React from 'react';
import FileManager from '../components/pages/FileManager';
import AddCaseForm from '../components/pages/AddCaseForm';
import AllCasesPage from '../components/pages/AllCasesPage';
import CaseReportPage from '../components/pages/CaseReportPage';
import UserManager from '../components/pages/UserManager'; // ✅ ต้อง import เข้ามาก่อน
import { FaUsers, FaPaperclip, FaSyncAlt, FaSignOutAlt } from 'react-icons/fa';

export default function MainContent({ selectedPage }) {
  return (
    <div className="flex-1 px-4 py-6 md:px-6 overflow-y-auto font-prompt bg-gray-50 min-h-screen">
      {selectedPage === 'all-cases' && <AllCasesPage />}
      {selectedPage === 'add-case' && <AddCaseForm />}
      {selectedPage === 'reports' && <CaseReportPage />}
      {selectedPage === 'file-manager' && <FileManager />}
      {selectedPage === 'users' && <UserManager />} {/* ✅ แสดงหน้านี้ */}

      {selectedPage === 'attachments' && (
        <div className="bg-white p-6 rounded-xl shadow text-gray-600 flex items-center gap-2">
          <FaPaperclip className="text-gray-500" />
          <span>จัดการเอกสารแนบ (ยังไม่เสร็จ)</span>
        </div>
      )}

      {selectedPage === 'updates' && (
        <div className="bg-white p-6 rounded-xl shadow text-gray-600 flex items-center gap-2">
          <FaSyncAlt className="text-gray-500" />
          <span>อัปเดตสถานะคดี (ยังไม่เสร็จ)</span>
        </div>
      )}

      {selectedPage === 'logout' && (
        <div className="bg-white p-6 rounded-xl shadow text-gray-700">
          <p className="mb-4 font-semibold">คุณต้องการออกจากระบบหรือไม่?</p>
          <button
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            onClick={() => {
              localStorage.removeItem('admin-auth');
              window.location.href = '/admin/login';
            }}
          >
            <FaSignOutAlt />
            ออกจากระบบ
          </button>
        </div>
      )}
    </div>
  );
}
