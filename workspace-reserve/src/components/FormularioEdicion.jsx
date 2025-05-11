import React, { useState, useEffect } from "react";

const FormularioEdicion = ({ oficina, onClose, onGuardar }) => {
  const [nombre, setNombre] = useState(oficina.nombre);
  const [tipo, setTipo] = useState(oficina.tipo);
  const [capacidad, setCapacidad] = useState(oficina.capacidad);
  const [torre, setTorre] = useState(oficina.torre);
  const [piso, setPiso] = useState(oficina.piso);
  const [imagen, setImagen] = useState(oficina.imagen || null);
  const [imagenPreview, setImagenPreview] = useState(oficina.imagen || null);

  // Para manejar los cambios en los props de la oficina
  useEffect(() => {
    setNombre(oficina.nombre);
    setTipo(oficina.tipo);
    setCapacidad(oficina.capacidad);
    setTorre(oficina.torre);
    setPiso(oficina.piso);
    setImagen(oficina.imagen || null);
    setImagenPreview(oficina.imagen || null);
  }, [oficina]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (capacidad < 1) {
      alert("La capacidad debe ser al menos 1.");
      return;
    }

    const oficinaEditada = {
      ...oficina,
      nombre,
      tipo,
      capacidad,
      torre,
      piso,
      imagen: imagenPreview, // Guardamos la URL base64 o la ruta de la imagen
    };

    // Guardar en localStorage
    localStorage.setItem("oficina", JSON.stringify(oficinaEditada));

    onGuardar(oficinaEditada); //Guardar informacion del formulario
    onClose(); // Cerramos el formulario
  };

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagen(file);
        setImagenPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-96 space-y-4"
      >
        <h2 className="text-xl font-bold mb-2">Editar Oficina</h2>

        <div>
          <label className="text-gray-700 block mb-1">Imagen:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImagenChange}
            className="w-full border p-2 rounded"
          />
          {imagenPreview && (
            <img
              src={imagenPreview}
              alt="Vista previa"
              className="mt-2 w-full h-32 object-cover rounded"
            />
          )}
        </div>

        <div>
          <label className="text-gray-700 block mb-1">Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre"
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="text-gray-700 block mb-1">Tipo:</label>
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Selecciona un tipo</option>
            <option value="Oficina">Oficina</option>
            <option value="Sala de Reuniones">Sala de Reuniones</option>
            <option value="Sala de Estudio">Sala de Estudio</option>
          </select>
        </div>

        <div>
          <label className="text-gray-700 block mb-1">Torre:</label>
          <input
            type="text"
            value={torre}
            onChange={(e) => setTorre(e.target.value)}
            placeholder="Torre"
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="text-gray-700 block mb-1">Piso:</label>
          <input
            type="number"
            value={piso}
            onChange={(e) => setPiso(Number(e.target.value))}
            placeholder="Piso"
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="text-gray-700 block mb-1">Capacidad:</label>
          <input
            type="number"
            value={capacidad}
            onChange={(e) => setCapacidad(Number(e.target.value))}
            placeholder="Capacidad"
            min="1"
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormularioEdicion;
