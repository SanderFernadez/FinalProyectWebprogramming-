import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Posts from "./components/Posts";
import { auth } from './firebase'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';

const App = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        navigate('/posts'); 
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = () => {
    auth.signOut().then(() => {
      setUser(null);
      navigate('/login'); 
    }).catch((error) => {
      console.error("Error al cerrar sesión: ", error);
    });
  };

  return (
    <div className="container-fluid mt-4">
      <div className="row">
  <div className="col-2">
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark flex-column">
    <Link className="nav-link fs-2" to="" >Mural Interactivo</Link>
      <ul className="navbar-nav flex-column">
        {user ? (
          <>
            <li className="nav-item">
              <Link className="nav-link" to="/posts"> Posts</Link>
            </li>
            <li className="nav-item">
              <button className="btn btn-link nav-link" onClick={handleLogout}>Cerrar sesión</button>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item">
              <Link className="nav-link" to="/register">Regístrate</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">Iniciar sesión</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/posts">Posts</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  </div>
  <div className="col-10">
    <Routes>
      <Route path="/" element={<Posts />} />
      <Route path="/register" element={!user ? <Register /> : <Posts />} />
      <Route path="/login" element={!user ? <Login /> : <Posts />} />
      <Route path="/posts" element={<Posts />} />
    </Routes>
  </div>
</div>

    </div>
  );
};

export default App;
