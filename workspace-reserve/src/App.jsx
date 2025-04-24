import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Inicio from "./components/Inicio";
import Login from "./components/Login";
import Registro from "./components/Registro";
import InicioAdmin from "./components/InicioAdmin"; // ✅ Importar panel de admin

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
    <Router>
      <Routes>
        {/* Ruta para usuarios regulares */}
        <Route
          path="/"
          element={<Inicio usuario={usuario} setUsuario={setUsuario} />}
        />

        {/* Ruta de login */}
        <Route
          path="/login"
          element={<Login setUsuario={setUsuario} />}
        />

        {/* Ruta de registro */}
        <Route
          path="/registro"
          element={<Registro />}
        />

        {/* Ruta para panel de administración */}
        <Route
          path="/admin"
          element={<InicioAdmin usuario={usuario} setUsuario={setUsuario} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
