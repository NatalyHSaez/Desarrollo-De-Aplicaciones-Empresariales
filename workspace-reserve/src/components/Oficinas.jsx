import React from "react";
import oficinas from "../data/oficinas"; // Ajusta la ruta si estás en otra carpeta
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
      ease: "easeOut",
    },
  }),
};

const Oficinas = () => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {oficinas.map((oficina, index) => (
        <motion.div
          key={oficina.id}
          className="bg-gray-50 rounded-lg shadow p-4 flex flex-col hover:scale-[1.02] hover:shadow-lg transition-transform duration-200"
          custom={index}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          <img
            src={oficina.imagen}
            alt={oficina.nombre}
            className="h-40 w-full object-cover rounded-md mb-4"
          />
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-lg font-semibold">{oficina.nombre}</h3>
            <button className="bg-green-500 text-white text-xs px-2 py-1 rounded hover:bg-green-600 transition">
              Reservar
            </button>
          </div>
          <p className="text-sm text-gray-600">{oficina.capacidad}</p>
          <p className="text-sm text-gray-600">{oficina.ubicacion}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default Oficinas;
