const bcrypt = require("bcryptjs");
const Empresa = require("../../models/empresaModel");

// ✅ Obtener todas las empresas de un admin
const getEmpresasByAdmin = async (req, res) => {
  try {
    const { adminId } = req.query;

    if (!adminId) {
      return res.status(400).json({
        mensaje: "El parámetro adminId es obligatorio.",
      });
    }

    if (req.user.role !== "admin") {
      return res.status(403).json({
        mensaje: "Acceso restringido solo para administradores.",
      });
    }

    if (adminId !== req.user.id) {
      return res.status(403).json({
        mensaje: "No autorizado para consultar empresas de otro admin.",
      });
    }

    const empresas = await Empresa.find({ adminId });

    res.json(empresas);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "Error al obtener las empresas.",
    });
  }
};

// ✅ Obtener una empresa específica por ID
const getEmpresaById = async (req, res) => {
  try {
    const { id } = req.params;

    const empresa = await Empresa.findById(id);

    if (!empresa) {
      return res.status(404).json({
        mensaje: "Empresa no encontrada.",
      });
    }

    if (req.user.role !== "admin") {
      return res.status(403).json({
        mensaje: "Acceso restringido solo para administradores.",
      });
    }

    if (empresa.adminId.toString() !== req.user.id) {
      return res.status(403).json({
        mensaje: "No autorizado para consultar esta empresa.",
      });
    }

    res.json(empresa);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "Error al obtener la empresa.",
    });
  }
};

const bcrypt = require("bcryptjs");
const Empresa = require("../../models/empresaModel");

const updateEmpresa = async (req, res) => {
  try {
    const { id } = req.params;

    const empresa = await Empresa.findById(id);

    if (!empresa) {
      return res.status(404).json({
        mensaje: "Empresa no encontrada.",
      });
    }

    if (req.user.role !== "admin") {
      return res.status(403).json({
        mensaje: "Acceso restringido solo para administradores.",
      });
    }

    if (empresa.adminId.toString() !== req.user.id) {
      return res.status(403).json({
        mensaje: "No autorizado para editar esta empresa.",
      });
    }

    const {
      tradeName,
      email,
      phone,
      rfc,
      password,
      logoUrl,
    } = req.body;

    if (tradeName !== undefined && tradeName !== "") {
      empresa.tradeName = tradeName;
    }

    if (email !== undefined && email !== "") {
      empresa.email = email;
    }

    if (phone !== undefined && phone !== "") {
      empresa.phone = phone;
    }

    if (rfc !== undefined && rfc !== "") {
      empresa.rfc = rfc;
    }

    if (password && password !== "") {
      empresa.password = password;
    }

    if (logoUrl && logoUrl !== "") {
      empresa.logoUrl = logoUrl;
    }

    try {
      await empresa.save();

      console.log("✅ Empresa actualizada:", empresa._id);

      if (password && password !== "") {
        const testMatch = await bcrypt.compare(password, empresa.password);
        console.log(
          testMatch
            ? "✅ Nueva contraseña verificada correctamente."
            : "❌ ERROR: La contraseña nueva NO coincide con el hash."
        );
      }

      return res.json({
        mensaje: "Empresa actualizada correctamente.",
        empresa,
      });
    } catch (error) {
      console.error("❌ Error al actualizar empresa:", error);

      // 🧪 Error de validación de Mongoose
      if (error.name === "ValidationError") {
        const errores = Object.values(error.errors).map((e) => e.message);
        return res.status(400).json({
          mensaje: "Datos inválidos.",
          errores,
        });
      }

      // 🔐 Error por campos duplicados (email, rfc)
      if (error.code === 11000) {
        const campoDuplicado = Object.keys(error.keyPattern)[0];
        return res.status(400).json({
          mensaje: `Ya existe una empresa con ese ${campoDuplicado}.`,
        });
      }

      // 🧨 Otro error interno
      return res.status(500).json({
        mensaje: "Error interno al actualizar la empresa.",
        error: error.message,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "Error interno al procesar la solicitud.",
      error: error.message,
    });
  }
};

module.exports = {
  getEmpresasByAdmin,
  getEmpresaById,
  updateEmpresa,
};
