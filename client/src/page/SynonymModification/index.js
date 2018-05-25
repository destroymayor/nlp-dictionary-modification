import React, { Component } from "react";

import "./index.css";

class SynonymModification extends Component {
  state = {};

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch("/Synonyms")
      .then(res => {
        console.log(res);
      })
      .catch(err => {});
  }

  render() {
    return <div className="SynonymModification-App">同義詞修飾</div>;
  }
}

export default SynonymModification;
