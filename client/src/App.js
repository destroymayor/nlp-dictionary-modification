import { Input, InputNumber, message } from "antd";

import React, { Component } from "react";

import "./App.css";

class App extends Component {
  state = {
    value: 1,
    dictionary: "",
    disabled: false
  };
  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch("/dictionary?value=" + this.state.value)
      .then(res => res.json())
      .then(result => {
        console.log(result[this.state.value]);
        result[this.state.value] === "" ? this.setState({ disabled: true }) : this.setState({ disabled: false });

        this.setState({ dictionary: result[this.state.value] });
      })
      .catch(err => {});
  }

  submitData() {
    fetch("/change_dictionary?value=" + this.state.dictionary + "&count=" + this.state.value)
      .then(res => res.json())
      .then(result => {
        if (result.result) {
          this.setState({ disabled: true, dictionary: "" });
          message.success("詞性已修改");
        } else {
          message.error("修改失敗，請稍後再試!");
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="App">
        <div>
          選擇{" "}
          <InputNumber
            placeholder="查無詞性"
            min={1}
            max={600000}
            defaultValue={1}
            onChange={value => {
              this.setState({ value }, () => {
                this.fetchData();
              });
            }}
          />
        </div>
        <div className="App-item">
          查詢結果：<Input
            disabled={this.state.disabled}
            className="App-input"
            onChange={e => {
              this.setState({
                dictionary: e.target.value
              });
            }}
            onKeyPress={event => {
              if (event.key === "Enter") {
                this.submitData();
              }
            }}
            value={this.state.dictionary}
          />
        </div>
        <div>修改格式說明：詞 權重 詞性</div>
      </div>
    );
  }
}

export default App;
