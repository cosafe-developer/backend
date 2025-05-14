const jwt = require('jsonwebtoken');

const authAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ mensaje: 'Acceso denegado. No hay token.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Usamos 'role' (en inglés), pero también aceptamos 'rol' como respaldo
    const role = decoded.role || decoded.rol;

    if (role !== 'admin') {
      return res.status(403).json({ mensaje: 'Acceso restringido solo para administradores.' });
    }

    // Guardamos como 'req.user' para consistencia
    req.user = {
      id: decoded.id,
      role
    };

    next();
  } catch (err) {
    return res.status(401).json({ mensaje: 'Token inválido o expirado.' });
  }
};

module.exports = authAdmin;
