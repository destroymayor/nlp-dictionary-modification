const fs = require("fs");
const path = require("path");

module.exports = app => {
  app.get("/Synonyms", (req, res) => {
    res.json({ state: "123" });
    const lineReader = require("readline").createInterface({
      input: fs.createReadStream(path.join(__dirname, "../../static/Synonym/dictSynonym.txt"))
    });

    lineReader.on("line", line => {
      console.log("Line from file:", line);
    });
  });
};
