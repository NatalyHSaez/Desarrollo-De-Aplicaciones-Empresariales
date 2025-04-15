import React from 'react';

const Oficinas = ({ oficinas, onClick }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {oficinas.map((oficina, index) => (
        <div 
          key={index} 
          className="p-4 bg-gray-200 rounded-lg cursor-pointer hover:bg-celeste"
          onClick={() => onClick(oficina)}
        >
          <h3 className="font-bold">{oficina.nombre}</h3>
          <p>{oficina.descripcion}</p>
        </div>
      ))}
    </div>
  );
};

export default Oficinas;
