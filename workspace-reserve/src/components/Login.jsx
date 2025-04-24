import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setUsuario }) => {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [tipo, setTipo] = useState("usuario");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Validación de dominio según tipo
    if (tipo === "usuario" && correo.endsWith("@admin.com")) {
      alert("El correo de usuario no puede terminar en '@admin.com'.");
      return;
    }
    if (tipo === "admin" && !correo.endsWith("@admin.com")) {
      alert("El correo de administrador debe terminar en '@admin.com'.");
      return;
    }

    // Leer usuarios registrados desde localStorage
    const registrados = JSON.parse(localStorage.getItem("usuarios") || "[]");

    // Buscar usuario válido
    const encontrado = registrados.find(
      (u) => 
        u.correo === correo &&
        u.contrasena === contrasena &&
        u.tipoUsuario === tipo
    );

    if (!encontrado) {
      alert("Credenciales incorrectas o usuario no registrado.");
      return;
    }

    // Guardar sesión y redirigir
    setUsuario(encontrado);
    localStorage.setItem("usuario", JSON.stringify(encontrado));

    if (tipo === "admin") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 pt-4 rounded shadow-md w-96 space-y-4"
      >
        {/* Pestañas integradas, alineadas a la izquierda */}
        <div className="flex space-x-4 mb-4">
          <button
            type="button"
            onClick={() => setTipo("usuario")}
            className={`text-sm ${
              tipo === "usuario" ? "font-semibold text-black" : "text-gray-400"
            }`}
          >
            Usuario
          </button>
          <button
            type="button"
            onClick={() => setTipo("admin")}
            className={`text-sm ${
              tipo === "admin" ? "font-semibold text-black" : "text-gray-400"
            }`}
          >
            Admin
          </button>
        </div>

        <h2 className="text-2xl font-bold text-center">Iniciar Sesión</h2>

        <input
          type="email"
          placeholder="Correo Electrónico"
          className="w-full border border-gray-300 p-2 rounded"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="w-full border border-gray-300 p-2 rounded"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Iniciar Sesión
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          ¿No tienes cuenta?{' '}
          <button
            type="button"
            onClick={() => navigate("/registro")}
            className="text-blue-600 hover:underline"
          >
            Regístrate
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
