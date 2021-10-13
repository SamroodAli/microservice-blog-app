const express = require("express");
const { json, urlencoded } = require("body-parser");
const morgan = require("morgan");

const app = express();
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Comments server running on port ${PORT}`);
});
