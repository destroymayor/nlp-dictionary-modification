import nodejieba from "nodejieba";
import fs from "fs";
import path from "path";

export default async app => {
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

  app.get("/ExtensionIssuesJiebaCut", (req, res) => {
    const value = req.query.value;

    res.json(nodejieba.tag(value));
  });

  app.get("/JiebaWordModificationNoun", (req, res) => {
    const value = req.query.value;
    fs.appendFile(path.join(__dirname, "../../static/new_dictNoun.txt"), value + " n\n", err => {
      if (err) {
        console.log(err);
        return res.json({ result: false });
      }
      return res.json({ result: true });
    });
  });

  app.get("/JiebaWordModificationVerb", (req, res) => {
    const value = req.query.value;
    fs.appendFile(path.join(__dirname, "../../static/new_dictVerb.txt"), value + " v\n", err => {
      if (err) {
        console.log(err);
        return res.json({ result: false });
      }
      return res.json({ result: true });
    });
  });
};
