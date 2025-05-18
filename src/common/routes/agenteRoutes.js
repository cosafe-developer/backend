const express = require('express');
const router = express.Router();
const authAgente = require('../middlewares/auth/authAgente');
const authAdmin = require('../middlewares/auth/authAdmin');
const createAgente = require('../controllers/register/registerAgenteController');
const loginAgenteController = require('../controllers/login/loginAgenteController');
const getAgenteSession = require('../controllers/agente/agenteSesionController');

router.post('/agente/register', authAdmin, createAgente);
router.post('/agente/login',loginAgenteController);
router.get('/agente/session', authAgente, getAgenteSession);

module.exports = router;
