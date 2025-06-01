import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import loginImage from '../../assets/illustration-login2.jpg';

const API_URL = 'https://lawserver-api-1c4073257400.herokuapp.com/api/login';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post(API_URL, form);
      const { token, user } = res.data;

      // ✅ เก็บ token และ user ลง localStorage
      localStorage.setItem('admin-auth', token);
      localStorage.setItem('user', JSON.stringify(user));

      // ✅ ไปหน้า dashboard
      navigate('/admin/dashboard');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-white">
      {/* ซ้าย: ภาพประกอบ */}
      <div className="hidden md:flex flex-col justify-center items-center bg-gray-0">
        <img
          src={loginImage}
          alt="Welcome Illustration"
          className="w-3/4 max-w-md"
        />
        <h2 className="mt-8 text-2xl font-bold text-gray-800">Hi, Welcome back</h2>
        <p className="text-gray-500">เข้าสู่ระบบเพื่อเริ่มต้นการจัดการคดีความ</p>
      </div>

      {/* ขวา: แบบฟอร์ม */}
      <div className="flex flex-col justify-center items-center px-8 md:px-20">
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
          {/* แจ้งเตือน */}
          {error && (
            <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
              placeholder="demo@minimals.cc"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
