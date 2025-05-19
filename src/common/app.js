const express = require('express');
const connectDB = require('./database/mongo');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const adminRoutes = require('./routes/adminRoutes');
const empresaRoutes = require('./routes/empresaRoutes'); 
const agenteRoutes = require('./routes/agenteRoutes'); 

const app = express();

// 🔌 CORS 
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true, // Necesario para que se envíen cookies
}));

app.use(cors(corsOptions));

// 🍪 Middleware para parsear cookies
app.use(cookieParser());

// 📦 Middlewares para recibir JSON y datos codificados
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🔌 Conexión a la base de datos
connectDB();

// 🚀 Rutas
app.use('/api/v1', adminRoutes);
app.use('/api/v1', empresaRoutes);
app.use('/api/v1', agenteRoutes);

module.exports = app;
