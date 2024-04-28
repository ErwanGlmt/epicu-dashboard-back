const bcrypt = require("bcrypt");

const passwordToHash = "myPass";

const saltRounds = 10;

bcrypt.hash(passwordToHash, saltRounds, (err, hash) => {
  if (err) {
    console.error("Error generating hash:", err);
  } else {
    console.log("Hashed password:", hash);
  }
});
