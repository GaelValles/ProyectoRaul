// Rutas para Profesores
import { Router } from "express";
import { pool } from "../db.js";
import { createProfesor, deleteProfesor, getProfesores, searchProfesor, updateProfesor } from "../controllers/profesor.controllers.js";

const router = Router();

// Obtener lista de profesores
router.get("/profesores", getProfesores);

// Buscar profesor por ID
router.get("/profesores/:id_profesor", searchProfesor);

// Crear profesor
router.post("/profesores", createProfesor);

// Eliminar profesor
router.delete("/profesores/:id_profesor", deleteProfesor);

// Actualizar profesor
router.put("/profesores/:id_profesor", updateProfesor);

// Obtener materias asignadas a un profesor
router.get("/profesores/:id_profesor/materias", async (req, res) => {
    try {
        const { id_profesor } = req.params;
        const { rows } = await pool.query("SELECT * FROM materias WHERE id_profesor = $1", [id_profesor]);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error en el servidor" });
    }
});

export default router;