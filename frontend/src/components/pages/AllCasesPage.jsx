import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaFolderOpen, FaEdit, FaEllipsisV } from 'react-icons/fa';
import { Toaster, toast } from 'react-hot-toast';
import { useLoading, Oval } from '@agney/react-loading';

const API_BASE = 'https://lawserver-api-1c4073257400.herokuapp.com';

export default function AllCasesPage() {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCase, setEditingCase] = useState(null);

  const { containerProps, indicatorEl } = useLoading({
    loading,
    indicator: <Oval width="40" />,
  });

  const fetchCases = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/cases`);
      setCases(res.data);
    } catch (err) {
      console.error(err);
      toast.error('เกิดข้อผิดพลาดในการโหลดข้อมูลคดี');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCase = async () => {
    try {
      await axios.put(`${API_BASE}/api/cases/${editingCase.id}`, editingCase);
      toast.success('อัปเดตข้อมูลสำเร็จ');
      setEditingCase(null);
      fetchCases();
    } catch (err) {
      console.error(err);
      toast.error('ไม่สามารถอัปเดตข้อมูลได้');
    }
  };

  useEffect(() => {
    fetchCases();
  }, []);

  const getStatusBadge = (type) => {
    if (type === 'แพ่ง') return <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-800">แพ่ง</span>;
    if (type === 'อาญา') return <span className="px-2 py-1 text-xs rounded bg-red-100 text-red-800">อาญา</span>;
    if (type === 'แรงงาน') return <span className="px-2 py-1 text-xs rounded bg-yellow-100 text-yellow-800">แรงงาน</span>;
    if (type === 'ปกครอง') return <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-800">ปกครอง</span>;
    return <span className="px-2 py-1 text-xs rounded bg-gray-100 text-gray-600">อื่นๆ</span>;
  };

  return (
    <div className="font-prompt bg-gray-50 min-h-screen py-6 px-4 md:px-6">
      <Toaster position="top-right" />

      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <FaFolderOpen className="text-blue-700 text-2xl" />
          <h1 className="text-2xl font-bold text-blue-800">รายการคดีทั้งหมด</h1>
        </div>

        {loading ? (
          <div {...containerProps} className="flex justify-center py-16">
            {indicatorEl}
          </div>
        ) : cases.length === 0 ? (
          <p className="text-center text-gray-500 py-6">ไม่พบข้อมูลคดี</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border border-gray-200">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">ลูกความ</th>
                  <th className="px-4 py-3">รหัสคดี</th>
                  <th className="px-4 py-3">ประเภท</th>
                  <th className="px-4 py-3">ศาล</th>
                  <th className="px-4 py-3">วันที่รับเรื่อง</th>
                  <th className="px-4 py-3 text-right">การดำเนินการ</th>
                </tr>
              </thead>
              <tbody>
                {cases.map((item, index) => (
                  <tr key={item.id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-500">{index + 1}</td>

                    <td className="px-4 py-3 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-400 text-white flex items-center justify-center font-bold text-sm uppercase">
                        {item.client_name?.[0] || '?'}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800">{item.client_name}</div>
                        <div className="text-gray-500 text-xs italic">{item.case_code}</div>
                      </div>
                    </td>

                    <td className="px-4 py-3">{item.case_code}</td>
                    <td className="px-4 py-3">{getStatusBadge(item.case_type)}</td>
                    <td className="px-4 py-3">{item.court}</td>
                    <td className="px-4 py-3">
                      {item.date_received
                        ? new Date(item.date_received).toLocaleDateString('th-TH')
                        : '-'}
                    </td>

                    <td className="px-4 py-3 text-right">
                      <button
                        className="text-blue-600 hover:text-blue-800 mr-3"
                        onClick={() => setEditingCase(item)}
                      >
                        <FaEdit />
                      </button>
                      <button className="text-gray-500 hover:text-gray-700">
                        <FaEllipsisV />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal แก้ไขคดี */}
      {editingCase && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-xl shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-blue-700">
              แก้ไขคดี: {editingCase.case_code}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">ชื่อลูกความ</label>
                <input
                  type="text"
                  className="w-full border px-3 py-2 rounded"
                  value={editingCase.client_name}
                  onChange={(e) =>
                    setEditingCase({ ...editingCase, client_name: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">ศาล</label>
                <input
                  type="text"
                  className="w-full border px-3 py-2 rounded"
                  value={editingCase.court}
                  onChange={(e) =>
                    setEditingCase({ ...editingCase, court: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                onClick={() => setEditingCase(null)}
              >
                ยกเลิก
              </button>
              <button
                className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
                onClick={handleUpdateCase}
              >
                บันทึก
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
