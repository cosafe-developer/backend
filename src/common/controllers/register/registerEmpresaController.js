const Empresa = require('../../models/empresaModel');

// Función para registrar una nueva empresa
const createEmpresa = async (req, res) => {
  try {
    const { logoUrl, tradeName, rfc, email, phone, password } = req.body;

    const adminId = req.user?.id; // Requiere que auth middleware inyecte req.user
    console.log("🧪 req.user recibido en /empresa/register:", req.user);

    if (!adminId) {
      return res.status(401).json({ mensaje: 'No autorizado: falta ID de administrador' });
    }

    const nuevaEmpresa = new Empresa({
      logoUrl,
      tradeName,
      rfc,
      email,
      phone,
      password,
      adminId,
      role: 'empresa'
    });

    await nuevaEmpresa.save();

    return res.status(201).json({
      mensaje: 'Empresa registrada con éxito',
      empresa: {
        id: nuevaEmpresa._id,
        tradeName: nuevaEmpresa.tradeName,
        email: nuevaEmpresa.email,
        status: nuevaEmpresa.status,
        role: nuevaEmpresa.role 
      }
    });
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al registrar la empresa', error });
  }
};

module.exports = createEmpresa;
