const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  static table = "user";
  constructor(connection) {
    super(connection, "user"); // Assuming 'user' is the table name
    this.connection = connection;
  }
  find(id) {
    return this.connection.query(
      `SELECT * FROM ${UserManager.table} WHERE id = ?`,
      [id]
    );
  }

  findByUsername(username) {
    return this.connection.query(
      `SELECT * FROM ${UserManager.table} WHERE name = ?`,
      [username]
    );
  }

  findAll() {
    return this.connection.query(`SELECT * FROM ${UserManager.table}`);
  }

  insert(user) {
    return this.connection.query(
      `INSERT INTO ${UserManager.table} (name, email, role, password_hash) VALUES (?, ?, ?, ?, ?)`,
      [user.name, user.email, user.role, user.password_hash]
    );
  }

  update(user) {
    return this.connection.query(
      `UPDATE ${UserManager.table} SET name = ?, email = ?, role = ?, password_hash = ? WHERE id = ?`,
      [user.name, user.email, user.role, user.password_hash, user.id]
    );
  }

  delete(id) {
    return this.connection.query(
      `DELETE FROM ${UserManager.table} WHERE id = ?`,
      [id]
    );
  }
}

module.exports = UserManager;
