const getEmpresaSession = (req, res) => {
  res.status(200).json({
    id: req.user.id,
    role: req.user.role,
    mensaje: 'Sesión activa como empresa'
  });
};

module.exports = getEmpresaSession;
