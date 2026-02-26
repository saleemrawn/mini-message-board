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
  messages.push({ id: messageId, text: req.body.messageText, user: req.body.user, added: new Date() });
  messageId++;
  res.redirect("/");
}

module.exports = { getIndexPage, getAddMessagePage, getMessageById, createMessage };
