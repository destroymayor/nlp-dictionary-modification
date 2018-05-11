import express from "express";
import path from "path";
import compression from "compression";

import router from "./route/index";

const app = express();
app.use(compression());
app.use(express.static(path.join(__dirname, "../client/build")));

router(app); // load router config

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.listen(process.env.PORT || 5000);
