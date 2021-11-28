import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import dashboardStyle from "assets/jss/components/dashboardStyle";
import AddIcon from "@material-ui/icons/Add";

import SelfAccountContainer from "containers/SelfAccountContainer";
import DistribAccountContainer from "containers/DistribAccountContainer";
import GridItem from "components/base/grid/GridItem.jsx";
import GridContainer from "components/base/grid/GridContainer.jsx";
import Hidden from "@material-ui/core/Hidden";
import { withTranslation, Trans } from "react-i18next";
import EventListContainer from "containers/EventListContainer";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { TabPanel, a11yProps } from "components/base/tabs/TabPanel";
import { Paper } from "@material-ui/core";
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      snow: true,
      caption: "Hide snow",
    };
  }

  componentDidMount() {
    //this.props.onRequestUser();
    if (this.props.page == 0) this.props.loadEvents(this.props.page + 1);
    //TODO: TImer https://medium.com/@machadogj/timers-in-react-with-redux-apps-9a5a722162e8
  }

  loadMore = () => {
    this.props.loadEvents(this.props.page + 1);
  };

  doNut() {}

  reloadEvents(filter) {
    this.props.reloadEvents(filter);
  }

  handleChange(event, newValue) {
    this.setState({ value: newValue });
  }

  render() {
    const { classes, profile, t } = this.props;

    return (
      <React.Fragment>
        <div>
          <GridContainer>
            <GridItem xs={12} sm={7} md={7} className={classes.logo}>
              {profile.logo !== undefined &&
                profile.logo !== null &&
                profile.logo.url != undefined &&
                profile.logo.url != null && (
                  <img className={classes.logo} src={profile.logo.url} />
                )}
            </GridItem>

            <GridItem xs={12} sm={5} md={5}>      
              <div className={classes.flexContainer}>
                <hr className={classes.flexLine} />
                <section>
                  <Trans>Balance</Trans>
                </section>
                <hr className={classes.flexLine} />
              </div>
              {profile !== undefined && profile.self_account !== undefined && (
                <SelfAccountContainer />
              )}
              {profile !== undefined &&
                profile.distrib_account !== undefined && (
                  <DistribAccountContainer />
                )}
            </GridItem>

            <Tabs
              value={this.state.value}
              onChange={this.handleChange.bind(this)}
              aria-label="settings tabs"
            >
              <Tab label={t("Events")} {...a11yProps(0)} />
              <Tab label={t("News")} {...a11yProps(1)} />
            </Tabs>
            <GridItem xs={12}>
              <TabPanel value={this.state.value} index={0}>
                <div className={classes.flexContainer}>
                  <hr className={classes.flexLine} />
                  <section>
                    <Trans>Events</Trans>
                  </section>
                  <hr className={classes.flexLine} />
                </div>
                <EventListContainer />
              </TabPanel>
              <TabPanel value={this.state.value} index={1}>
                <div className={classes.flexContainer}>
                  <hr className={classes.flexLine} />
                  <section>
                    <Trans>News</Trans>
                  </section>
                  <hr className={classes.flexLine} />
                </div>
                <Paper />
              </TabPanel>
            </GridItem>
          </GridContainer>
        </div>
      </React.Fragment>
    );
  }
}

Dashboard.props = {};
export default withStyles(dashboardStyle)(
  withTranslation("translations")(Dashboard)
);
