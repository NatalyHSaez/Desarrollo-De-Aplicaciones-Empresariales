// src/components/Calendario.jsx

import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Calendario = ({ reservas }) => {
  const [fecha, setFecha] = useState(new Date());

  const handleDateChange = (date) => {
    setFecha(date);
  };

  // Función para verificar si el día está reservado
  const isReserved = (date) => {
    const dateString = date.toDateString(); // Convertimos la fecha a una cadena
    return reservas.includes(dateString); // Comprobamos si está en la lista de reservas
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <Calendar
        onChange={handleDateChange}
        value={fecha}
        tileClassName={({ date }) => isReserved(date) ? 'bg-green-500 text-white' : ''}
      />
      <div className="mt-4">
        <h4 className="font-bold">Oficinas Reservadas:</h4>
        {reservas.map((reserva, index) => (
          <p key={index}>{reserva}</p>
        ))}
      </div>
    </div>
  );
};

export default Calendario;
