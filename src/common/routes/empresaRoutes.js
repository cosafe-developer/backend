const express = require('express');
const router = express.Router();
const allowRoles = require('../middlewares/auth/allowRoles.js');
const createEmpresa = require('../controllers/register/registerEmpresaController.js');
const loginEmpresaController = require('../controllers/login/loginEmpresaController.js');
const getEmpresaSession = require('../controllers/empresa/empresaSessionController.js');
const { getEmpresasByAdmin, getEmpresaById, updateEmpresa } = require('../controllers/crud/empresacrud.js');

// --- Auth de empresa ---

// Crear empresa → solo admin
router.post('/empresa/register', allowRoles("admin"), createEmpresa);

// Login empresa → público
router.post('/empresa/login', loginEmpresaController);

// Obtener sesión empresa → solo empresas
router.get('/empresa/session', allowRoles("empresa"), getEmpresaSession);

// --- CRUD de empresas ---

// Listar empresas de un admin → solo admin
router.get('/empresas', allowRoles("admin"), getEmpresasByAdmin);

// Obtener una empresa específica → solo admin
router.get('/empresa/:id', allowRoles("admin"), getEmpresaById);

// Editar empresa específica → solo admin
router.put('/empresa/:id', allowRoles("admin"), updateEmpresa);

module.exports = router;
