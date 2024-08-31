import React from "react";
import Dashboard from "./pages/dashboard/Dashboard";
import SupDashboard from "./pages/dashboard/SupDashboardTemp";
import Login from "./pages/login/MacBookPro14";
import Home from "./pages/home/homepage";
import ConstituteofIrb from "./pages/forms/ConstituteOfIrb/ConstituteOfIrb"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import IrbSup from "./pages/forms/IrbSubmissionSup";
import Forms from "./pages/dashboard/Forms";



const App = () => {
  return (
    <div>
       <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" element={<Login />} />
          
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/students" element={<SupDashboard type="students" />} />
          <Route path="/dashboard/forms/:id" element={<SupDashboard type="form" />} />

        </Routes>
      </Router>
    </div>
  );
};

export default App;
