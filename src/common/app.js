const express = require('express');


const cors = require('cors');
const app = express();

// Configurar CORS para permitir solicitudes desde cualquier origen
app.use(cors());


// Middleware para manejar datos JSON y URL codificada
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


module.exports = app;

