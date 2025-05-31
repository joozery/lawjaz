import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* ✅ redirect ไปยัง dashboard ถ้ามาที่ / */}
        <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />

        {/* ✅ หน้าหลักหลัง login */}
        <Route path="/admin/dashboard" element={<Dashboard />} />

        {/* TODO: เพิ่มหน้า login ถ้ามี */}
      </Routes>
    </Router>
  );
}

export default App;
