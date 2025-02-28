
CREATE TABLE alumnos (
    id_alumno SERIAL PRIMARY KEY,
    nombre_completo VARCHAR(255) NOT NULL,
    telefono VARCHAR(20) UNIQUE,
    correo VARCHAR(255) UNIQUE NOT NULL,
    carrera VARCHAR(255) NOT NULL,
    foto_perfil TEXT,
    password TEXT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'alumno',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE profesores (
    id_profesor SERIAL PRIMARY KEY,
    nombre_completo VARCHAR(255) NOT NULL,
    telefono VARCHAR(20) UNIQUE,
    especialidad VARCHAR(255) NOT NULL,
    correo VARCHAR(255) UNIQUE NOT NULL,
    cv TEXT,
    foto_perfil TEXT,
    password TEXT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'profesor',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE admin (
    id_admin SERIAL PRIMARY KEY,
    nombre_completo VARCHAR(255) NOT NULL,
    telefono VARCHAR(20),
    correo VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE materias (
    id_materia SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    id_profesor INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_profesor) REFERENCES profesores(id_profesor) ON DELETE SET NULL
);


CREATE TABLE asistencias (
    id_asistencia SERIAL PRIMARY KEY,
    id_alumno INT NOT NULL,
    id_materia INT NOT NULL,
    fecha DATE NOT NULL DEFAULT CURRENT_DATE,
    asistencia BOOLEAN NOT NULL, -- TRUE: Asistió, FALSE: Falta
    justificacion TEXT, -- Justificación opcional en caso de falta
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_alumno) REFERENCES alumnos(id_alumno) ON DELETE CASCADE,
    FOREIGN KEY (id_materia) REFERENCES materias(id_materia) ON DELETE CASCADE
);
