import React, { useCallback, useEffect, useState } from "react";

import PropTypes from "prop-types";
import classnames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
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
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import { Button, TableHead } from "@material-ui/core";
import UserAvatar from "components/UserAvatar";

import { CustomTableItemProvider } from "./customTableItemContext";
const useStyles = makeStyles(customTableStyle);

function RowAction(props) {
  const { item, action, classes } = props;
  const { t, i18n } = useTranslation();

  const click = () => {
    action.onClick(item);
  };
  return (
    <Tooltip
      key={item.id + "_" + action.id}
      id={action.id}
      title={t(action.label)}
      placement="top"
      classes={{ tooltip: classes.tooltip }}
      onClick={click}
    >
      <IconButton
        aria-label={action.label}
        className={classes.tableActionButton}
      >
        {action.icon}
      </IconButton>
    </Tooltip>
  );
}

export default function  CustomTable (props) {

  const [tableItems, setTableItems] = React.useState([]);
  const [checked, setChecked] = useState(false)

  const classes = useStyles();
  const { t } = useTranslation();
  const { items, actions, checkable } = props;
  const tableCellClasses = classes.tableCell;
  const tableRowAvatar = classes.tableAvatar;
  // handleToggle = (item) => () => {
  //   const { checked } = this.state;
  //   const currentIndex = checked.indexOf(item);
  //   const newChecked = [...checked];
  //   item.checked  = !item.checked;
  //   if (currentIndex === -1) {
  //     newChecked.push(item);
  //   } else {
  //     newChecked.splice(currentIndex, 1);
  //   }

  //   this.setState({
  //     checked: newChecked,
  //   });
  // };

    useEffect(() => {
      setTableItems(items)
    }, [items,setTableItems])

    const handleToggle = useCallback((item) => {   

      var newChecked  = !item.checked 

      if(checked &&  newChecked) setChecked(false)

      const itemRef = [...items];
 
      itemRef.forEach((_item, i) => {
       if (_item.id == item.id) {
         _item.checked=newChecked
       } 
      })
      setTableItems([...itemRef]);
    },[]);


    const toggleAll = () =>{

      const itemRef = [...tableItems];
    
      itemRef.forEach((_item, i) => {
         itemRef[i].checked = !checked
 
      })
 
      setChecked(!checked)
  
      setTableItems([...itemRef]);
    }

    const handleRowClick = useCallback((item) => {    
      if (props.rowClick !== undefined) {
        props.rowClick(item);    }
    }, []);

    return (
      <React.Fragment>
        <Table className={classes.table}>
        <TableBody>
          <TableRow>
          {checkable && (
             <TableCell>
             <Checkbox
               checked={checked}
               tabIndex={-1}
               onClick={() => toggleAll()}
               checkedIcon={<Check className={classes.checkedIcon} />}
               icon={<Check className={classes.uncheckedIcon} />}
               classes={{
                 checked: classes.checked,
                 root: classes.root,
               }}
             />
           </TableCell>
          )}
          </TableRow>
            {tableItems.map((item) => (
              <TableRow
                key={item.id}
                className={classNames({
                  [classes.tableRow]: true,
                  [classes.not_active]: item.active == false,
                })}
              >
                {checkable && (
                  <TableCell>
                    <Checkbox
                      id = {item.id}
                      checked={item.checked}
                      tabIndex={-1}
                      onClick={() => handleToggle(item)}
                      checkedIcon={<Check className={classes.checkedIcon} />}
                      icon={<Check className={classes.uncheckedIcon} />}
                      classes={{
                        checked: classes.checked,
                        root: classes.root,
                      }}
                    />
                  </TableCell>
                )}
                {item.avatar !== undefined && (
                  <TableCell
                    key={item.id + "_avatar"}
                    className={tableRowAvatar}
                  >
                    <UserAvatar
                      avatar_url={item.avatar.thumb.url}
                      onClick={handleRowClick(item)}
                    />
                  </TableCell>
                )}
                {props.children !== undefined && (
                  <TableCell
                    key={item.id + "component"}
                    className={tableCellClasses}
                  >
                    <CustomTableItemProvider value={item}>
                      {props.children}
                    </CustomTableItemProvider>
                  </TableCell>
                )}
                {item.values.map((value, index) => (
                  <TableCell
                    key={item.id + "_" + index}
                    className={tableCellClasses}
                  >
                    <Button
                      className={classes.button}
                      onClick={handleRowClick(item)}
                    >
                      {value}
                    </Button>
                  </TableCell>
                ))}

                <TableCell className={classes.tableActions}>
                  {actions.map(
                    (action) =>
                      (action.visible === undefined || action.visible) && (
                        <RowAction
                          item={item}
                          action={action}
                          classes={classes}
                          key={action.id}
                        />
                      )
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </React.Fragment>
    );  
}

CustomTable.propTypes = {
  classes: PropTypes.object,
  items: PropTypes.arrayOf(PropTypes.object),
  checkable: PropTypes.bool,
};

