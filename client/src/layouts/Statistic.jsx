import React, { Component } from "react";
import PropTypes from "prop-types";
import Leaderboard from "components/base/charts/Leaderboard";
import ProgressContainer from "containers/ProgressContainer";
import { Button, Typography } from "@material-ui/core";

export default class Statistic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show_score: true,
      show_balance: false,
      show_sent: false,
      caption: "Всего получено",
    };
  }
  componentDidMount() {
    this.props.onLoad({ show_score: true });
  }

  showScore = (event) => {
    this.setState(
      {
        show_score: true,
        show_balance: false,
        show_sent: false,
        caption: "Всего получено",
      },
      () => {
        this.props.onLoad(this.state);
      }
    );
  };

  showBalance = (event) => {
    this.setState(
      {
        show_score: false,
        show_balance: true,
        show_sent: false,
        caption: "Сейчас могут потратить",
      },
      () => {
        this.props.onLoad(this.state);
      }
    );
  };

  showSent = (event) => {
    this.setState(
      {
        show_score: false,
        show_balance: false,
        show_sent: true,
        caption: "Всего подарено",
      },
      () => {
        this.props.onLoad(this.state);
      }
    );
  };

  render() {
    // let items =new Array(100)
    // for (var i = 0;i<100;i++){
    //    items[i] = {name: 'Peter'+i, score_total: Math.random()*100}
    // }
    // console.log(items)
    let items = this.props.profiles.items;
    return (
      <div>
        <Button onClick={this.showScore}>Всего получено</Button>
        <Button onClick={this.showBalance}>Сейчас могут потратить</Button>
        <Button onClick={this.showSent}>Всего подарено</Button>
        {items.length > 0 && (
          <Leaderboard
            items={items}
            height={items.length * 30 + 100}
            caption={this.state.caption}
          />
        )}
        {items.length == 0 && <ProgressContainer />}
      </div>
    );
  }
}
