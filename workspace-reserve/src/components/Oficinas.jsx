import React from "react";
import oficinas from "../data/oficinas"; // Ajusta la ruta si estás en otra carpeta
import { motion } from "framer-motion";

const Oficinas = () => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {oficinas.map((oficina) => (
        <div
          key={oficina.id}
          className="bg-gray-50 rounded-lg shadow p-4 flex flex-col"
        >
          <img
            src={oficina.imagen}
            alt={oficina.nombre}
            className="h-40 w-full object-cover rounded-md mb-4"
          />
          <h3 className="text-lg font-semibold">{oficina.nombre}</h3>
          <p className="text-sm text-gray-600">{oficina.capacidad}</p>
          <p className="text-sm text-gray-600">{oficina.ubicacion}</p>
        </div>
      ))}
    </div>
  );
};

export default Oficinas;
