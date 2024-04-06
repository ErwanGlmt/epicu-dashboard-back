const AbstractManager = require("./AbstractManager");
const CategoryManager = require("./CategoryManager");

class PlantManager extends AbstractManager {
  static table = "plant";

  find(id) {
    return this.connection.query(
      `select plant.id, plant.name, plant.light, plant.water, plant.price, plant.image, category.name as category from ${PlantManager.table} inner join ${CategoryManager.table} on plant.category_id = category.id where plant.id = ?`,
      [id]
    );
  }

  findAll(category) {
    return this.connection.query(
      `select plant.id, plant.name, plant.light, plant.water, plant.price, plant.image, category.name as category from ${PlantManager.table} inner join ${CategoryManager.table} on plant.category_id = category.id`,
      [category]
    );
  }

  insert(plant) {
    return this.connection.query(
      `insert into ${PlantManager.table} (name, category_id, light, water, price, image) values (?, ?, ?, ?, ?, ?)`,
      [
        plant.name,
        plant.category_id,
        plant.light,
        plant.water,
        plant.price,
        plant.image,
      ]
    );
  }

  update(plant) {
    return this.connection.query(
      `update ${PlantManager.table} set name = ?, category_id = ?, light = ?, water = ? price = ?, image = ? where id = ?`,
      [
        plant.name,
        plant.category_id,
        plant.light,
        plant.water,
        plant.price,
        plant.image,
      ]
    );
  }

  delete(id) {
    return this.connection.query(
      `delete from ${PlantManager.table} where id = ?`,
      [id]
    );
  }
}

module.exports = PlantManager;
