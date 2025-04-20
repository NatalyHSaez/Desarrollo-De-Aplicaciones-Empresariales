import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setUsuario }) => {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (correo === "123@gmail.com" && contrasena === "123") {
      const usuario = { correo };
      setUsuario(usuario);
      localStorage.setItem("usuario", JSON.stringify(usuario));
      navigate("/");
    } else {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-96 space-y-4"
      >
        <h2 className="text-2xl bg-black text-white font-bold text-center">
          Iniciar Sesión
        </h2>
        <input
          type="email"
          placeholder="Correo Electrónico"
          className="w-full bg-white border border-gray-300 p-2 rounded"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="w-full bg-white border border-gray-300 p-2 rounded"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default Login;
