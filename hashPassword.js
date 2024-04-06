const bcrypt = require("bcrypt");

// Password to hash
const passwordToHash = "myPass";

// Number of salt rounds
const saltRounds = 10;

// Generate hash
bcrypt.hash(passwordToHash, saltRounds, (err, hash) => {
  if (err) {
    console.error("Error generating hash:", err);
  } else {
    console.log("Hashed password:", hash);
  }
});
