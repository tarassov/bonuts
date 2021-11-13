import React from "react";
import { HorizontalBar } from "react-chartjs-2";
import { withTranslation, Trans } from "react-i18next";
import { withStyles } from "@material-ui/core/styles";
import leaderBoardStyle from "assets/jss/components/leaderBoardStyle";

export class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 100,
      height: 100,
    };
  }

  UNSAFE_componentWillMount () {
    this.setState({ height: this.props.height });
  }

  render() {
    const { items, t, classes } = this.props;
    const sortedItems = items.sort((a, b) => {
      if (a.score_total > b.score_total) {
        return -1;
      }
      if (a.score_total < b.score_total) {
        return 1;
      }

      return 0;
    });

    const labels = sortedItems.map((item) => item.name);
    const data = {
      labels: labels,
      datasets: [
        {
          label: t("points"),
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: sortedItems.map((item) => {
            return item.score_total;
          }),
        },
      ],
    };

    return (
      <div>
        <h2>
          <Trans>{this.props.caption}</Trans>
        </h2>
        <div>
          <HorizontalBar
            data={data}
            height={this.state.height}
            width={this.state.width}
            options={{ maintainAspectRatio: false, responsive: true }}
          />
        </div>
      </div>
    );
  }
}

export default withTranslation()(Leaderboard);
