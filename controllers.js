// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
// const saltRounds = 10; //required by bcrypt

// exports.login = async (req, res) => {
//   try {
//     const { name, password } = req.body;
//     const { username, passwordHash, privateKey } = process.env;
//     let token = null;
//     if (name && password) {
//       console.log("NAMEPASS");
//       let match = await bcrypt.compare(password, passwordHash);
//       console.log("Match", match);
//       console.log("Name", name);
//       console.log("Username", username);
//       if (name === username && match) {
//         console.log("MATCH");
//         token = await jwt.sign({ username: username }, privateKey, {
//           expiresIn: "1h",
//         });
//       }
//     }
//     if (token) return res.json({ token: token, username: username });
//     console.log(token);
//     console.log("COUCOU");
//     return res.sendStatus(401);
//   } catch (err) {
//     console.log(err);
//     return res.sendStatus(500);
//   }
// };

// exports.verifyToken = (req, res, next) => {
//   req.user = { username: null, verified: false };
//   const { privateKey } = process.env;
//   const bearerHeader = req.headers["authorization"];
//   if (typeof bearerHeader !== "undefined") {
//     const bearerToken = bearerHeader.split(" ")[1];
//     jwt.verify(bearerToken, privateKey, function (err, data) {
//       if (!(err && typeof data === "undefined")) {
//         req.user = { username: data.username, verified: true };
//         next();
//       }
//     });
//   }
//   return res.sendStatus(403);
// };

// exports.updatePassword = async (req, res) => {
//   try {
//     const { oldPassword, newPassword } = req.body;
//     const { passwordHash } = process.env;
//     if (oldPassword && newPassword) {
//       let match = await bcrypt.compare(oldPassword, passwordHash);
//       console.log("MATCH");
//       if (match) {
//         let hash = await bcrypt.hash(newPassword, saltRounds);
//         return res.sendStatus(200);
//       }
//     }
//     return res.sendStatus(401);
//   } catch (err) {
//     console.log(err);
//     return res.sendStatus(500);
//   }
// };

// exports.logout = (req, res) => {
//   const bearerHeader = req.headers["authorization"];
//   if (typeof bearerHeader !== "undefined") {
//     const bearerToken = bearerHeader.split(" ")[1];
//     //add bearerToken to blacklist
//   }
//   return res.sendStatus(200);
// };

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserManager = require("./src/models/UserManager");
const mysql = require("mysql2/promise");

exports.login = async (req, res) => {
  try {
    const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, privateKey } = process.env;

    const connection = await mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      multipleStatements: true,
    });
    // await connection.query(DB_NAME);
    const { name, password } = req.body;
    const userManager = new UserManager(connection);
    // console.log("userManager", userManager);

    // Fetch user data from the database based on the username
    const users = await userManager.findByUsername(name);
    if (!users) {
      return res.sendStatus(401); // User not found
    }

    const user = users[0];
    // Compare the provided password with the stored hash
    console.log("password", password);
    console.log("user", user);
    console.log("user.password_hash", user.password_hash);
    const match = await bcrypt.compare(password, user[0].password_hash);
    if (match) {
      // Generate token
      const token = jwt.sign({ username: user[0].name }, privateKey, {
        expiresIn: "1h",
      });
      return res.json({ token: token, user: user[0] });
    } else {
      return res.sendStatus(401); // Password mismatch
    }
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
};

exports.verifyToken = (req, res, next) => {
  const { privateKey } = process.env;
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearerToken = bearerHeader.split(" ")[1];
    jwt.verify(bearerToken, privateKey, function (err, data) {
      if (err) {
        console.error(err);
        return res.sendStatus(403); // Forbidden
      }
      req.user = { username: data.username, verified: true };
      next();
    });
  } else {
    return res.sendStatus(403); // Forbidden
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const { name, oldPassword, newPassword } = req.body;
    const userManager = new UserManager();

    // Fetch user data from the database based on the username
    const user = await userManager.findByUsername(name);
    if (!user) {
      return res.sendStatus(401); // User not found
    }

    // Compare the provided old password with the stored hash
    const match = await bcrypt.compare(oldPassword, user.password_hash);
    if (match) {
      // Hash the new password
      const hash = await bcrypt.hash(newPassword, saltRounds);
      // Update the password hash in the database
      await userManager.updatePassword(user.id, hash);
      return res.sendStatus(200);
    } else {
      return res.sendStatus(401); // Old password mismatch
    }
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
};

exports.logout = (req, res) => {
  // Implement token blacklist if needed
  return res.sendStatus(200);
};
