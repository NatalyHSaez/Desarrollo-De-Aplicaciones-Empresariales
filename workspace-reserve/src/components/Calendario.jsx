import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Calendario = ({ reservas }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <Calendar
        value={new Date()}
        tileClassName={({ date }) => {
          return reservas.some(reserva => reserva.toDateString() === date.toDateString()) 
            ? 'bg-green-500 text-white' 
            : '';
        }}
      />
    </div>
  );
};

export default Calendario;
