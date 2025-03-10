import express from 'express';
import cors from "cors";
import {port} from './config.js';
import profesorRoutes from "./routes/profesor.routes.js";
import alumnoRoutes from "./routes/users.routes.js";
import morgan from 'morgan';

const app = express()

app.use(cors({
    origin:'http://localhost:5173',
credentials:true
}));

app.use(morgan('dev'))
app.use(express.json())

app.use(alumnoRoutes);
app.use(profesorRoutes);
app.listen(port)
console.log("server on port", port )