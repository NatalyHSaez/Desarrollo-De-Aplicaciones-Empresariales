# 🏢 Workspace Reserve

**Workspace Reserve** es una aplicación web creada con **React**, **React Router**, **Vite** y **Tailwind CSS**, diseñada para gestionar la reserva de espacios de trabajo como salas de 
reuniones de manera simple e intuitiva.

## 🚀 Características

- 📅 Reserva de oficinas con fecha y hora de inicio y finalización.
- 🧾 Visualización de próximas reservas con datos completos.
- 🖼️ Imágenes asociadas a cada oficina.
- 🔄 Modificación y anulación de reservas.
- 💾 Persistencia de datos con `localStorage`.
- ⚡ Interfaz moderna, responsiva y amigable.

## 🖥️ Tecnologías Usadas

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- JavaScript
- [Vercel] (https://workspacereserve.vercel.app/)

## 📁 Estructura del Proyecto

```
workspace-reserve/
├── public/
│   └── img/                 # Imágenes de oficinas
├── src/
│   ├── components/
│   │   ├── FormularioReserva.jsx
│   │   └── ProximasReservas.jsx
│   ├── data/
│   │   └── oficinas.js
│   ├── routes/
│   │   └── AppRouter.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
└── README.md
```

## 🔧 Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/workspace-reserve.git
   cd workspace-reserve
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicia la app:
   ```bash
   npm run dev
   ```

4. Abre el navegador en:
   ```
   http://localhost:5173
   ```

## 🧪 Uso

1. Ingresa al formulario de reserva.
2. Selecciona oficina, fecha y hora.
3. Guarda tu reserva.
4. Ve a "Próximas Reservas" para consultar tus reservas activas.
5. Puedes **modificar** o **anular** reservas en cualquier momento.

## 🔜 Funcionalidades Futuras

- 🔐 Autenticación de usuarios
- ☁️ Conexión a base de datos en la nube
- 📊 Reportes y estadísticas de uso
- 🧭 Filtros por fecha, oficina o usuario

## ✍️ Nataly Huaiquinao Sáez

Desarrollado por **NatalyHSaez**

---

¡Gracias por usar Workspace Reserve!  
Disfruta de una mejor organización en tus espacios de trabajo. 💼✨
