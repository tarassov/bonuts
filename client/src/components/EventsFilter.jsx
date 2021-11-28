import React, { Component } from "react";
import PropTypes from "prop-types";
import eventsFilterStyle from "assets/jss/components/eventsFilterStyle";
import { withTranslation, Trans, useTranslation } from "react-i18next";
import { withStyles } from "@material-ui/core/styles";
import GridContainer from "./base/grid/GridContainer";
import GridItem from "./base/grid/GridItem";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

class EventsFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMine: false,
    };
  }

  handleChange = (name) => (event) => {
    this.setState({ ...this.state, [name]: event.target.checked }, () => {
      this.props.onFilter(this.state);
    });
  };

  render() {
    const { t } = this.props;
    return (
      <GridContainer>
        <GridItem xs={12} sm={6} md={4} lg={3}>
          <FormGroup row>
            <FormControlLabel
              control={
                <Switch
                  checked={this.state.showMine}
                  onChange={this.handleChange("showMine")}
                  value="showMine"
                  inputProps={{ "aria-label": "secondary checkbox" }}
                />
              }
              label={t("Show only mine")}
            />
          </FormGroup>
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(eventsFilterStyle)(withTranslation()(EventsFilter));
