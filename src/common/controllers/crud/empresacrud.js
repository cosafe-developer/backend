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

// ✅ Actualizar empresa por ID
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
      console.log("Actualizando tradeName:", tradeName);
      empresa.tradeName = tradeName;
    }

    if (email !== undefined && email !== "") {
      console.log("Actualizando email:", email);
      empresa.email = email;
    }

    if (phone !== undefined && phone !== "") {
      console.log("Actualizando phone:", phone);
      empresa.phone = phone;
    }

    if (rfc !== undefined && rfc !== "") {
      console.log("Actualizando rfc:", rfc);
      empresa.rfc = rfc;
    }

    if (password && password !== "") {
      console.log("Actualizando password");
      const salt = await bcrypt.genSalt(10);
      empresa.password = await bcrypt.hash(password, salt);
    }

    if (logoUrl && logoUrl !== "") {
      console.log("Actualizando logoUrl:", logoUrl);
      empresa.logoUrl = logoUrl;
    }

    await empresa.save();

    res.json({
      mensaje: "Empresa actualizada correctamente.",
      empresa,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "Error al actualizar la empresa.",
    });
  }
};


module.exports = {
  getEmpresasByAdmin,
  getEmpresaById,
  updateEmpresa,
};
