import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';

import Dashboard from './pages/dashboard/Dashboard';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};


export default App
