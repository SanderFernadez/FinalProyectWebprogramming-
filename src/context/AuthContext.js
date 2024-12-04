// src/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import { auth } from "../firebase"; // Asegúrate de que esta ruta sea correcta

// Crea el contexto de autenticación
const AuthContext = createContext();

// Proveedor de contexto para envolver tu aplicación
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  // Mantener el estado del usuario autenticado
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user); // Actualiza el estado con el usuario autenticado
    });

    return () => unsubscribe(); // Limpiar la suscripción al cambiar el estado
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para acceder al contexto
export const useAuth = () => {
  return useContext(AuthContext);
};
