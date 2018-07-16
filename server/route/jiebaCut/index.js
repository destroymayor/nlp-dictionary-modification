const nodejieba = require("nodejieba");
const fs = require("fs");
const path = require("path");

module.exports = app => {
  app.get("/ExtensionIssuesList", (req, res) => {
    fs.readFile(path.join(__dirname, "../../static/QA.json"), "utf-8", (err, data) => {
      if (err) throw err;
      const List = JSON.parse(data);
      res.json(Object.keys(List));
    });
  });

  app.get("/ExtensionIssuesListItem", (req, res) => {
    const value = req.query.value;
    fs.readFile(path.join(__dirname, "../../static/QA.json"), "utf-8", (err, data) => {
      if (err) throw err;
      const List = JSON.parse(data);
      res.json(List[value]);
    });
  });

  // 分詞
  app.get("/ExtensionIssuesJiebaCut", (req, res) => {
    nodejieba.load({
      dict: path.join(__dirname, "../../static/dict.txt")
    });
    const value = req.query.value;
    res.json(nodejieba.tag(value));
  });

  //修改後分詞
  app.get("/ExtensionIssuesJiebaCutUpdate", (req, res) => {
    nodejieba.load({
      dict: path.join(__dirname, "../../static/dict.txt"),
      userDict: path.join(__dirname, "../../static/new_dictVerb.txt")
    });
    const value = req.query.value;
    res.json(nodejieba.tag(value));
  });

  //名詞新增
  app.get("/JiebaWordModificationNounAndVerb", (req, res) => {
    const value = req.query.value;
    const Noun = value.replace(new RegExp("`", "g"), " n\n");
    const Verb = Noun.replace(new RegExp("@", "g"), " v\n");

    fs.appendFile(path.join(__dirname, "../../static/new_dict.txt"), Verb, err => {
      if (err) {
        console.log(err);
        return res.json({ result: false });
      }
      return res.json({ result: true });
    });
  });

  // //動詞新增
  // app.get("/JiebaWordModificationVerb", (req, res) => {
  //   const value = req.query.value;
  //   fs.appendFile(path.join(__dirname, "../../static/new_dictVerb.txt"), value + " v\n", err => {
  //     if (err) {
  //       console.log(err);
  //       return res.json({ result: false });
  //     }
  //     return res.json({ result: true });
  //   });
  // });
};
