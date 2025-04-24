// CuentaMenu.jsx
import { useState, useRef, useEffect } from "react";

const CuentaMenu = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
      >
        Cuenta
      </button>
      {open && (
        <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg">
          <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-100 w-full text-left">
            Iniciar Sesión
          </button>
          <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-100 w-full text-left">
            Registrarse
          </button>
        </div>
      )}
    </div>
  );
};

export default CuentaMenu;