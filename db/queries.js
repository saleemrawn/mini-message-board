const pool = require("./pool");

async function getAllMessages() {
  const { rows } = await pool.query("SELECT * FROM messages");
  return rows;
}

async function getMessageById(id) {
  const { rows } = await pool.query("SELECT * FROM messages WHERE id = ($1)", [id]);
  return rows;
}

async function addMessage(author, message) {
  await pool.query("INSERT INTO messages (author, message) VALUES ($1, $2)", [author, message]);
}

module.exports = { getAllMessages, getMessageById, addMessage };
