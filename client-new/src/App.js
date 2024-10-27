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

const App = () => {
  return (
    <LoadingProvider>
      <AppContent />
    </LoadingProvider>
  );
};

const AppContent = () => {
  const { loading } = useLoading(); 

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
          <Route path="/home" element={<Layout />} />
          <Route path="/forms" element={<FormsPage/>} />
          <Route path="/forms/:form_type" element={<FormListPage/>} />
          <Route path="/forms/:form_type/:id" element={<MainFormPage/>} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
