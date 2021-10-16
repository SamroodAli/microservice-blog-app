const express = require("express");
const { json, urlencoded } = require("body-parser");
const morgan = require("morgan");

const PORT = 4003;
const app = express();
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));

app.listen(PORT, () => {
  console.log(`Moderation service running on port ${PORT}`);
});
