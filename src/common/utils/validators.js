const validator = require('validator');
const { isValidPhoneNumber } = require('libphonenumber-js');

// Valida correo electrónico
function isValidEmail(email) {
  return validator.isEmail(email);
}

// Valida número de teléfono (con soporte internacional)
function isValidPhone(phone) {
  return isValidPhoneNumber(phone || '');
}

// Valida RFC 
function isValidRFC(rfc) {
  const cleaned = rfc.trim().toUpperCase();
  const regexFisica = /^[A-ZÑ&]{4}\d{6}[A-Z0-9]{3}$/; // Persona física
  const regexMoral = /^[A-ZÑ&]{3}\d{6}[A-Z0-9]{3}$/;  // Persona moral
  return regexFisica.test(cleaned) || regexMoral.test(cleaned);
}

module.exports = {
  isValidEmail,
  isValidPhone,
  isValidRFC,
};
