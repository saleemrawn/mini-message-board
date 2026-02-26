const { Router } = require("express");
const indexRouter = Router();
const { getMessageById, getAddMessagePage, getIndexPage, createMessage } = require("../controllers/indexController");

const messages = [];
let messageId = 0;

indexRouter.get("/", (req, res) => getIndexPage(req, res, messages));
indexRouter.get("/new", getAddMessagePage);
indexRouter.get("/message/:id", (req, res) => getMessageById(req, res, messages));

indexRouter.post("/new", (req, res) => createMessage(req, res, messages, messageId));

module.exports = indexRouter;
