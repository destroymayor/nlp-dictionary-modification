const { tify, sify } = require("chinese-conv");
const fs = require("fs");

fs.readFile("./static/dict.txt", "utf-8", (err, data) => {
  let text = tify(data);

  fs.writeFile("./static/chinese.txt", text);
});
