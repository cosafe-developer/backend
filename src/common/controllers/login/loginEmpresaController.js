const Empresa = require('../../models/empresaModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const loginEmpresaController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const empresa = await Empresa.findOne({ email });
    if (!empresa) {
      return res.status(404).json({ mensaje: 'Empresa no encontrada' });
    }

    const isMatch = await bcrypt.compare(password, empresa.password);
    if (!isMatch) {
      return res.status(400).json({ mensaje: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      { id: empresa._id, role: empresa.role },
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
      empresa: {
        id: empresa._id,
        tradeName: empresa.tradeName,
        email: empresa.email,
        status: empresa.status,
        role: empresa.role
      }
    });

  } catch (error) {
    console.error('Error en loginEmpresaController:', error);
    return res.status(500).json({ mensaje: 'Error al realizar el login', error });
  }
};

module.exports = loginEmpresaController;
