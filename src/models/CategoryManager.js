const AbstractManager = require("./AbstractManager");

class CategoryManager extends AbstractManager {
  static table = "category";

  insert(item) {
    return this.connection.query(
      `insert into ${CategoryManager.table} (title) values (?)`,
      [item.title]
    );
  }

  update(item) {
    return this.connection.query(
      `update ${CategoryManager.table} set title = ? where id = ?`,
      [item.title, item.id]
    );
  }
}

module.exports = CategoryManager;
