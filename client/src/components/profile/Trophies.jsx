import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Checkbox from "@material-ui/core/Checkbox";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

// @material-ui/icons
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import Check from "@material-ui/icons/Check";

import List from 'components/list/list';

import trophiesStyle from "assets/jss/components/trophiesStyle.jsx";

const items = [
  {
    id: 1,
    value: 'item 1'
  },
  {
    id: 2,
    value: 'item2'
  }

]


class Trophies extends React.Component {
  render() {
            const { classes} = this.props;
            return (
                  <List
                    items = {items}
                    actions =  {[
                        {
                          icon: (<Edit className={classes.tableActionButtonIcon + " " + classes.edit}/>)
                        },
                      ]}
                  />
                )

  }
}

export default withStyles(trophiesStyle)(Trophies);
