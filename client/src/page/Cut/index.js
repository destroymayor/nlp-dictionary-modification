import { message, Input, Spin, Select } from "antd";

import React, { Component } from "react";

import "./index.css";

const Option = Select.Option;
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
    JiebaWordModificationCutFetchState: false,
    JiebaWordModificationText: "",
    handleSelectListItemText: "",
    WordModificationListUpdate: [],
    WordModificationListUpdateState: false,
    WordModificationListUpdateCutState: false
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
              {index + 1}. {value}
            </Option>
          );
        });
      })
      .catch(err => {});
  }

  handleSelect = value => {
    this.setState({
      ExtensionIssuesListItem: [],
      WordModificationList: [],
      WordModificationListUpdate: []
    });
    fetch("/ExtensionIssuesListItem?value=" + value)
      .then(res => res.json())
      .then(result => {
        result.map((item, index) => {
          return this.state.ExtensionIssuesListItem.push(
            <ExtensionIssuesListItemOption key={index} value={item}>
              {index + 1}. {item}
            </ExtensionIssuesListItemOption>
          );
        });
      })
      .catch(err => {});
  };

  handleSelectListItem = value => {
    this.setState({
      WordModificationList: [],
      WordModificationListUpdate: [],
      WordModificationListUpdateState: false,
      JiebaWordModificationCutFetchState: false,
      WordModificationListState: true,
      handleSelectListItemText: value
    });
    fetch("/ExtensionIssuesJiebaCut?value=" + value)
      .then(res => res.json())
      .then(result => {
        console.log(result);
        result.forEach(value => {
          this.state.WordModificationList.push(value.word);
          this.setState({ JiebaWordModificationCutFetchState: true });
        });
      })
      .catch(err => {});
  };

  JiebaWordModification() {
    if (this.state.JiebaWordModificationText === "") return message.error("請輸入欲修改的詞");
    this.JiebaWordModificationFetch();
  }

  JiebaWordModificationFetch() {
    this.setState({ WordModificationListUpdateState: true, WordModificationListUpdateCutState: false });
    fetch("/JiebaWordModificationNounAndVerb?value=" + this.state.JiebaWordModificationText)
      .then(res => res.json())
      .then(result => {
        if (result.result) {
          fetch("/ExtensionIssuesJiebaCutUpdate?value=" + this.state.handleSelectListItemText)
            .then(res => res.json())
            .then(result => {
              message.success("詞性已修改");
              result.forEach(value => {
                this.state.WordModificationListUpdate.push(value.word);
                this.setState({ WordModificationListUpdateCutState: true, JiebaWordModificationText: "" });
              });
            })
            .catch(err => {});
        } else {
          message.error("修改失敗，請稍後再試!");
        }
      })
      .catch(err => {});
  }

  renderItem = () => (
    <div className="Cut-App-item">
      <div className="Cut-App-item-child">
        選擇類別
        <Select style={{ width: 300 }} notFoundContent={<Spin size="small" />} onChange={this.handleSelect}>
          {this.state.ExtensionIssuesList}
        </Select>
      </div>
    </div>
  );

  renderCutResult = () => (
    <div className="Cut-result">
      <div className="Cut-result-item">
        {this.state.WordModificationListState ? (
          <React.Fragment>
            <br />
            分詞結果{this.state.JiebaWordModificationCutFetchState ? (
              <ul>
                {this.state.WordModificationList.map((value, index) => {
                  return <li key={index}>{value}</li>;
                })}
              </ul>
            ) : (
              <Spin />
            )}
          </React.Fragment>
        ) : null}
      </div>
      <div className="Cut-result-item">
        {this.state.WordModificationListUpdateState ? (
          <React.Fragment>
            <br />
            修改後分詞為{this.state.WordModificationListUpdateCutState ? (
              <ul>
                {this.state.WordModificationListUpdate.map((value, index) => {
                  return <li key={index}>{value}</li>;
                })}
              </ul>
            ) : (
              <Spin />
            )}
          </React.Fragment>
        ) : null}
      </div>
    </div>
  );

  render() {
    return (
      <div className="Cut-App">
        {this.renderItem()}
        選擇句子進行分詞
        <Select style={{ width: 500 }} notFoundContent={<Spin size="small" />} onChange={this.handleSelectListItem}>
          {this.state.ExtensionIssuesListItem}
        </Select>
        <br />
        <Input
          placeholder="輸入需要修改的詞"
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
              this.setState({ WordModificationListUpdate: [] });
            }
          }}
        />
        <br />
        <div>可以多個詞當作輸入，請用[`]、[@]符號隔開(名詞後接[`]、動詞後接[@])，例如：客服`電話`沒接@</div>
        {this.renderCutResult()}
      </div>
    );
  }
}

export default Cut;
