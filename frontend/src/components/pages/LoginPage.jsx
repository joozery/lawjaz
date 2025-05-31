import React, { useState } from 'react';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login with:', form);
    // TODO: เรียก API ที่นี่
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-white">
      {/* ซ้าย: ภาพประกอบ */}
      <div className="hidden md:flex flex-col justify-center items-center bg-gray-50">
        <img
          src="/illustration-login.png"
          alt="Welcome Illustration"
          className="w-3/4 max-w-md"
        />
        <h2 className="mt-8 text-2xl font-bold text-gray-800">Hi, Welcome back</h2>
        <p className="text-gray-500">เข้าสู่ระบบเพื่อเริ่มต้นการจัดการคดีความ</p>
      </div>

      {/* ขวา: แบบฟอร์ม */}
      <div className="flex flex-col justify-center items-center px-8 md:px-20">
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
          {/* Notification bar */}
          <div className="bg-teal-50 border border-teal-200 text-sm text-teal-800 px-4 py-2 rounded">
            ใช้ <strong>demo@minimals.cc</strong> และรหัสผ่าน <strong>@2Minimal</strong> เพื่อเข้าสู่ระบบ
          </div>

          {/* Email */}
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

          {/* Password */}
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

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Sign in
          </button>

          <div className="text-center text-sm text-gray-500">
            ยังไม่มีบัญชี? <a href="#" className="text-green-600 hover:underline">สมัครสมาชิก</a>
          </div>
        </form>
      </div>
    </div>
  );
}
