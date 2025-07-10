const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { isValidEmail, isValidPhone } = require('../utils/validators');

const agenteSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  gender: { type: String, enum: ['male', 'female', 'other'], required: true },
  startDate: { type: Date, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: isValidEmail,
      message: 'El correo no es válido',
    },
  },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: isValidPhone,
      message: 'El número de teléfono no es válido',
    },
  },
  position: { type: String, required: true },
  password: { type: String, required: true },

  logoUrl: { type: String, required: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  role: { type: String, enum: ['agente'], default: 'agente' }, 
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true,
  }
}, { timestamps: true });


agenteSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

const Agente = mongoose.model('Agente', agenteSchema);
module.exports = Agente;
