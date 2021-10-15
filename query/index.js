const express = require("express");
const { json, urlencoded } = require("body-parser");
const morgan = require("morgan");

const PORT = 4002;
const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));

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
      let { id, postId, content } = payload;
      let post = posts[postId];
      post.comments.push({ id, content });
      break;
    }
  }
  res.send({ message: type + " processed" });
});

app.listen(PORT, () => {
  console.log(`Query server listening on port ${PORT}`);
});
