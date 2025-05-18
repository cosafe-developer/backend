const getAgenteSession = (req, res) => {
  res.status(200).json({
    id: req.user.id,
    role: req.user.role,
    mensaje: 'Sesión activa como agente'
  });
};



module.exports = getAgenteSession;
