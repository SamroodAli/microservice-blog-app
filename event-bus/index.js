const express = require("express");
const { json, urlencoded } = require("body-parser");
const axios = require("axios");
const morgan = require("morgan");

const PORT = 4005;
const app = express();
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));

const events = [];

app.post("/events", (req, res) => {
  const event = req.body;
  events.push(event);
  console.log(event);
  try {
    axios
      .post("http://posts-clusterip-srv:4000/events", event)
      .catch((error) => console.error(error.message));
    axios
      .post("http://comments-clusterip-srv:4001/events", event)
      .catch((error) => console.error(error.message));
    axios
      .post("http://query-clusterip-srv:4002/events", event)
      .catch((error) => console.error(error.message));
    axios
      .post("http://moderation-clusterip-srv:4003/events", event)
      .catch((error) => console.error(error.message));
  } catch (e) {
    console.error(e.message);
  }
  res.status(200).send({ message: `Event in event Bus` });
});

app.get("/events", (req, res) => {
  res.status(200).send(events);
});

app.listen(PORT, () => {
  console.log(`Event Bus server listening on ${PORT}`);
});
