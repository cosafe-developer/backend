const express = require('express');
const connectDB = require('./database/mongo');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const adminRoutes = require('./routes/adminRoutes');
const empresaRoutes = require('./routes/empresaRoutes'); 
const agenteRoutes = require('./routes/agenteRoutes'); 
const uploadRoutes = require('./routes/upload');

const app = express();

// 🌐 Configuración de CORS con variable de entorno para origen permitido
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173', // fallback en local
  credentials: true, // 🍪 necesario para enviar cookies
};

app.use(cors(corsOptions));  // 🚦 

// 🍪 Middleware para parsear cookies
app.use(cookieParser());

// 📥 Middlewares para manejar JSON y datos codificados en URL
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🔌 Conexión a la base de datos
connectDB();

// 🚀 Rutas principales
app.use('/api/v1', adminRoutes);
app.use('/api/v1', empresaRoutes);
app.use('/api/v1', agenteRoutes);
app.use("/api/v1", uploadRoutes);

module.exports = app;
