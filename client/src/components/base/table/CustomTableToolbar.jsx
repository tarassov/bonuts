import React, { Component } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/PlaylistAdd";
import { useTranslation, Trans } from "react-i18next";
import customTableStyle from "assets/jss/components/customTableStyle.jsx";

let CustomTableToolbar = (props) => {
  const { numSelected, classes, children, actions } = props;
  const { t } = useTranslation();
  let tableActions = actions !== undefined ? actions : [];
  return (
    <Toolbar
      className={classNames(classes.toolbar, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} <Trans>selected</Trans>
          </Typography>
        ) : (
          <div>{children}</div>
        )}
      </div>
      <div>
        {tableActions.map((action) => (
          <Tooltip
            key={action.label.concat(action.id)}
            title={t(action.label)}
            classes={{ tooltip: classes.tooltip }}
            onClick={action.onClick}
          >
            <IconButton
              aria-label={action.label}
              className={classes.tableActionButton}
            >
              {action.icon}
            </IconButton>
          </Tooltip>
        ))}
      </div>
    </Toolbar>
  );
};

export default withStyles(customTableStyle)(CustomTableToolbar);
