import { useState } from "react";
import oficinas from "../data/oficinas"; // Importar datos de oficinas

const AgregarOficina = ({ setAgregarOficina }) => {
  const [nuevaOficina, setNuevaOficina] = useState({
    nombre: "",
    tipo: "",
    capacidad: "",
    torre: "",
    piso: "",
    imagen: "",
  });

  const [imagenPreview, setImagenPreview] = useState(null);

  const handleSubmit = () => {
    const nuevaId = oficinas.length + 1;
    const oficinaNueva = {
      ...nuevaOficina,
      id: nuevaId,
    };
    oficinas.push(oficinaNueva);
    localStorage.setItem("oficinas", JSON.stringify(oficinas)); // Guardar en localStorage
    setAgregarOficina(false); // Cerrar el formulario
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNuevaOficina({ ...nuevaOficina, imagen: reader.result });
        setImagenPreview(reader.result); // Mostrar vista previa de la imagen
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-2xl relative overflow-hidden">
        {/* Formulario con desplazamiento */}
        <div className="space-y-6 max-h-[80vh] overflow-y-auto pr-4">
          <h2 className="text-2xl font-semibold mb-4">Agregar Oficina</h2>
          
          <input
            type="text"
            placeholder="Nombre"
            value={nuevaOficina.nombre}
            onChange={(e) => setNuevaOficina({ ...nuevaOficina, nombre: e.target.value })}
            className="w-full p-3 border rounded-xl mb-4"
          />
          
          {/* Campo Tipo con lista desplegable */}
          <select
            value={nuevaOficina.tipo}
            onChange={(e) => setNuevaOficina({ ...nuevaOficina, tipo: e.target.value })}
            className="w-full p-3 border rounded-xl mb-4"
          >
            <option value="">Seleccionar tipo</option>
            <option value="Oficina">Oficina</option>
            <option value="Sala de Reuniones">Sala de Reuniones</option>
            <option value="Sala de Estudio">Sala de Estudio</option>
          </select>

          <input
            type="number"
            placeholder="Capacidad"
            value={nuevaOficina.capacidad}
            onChange={(e) => setNuevaOficina({ ...nuevaOficina, capacidad: e.target.value })}
            className="w-full p-3 border rounded-xl mb-4"
          />
          <input
            type="text"
            placeholder="Torre"
            value={nuevaOficina.torre}
            onChange={(e) => setNuevaOficina({ ...nuevaOficina, torre: e.target.value })}
            className="w-full p-3 border rounded-xl mb-4"
          />
          <input
            type="number"
            placeholder="Piso"
            value={nuevaOficina.piso}
            onChange={(e) => setNuevaOficina({ ...nuevaOficina, piso: e.target.value })}
            className="w-full p-3 border rounded-xl mb-4"
          />
          
          {/* Subir imagen */}
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full p-3 border rounded-xl mb-4"
          />
          
          {imagenPreview && (
            <div className="mb-4">
              <img
                src={imagenPreview}
                alt="Vista previa"
                className="w-full max-h-64 object-cover rounded-xl mx-auto" // Limitar altura y asegurar que la imagen se recorte
              />
            </div>
          )}
          
          <div className="flex justify-between">
            <button
              onClick={handleSubmit}
              className="bg-green-600 hover:bg-green-500 text-white text-lg px-6 py-2 rounded-xl"
            >
              Agregar Oficina
            </button>
            <button
              onClick={() => setAgregarOficina(false)}
              className="bg-gray-600 hover:bg-gray-500 text-white text-lg px-6 py-2 rounded-xl"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgregarOficina;
