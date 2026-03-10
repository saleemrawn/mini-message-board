const { body, validationResult } = require("express-validator");
const db = require("../db/queries");

const requiredErr = "is required";

const createMessageValidators = [
  body("user").trim().notEmpty().withMessage(`Author name ${requiredErr}`).isAlpha().withMessage("Author name must contain only letters"),
  body("messageText")
    .trim()
    .notEmpty()
    .withMessage(`Message ${requiredErr}`)
    .isAlphanumeric(undefined, { ignore: `^[a-zA-Z0-9 .,"'\-!?()&@:/]+$` })
    .withMessage("Message must container letters, numbers and .,\"'\-!?()&@:/"),
];

async function getIndexPage(req, res) {
  const messages = await db.getAllMessages();
  res.render("index", { page_title: "Mini Messageboard", messages: messages });
}

async function getAddMessagePage(req, res) {
  res.render("form", { page_title: "Add message", heading: "Add message" });
}

async function getMessageById(req, res) {
  const message = await db.getMessageById(req.params.id);
  res.render("message", {
    page_title: "Message",
    message: message,
  });
}

async function createMessage(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).render("form", { page_title: "Add message", heading: "Add message", errors: errors.array() });
  }

  await db.addMessage(req.body.user, req.body.messageText);
  res.redirect("/");
}

module.exports = { getIndexPage, getAddMessagePage, getMessageById, createMessage, createMessageValidators };
