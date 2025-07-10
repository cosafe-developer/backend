// src/controllers/agenteController.js
const Agente = require('../../models/agenteModel');

// Función para registrar un nuevo agente
const createAgente = async (req, res) => {
  try {
    const {logoUrl, firstName, lastName, gender, startDate, email, phone, position, password, } = req.body;
    const adminId = req.user?.id; // Requiere middleware de autenticación que inyecte req.user

    if (!adminId) {
      return res.status(401).json({ mensaje: 'No autorizado: falta ID del administrador' });
    }

    const nuevoAgente = new Agente({
      logoUrl,
      firstName,
      lastName,
      gender,
      startDate,
      email,
      phone,
      position,
      password,
      adminId,
      role: 'agente'
    });


    await nuevoAgente.save();

    return res.status(201).json({
      mensaje: 'Agente registrado con éxito',
      agente: {
        id: nuevoAgente._id,
        name: `${nuevoAgente.firstName} ${nuevoAgente.lastName}`,
        email: nuevoAgente.email,
        position: nuevoAgente.position,
        status: nuevoAgente.status,
        role: nuevoAgente.role
      }
    });
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al registrar al agente', error });
  }
};

module.exports = createAgente;
