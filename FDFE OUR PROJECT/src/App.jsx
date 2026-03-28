import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import AdminModule from './components/Admin/AdminModule';
import UserModule from './components/User/UserModule';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { currentUser } = useAppContext();
  
  if (!currentUser) return <Navigate to="/" replace />;
  if (currentUser.role !== requiredRole) {
    return <Navigate to={`/${currentUser.role}`} replace />;
  }
  
  return children;
};

const App = () => {
  return (
    <AppProvider>
      <Router>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth/:type" element={<AuthPage />} />
            <Route path="/admin/*" element={
              <ProtectedRoute requiredRole="admin">
                <AdminModule />
              </ProtectedRoute>
            } />
            <Route path="/user/*" element={
              <ProtectedRoute requiredRole="user">
                <UserModule />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
};

export default App;
