const { Router } = require("express");
const indexRouter = Router();
const indexController = require("../controllers/indexController");

indexRouter.get("/", indexController.getIndexPage);
indexRouter.get("/new", indexController.getAddMessagePage);
indexRouter.get("/message/:id", indexController.getMessageById);

indexRouter.post("/new", indexController.createMessageValidators, indexController.createMessage);

module.exports = indexRouter;
