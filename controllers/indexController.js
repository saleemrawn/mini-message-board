const { body, validationResult } = require("express-validator");

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

async function getIndexPage(req, res, messages) {
  res.render("index", { page_title: "Mini Messageboard", messages: messages });
}

async function getAddMessagePage(req, res) {
  res.render("form", { page_title: "Add message", heading: "Add message" });
}

async function getMessageById(req, res, messages) {
  const message = messages.find((message) => message.id === Number(req.params.id));
  res.render("message", { page_title: `${message.user} | Message`, user: message.user, text: message.text, added: message.added });
}

async function createMessage(req, res, messages, messageId) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).render("form", { page_title: "Add message", heading: "Add message", errors: errors.array() });
  }

  messages.push({ id: messageId, text: req.body.messageText, user: req.body.user, added: new Date() });
  messageId++;
  res.redirect("/");
}

module.exports = { getIndexPage, getAddMessagePage, getMessageById, createMessage, createMessageValidators };
