import React, { useState } from 'react';
import { auth, db } from '../firebase'; 
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'; 
import bcrypt from 'bcryptjs';
import '../styles/Register.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const hashedPassword = bcrypt.hashSync(password, 10);

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        email,
        username,
        firstName,
        lastName,
        password: hashedPassword,
      });

      alert('Usuario registrado con éxito');
      navigate('/login');
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      alert("Error al registrar usuario:", error);
    }
  };

  return (
    <div className="register-container">
      <div className="card shadow-lg p-4 form-card">
        <h2>Registrarse</h2>
        <form onSubmit={handleRegister}>
          <div className="form-group mb-3">
            <input
              type="email"
              className="form-control custom-input"
              placeholder="Correo Electrónico"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control custom-input"
              placeholder="Nombre de Usuario"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control custom-input"
              placeholder="Nombre"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control custom-input"
              placeholder="Apellido"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="form-group mb-4">
            <input
              type="password"
              className="form-control custom-input"
              placeholder="Contraseña"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn custom-button w-100">Registrarse</button>
        </form>
        <div className="text-center mt-3">
          <p className="text-muted">¿Ya tienes una cuenta? <a href="/login" className="custom-link">Iniciar sesión</a></p>
        </div>
      </div>
    </div>
  );
};

export default Register;