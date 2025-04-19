import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Inicio from "./components/Inicio";
import Login from "./components/Login";

function App() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
  }, []);

  // Cada vez que cambia el usuario, lo actualizamos en localStorage
  useEffect(() => {
    if (usuario) {
      localStorage.setItem("usuario", JSON.stringify(usuario));
    } else {
      localStorage.removeItem("usuario");
    }
  }, [usuario]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Inicio usuario={usuario} setUsuario={setUsuario} />}
        />
        <Route
          path="/login"
          element={<Login setUsuario={setUsuario} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
