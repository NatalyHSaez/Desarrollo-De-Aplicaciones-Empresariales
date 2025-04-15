// src/App.jsx

import React, { useState } from 'react';
import Buscador from './components/Buscador';
import Oficinas from './components/Oficinas';
import OficinaDetalle from './components/OficinaDetalle';
import Calendario from './components/Calendario';

const App = () => {
  // Estado para los filtros del buscador
  const [filtros, setFiltros] = useState({ search: '' });

  // Lista de oficinas
  const [oficinas] = useState([
    { nombre: 'Oficina 1', descripcion: 'Oficina con buena iluminación', capacidad: 4, precio: 50 },
    { nombre: 'Oficina 2', descripcion: 'Oficina privada', capacidad: 2, precio: 40 },
    { nombre: 'Sala de reuniones', descripcion: 'Espacio para conferencias', capacidad: 10, precio: 100 },
  ]);

  // Estado para la oficina seleccionada
  const [oficinaSeleccionada, setOficinaSeleccionada] = useState(null);

  // Lista de reservas (en formato de fecha como string)
  const [reservas] = useState(['Sun Apr 14 2025', 'Mon Apr 15 2025', 'Wed Apr 17 2025']);

  // Filtrar las oficinas según el texto de búsqueda
  const oficinasFiltradas = oficinas.filter((oficina) =>
    oficina.nombre.toLowerCase().includes(filtros.search.toLowerCase())
  );

  return (
    <div className="flex">
      <div className="w-3/4 p-4">
        {/* Buscador */}
        <Buscador setFiltros={setFiltros} />
        
        {/* Lista de oficinas filtradas */}
        <Oficinas oficinas={oficinasFiltradas} onClick={setOficinaSeleccionada} />
        
        {/* Detalle de oficina seleccionada */}
        {oficinaSeleccionada && (
          <OficinaDetalle oficina={oficinaSeleccionada} cerrar={() => setOficinaSeleccionada(null)} />
        )}
      </div>

      <div className="w-1/4 p-4">
        {/* Calendario con las reservas */}
        <Calendario reservas={reservas} />
      </div>
    </div>
  );
};

export default App;
