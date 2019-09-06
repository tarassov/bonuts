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
import customTableStyle from "assets/jss/components/customTableStyle.jsx";
import CustomTableToolbar from "./CustomTableToolbar";
import { useTranslation, Trans } from "react-i18next";
import { Button } from "@material-ui/core";
import UserAvatar from 'components/UserAvatar';

let  RowAction = props => {
  const {item, action, classes} = props
  const { t, i18n } = useTranslation();
  return <Tooltip key={item.id + '_' + action.id} id={action.id} title={t(action.label)} placement="top" classes={{ tooltip: classes.tooltip }} onClick={action.onClick(item)}>
    <IconButton aria-label={action.label} className={classes.tableActionButton}>
      {action.icon}
    </IconButton>
  </Tooltip>;
}



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

  handleRowClick(item) {
      if (this.props.rowClick !==undefined){
        this.props.rowClick(item)
      }
  }

  render() {
    const { classes, items,actions,checkable} = this.props;
    const tableCellClasses = classes.tableCell;
    const tableRowAvatar = classes.tableAvatar
    return (
      <React.Fragment>
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
                    <TableCell key={item.id+'_avatar'} className={tableRowAvatar}>
                          <UserAvatar  avatar_url={item.avatar.thumb.url} onClick ={this.handleRowClick.bind(this,item)} />
                    </TableCell>
                   {item.values.map((value,index)=>(
                     <TableCell key={item.id+'_'+index} className={tableCellClasses}>
                          <Button className={classes.button}  onClick ={this.handleRowClick.bind(this,item)}>{value}</Button>
                     </TableCell>
                   ))}

                    <TableCell className={classes.tableActions}>

                        {actions.map(action=>(
                          <RowAction item={item} action={action} classes={classes} key={action.id}/>
                        ))}

                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </React.Fragment>
    );
  }
}

CustomTable.propTypes = {
  classes: PropTypes.object.isRequired,
  items: PropTypes.arrayOf(PropTypes.object),
  checkable: PropTypes.bool
};

export default withStyles(customTableStyle)(CustomTable);

