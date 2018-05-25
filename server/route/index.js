const dictionary = require("./dictionary");
const nodejieba = require("./jiebaCut");
const dictSynonym = require("./dictSynonym");

module.exports = app => {
  [dictionary, nodejieba, dictSynonym].forEach(router => {
    router(app);
  });
};
