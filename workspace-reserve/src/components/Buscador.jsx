// src/components/Buscador.jsx

import React, { useState } from 'react';

const Buscador = ({ setFiltros }) => {
  const [search, setSearch] = useState('');
  
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setFiltros((prev) => ({ ...prev, search: e.target.value }));
  };

  return (
    <div className="p-4 bg-celeste rounded">
      <input
        type="text"
        placeholder="Buscar oficina"
        value={search}
        onChange={handleSearch}
        className="px-4 py-2 rounded"
      />
    </div>
  );
};

export default Buscador;
