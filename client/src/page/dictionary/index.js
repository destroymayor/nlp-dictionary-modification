import { Input, InputNumber, message } from "antd";

import React, { Component } from "react";

class Dictionary extends Component {
  state = {
    value: 1,
    dictionary: "",
    disabled: false,
    RealWordVocabulary: ["n 名詞", "t 時間詞", "v 動詞", "a 形容詞", "r 代詞", "m 數詞", "q 量詞"],
    FalseWordVocabulary: [
      "d 副詞",
      "p 介詞",
      "c 連詞",
      "u 助詞",
      "e 嘆詞",
      "y 語氣詞",
      "o 擬聲詞",
      "h 前綴",
      "k 後綴",
      "x 字符串",
      "w 標點符號"
    ]
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
            placeholder="查無詞性"
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
        <p>實詞</p>
        <ul>
          {this.state.RealWordVocabulary.map((value, index) => {
            return <li key={index}>{value}</li>;
          })}
        </ul>
        <p>虛詞</p>
        <ul>
          {this.state.map((value, index) => {
            return <li key={index}>{value}</li>;
          })}
        </ul>
      </div>
    );
  }
}

export default Dictionary;
