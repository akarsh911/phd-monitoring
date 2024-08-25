import React from "react";
import Dashboard from "./pages/dashboard/Dashboard";
import SupDashboard from "./pages/dashboard/SupDashboardTemp";
import Login from "./pages/login/MacBookPro14";
import Home from "./pages/home/homepage";

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const App = () => {
  return (
    <div>
       <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/students" element={<SupDashboard/>}/>
          {/* <Route path="/dashboard/students/forms/irbconstitution/:id" element={<FormDashboard/>} /> */}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
