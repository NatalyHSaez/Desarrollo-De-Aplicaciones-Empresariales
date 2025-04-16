import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Calendario = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <Calendar
        onChange={setDate}
        value={date}
        locale="es-ES"
        className="w-full"
        tileClassName={({ date, view }) => {
          const today = new Date();
          if (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
          ) {
            return "bg-blue-500 text-white rounded-full";
          }
        }}
      />
    </div>
  );
};

export default Calendario;
