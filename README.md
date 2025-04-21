# 🏢 Workspace Reserve

**Workspace Reserve** es una aplicación web creada con **React**, **React Router**, **Vite** y **Tailwind CSS**, diseñada para gestionar la reserva de espacios de trabajo como salas de 
reuniones de manera simple e intuitiva.

[🌐 Ver Deploy en Vercel](https://workspacereserve.vercel.app/)
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

## 📁 Estructura del Proyecto

```
workspace-reserve/
├── public/
│   └── img/                # Imágenes de las oficinas
├── src/
│   ├── assets/             # Recursos como íconos o fuentes (si se agregan)
│   ├── components/         # Componentes principales de la UI
│   │   ├── Calendario.jsx
│   │   ├── CalendarioPersonalizado.css
│   │   ├── CuentaMenu.jsx
│   │   ├── FormularioReserva.jsx
│   │   ├── Inicio.jsx
│   │   ├── Login.jsx
│   │   ├── Oficinas.jsx
│   │   └── ProximasReservas.jsx
│   ├── data/               # Datos simulados o mock (JSON/JS)
│   │   ├── oficinas.js
│   │   └── reservas.js
│   ├── App.jsx             # Rutas principales
│   ├── App.css             # Estilos globales
│   ├── index.css           # Tailwind + estilos base
│   ├── main.jsx            # Punto de entrada React
│   └── calendarCustom.css  # Estilos para calendario
├── index.html              # HTML principal
├── package.json
├── .gitignore
├── eslint.config.js
├── package-lock.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
├── vite.config.js
└── workspace-reserve.zip
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

---

## 📌 Notas

- Las reservas se guardan en `localStorage`, por lo que persisten aunque se recargue la página.
- Se puede extender el proyecto fácilmente para incluir una API o backend real.
- Incluye una estructura modular para escalar.

---

## ✍️ Nataly Huaiquinao Sáez

Desarrollado por **NatalyHSaez**

---

¡Gracias por usar Workspace Reserve!  
Disfruta de una mejor organización en tus espacios de trabajo. 💼✨
