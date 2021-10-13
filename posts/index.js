const express = require("express");

const app = express();

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", (req, res) => {});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Posts server listening on ${PORT}`);
});
