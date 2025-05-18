const jwt = require('jsonwebtoken');

const authAgente = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ mensaje: 'Acceso denegado. No hay token.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const role = decoded.role;

    if (role !== 'agente') {
      return res.status(403).json({ mensaje: 'Acceso restringido solo para agentes.' });
    }

    req.user = {
      id: decoded.id,
      role
    };

    next();
  } catch (err) {
    return res.status(401).json({ mensaje: 'Token inválido o expirado.' });
  }
};

module.exports = authAgente;
