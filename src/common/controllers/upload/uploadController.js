const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
require("dotenv").config();

const s3 = new S3Client({
  region: process.env.DO_SPACES_REGION,
  endpoint: process.env.DO_SPACES_ENDPOINT,
  credentials: {
    accessKeyId: process.env.DO_SPACES_KEY,
    secretAccessKey: process.env.DO_SPACES_SECRET,
  },
});

const generarUploadUrl = async (req, res) => {
  try {
    const { fileName, fileType, folder } = req.query;

    if (!fileName || !fileType) {
      return res.status(400).json({ error: "fileName y fileType son requeridos" });
    }

    const filePath = folder
      ? `${folder}/${Date.now()}-${fileName}`
      : `${Date.now()}-${fileName}`;

    const command = new PutObjectCommand({
      Bucket: process.env.DO_SPACES_BUCKET,
      Key: filePath,
      ContentType: fileType,
      ACL: "public-read",
    });

    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 60 });
    const publicUrl = `https://${process.env.DO_SPACES_BUCKET}.nyc3.digitaloceanspaces.com/${filePath}`;

    res.json({ signedUrl, publicUrl });
  } catch (error) {
    console.error("Error al generar URL firmada:", error);
    res.status(500).json({ error: "No se pudo generar la URL de carga" });
  }
};

module.exports = generarUploadUrl;
