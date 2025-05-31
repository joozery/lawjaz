import React from 'react';
import FileManager from '../components/pages/FileManager';
import AddCaseForm from '../components/pages/AddCaseForm';
import AllCasesPage from '../components/pages/AllCasesPage';
import CaseReportPage from '../components/pages/CaseReportPage'; // ✅ เพิ่มหน้านี้

export default function MainContent({ selectedPage }) {
  return (
    <div className="flex-1 p-6 overflow-y-auto font-prompt">
      {selectedPage === 'all-cases' && <AllCasesPage />}
      {selectedPage === 'add-case' && <AddCaseForm />}
      {selectedPage === 'reports' && <CaseReportPage />} {/* ✅ ใช้งานจริง */}

      {selectedPage === 'users' && <div>👥 จัดการผู้ใช้งาน (ยังไม่เสร็จ)</div>}
      {selectedPage === 'attachments' && <div>📎 จัดการเอกสารแนบ (ยังไม่เสร็จ)</div>}
      {selectedPage === 'updates' && <div>🔄 อัปเดตสถานะคดี (ยังไม่เสร็จ)</div>}

      {selectedPage === 'file-manager' && <FileManager />}

      {selectedPage === 'logout' && (
        <div>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={() => {
              localStorage.removeItem('admin-auth');
              window.location.href = '/admin/login';
            }}
          >
            ออกจากระบบ
          </button>
        </div>
      )}
    </div>
  );
}
