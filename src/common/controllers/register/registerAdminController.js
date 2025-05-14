const Admin = require('../../models/adminModel');

const createAdmin = async (req, res) => {
  try {
    const { name, email, password, phone, avatarUrl, gender } = req.body;

    const existing = await Admin.findOne({ email });
    if (existing) {
      return res.status(400).json({ mensaje: 'El email ya está registrado' });
    }

    const newAdmin = new Admin({
      name,
      email,
      password,
      phone,
      avatarUrl,
      gender
    });

    await newAdmin.save();
    console.log(`Administrador creado: ${email}`);
    res.status(201).json({ mensaje: 'Administrador creado exitosamente' });

  } catch (error) {
    console.error('Error al crear el administrador:', error);
    res.status(500).json({ mensaje: 'Error al crear el administrador' });
  }
};

module.exports = createAdmin ;
