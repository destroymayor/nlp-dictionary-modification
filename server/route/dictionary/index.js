import rl from "readline-specific";
import fs from "fs";
import path from "path";

export default async app => {
  app.get("/dictionary", (req, res) => {
    const value = parseInt(req.query.value, 10);

    rl.multilines("./static/dict.txt", [value], (err, result) => {
      if (err) return console.error(err);
      return res.json(result);
    });
  });

  //修改
  app.get("/change_dictionary", (req, res) => {
    const value = req.query.value;
    const counts = parseInt(req.query.count, 10);
    console.log(counts);
    // 刪除原檔案詞性
    fs.readFile(path.join(__dirname, "../../static/dict.txt"), "utf-8", (err, data) => {
      if (err) console.log(err);

      rl.multilines("./static/dict.txt", [counts], (err, results) => {
        if (err) return console.log(err);
        const linesExceptFirst = data.replace(results[counts], "");
        fs.writeFile(path.join(__dirname, "../../static/dict.txt"), linesExceptFirst, err => {
          if (err) throw err;
        });
      });
    });

    // 新增修改的詞性
    fs.appendFile(path.join(__dirname, "../../static/new_dict.txt"), value + "\n", err => {
      if (err) {
        console.log(err);
        return res.json({ result: false });
      }

      return res.json({ result: true });
    });
  });
};
