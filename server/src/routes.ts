import express from "express";

import PointsController from "./controllers/pointsController";
import ItemsController from "./controllers/itemsController";

const routes = express.Router();
const pointsController = new PointsController();
const itemsController = new ItemsController();

//listar todos os items
routes.get("/items", itemsController.index);

//criar um ponto de coleta
routes.post("/points", pointsController.create);
routes.get("/points", pointsController.index);
routes.get("/points/:id", pointsController.show);

export default routes;
