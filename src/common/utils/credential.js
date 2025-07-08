const bcrypt = require("bcryptjs");

const hash = "$2b$10$zOZYVwla8fWqZqS9aqVXHecFqgMIMrV3b2dzddm0gieaiSkeoYuvW";
const plainPassword = "admin123";

bcrypt.compare(plainPassword, hash, (err, result) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(result ? "✅ Coincide" : "❌ No coincide");
});
