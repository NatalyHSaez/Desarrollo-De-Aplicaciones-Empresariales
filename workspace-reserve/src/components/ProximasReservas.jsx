import reservas from "../data/reservas";

const ProximasReservas = ({ usuario }) => {
  if (!usuario) return null;

  const reservasDelUsuario = reservas.filter(
    (reserva) => reserva.usuario === usuario
  );

  return (
    <div className="mt-6 p-4 bg-white rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Próximas Reservas</h2>
      {reservasDelUsuario.length > 0 ? (
        reservasDelUsuario.map((reserva) => (
          <div key={reserva.id} className="mb-2 border-b pb-2">
            <p><strong>Oficina:</strong> {reserva.oficina}</p>
            <p><strong>Fecha:</strong> {reserva.fecha}</p>
            <p><strong>Hora:</strong> {reserva.horaInicio} - {reserva.horaFin}</p>
          </div>
        ))
      ) : (
        <p>No tienes reservas próximas.</p>
      )}
    </div>
  );
};

export default ProximasReservas;
