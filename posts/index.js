const express = require("express");
const { randomBytes } = require("crypto");
const { json, urlencoded } = require("body-parser");
const morgan = require("morgan");

const app = express();
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;

  posts[id] = {
    id,
    title,
  };
  res.status(201).send(posts[id]);
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Posts server listening on ${PORT}`);
});
