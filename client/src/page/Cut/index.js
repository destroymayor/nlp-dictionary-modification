import { message, Input, Spin, Select } from "antd";

import React, { Component } from "react";

import "./index.css";

const Option = Select.Option;
const WordSelectionOption = Select.Option;
const ExtensionIssuesListItemOption = Select.Option;

class Cut extends Component {
  state = {
    WordSelection: "",
    disabled: false,
    ExtensionIssuesList: [],
    ExtensionIssuesListItemState: false,
    ExtensionIssuesListItem: [],
    WordModificationListState: false,
    WordModificationList: [],
    JiebaWordModificationText: ""
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch("/ExtensionIssuesList")
      .then(res => res.json())
      .then(result => {
        result.map((value, index) => {
          return this.state.ExtensionIssuesList.push(
            <Option key={index} value={value}>
              {index + 1} : {value}
            </Option>
          );
        });
      })
      .catch(err => {});
  }

  handleSelect = value => {
    fetch("/ExtensionIssuesListItem?value=" + value)
      .then(res => res.json())
      .then(result => {
        result.map((item, index) => {
          return this.state.ExtensionIssuesListItem.push(
            <ExtensionIssuesListItemOption key={index} value={item}>
              {item}
            </ExtensionIssuesListItemOption>
          );
        });
      })
      .catch(err => {});
  };

  handleSelectListItem = value => {
    this.setState({ WordModificationList: [] });
    fetch("/ExtensionIssuesJiebaCut?value=" + value)
      .then(res => res.json())
      .then(result => {
        result.forEach((value, index) => {
          this.state.WordModificationList.push(value.word);
          this.setState({ WordModificationListState: true });
        });
      })
      .catch(err => {});
  };

  JiebaWordModification() {
    switch (this.state.WordSelection) {
      case "noun":
        fetch("/JiebaWordModificationNoun?value=" + this.state.JiebaWordModificationText)
          .then(res => res.json())
          .then(result => {
            if (result.result) {
              message.success("詞性已修改");
            } else {
              message.error("修改失敗，請稍後再試!");
            }
          })
          .catch(err => {});
        break;
      case "verb":
        fetch("/JiebaWordModificationVerb?value=" + this.state.JiebaWordModificationText)
          .then(res => res.json())
          .then(result => {
            if (result.result) {
              message.success("詞性已修改");
            } else {
              message.error("修改失敗，請稍後再試!");
            }
          })
          .catch(err => {});
        break;
    }
  }

  render() {
    return (
      <div className="Cut-App">
        <div>
          詞選擇
          <Select
            style={{ width: 100 }}
            notFoundContent={<Spin size="small" />}
            onChange={value => {
              this.setState({ WordSelection: value });
              console.log(this.state.WordSelection);
            }}>
            <WordSelectionOption key="noun" value="noun">
              名詞
            </WordSelectionOption>
            <WordSelectionOption key="verb" value="verb">
              動詞
            </WordSelectionOption>
          </Select>
          <br />
          選擇類別
          <Select style={{ width: 500 }} notFoundContent={<Spin size="small" />} onChange={this.handleSelect}>
            {this.state.ExtensionIssuesList}
          </Select>
        </div>
        <div>
          選擇句子進行分詞
          <Select style={{ width: 500 }} notFoundContent={<Spin size="small" />} onChange={this.handleSelectListItem}>
            {this.state.ExtensionIssuesListItem}
          </Select>
        </div>
        <div>
          分詞結果
          {this.state.WordModificationListState ? (
            <ul>
              {this.state.WordModificationList.map((value, index) => {
                return <li key={index}>{value}</li>;
              })}
            </ul>
          ) : null}
        </div>
        <div>
          <Input
            style={{ width: 200 }}
            value={this.state.JiebaWordModificationText}
            onChange={e => {
              this.setState({
                JiebaWordModificationText: e.target.value
              });
            }}
            onKeyPress={event => {
              if (event.key === "Enter") {
                this.JiebaWordModification();
              }
            }}
          />
        </div>
      </div>
    );
  }
}

export default Cut;
