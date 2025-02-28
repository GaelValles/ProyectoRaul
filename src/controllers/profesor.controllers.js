import {pool} from '../db.js';
import {createAccessToken} from '../libs/jwt.js';
import bcrypt from "bcryptjs";

export const getProfesores = async(req,res) =>{
    try {
        const {rows}= await pool.query('SELECT * FROM profesores ')
        console.log(rows)
        res.json(rows)
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "error de servidor"})
    }
};

export const searchProfesor = async(req,res) =>{
    try {
        const {id_profesor} =req.params;
        const {rows} = await pool.query('SELECT * FROM profesores WHERE id_profesor =  $1', [id_profesor]);
        
        if (rows.length === 0){
            return res.status(404).json({message: "Usuario no encontrado"});
        }
        res.json(rows[0]);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "error de servidor"})
    }
};


export const createProfesor = async (req, res) => {
    try {
        const { nombre_completo, telefono, especialidad, correo, cv, foto_perfil, password } = req.body;
        console.log(req.body);

        // Generar el hash de la contraseña
        const salt = await bcrypt.genSalt(10); // Nivel de seguridad
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insertar en la base de datos con la contraseña encriptada
        const result = await pool.query(
            'INSERT INTO profesores (nombre_completo, telefono, especialidad, correo, cv, foto_perfil, password) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [nombre_completo, telefono, especialidad, correo, cv, foto_perfil, hashedPassword]
        );

        res.json({
            message: "Profesor registrado con éxito",
            profesor: result.rows[0],
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error en el servidor" });
    }
};
export const deleteProfesor = async(req,res) =>{
 try {
    const {id_profesor} =req.params;
    const {rowCount} = await pool.query('DELETE FROM profesores WHERE id_profesor =  $1', [id_profesor]);
    
    if (rowCount.length === 0){
        return res.status(404).json({message: "Profesor no encontrado"});
    }
    res.json(rowCount)
 } catch (error) {
    console.log(error);
    return res.status(500).json({message: "error de servidor"})
 }
};

export const updateProfesor = async(req,res) =>{
 try {
    const {userId} =req.params;
    const data = req.body;

    const {rows} = await pool.query('UPDATE profesores SET nombre_completo = $1, telefono = $2, especialidad = $3, correo = $4, cv = $5, foto_perfil = $6, password = $7  WHERE userId=$4 RETURNING *', [data.nombre_completo, data.telefono, data.especialidad, data.correo, data.cv, data.foto_perfil, data.password ])
    console.log(rows)
    return res.json(rows[0])
 } catch (error) {
    console.log(error);
    return res.status(500).json({message: "error de senvidor"})
 }
};

