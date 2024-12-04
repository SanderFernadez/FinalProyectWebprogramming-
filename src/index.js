// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom"; // Asegúrate de importar BrowserRouter
import { AuthProvider } from './context/AuthContext'; // Asegúrate de importar el AuthProvider
import App from "./App";
import './index.css';

// Aquí envolvemos la aplicación con AuthProvider y Router
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider> {/* Envuelve la aplicación con el AuthProvider */}
    <Router>
      <App />
    </Router>
  </AuthProvider>
);
