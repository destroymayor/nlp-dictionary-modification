import dictionary from "./dictionary";
import nodejieba from "./jiebaCut";

export default app => {
  [dictionary, nodejieba].forEach(router => {
    router(app);
  });
};
