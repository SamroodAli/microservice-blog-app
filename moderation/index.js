const express = require("express");
const { json, urlencoded } = require("body-parser");
const morgan = require("morgan");
const axios = require("axios");

const PORT = 4003;
const app = express();
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));

app.post("/events", async (req, res) => {
  const { type, payload } = req.body;
  switch (type) {
    case "COMMENT_CREATED": {
      const { content } = payload;
      const newStatus = content.includes("orange") ? "rejected" : "approved";
      await axios.post("http://event-bus-clusterip-srv:4005/events", {
        type: "COMMENT_MODERATED",
        payload: {
          ...payload,
          status: newStatus,
        },
      });
      break;
    }
  }
  res.send({ message: "Comment moderated" });
});

app.listen(PORT, () => {
  console.log(`Moderation service running on port ${PORT}`);
});
