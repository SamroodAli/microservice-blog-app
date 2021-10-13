const express = require("express");
const { json, urlencoded } = require("body-parser");
const morgan = require("morgan");
const { randomBytes } = require("crypto");

const app = express();
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/posts/:id/comments", (req, res) => {});

app.post("/posts/:id/comments", (req, res) => {});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Comments server running on port ${PORT}`);
});
