const UserManager = require("../models/UserManager");

class UserController {
  static browse = (req, res) => {
    const userManager = new UserManager();
    userManager
      .findAll()
      .then((rows) => {
        res.send(rows);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static read = (req, res) => {
    const userManager = new UserManager();
    userManager
      .find(req.params.id)
      .then((rows) => {
        if (rows.length === 0) {
          res.sendStatus(404);
        } else {
          res.send(rows[0]);
        }
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static edit = (req, res) => {
    const user = req.body;

    user.id = parseInt(req.params.id, 10);

    const userManager = new UserManager();
    userManager
      .update(user)
      .then((result) => {
        if (result.affectedRows === 0) {
          res.sendStatus(404);
        } else {
          res.sendStatus(204);
        }
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static add = (req, res) => {
    const user = req.body;

    const userManager = new UserManager();
    userManager
      .insert(user)
      .then((result) => {
        res.status(201).send({ ...user, id: result.insertId });
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static delete = (req, res) => {
    const userManager = new UserManager();
    userManager
      .delete(req.params.id)
      .then(() => {
        res.sendStatus(204);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };
}

module.exports = UserController;
