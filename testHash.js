const bcrypt = require("bcryptjs");
const { discriminator } = require("./models/users");

async function hashPassword(password) {
  var salt = bcrypt.genSaltSync(10);
  console.log("salt:", salt);

  const result = await bcrypt.hash(password, 10);
  console.log("result:", result);

  const isPasswordsEqual = await bcrypt.compare("12345678", result);

  console.log(isPasswordsEqual);
}

hashPassword("12345678");
