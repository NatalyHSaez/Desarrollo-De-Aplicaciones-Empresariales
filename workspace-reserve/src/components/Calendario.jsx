import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Calendario = () => {
  const [date, setDate] = useState(new Date());
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    const reservasGuardadas = JSON.parse(localStorage.getItem("reservas")) || [];
    setReservas(reservasGuardadas);
  }, []);

  const tieneReservaEnFecha = (fecha) => {
    return reservas.some((reserva) => {
      const inicio = new Date(reserva.fechaInicio);
      const fin = new Date(reserva.fechaFin);

      // Ajuste para fechas que son el mismo día (reserva por horas)
      if (!reserva.fechaFin) {
        return (
          fecha.getDate() === inicio.getDate() &&
          fecha.getMonth() === inicio.getMonth() &&
          fecha.getFullYear() === inicio.getFullYear()
        );
      }

      return fecha >= inicio && fecha <= fin;
    });
  };

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <Calendar
        onChange={setDate}
        value={date}
        locale="es-ES"
        className="w-full"
        tileClassName={({ date, view }) => {
          if (view !== "month") return;

          const today = new Date();

          if (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
          ) {
            return "bg-blue-500 text-white rounded-full";
          }

          if (tieneReservaEnFecha(date)) {
            return "bg-green-500 text-white rounded-full";
          }
        }}
      />
    </div>
  );
};

export default Calendario;
