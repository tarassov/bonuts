import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Checkbox from "@material-ui/core/Checkbox";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

// @material-ui/icons
import TouchApp from "@material-ui/icons/TouchApp";
import Close from "@material-ui/icons/Close";
import Check from "@material-ui/icons/Check";

import CustomTable from 'components/table/CustomTable';

import trophiesStyle from "assets/jss/components/trophiesStyle.jsx";

const items = [
  {
    id: 1,
    values: ['Один день отпуска без зп','бессрочно'],
  },
  {
    id: 2,
    values: ['Час на Бали','действительно до 2020 года']
  }

]


class Regards extends React.Component {
  componentDidMount(){
    if (this.props.regards.page == 0)this.props.loadRegards()
      this.props.regards.page = this.props.regards.page + 1

  }
  render() {
            const { classes} = this.props;
            return (
                  <CustomTable
                    items = {items}
                    actions =  {[
                        {
                          icon: (<TouchApp className={classes.tableActionButtonIcon + " " + classes.edit}/>),
                          id: 'action_use',
                          label: 'Activate'
                        },
                      ]}
                    checkable = {false}
                  />
                )

  }
}

export default withStyles(trophiesStyle)(Regards);
