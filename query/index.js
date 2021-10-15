const express = require("express");
const { json, urlencoded } = require("body-parser");
const morgan = require("morgan");

const PORT = 4002;
const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));

const posts = {};

app.get("/posts", (req, res) => {});

app.post("/events", (req, res) => {
  const { type, payload } = req.body;
  switch (type) {
    case "POST_CREATED":
      const { id, title } = payload;
      posts[id] = { id, title, comments: [] };
    case "COMMENT_CREATED":
      const { id, postId, content } = payload;
      const post = posts[id];
      post.comments.push({ id, content });
  }
  res.send({ message: type + " processed" });
});

app.listen(PORT, () => {
  console.log(`Query server listening on port ${PORT}`);
});
