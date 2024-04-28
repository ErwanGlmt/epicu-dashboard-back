const AbstractManager = require("./AbstractManager");

class FileManager extends AbstractManager {
  static table = "file";

  find(id) {
    return this.connection.query(
      `SELECT * FROM ${FileManager.table} WHERE id = ?`,
      [id]
    );
  }

  findAll() {
    return this.connection.query(`SELECT * FROM ${FileManager.table}`);
  }

  insert(file) {
    return this.connection.query(
      `INSERT INTO ${FileManager.table} (name, category, availability, path) VALUES (?, ?, ?, ?, ?)`,
      [file.name, file.category, file.availability, file.path]
    );
  }

  update(file) {
    return this.connection.query(
      `UPDATE ${FileManager.table} SET name = ?, category = ?, availability = ?, path = ? WHERE id = ?`,
      [file.name, file.category, file.availability, file.path, file.id]
    );
  }

  delete(id) {
    return this.connection.query(
      `DELETE FROM ${FileManager.table} WHERE id = ?`,
      [id]
    );
  }
}

module.exports = FileManager;
