// src/routes/empresaRoutes.js
const express = require('express');
const authAdmin = require('../middlewares/authAdmin');
const createEmpresa = require('../controllers/register/registerEmpresaController'); 
const loginEmpresaController = require('../controllers/login/loginEmpresaController'); // Importa el controlador


const router = express.Router();

// Ruta para registrar una nueva empresa
router.post('/empresa/register',authAdmin, createEmpresa);
// Ruta para el login de la empresa
router.post('/empresa/login', loginEmpresaController);


module.exports = router;
