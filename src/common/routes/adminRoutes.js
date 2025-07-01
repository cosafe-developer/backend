const express = require('express');
const router = express.Router();

const allowRoles = require('../middlewares/auth/allowRoles.js');
const crearAdmin  = require('../controllers/register/registerAdminController');
const loginAdmin = require('../controllers/login/loginAdminController');
const getAdminSession  = require('../controllers/admin/adminSesionController');

// Registro → público
router.post('/admin/register', crearAdmin);

// Login → público
router.post('/admin/login', loginAdmin);

// Session → requiere ser admin)
router.get('/admin/session', allowRoles("admin"), getAdminSession);

module.exports = router;
