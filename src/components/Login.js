import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Credenciales inválidas. Intenta de nuevo.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-form">
        <h1 className="login-title">Bienvenido</h1>
        <p className="login-subtitle">Inicia sesión para continuar</p>
        <form onSubmit={handleLogin}>
          <div className="input-container">
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-login">Iniciar Sesión</button>
        </form>
        <p className="register-link">
          ¿No tienes una cuenta?{" "}
          <a href="/register">Regístrate aquí</a>
        </p>
      </div>
    </div>
  );
};

export default Login;