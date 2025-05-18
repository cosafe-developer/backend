const getEmpresaSession = (req, res) => {
  const empresa = req.user;

  res.status(200).json({
    mensaje: 'Sesión activa',
    empresa
  });
};

module.exports = getEmpresaSession;
