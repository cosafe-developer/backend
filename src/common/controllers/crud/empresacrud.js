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

module.exports = { getEmpresasByAdmin, getEmpresaById};