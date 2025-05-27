const Empresa = require('../../models/empresaModel');

const createEmpresa = async (req, res) => {
  try {
    const { logoUrl, tradeName, rfc, email, phone, password } = req.body;
    const adminId = req.user?.id;

    console.log("🔐 req.user:", req.user);
    console.log("📥 Datos recibidos:", { logoUrl, tradeName, rfc, email, phone, password });

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
      role: 'empresa',
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
        role: saved.role,
      },
    });

  } catch (error) {
    console.error("❌ Error al registrar empresa:", error);

    // 🧪 Error de validación de Mongoose (campos incorrectos)
    if (error.name === "ValidationError") {
      const errores = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({
        mensaje: "Datos inválidos",
        errores,
      });
    }

    // 🔐 Error por campos duplicados (email, rfc)
    if (error.code === 11000) {
      const campoDuplicado = Object.keys(error.keyPattern)[0]; // ej. 'email'
      return res.status(400).json({
        mensaje: `Ya existe una empresa con ese ${campoDuplicado}`,
      });
    }

    // 🧨 Otro error interno
    return res.status(500).json({
      mensaje: 'Error interno al registrar la empresa',
      error: error.message,
    });
  }
};

module.exports = createEmpresa;

