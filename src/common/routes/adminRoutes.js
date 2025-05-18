const express = require('express');
const router = express.Router();
const authAdmin = require('../middlewares/auth/authAdmin');
const crearAdmin  = require('../controllers/register/registerAdminController');
const loginAdmin = require('../controllers/login/loginAdminController');
const getAdminSession  = require('../controllers/admin/adminSesionController');

router.post('/admin/register', crearAdmin);

router.post('/admin/login', loginAdmin);

router.get('/admin/session', authAdmin, getAdminSession);


module.exports = router;
