import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/home/HomePage';
import Layout from './components/dashboard/layout';
import LoginPage from './pages/login/Login';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoadingProvider, useLoading } from './context/LoadingContext'; // Remove useLoading import
import Loader from './components/loader/loader';
import FormsPage from './pages/forms/FormsPage';
import FormListPage from './pages/forms/FormListPage';
import MainFormPage from './pages/forms/MainFormPage';
import StudentsPage from './pages/students/StudentsPage';
import StudentProfile from './pages/students/StudentProfile';
import NotFound from './pages/404/NotFound';

const App = () => {
  return (
    <LoadingProvider>
      <AppContent />
    </LoadingProvider>
  );
};

const AppContent = () => {
  const { loading } = useLoading(); 
  const role=localStorage.getItem('userRole');
  return (
    <>
      {loading && <Loader />}
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
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          { role === 'student' && ( <>
          <Route path="/home" element={<Layout />} />
          <Route path="/forms" element={<FormsPage/>} />
          <Route path="/forms/:form_type" element={<FormListPage/>} />
          <Route path="/forms/:form_type/:id" element={<MainFormPage/>} /></>
          )}
          {(role === 'faculty' || role === 'phd_coordinator' || role==='hod' || role==='dordc'  || role==='dra' || role==='director') && (
            <>
                <Route path="/students" element={<StudentsPage />} />
                <Route path="/students/:roll_no" element={<StudentProfile />} />
                <Route path="/students/:roll_no/forms" element={<FormsPage />} />
                <Route path="/students/:roll_no/forms/:form_type" element={<FormListPage />} />
                <Route path="/students/:roll_no/forms/:form_type/:id" element={<MainFormPage />} />
            </>
          ) }
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
