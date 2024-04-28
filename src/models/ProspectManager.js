const AbstractManager = require("./AbstractManager");

class ProspectManager extends AbstractManager {
  static table = "prospect";

  find(id) {
    return this.connection.query(
      `SELECT * FROM ${ProspectManager.table} WHERE id = ?`,
      [id]
    );
  }

  findAll() {
    return this.connection.query(`SELECT * FROM ${ProspectManager.table}`);
  }

  insert(prospect) {
    return this.connection.query(
      `INSERT INTO ${ProspectManager.table} (name, date, comments, status) VALUES (?, ?, ?, ?, ?)`,
      [prospect.name, prospect.date, prospect.comments, prospect.status]
    );
  }

  update(prospect) {
    return this.connection.query(
      `UPDATE ${ProspectManager.table} SET name = ?, date = ?, comments = ?, status = ? WHERE id = ?`,
      [
        prospect.name,
        prospect.date,
        prospect.comments,
        prospect.status,
        prospect.id,
      ]
    );
  }

  delete(id) {
    return this.connection.query(
      `DELETE FROM ${ProspectManager.table} WHERE id = ?`,
      [id]
    );
  }
}

module.exports = ProspectManager;
