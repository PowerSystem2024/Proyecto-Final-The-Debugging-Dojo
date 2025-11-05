import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors"; // ← Agregar esta línea
import productosRouter from "./routes/productos.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

// Configurar CORS ← Agregar esto
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3001'], // Puertos de Vite
  credentials: true
}));

app.use(express.json());

// Conexión a MongoDB Atlas
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Conectado a MongoDB Atlas"))
  .catch((err) => console.error("❌ Error al conectar con MongoDB:", err));

// Rutas
app.use("/api/productos", productosRouter);

// Ruta base
app.get("/", (req, res) => {
  res.json({
    status: 'success',
    message: 'API de productos funcionando 🚀',
    version: '1.0.0'
  });
});

// Manejo de rutas no encontradas
app.use(notFoundHandler);

// Manejo global de errores
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));