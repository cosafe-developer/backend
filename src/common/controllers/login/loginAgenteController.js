const Agente = require('../../models/agenteModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const loginAgenteController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ mensaje: 'Email y contraseña son obligatorios' });
    }

    const agente = await Agente.findOne({ email });

    if (!agente) {
      return res.status(404).json({ mensaje: 'Agente no encontrado' });
    }

    const passwordValida = await bcrypt.compare(password, agente.password);

    if (!passwordValida) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      { id: agente._id, role: agente.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );


    const isProduction = process.env.NODE_ENV === 'production';

    res.cookie('token', token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'None' : 'Lax',
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      mensaje: 'Login exitoso',
      agente: {
        id: agente._id,
        name: `${agente.firstName} ${agente.lastName}`,
        email: agente.email,
        position: agente.position,
        status: agente.status,
        role: agente.role
      }
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: 'Error interno al iniciar sesión' });
  }
};

module.exports = loginAgenteController;
