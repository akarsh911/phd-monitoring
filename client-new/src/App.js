import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Use Routes instead of Switch
import './App.css';
import HomePage from './pages/home/HomePage';
import Layout from './components/dashboard/layout';
import LoginPage from './pages/login/Login';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
     <ToastContainer
                position="top-right"
                hideProgressBar={true}
                closeOnClick
                autoClose={3000}
                toastStyle={{
                  backgroundColor: "#fff",
                }}
              />
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<LoginPage/>} />
		<Route path="/home" element={<Layout/>} />
		<Route path="/home/forms" element={<Layout/>} />
        {/* <Route 
          path="/admin" 
          element={
            <PrivateRoute 
              component={AdminPage} 
              allowedRoles={['admin']} 
              userRole={userRole} 
            />
          } 
        />
        <Route 
          path="/user" 
          element={
            <PrivateRoute 
              component={UserPage} 
              allowedRoles={['user', 'admin']} 
              userRole={userRole} 
            />
          } 
        />
        <Route path="/unauthorized" element={<UnauthorizedPage/>} /> */}
      </Routes>
    </Router>
    </>
  );
};

export default App;
