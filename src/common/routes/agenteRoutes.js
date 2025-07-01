const express = require('express');
const router = express.Router();
const allowRoles = require('../middlewares/auth/allowRoles.js');
const createAgente = require('../controllers/register/registerAgenteController.js');
const loginAgenteController = require('../controllers/login/loginAgenteController.js');
const getAgenteSession = require('../controllers/agente/agenteSesionController.js');

// Crear agente → solo admin
router.post('/agente/register', allowRoles("admin"), createAgente);

// Login → público
router.post('/agente/login', loginAgenteController);

// Obtener sesión agente → solo agentes
router.get('/agente/session', allowRoles("agente"), getAgenteSession);

module.exports = router;
