// src/services/asistenciaService.js
import axiosInstance from "./axios";

export const asistenciaService = {
  // Obtener materias asignadas al profesor
  getMateriasByProfesor: async (id) => {
    try {
      // Si no se proporciona un ID, intentamos obtener todas las materias del profesor actual
      const url = id ? `/profesores/${id}/materias` : `/profesores/materias`;
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      console.error("Error al obtener materias:", error);
      throw error;
    }
  },

  // Obtener lista de alumnos por materia con su asistencia para una fecha específica
  getAsistenciasByMateriaAndDate: async (idMateria, fecha) => {
    try {
      const response = await axiosInstance.get(`/asistencias/materia/${idMateria}/fecha/${fecha}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener asistencias:", error);
      throw error;
    }
  },

  // Guardar las asistencias
  saveAsistencias: async (asistenciasData) => {
    try {
      const response = await axiosInstance.post("/asistencias", asistenciasData);
      return response.data;
    } catch (error) {
      console.error("Error al guardar asistencias:", error);
      throw error;
    }
  },

  // Obtener resumen de asistencias por materia
  getResumenAsistenciasByMateria: async (idMateria, fechaInicio, fechaFin) => {
    try {
      const response = await axiosInstance.get(
        `/asistencias/resumen/materia/${idMateria}`,
        {
          params: {
            fechaInicio,
            fechaFin,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error al obtener resumen:", error);
      throw error;
    }
  },

  // Exportar asistencias a Excel o PDF
  exportarAsistencias: async (idMateria, fechaInicio, fechaFin, formato) => {
    try {
      const response = await axiosInstance.get(
        `/asistencias/exportar/materia/${idMateria}`,
        {
          params: {
            fechaInicio,
            fechaFin,
            formato,
          },
          responseType: "blob", // Para descargar archivos
        }
      );
      return response;
    } catch (error) {
      console.error("Error al exportar asistencias:", error);
      throw error;
    }
  }
};