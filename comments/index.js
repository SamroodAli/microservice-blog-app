const express = require("express");
const { json, urlencoded } = require("body-parser");
const morgan = require("morgan");
const { randomBytes } = require("crypto");

const app = express();
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;
  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id: commentId, content });
  commentsByPostId[req.params.id] = comments;
  res.status(201).send(comments);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Comments server running on port ${PORT}`);
});
