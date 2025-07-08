const { S3Client, DeleteObjectCommand } = require("@aws-sdk/client-s3");
require("dotenv").config();

const s3 = new S3Client({
  region: process.env.DO_SPACES_REGION,
  endpoint: process.env.DO_SPACES_ENDPOINT,
  credentials: {
    accessKeyId: process.env.DO_SPACES_KEY,
    secretAccessKey: process.env.DO_SPACES_SECRET,
  },
});

const deleteImage = async (req, res) => {
  try {
    const { filePath } = req.query;

    if (!filePath) {
      return res.status(400).json({ error: "filePath es requerido" });
    }

    const command = new DeleteObjectCommand({
      Bucket: process.env.DO_SPACES_BUCKET,
      Key: filePath,
    });

    await s3.send(command);

    res.json({ message: "Archivo eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar archivo:", error);
    res.status(500).json({ error: "No se pudo eliminar el archivo" });
  }
};

module.exports = deleteImage;
