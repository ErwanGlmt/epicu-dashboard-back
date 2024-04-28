const AbstractManager = require("./AbstractManager");

class ClientManager extends AbstractManager {
  static table = "client";

  find(id) {
    return this.connection.query(
      `SELECT * FROM ${ClientManager.table} WHERE id = ?`,
      [id]
    );
  }

  findAll() {
    return this.connection.query(`SELECT * FROM ${ClientManager.table}`);
  }

  insert(client) {
    return this.connection.query(
      `INSERT INTO ${ClientManager.table} (name, shooting_date, publication_date, siret_number, email, phone_number, contract_date, invoice_date, payment_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        client.name,
        client.shooting_date,
        client.publication_date,
        client.siret_number,
        client.email,
        client.phone_number,
        client.contract_date,
        client.invoice_date,
        client.payment_status,
      ]
    );
  }

  update(client) {
    return this.connection.query(
      `UPDATE ${ClientManager.table} SET name = ?, shooting_date = ?, publication_date = ?, siret_number = ?, email = ?, phone_number = ?, contract_date = ?, invoice_date = ?, payment_status = ? WHERE id = ?`,
      [
        client.name,
        client.shooting_date,
        client.publication_date,
        client.siret_number,
        client.email,
        client.phone_number,
        client.contract_date,
        client.invoice_date,
        client.payment_status,
        client.id,
      ]
    );
  }

  delete(id) {
    return this.connection.query(
      `DELETE FROM ${ClientManager.table} WHERE id = ?`,
      [id]
    );
  }
}

module.exports = ClientManager;
