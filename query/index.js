const express = require("express");
const { json, urlencoded } = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const axios = require("axios");

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

const handleEvent = ({ type, payload }) => {
  switch (type) {
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
};

app.post("/events", (req, res) => {
  const event = req.body;
  handleEvent(event);
  res.send({ message: type + " processed" });
});

app.listen(PORT, async () => {
  console.log(`Query server listening on port ${PORT}`);
  const { data } = await axios.get(
    "http://event-bus-clusterip-srv:4005/events"
  );
  for (let event of data) {
    handleEvent(event);
  }
});
