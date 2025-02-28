import React from "react";
import Sidepage from "../components/sidepage";
import { useTheme } from "../context/theme.context"; // Importa el contexto del tema

const HomePage = () => {
  const { isDarkMode } = useTheme(); // Usa el contexto del tema

  return (
    <div className={`flex flex-col min-h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-black"}`}>
      {/* Cabecera */}
      <header className={`py-4 px-6 flex justify-between items-center ml-64 ${isDarkMode ? "bg-gray-800" : "bg-green-700"}`}>
        <h1 className="text-3xl font-bold">Universidad Tecnológica de Durango</h1>
        <nav className="hidden md:flex space-x-6">
          <a href="#" className="hover:text-gray-800">Inicio</a>
          <a href="#" className="hover:text-gray-800">Noticias</a>
          <a href="#" className="hover:text-gray-800">Eventos</a>
          <a href="#" className="hover:text-gray-800">Contacto</a>
        </nav>
      </header>

      {/* Contenido principal */}
      <div className="flex flex-1">
        <Sidepage />
        <main className="flex-1 p-6 ml-64">
          {/* Sección Hero */}
          <section className="mb-8">
            <div className={`p-8 rounded-lg shadow-md ${isDarkMode ? "bg-gray-700" : "bg-green-100"}`}>
              <h2 className="text-4xl font-bold mb-4">Bienvenido a la UTD</h2>
              <p>Explora nuestro campus virtual y mantente al día con las últimas noticias y eventos.</p>
              <button className={`mt-6 px-6 py-3 rounded transition ${isDarkMode ? "bg-gray-600 hover:bg-gray-500" : "bg-green-700 hover:bg-green-800 text-white"}`}>
                Explora ahora
              </button>
            </div>
          </section>

          {/* Sección Noticias y Eventos */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className={`p-6 rounded-lg shadow-md ${isDarkMode ? "bg-gray-700" : "bg-white"}`}>
              <h3 className="text-2xl font-bold mb-4">Noticias Recientes</h3>
              <p>Mantente informado sobre los últimos acontecimientos en la universidad.</p>
              <a href="#" className="text-green-600 mt-4 inline-block hover:underline">Ver más noticias</a>
            </div>
            <div className={`p-6 rounded-lg shadow-md ${isDarkMode ? "bg-gray-700" : "bg-white"}`}>
              <h3 className="text-2xl font-bold mb-4">Próximos Eventos</h3>
              <p>No te pierdas los próximos eventos, conferencias y actividades culturales.</p>
              <a href="#" className="text-green-600 mt-4 inline-block hover:underline">Ver eventos</a>
            </div>
          </section>

          {/* Footer */}
          <footer className="mt-10 text-center">
            <p>© 2025 Universidad Tecnológica de Durango. Todos los derechos reservados.</p>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default HomePage;