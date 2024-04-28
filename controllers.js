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
    const { name, password } = req.body;
    const userManager = new UserManager(connection);

    const users = await userManager.findByUsername(name);
    if (!users) {
      return res.sendStatus(401);
    }

    const user = users[0];
    const match = await bcrypt.compare(password, user[0].password_hash);
    if (match) {
      const token = jwt.sign({ username: user[0].name }, privateKey, {
        expiresIn: "1h",
      });
      return res.json({ token: token, user: user[0] });
    } else {
      return res.sendStatus(401);
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
        return res.sendStatus(403);
      }
      req.user = { username: data.username, verified: true };
      next();
    });
  } else {
    return res.sendStatus(403);
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const { name, oldPassword, newPassword } = req.body;
    const userManager = new UserManager();

    const user = await userManager.findByUsername(name);
    if (!user) {
      return res.sendStatus(401);
    }

    const match = await bcrypt.compare(oldPassword, user.password_hash);
    if (match) {
      const hash = await bcrypt.hash(newPassword, saltRounds);
      await userManager.updatePassword(user.id, hash);
      return res.sendStatus(200);
    } else {
      return res.sendStatus(401);
    }
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
};

exports.logout = (req, res) => {
  return res.sendStatus(200);
};
