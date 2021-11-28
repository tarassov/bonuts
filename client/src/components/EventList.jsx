import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import GridItem from "components/base/grid/GridItem.jsx";
import GridContainer from "components/base/grid/GridContainer.jsx";
import EventCard from "components/EventCard";
import ProgressContainer from "containers/ProgressContainer";
import EventCardContainer from "containers/EventCardContainer";
import EventsFilter from "./EventsFilter";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import eventsFilterStyle from "assets/jss/components/eventsFilterStyle";
import { withTranslation, Trans } from "react-i18next";
import eventsListStyle from "assets/jss/components/eventsListStyle";

class EventList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: {
        showMine: false,
      },
    };
  }

  componentDidMount() {
    //this.interval = setInterval(() => this.setState({ time: Date.now() }), 1000);
    if (this.props.events.page == 0)
      this.props.loadEvents(this.props.events.page + 1);
  }
  componentWillUnmount() {
    // clearInterval(this.interval);
  }

  filter(filter) {
    this.setState({ filter: { ...filter } });
    this.props.reloadEvents(filter);
  }
  loadMore = () => {
    this.props.loadEvents(this.props.events.page + 1, this.state.filter);
  };

  render() {
    const { events, classes } = this.props;
    let items = events.items;
    return (
      <React.Fragment>
        <EventsFilter onFilter={this.filter.bind(this)} />
        <GridContainer>
          <ProgressContainer />
          {items !== undefined &&
            items.map((post, index) => (
              <GridItem xs={12} sm={12} md={6} key={index}>
                <EventCardContainer post={post} />
              </GridItem>
            ))}
        </GridContainer>

        <DialogActions>
          {(events.page + 1) * events.per_page < events.total && (
            <Button
              className={classes.button}
              onClick={this.loadMore}
              color="primary"
            >
              <Trans>More</Trans>
            </Button>
          )}
        </DialogActions>
      </React.Fragment>
    );
  }
}

EventList.props = {
  reloadEvents: PropTypes.func.isRequired,
  loadEvents: PropTypes.func.isRequired,
};

export default withStyles(eventsListStyle)(
  withTranslation("translations")(EventList)
);
