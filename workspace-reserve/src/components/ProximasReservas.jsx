import { useState, useEffect } from "react";

const ProximasReservas = () => {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    const reservasGuardadas = JSON.parse(localStorage.getItem("reservas")) || [];
    setReservas(reservasGuardadas);
  }, []);

  const handleEliminar = (index) => {
    const nuevasReservas = [...reservas];
    nuevasReservas.splice(index, 1);
    setReservas(nuevasReservas);
    localStorage.setItem("reservas", JSON.stringify(nuevasReservas));
  };

  if (reservas.length === 0) {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-semibold mb-4">Próximas Reservas</h2>
        <p className="text-gray-500">No hay reservas realizadas.</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Próximas Reservas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reservas.map((reserva, index) => (
          <div
            key={index}
            className="border p-4 rounded shadow relative bg-white"
          >
            <h3 className="text-lg font-semibold mb-1">
              Oficina: {reserva.oficina}
            </h3>
            <p className="text-sm text-gray-600 mb-2">Fecha: {reserva.fecha}</p>
            <button
              onClick={() => handleEliminar(index)}
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded"
            >
              Anular
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProximasReservas;
