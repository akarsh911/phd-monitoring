import React from "react";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/MacBookPro14";
import Home from "./pages/home/homepage";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
