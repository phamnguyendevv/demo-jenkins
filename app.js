const express = require("express");
const app = express();
const port = 8080;

app.get("/", (req, res) => {
  res.send("Xin Chao!");
});

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});
