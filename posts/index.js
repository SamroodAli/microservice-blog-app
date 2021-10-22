const express = require("express");
const { randomBytes } = require("crypto");
const { json, urlencoded } = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;

  posts[id] = {
    id,
    title,
  };
  await axios.post("http://event-bus-clusterip-srv:4005/events", {
    type: "POST_CREATED",
    payload: {
      id,
      title,
    },
  });
  res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
  console.log("Recieved Event", req.body.type);
  res.send({});
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log("version 2");
  console.log(`Posts server listening on ${PORT}`);
});
