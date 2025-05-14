const Agente = require('../../models/agenteModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const loginAgenteController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verifica que se manden email y contraseña
        if (!email || !password) {
            return res.status(400).json({ mensaje: 'Email y contraseña son obligatorios' });
        }

        const agente = await Agente.findOne({ email });

        if (!agente) {
            return res.status(404).json({ mensaje: 'Agente no encontrado' });
        }

        const passwordValida = await bcrypt.compare(password, agente.password);

        if (!passwordValida) {
            return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
        }

        // Genera token
        const token = jwt.sign(
            {
                id: agente._id,
                role: agente.role,
            },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        return res.status(200).json({
            mensaje: 'Login exitoso',
            token,
            agente: {
                id: agente._id,
                name: `${agente.firstName} ${agente.lastName}`,
                email: agente.email,
                position: agente.position,
                status: agente.status,
                role:agente.role
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error interno al iniciar sesión' });
    }
};

module.exports = loginAgenteController;
