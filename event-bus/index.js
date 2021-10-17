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
  try {
    axios.post("http://localhost:4000/events", event);
    axios.post("http://localhost:4001/events", event);
    axios.post("http://localhost:4002/events", event);
    axios.post("http://localhost:4003/events", event);
  } catch (err) {
    console.error(err);
  }
  res.status(200).send({ message: "Event recieved in event Bus" });
});

app.get("/events", (req, res) => {
  res.status(200).send(events);
});

app.listen(PORT, () => {
  console.log(`Event Bus listening on ${PORT}`);
});
