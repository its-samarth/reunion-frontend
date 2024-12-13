import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
        <Route path="/" element={<ProtectedRoute component={<Login />} isLoginPage={true} />} />
        <Route path="/register" element={<ProtectedRoute component={<Register />} isLoginPage={true} />} />
        <Route path="/dashboard" element={<ProtectedRoute component={<Dashboard />} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;

