import React from "react";
import { useTheme } from "../context/theme.context"; // Importa el contexto del tema
import { 
  FaMoon, 
  FaSun, 
  FaUser, 
  FaUserCircle, 
  FaHome, 
  FaNewspaper, 
  FaCalendarAlt, 
  FaCog, 
  FaSignOutAlt 
} from "react-icons/fa"; // Asegúrate de importar todos los íconos necesarios

function Sidepage({ useAuth = null }) {
  const { isDarkMode, toggleTheme } = useTheme(); // Usa el contexto del tema

  return (
    <div className={`sidebar fixed top-0 bottom-0 left-0 p-6 w-64 overflow-y-auto text-center ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"} h-screen z-10 lg:block hidden`}>
      {/* Botón para cambiar el tema */}
      <div className="flex justify-end mb-4">
        <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-700">
          {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
        </button>
      </div>

      {/* Resto del contenido del Sidebar */}
      <div className="flex flex-col items-center mb-8">
        <FaUserCircle size={64} />
        <h2 className="mt-4 text-xl font-semibold">Mi Perfil</h2>
      </div>
      <nav className="flex flex-col gap-4">
        <a href="#" className={`flex items-center gap-3 ${isDarkMode ? "text-white hover:text-green-300" : "text-gray-800 hover:text-green-800"}`}>
          <FaHome /> Inicio
        </a>
        <a href="/alumnos" className={`flex items-center gap-3 ${isDarkMode ? "text-white hover:text-green-300" : "text-gray-800 hover:text-green-800"}`}>
          <FaUser /> Alumnos
        </a>
        <a href="#" className={`flex items-center gap-3 ${isDarkMode ? "text-white hover:text-green-300" : "text-gray-800 hover:text-green-800"}`}>
          <FaNewspaper /> Noticias
        </a>
        <a href="#" className={`flex items-center gap-3 ${isDarkMode ? "text-white hover:text-green-300" : "text-gray-800 hover:text-green-800"}`}>
          <FaCalendarAlt /> Eventos
        </a>
        <a href="#" className={`flex items-center gap-3 ${isDarkMode ? "text-white hover:text-green-300" : "text-gray-800 hover:text-green-800"}`}>
          <FaCog /> Configuración
        </a>
        <a href="#" className="flex items-center gap-3 text-red-300 hover:text-red-400 mt-auto">
          <FaSignOutAlt /> Cerrar sesión
        </a>
      </nav>
    </div>
  );
}

export default Sidepage;
