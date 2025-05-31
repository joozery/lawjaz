import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import LoginPage from './components/pages/LoginPage';

function PrivateRoute({ children }) {
  const isAuthenticated = localStorage.getItem('admin-auth');
  return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/admin/login" element={<LoginPage />} />

        {/* ✅ Protect dashboard route */}
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
