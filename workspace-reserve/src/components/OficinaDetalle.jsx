// src/components/OficinaDetalle.jsx

import React from 'react';

const OficinaDetalle = ({ oficina, cerrar }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg">
        <button onClick={cerrar} className="absolute top-2 right-2 text-gray-600">X</button>
        <h3 className="font-bold text-xl">{oficina.nombre}</h3>
        <p>{oficina.descripcion}</p>
        <p><strong>Capacidad:</strong> {oficina.capacidad}</p>
        <p><strong>Precio:</strong> ${oficina.precio}</p>
      </div>
    </div>
  );
};

export default OficinaDetalle;
