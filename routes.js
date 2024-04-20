const routes = require("express").Router();
const { ProspectController, ClientController } = require("./src/controllers");
const { login, verifyToken, updatePassword, logout } = require("./controllers");
//routes
routes.post("/login", login);
routes.post("/update", verifyToken, updatePassword);
routes.get("/logout", logout);

routes.get("/plants", ProspectController.browse);
routes.get("/plants/:id", ProspectController.read);
routes.post("/plants", ProspectController.edit);
routes.put("/plants", ProspectController.add);
routes.delete("/plants/:id", ProspectController.delete);

routes.get("/categories", ClientController.browse);

module.exports = routes;
