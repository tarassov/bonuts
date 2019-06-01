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
import Check from "@material-ui/icons/Check";
// core components
import listStyle from "assets/jss/components/listStyle.jsx";

class CustomTable extends React.Component {
  state = {
    checked: []
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
    const { classes, items,actions,checkable} = this.props;
    const tableCellClasses = classes.tableCell;

    return (
            <Table className={classes.table}>
              <TableBody>
                {items.map(item => (
                  <TableRow key={item.id} className={classes.tableRow}>
                    {checkable && <TableCell className={tableCellClasses}>
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
                   }

                   {item.values.map((value,index)=>(
                     <TableCell key={item.id+'_'+index} className={tableCellClasses}>
                          {value}
                     </TableCell>
                   ))}

                    <TableCell className={classes.tableActions}>

                        {actions.map(action=>(
                          <Tooltip
                            key={item.id+'_'+action.id}                          
                            id={action.id}
                            title={action.label}
                            placement="top"
                            classes={{ tooltip: classes.tooltip }}
                            onClick ={action.onClick}
                          >
                            <IconButton
                              aria-label={action.label}
                              className={classes.tableActionButton}
                              edge="end"
                            >
                              {action.icon}
                            </IconButton>
                          </Tooltip>
                        ))}

                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

    );
  }
}

CustomTable.propTypes = {
  classes: PropTypes.object.isRequired,
  items: PropTypes.arrayOf(PropTypes.object),
  checkable: PropTypes.bool
};

export default withStyles(listStyle)(CustomTable);
