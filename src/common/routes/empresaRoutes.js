// src/routes/empresaRoutes.js
const express = require('express');
const authAdmin = require('../middlewares/auth/authAdmin');
const authEmpresa = require('../middlewares/auth/authEmpresa');
const createEmpresa = require('../controllers/register/registerEmpresaController'); 
const loginEmpresaController = require('../controllers/login/loginEmpresaController'); // Importa el controlador
const getEmpresaSession = require('../controllers/empresa/empresaSessionController');


const router = express.Router();

// Ruta para registrar una nueva empresa
router.post('/empresa/register',authAdmin, createEmpresa);
// Ruta para el login de la empresa
router.post('/empresa/login', loginEmpresaController);
// Verificar sesión
router.get('/empresa/session', authEmpresa, getEmpresaSession);

module.exports = router;
