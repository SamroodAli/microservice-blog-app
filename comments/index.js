const express = require("express");
const { json, urlencoded } = require("body-parser");
const morgan = require("morgan");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;
  const postId = req.params.id;
  const comments = commentsByPostId[postId] || [];
  comments.push({ id: commentId, content });
  commentsByPostId[postId] = comments;
  await axios.post("http://localhost:4005/events", {
    type: "COMMENT_CREATED",
    payload: {
      id: commentId,
      postId,
      content,
    },
  });
  res.status(201).send(comments);
});

app.post("/events", (req, res) => {
  console.log("Event recieved", req.body.type);
  res.send({});
});

const PORT = 4001;
app.listen(PORT, () => {
  console.log(`Comments server running on port ${PORT}`);
});
