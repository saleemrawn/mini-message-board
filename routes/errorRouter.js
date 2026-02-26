const { Router } = require("express");
const errorRouter = Router();
const { getErrorPage } = require("../controllers/errorController");

errorRouter.get("/", getErrorPage);

module.exports = errorRouter;
