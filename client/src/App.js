import React from "react";
import { Router, Route } from "react-router-dom";
import Switch from "react-router-dom/Switch";
import history from "./RouterHistory";

import "./App.css";

import Cut from "./page/Cut";
import SynonymModification from "./page/SynonymModification";

class App extends React.PureComponent {
  renderRoute = () => (
    <React.Fragment>
      <Switch>
        <Route exact path="/" component={Cut} />
        <Route path="/SynonymModification" component={SynonymModification} />
      </Switch>
    </React.Fragment>
  );

  render() {
    return (
      <React.Fragment>
        <Router history={history}>{this.renderRoute()}</Router>
      </React.Fragment>
    );
  }
}

export default App;
