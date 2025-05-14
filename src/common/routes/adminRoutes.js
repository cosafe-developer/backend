const express = require('express');
const router = express.Router();
const crearAdmin  = require('../controllers/register/registerAdminController');
const loginAdmin = require('../controllers/login/loginAdminController');


router.post('/admin/register', crearAdmin);

router.post('/admin/login', loginAdmin);

module.exports = router;
