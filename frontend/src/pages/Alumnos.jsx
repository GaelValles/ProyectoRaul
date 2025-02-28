import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import Sidepage from "../components/sidepage";
import { FaCalendarAlt, FaSearch, FaSave, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { asistenciaService } from "../api/auth.alumnos"; // Cambiado desde "../api/auth.alumnos"
import { useAuth } from "../context/auth.context"; // Importamos el contexto de autenticación

const AsistenciaPage = () => {
  const { user } = useAuth(); // Obtenemos el usuario del contexto
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [selectedMateria, setSelectedMateria] = useState("");
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState({ show: false, success: false, message: "" });

  const estadoAsistencia = {
    PRESENTE: "presente",
    AUSENTE: "ausente",
    JUSTIFICADO: "justificado"
  };

  useEffect(() => {
    // Cargar la lista de materias que imparte el profesor
    const fetchMaterias = async () => {
      try {
        // Si tenemos el ID del profesor desde el contexto de autenticación
        const profesorId = user?.id || user?.id_profesor;
        const response = await asistenciaService.getMateriasByProfesor(profesorId);
        
        // Asegurarse de que estamos manejando correctamente la respuesta
        const materiasData = response.data || response;
        setMaterias(materiasData);
        
        if (materiasData.length > 0) {
          setSelectedMateria(materiasData[0].id_materia);
        }
      } catch (error) {
        console.error("Error al cargar materias:", error);
      }
    };

    fetchMaterias();
  }, [user]);

  useEffect(() => {
    // Cargar asistencias cuando cambia la materia o la fecha
    if (selectedMateria) {
      fetchAsistencias();
    }
  }, [selectedMateria, selectedDate]);

  const fetchAsistencias = async () => {
    setLoading(true);
    try {
      const formattedDate = format(selectedDate, "yyyy-MM-dd");
      const response = await asistenciaService.getAsistenciasByMateriaAndDate(
        selectedMateria,
        formattedDate
      );
      
      // Asegurarse de manejar correctamente la respuesta
      const asistenciasData = response.data || response;
      setStudents(asistenciasData);
    } catch (error) {
      console.error("Error al cargar asistencias:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleMateriaChange = (e) => {
    setSelectedMateria(e.target.value);
  };

  const handleDateChange = (days) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + days);
    setSelectedDate(newDate);
  };

  const handleAttendanceChange = (studentId, status) => {
    setStudents(
      students.map((student) => {
        if (student.id_alumno === studentId) {
          return { ...student, estado_asistencia: status };
        }
        return student;
      })
    );
  };

  const handleJustificationChange = (studentId, justification) => {
    setStudents(
      students.map((student) => {
        if (student.id_alumno === studentId) {
          return { ...student, justificacion: justification };
        }
        return student;
      })
    );
  };

  const saveAttendance = async () => {
    try {
      const formattedDate = format(selectedDate, "yyyy-MM-dd");
      const attendanceData = {
        fecha: formattedDate,
        materiaId: selectedMateria,
        asistencias: students.map((student) => ({
          alumnoId: student.id_alumno,
          asistencia: student.estado_asistencia === estadoAsistencia.PRESENTE,
          justificacion: student.estado_asistencia === estadoAsistencia.JUSTIFICADO ? student.justificacion : null
        }))
      };

      await asistenciaService.saveAsistencias(attendanceData);
      
      setSaveStatus({
        show: true,
        success: true,
        message: "Asistencias guardadas correctamente"
      });

      // Ocultar el mensaje después de 3 segundos
      setTimeout(() => {
        setSaveStatus({ show: false, success: false, message: "" });
      }, 3000);
    } catch (error) {
      console.error("Error al guardar asistencias:", error);
      setSaveStatus({
        show: true,
        success: false,
        message: "Error al guardar asistencias"
      });
    }
  };

  const filteredStudents = students.filter((student) =>
    student.nombre_completo?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-green-700 text-white py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Universidad Tecnológica de Durango</h1>
        <nav className="hidden md:flex space-x-6">
          <a href="#" className="text-white hover:text-gray-300">Inicio</a>
          <a href="#" className="text-white hover:text-gray-300">Noticias</a>
          <a href="#" className="text-white hover:text-gray-300">Eventos</a>
          <a href="#" className="text-white hover:text-gray-300">Contacto</a>
        </nav>
      </header>

      <div className="flex flex-1">
        <Sidepage />

        <main className="flex-1 p-6 bg-gray-50 lg:ml-[300px]">
          <h1 className="text-3xl font-bold text-green-800 mb-6">Registro de Asistencia</h1>
          
          {/* Selección de materia */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="materia">
              Materia:
            </label>
            <select
              id="materia"
              value={selectedMateria}
              onChange={handleMateriaChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              {materias.map((materia) => (
                <option key={materia.id_materia} value={materia.id_materia}>
                  {materia.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* Selector de fecha */}
          <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-lg shadow">
            <button 
              onClick={() => handleDateChange(-1)}
              className="bg-green-100 hover:bg-green-200 text-green-800 p-2 rounded"
            >
              <FaChevronLeft />
            </button>
            
            <div className="flex items-center">
              <FaCalendarAlt className="text-green-700 mr-2" />
              <span className="font-medium text-lg">
                {format(selectedDate, "EEEE d 'de' MMMM 'de' yyyy", { locale: es })}
              </span>
            </div>
            
            <button 
              onClick={() => handleDateChange(1)}
              className="bg-green-100 hover:bg-green-200 text-green-800 p-2 rounded"
            >
              <FaChevronRight />
            </button>
          </div>

          {/* Buscador */}
          <div className="relative mb-6">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar alumno..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-10 p-2 border rounded w-full shadow-sm"
            />
          </div>

          {/* Mensajes de estado */}
          {saveStatus.show && (
            <div className={`mb-4 p-3 rounded ${saveStatus.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {saveStatus.message}
            </div>
          )}

          {/* Tabla de asistencias */}
          {loading ? (
            <div className="text-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700 mx-auto"></div>
              <p className="mt-3 text-gray-600">Cargando asistencias...</p>
            </div>
          ) : (
            <div className="overflow-x-auto bg-white rounded-lg shadow">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-3 text-left">Nombre</th>
                    <th className="border p-3 text-center">Estado</th>
                    <th className="border p-3 text-center">Justificación</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student) => (
                      <tr key={student.id_alumno} className="hover:bg-gray-50">
                        <td className="border p-3">
                          {student.nombre_completo}
                        </td>
                        <td className="border p-3 text-center">
                          <div className="flex justify-center space-x-3">
                            <div 
                              className={`cursor-pointer rounded-full w-8 h-8 flex items-center justify-center 
                                ${student.estado_asistencia === estadoAsistencia.PRESENTE 
                                  ? 'bg-green-500 text-white' 
                                  : 'bg-gray-200 text-gray-600'}`}
                              onClick={() => handleAttendanceChange(student.id_alumno, estadoAsistencia.PRESENTE)}
                              title="Presente"
                            >
                              P
                            </div>
                            <div 
                              className={`cursor-pointer rounded-full w-8 h-8 flex items-center justify-center 
                                ${student.estado_asistencia === estadoAsistencia.AUSENTE 
                                  ? 'bg-red-500 text-white' 
                                  : 'bg-gray-200 text-gray-600'}`}
                              onClick={() => handleAttendanceChange(student.id_alumno, estadoAsistencia.AUSENTE)}
                              title="Ausente"
                            >
                              A
                            </div>
                            <div 
                              className={`cursor-pointer rounded-full w-8 h-8 flex items-center justify-center 
                                ${student.estado_asistencia === estadoAsistencia.JUSTIFICADO 
                                  ? 'bg-yellow-500 text-white' 
                                  : 'bg-gray-200 text-gray-600'}`}
                              onClick={() => handleAttendanceChange(student.id_alumno, estadoAsistencia.JUSTIFICADO)}
                              title="Justificado"
                            >
                              J
                            </div>
                          </div>
                        </td>
                        <td className="border p-3">
                          <input
                            type="text"
                            placeholder="Razón de justificación..."
                            value={student.justificacion || ""}
                            onChange={(e) => handleJustificationChange(student.id_alumno, e.target.value)}
                            disabled={student.estado_asistencia !== estadoAsistencia.JUSTIFICADO}
                            className={`w-full p-2 border rounded ${
                              student.estado_asistencia === estadoAsistencia.JUSTIFICADO
                                ? "bg-white"
                                : "bg-gray-100"
                            }`}
                          />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="border p-3 text-center text-gray-500">
                        No hay alumnos registrados para esta materia o fecha
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Botón guardar */}
          <div className="mt-6 flex justify-end">
            <button 
              onClick={saveAttendance}
              disabled={loading || students.length === 0}
              className="bg-green-700 text-white px-6 py-3 rounded hover:bg-green-800 transition flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaSave />
              <span>Guardar Asistencias</span>
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AsistenciaPage;