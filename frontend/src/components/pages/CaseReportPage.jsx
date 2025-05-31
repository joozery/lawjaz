import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaFileAlt, FaDownload, FaSearch } from 'react-icons/fa';
import { Toaster, toast } from 'react-hot-toast';

const API_BASE = 'https://lawserver-api-1c4073257400.herokuapp.com';

export default function CaseReportPage() {
  const [cases, setCases] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [courtFilter, setCourtFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  const fetchCases = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/cases`);
      setCases(res.data);
      setFiltered(res.data);
    } catch (err) {
      console.error(err);
      toast.error('เกิดข้อผิดพลาดในการโหลดข้อมูลรายงาน');
    }
  };

  useEffect(() => {
    fetchCases();
  }, []);

  const handleFilter = () => {
    const filteredData = cases.filter((item) => {
      return (
        (!courtFilter || item.court.includes(courtFilter)) &&
        (!typeFilter || item.case_type === typeFilter)
      );
    });
    setFiltered(filteredData);
  };

  const exportToCSV = () => {
    toast.success('ส่งออกเป็น CSV เรียบร้อยแล้ว (mock)');
  };

  return (
    <div className="p-6 font-prompt bg-gray-50 min-h-screen">
      <Toaster position="top-right" />

      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <FaFileAlt className="text-purple-600 text-2xl" />
          <h1 className="text-2xl font-bold text-purple-800">รายงานคดี</h1>
        </div>

        {/* Filter Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <input
            type="text"
            placeholder="ค้นหาศาล เช่น ศาลแพ่ง"
            className="border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={courtFilter}
            onChange={(e) => setCourtFilter(e.target.value)}
          />
          <select
            className="border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="">ประเภททั้งหมด</option>
            <option value="แพ่ง">แพ่ง</option>
            <option value="อาญา">อาญา</option>
            <option value="แรงงาน">แรงงาน</option>
            <option value="ปกครอง">ปกครอง</option>
          </select>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-all shadow-sm"
            onClick={handleFilter}
          >
            <FaSearch />
            กรองข้อมูล
          </button>
        </div>

        {/* Export Button */}
        <div className="flex justify-end mb-4">
          <button
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-all shadow-sm"
            onClick={exportToCSV}
          >
            <FaDownload />
            ส่งออกเป็น CSV
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border border-gray-200">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">ลูกความ</th>
                <th className="px-4 py-3">ประเภท</th>
                <th className="px-4 py-3">ศาล</th>
                <th className="px-4 py-3">วันที่รับเรื่อง</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, index) => (
                <tr key={item.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-500">{index + 1}</td>
                  <td className="px-4 py-3">{item.client_name}</td>
                  <td className="px-4 py-3">{item.case_type}</td>
                  <td className="px-4 py-3">{item.court}</td>
                  <td className="px-4 py-3">
                    {item.date_received
                      ? new Date(item.date_received).toLocaleDateString('th-TH')
                      : '-'}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    ไม่พบข้อมูลที่ตรงกับเงื่อนไข
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
