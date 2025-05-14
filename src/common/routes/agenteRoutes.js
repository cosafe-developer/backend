const express = require('express');
const router = express.Router();
const authAdmin = require('../middlewares/authAdmin');
const createAgente = require('../controllers/register/registerAgenteController');
const loginAgenteController = require('../controllers/login/loginAgenteController');

router.post('/agente/register', authAdmin, createAgente);
router.post('/agente/login',loginAgenteController);

module.exports = router;
