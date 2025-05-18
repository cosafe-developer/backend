const jwt = require('jsonwebtoken');

const authEmpresa = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ mensaje: 'Acceso denegado. No hay token.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== 'empresa') {
      return res.status(403).json({ mensaje: 'Acceso restringido solo para empresas.' });
    }

    req.user = {
      id: decoded.id,
      role: decoded.role
    };

    next();
  } catch (err) {
    return res.status(401).json({ mensaje: 'Token inválido o expirado.' });
  }
};

module.exports = authEmpresa;
