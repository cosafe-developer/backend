const express = require("express");
const generarUploadUrl = require("../controllers/upload/uploadController");
const deleteImage = require("../controllers/upload/deleteImage");

const router = express.Router();

router.get("/upload-url", generarUploadUrl);
router.delete("/delete-file", deleteImage);

module.exports = router;
