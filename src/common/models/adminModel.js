const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { isValidEmail, isValidPhone } = require('../utils/validators');

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },

  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: isValidEmail,
      message: 'El correo no es válido',
    },
  },

  password: { type: String, required: true },

  phone: {
    type: String,
    required: true,
    validate: {
      validator: isValidPhone,
      message: 'El número de teléfono no es válido',
    },
  },

  logoUrl: { type: String, required: true },

  gender: { type: String, enum: ['male', 'female', 'other'] },

  status: { type: String, enum: ['active', 'inactive'], default: 'active' },

  role: { type: String, enum: ['admin'], default: 'admin' },

  lastLogin: { type: Date },
}, { timestamps: true });

adminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
