const express = require("express");
const generarUploadUrl = require("../controllers/upload/uploadController");

const router = express.Router();

router.get("/upload-url", generarUploadUrl);

module.exports = router;
