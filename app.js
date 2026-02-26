const express = require("express");
const app = express();
const path = require("node:path");
const indexRouter = require("./routes/indexRouter");
const errorRouter = require("./routes/errorRouter");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use("/", indexRouter);
app.use("{/*splat}", errorRouter);

const PORT = 8080;
app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  }

  console.log(`Express server running at port ${PORT}`);
});
