import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Checkbox from "@material-ui/core/Checkbox";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// @material-ui/icons
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import Check from "@material-ui/icons/Check";
// core components
import listStyle from "assets/jss/components/listStyle.jsx";

class List extends React.Component {
  state = {
    checked: this.props.checkedIndexes
  };

  handleToggle = item => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(item);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(item);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  };
  render() {
    const { classes, items} = this.props;
    const tableCellClasses = classes.tableCell;

    return (
      <Card>
      <CardHeader color="warning">
        <h4 className={classes.cardTitleWhite}>Employees Stats</h4>
        <p className={classes.cardCategoryWhite}>
          New employees on 15th September, 2016
        </p>
      </CardHeader>
      <CardBody>
            <Table className={classes.table}>
              <TableBody>
                {items.map(item => (
                  <TableRow key={item.id} className={classes.tableRow}>
                    <TableCell className={tableCellClasses}>
                      <Checkbox
                        checked={this.state.checked.indexOf(item) !== -1}
                        tabIndex={-1}
                        onClick={this.handleToggle(item)}
                        checkedIcon={<Check className={classes.checkedIcon} />}
                        icon={<Check className={classes.uncheckedIcon} />}
                        classes={{
                          checked: classes.checked,
                          root: classes.root
                        }}
                      />
                    </TableCell>
                    <TableCell className={tableCellClasses}>
                      {item.value}
                    </TableCell>
                    <TableCell className={classes.tableActions}>
                      <Tooltip
                        id="tooltip-top"
                        title="Edit Task"
                        placement="top"
                        classes={{ tooltip: classes.tooltip }}
                      >
                        <IconButton
                          aria-label="Edit"
                          className={classes.tableActionButton}
                        >
                          <Edit
                            className={
                              classes.tableActionButtonIcon + " " + classes.edit
                            }
                          />
                        </IconButton>
                      </Tooltip>
                      <Tooltip
                        id="tooltip-top-start"
                        title="Remove"
                        placement="top"
                        classes={{ tooltip: classes.tooltip }}
                      >
                        <IconButton
                          aria-label="Close"
                          className={classes.tableActionButton}
                        >
                          <Close
                            className={
                              classes.tableActionButtonIcon + " " + classes.close
                            }
                          />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
      </CardBody>
      </Card>
    );
  }
}

Tasks.propTypes = {
  classes: PropTypes.object.isRequired,
  items: PropTypes.arrayOf(PropTypes.object),
};

export default withStyles(listStyle)(Tasks);
