import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import MainContent from '../components/MainContent';

export default function Dashboard() {
  const [selectedPage, setSelectedPage] = useState('all-cases');
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('admin-auth');
    if (!isLoggedIn) {
      // 🔁 ป้องกันการวน loop redirect ซ้อน
      navigate('/admin/login', { replace: true });
    }
  }, [navigate]);

  return (
    <div className="flex h-screen w-full bg-gray-50 font-prompt">
      {/* ✅ Sidebar */}
      <Sidebar selectedPage={selectedPage} onSelectPage={setSelectedPage} />

      {/* ✅ Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto bg-[#f9fafb]">
          <MainContent selectedPage={selectedPage} />
        </main>
      </div>
    </div>
  );
}
