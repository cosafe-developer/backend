const Empresa = require('../../models/empresaModel');

const createEmpresa = async (req, res) => {
  try {
    const { logoUrl, tradeName, rfc, email, phone, password } = req.body;

    const adminId = req.user?.id;
    console.log("🔐 req.user:", req.user);

    if (!adminId) {
      console.warn("⚠️ No autorizado: falta ID de administrador");
      return res.status(401).json({ mensaje: 'No autorizado: falta ID de administrador' });
    }

    // Mostrar los datos recibidos
    console.log("📥 Datos recibidos:", { logoUrl, tradeName, rfc, email, phone, password });

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

    const saved = await nuevaEmpresa.save();

    console.log("✅ Empresa registrada:", saved._id);

    return res.status(201).json({
      mensaje: 'Empresa registrada con éxito',
      empresa: {
        id: saved._id,
        tradeName: saved.tradeName,
        email: saved.email,
        status: saved.status,
        role: saved.role 
      }
    });
  } catch (error) {
    console.error("❌ Error al registrar empresa:", error);
    return res.status(500).json({ mensaje: 'Error al registrar la empresa', error: error.message });
  }
};

module.exports = createEmpresa;
