const Empresa = require('../../models/empresaModel'); // El modelo de la empresa
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const loginEmpresaController = async (req, res) => {
  try {
    const { email, password } = req.body; // Obtenemos email y password del body

    // Buscar la empresa por correo electrónico
    const empresa = await Empresa.findOne({ email });
    if (!empresa) {
      return res.status(404).json({ mensaje: 'Empresa no encontrada' });
    }

    // Verificar la contraseña con bcrypt
    const isMatch = await bcrypt.compare(password, empresa.password);
    if (!isMatch) {
      return res.status(400).json({ mensaje: 'Contraseña incorrecta' });
    }

    // Crear un token JWT para la empresa
    const token = jwt.sign(
      { id: empresa._id, role: 'empresa' },
      process.env.JWT_SECRET,  // La clave secreta de tu JWT, normalmente en el archivo .env
      { expiresIn: '1h' }      // El token expirará en 1 hora
    );

    // Devolver la respuesta con el token
    return res.status(200).json({
      mensaje: 'Login exitoso',
      token,
      empresa: {
        id: empresa._id,
        tradeName: empresa.tradeName,  // El nombre comercial de la empresa
        email: empresa.email,
        status: empresa.status,        // El estado de la empresa (activo o inactivo)
      }
    });
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al realizar el login', error });
  }
};

module.exports = loginEmpresaController;
