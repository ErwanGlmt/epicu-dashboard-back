const routes = require("express").Router();
const { PlantController, CategoryController } = require("./src/controllers");
const { login, verifyToken, updatePassword, logout } = require("./controllers");
//routes
routes.post("/login", login);
routes.post("/update", verifyToken, updatePassword);
routes.get("/logout", logout);

routes.get("/plants", PlantController.browse);
routes.get("/plants/:id", PlantController.read);
routes.post("/plants", PlantController.edit);
routes.put("/plants", PlantController.add);
routes.delete("/plants/:id", PlantController.delete);

routes.get("/categories", CategoryController.browse);

module.exports = routes;
