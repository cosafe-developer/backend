const express = require('express');
const connectDB = require('./database/mongo');
const cookieParser = require('cookie-parser');
const adminRoutes = require('./routes/adminRoutes');
const empresaRoutes = require('./routes/empresaRoutes'); 
const agenteRoutes = require('./routes/agenteRoutes'); 


const cors = require('cors');
const app = express();



app.use(cors());
app.use(cookieParser());


// Conexión a Mongo
connectDB();
// Middleware para manejar datos JSON y URL codificada
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', adminRoutes);
app.use('/api/v1', empresaRoutes);
app.use('/api/v1', agenteRoutes);


module.exports = app;

