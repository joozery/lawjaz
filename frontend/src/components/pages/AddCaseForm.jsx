import React, { useState } from 'react';
import axios from 'axios';
import { FaSave, FaPlusCircle } from 'react-icons/fa';
import { Toaster, toast } from 'react-hot-toast';

const API_BASE = 'https://lawserver-api-1c4073257400.herokuapp.com';

export default function AddCasePage() {
  const [form, setForm] = useState({
    caseCode: '',
    clientName: '',
    caseType: '',
    court: '',
    date: '',
    details: '',
  });

  const [loading, setLoading] = useState(false);

  const caseTypes = ['แพ่ง', 'อาญา', 'แรงงาน', 'ปกครอง', 'อื่นๆ'];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${API_BASE}/api/cases/add`, form);
      toast.success('✅ บันทึกคดีสำเร็จ');
      setForm({
        caseCode: '',
        clientName: '',
        caseType: '',
        court: '',
        date: '',
        details: '',
      });
    } catch (err) {
      console.error(err);
      toast.error('❌ เกิดข้อผิดพลาดในการบันทึก');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 font-prompt bg-gray-50 min-h-screen">
      <Toaster position="top-right" />

      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <FaPlusCircle className="text-blue-700 text-3xl" />
          <h1 className="text-3xl font-bold text-blue-800">เพิ่มคดีใหม่</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium text-gray-700 mb-1">รหัสคดี</label>
              <input
                type="text"
                name="caseCode"
                value={form.caseCode}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                placeholder="ระบุรหัสคดี เช่น LAW001"
                required
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700 mb-1">วันที่รับเรื่อง</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium text-gray-700 mb-1">ชื่อลูกความ</label>
              <input
                type="text"
                name="clientName"
                value={form.clientName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                placeholder="ชื่อ - นามสกุล"
                required
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">ประเภทคดี</label>
              <select
                name="caseType"
                value={form.caseType}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                required
              >
                <option value="">-- เลือกประเภทคดี --</option>
                {caseTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">ศาลที่เกี่ยวข้อง</label>
            <input
              type="text"
              name="court"
              value={form.court}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              placeholder="ระบุชื่อศาล"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">รายละเอียดเพิ่มเติม</label>
            <textarea
              name="details"
              value={form.details}
              onChange={handleChange}
              rows="4"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              placeholder="รายละเอียดเกี่ยวกับคดี"
            />
          </div>

          <div className="text-right">
            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
            >
              <FaSave />
              {loading ? 'กำลังบันทึก...' : 'บันทึกคดี'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
