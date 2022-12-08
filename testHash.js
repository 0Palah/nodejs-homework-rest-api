const bcrypt = require("bcryptjs");

async function hashPassword(password) {
  var salt = bcrypt.genSaltSync(10);
  console.log("salt:", salt);

  const result = await bcrypt.hash(password, 10);
  console.log("result:", result);
}

hashPassword("12345678");
