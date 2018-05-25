const express = require("express");
const path = require("path");
const compression = require("compression");

const router = require("./route/index");

const app = express();
app.use(compression());
app.use(express.static(path.join(__dirname, "../client/build")));

router(app);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.listen(process.env.PORT || 5000);
