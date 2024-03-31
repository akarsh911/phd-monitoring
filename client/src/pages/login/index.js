import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


const app=()=>{
  return(
    <div>
       <React.StrictMode>
    <App />
  </React.StrictMode>
    </div>
  );
}

export default app;
