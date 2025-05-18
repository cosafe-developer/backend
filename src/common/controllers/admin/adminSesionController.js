
const getAdminSession = (req, res) => {
  res.status(200).json({
    id: req.user.id,
    role: req.user.role,
    mensaje: 'Sesión activa como administrador'
  });
};


module.exports = getAdminSession;
