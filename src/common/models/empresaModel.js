// src/models/empresaModel.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { isValidEmail, isValidPhone, isValidRFC } = require('../utils/validators');

const empresaSchema = new mongoose.Schema({
  logoUrl: { type: String, required: true },
  tradeName: { type: String, required: true },
  rfc: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: isValidRFC,
      message: 'El RFC no es válido',
    },
  },
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
  password: { type: String, required: true },

  status: { type: String, enum: ['active', 'inactive'], default: 'active' },

  role: { type: String,enum: ['empresa'], default: 'empresa',
  },

  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true,
  },
}, { timestamps: true });


empresaSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

const Empresa = mongoose.model('Empresa', empresaSchema);
module.exports = Empresa;
