const Admin = require('../../models/adminModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      console.log('Intento de login fallido: email no encontrado');
      return res.status(404).json({ mensaje: 'Email no encontrado' });
    }

    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword) {
      console.log('Intento de login fallido: contraseña incorrecta');
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      {
        id: admin._id,
        role: admin.role
      },
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


    console.log(`Administrador ${admin.email} inició sesión correctamente`);
    res.status(200).json({
      mensaje: 'Login exitoso',
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      }
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ mensaje: 'Error en login', error });
  }
};

module.exports = loginAdmin;
