async function getErrorPage(req, res) {
  res.status(404).render("error", { page_title: "Page Not Found - 404", page_heading: "We cannot find that page." });
}

module.exports = { getErrorPage };
