import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Inicio from "./components/Inicio";
import Login from "./components/Login";
import Registro from "./components/Registro";
import InicioAdmin from "./components/InicioAdmin";
import Perfil from "./components/Perfil"; // 👈 AÑADIDO

function App() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
  }, []);

  useEffect(() => {
    if (usuario) {
      localStorage.setItem("usuario", JSON.stringify(usuario));
    } else {
      localStorage.removeItem("usuario");
    }
  }, [usuario]);

  return (
    <div className="min-h-screen flex flex-col">
      <Router>
        <Routes>
          {/* Página principal */}
          <Route
            path="/"
            element={<Inicio usuario={usuario} setUsuario={setUsuario} />}
          />

          {/* Página de login */}
          <Route
            path="/login"
            element={<Login setUsuario={setUsuario} />}
          />

          {/* Página de registro */}
          <Route
            path="/registro"
            element={<Registro />}
          />

          {/* Panel de administrador */}
          <Route
            path="/admin"
            element={<InicioAdmin usuario={usuario} setUsuario={setUsuario} />}
          />

          {/* Página de perfil */}
          <Route
            path="/perfil"
            element={<Perfil usuario={usuario} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
