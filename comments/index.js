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
  comments.push({ id: commentId, content, status: "pending" });
  commentsByPostId[postId] = comments;
  try {
    await axios.post("http://event-bus-clusterip-srv:4005/events", {
      type: "COMMENT_CREATED",
      payload: {
        id: commentId,
        postId,
        content,
        status: "pending",
      },
    });
  } catch (error) {
    console.error(error.message);
  }
  res.status(201).send(comments);
});

app.post("/events", async (req, res) => {
  console.log("Event recieved", req.body.type);

  const { type, payload } = req.body;
  switch (type) {
    case "COMMENT_MODERATED": {
      const { id, postId, status, content } = payload;
      const comments = commentsByPostId[postId];
      const comment = comments.find((comment) => comment.id === id);
      console.log(comment.postId, "moderated id", comment);
      comment.status = status;
      try {
        await axios.post("http://event-bus-clusterip-srv:4005/events", {
          type: "COMMENT_UPDATED",
          payload: {
            id,
            postId,
            status,
            content,
          },
        });
      } catch (error) {
        console.error(error.message);
      }
      break;
    }
  }
  res.send({ message: `Event  recieved` });
});

const PORT = 4001;
app.listen(PORT, () => {
  console.log(`Comments server running on port ${PORT}`);
});
