// middlewares/allowRoles.js

const jwt = require('jsonwebtoken');

const allowRoles = (...allowedRoles) => {
  return (req, res, next) => {
    const token =
      req.cookies?.token ||
      req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ mensaje: "Acceso denegado. No hay token." });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (!allowedRoles.includes(decoded.role)) {
        return res
          .status(403)
          .json({ mensaje: "Acceso restringido para este rol." });
      }

      req.user = {
        id: decoded.id,
        role: decoded.role,
      };

      next();
    } catch (err) {
      return res
        .status(401)
        .json({ mensaje: "Token inválido o expirado." });
    }
  };
};

module.exports = allowRoles;
