const express = require("express");
const { json, urlencoded } = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");

const PORT = 4002;
const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, payload } = req.body;
  switch (req.body.type) {
    case "POST_CREATED": {
      let { id, title } = payload;
      posts[id] = { id, title, comments: [] };
      break;
    }
    case "COMMENT_CREATED": {
      let { id, postId, content, status } = payload;
      let post = posts[postId];
      post.comments.push({ id, content, status });
      break;
    }
    case "COMMENT_UPDATED": {
      let { id, postId, content, status } = payload;
      const post = posts[postId];
      const comment = post.comments.find((comment) => comment.id === id);
      comment.content = content;
      comment.status = status;
      break;
    }
  }
  res.send({ message: type + " processed" });
});

app.listen(PORT, () => {
  console.log(`Query server listening on port ${PORT}`);
});
