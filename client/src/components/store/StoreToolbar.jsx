
import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/PlaylistAdd';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import { useTranslation, Trans } from "react-i18next";


const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
      display: 'flex',
  },
  title: {
    flex: '0 0 auto',
  },
  toolButton: {

  }
});

let StoreToolbar = props => {
  const { numSelected, classes,onAddItem, onEditItem,onDeleteItem } = props;
  const { t, i18n } = useTranslation();


  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected}   <Trans>selected</Trans>
          </Typography>
        ) : (
          <Typography variant="h6" id="tableTitle">
            <Trans>Goods</Trans>
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
          {numSelected == 1 &&
              <Tooltip title={t("Edit")} className={classes.toolButton} onClick={onEditItem}>
                  <IconButton aria-label="Edit">
                    <EditIcon />
                  </IconButton>
              </Tooltip>
          }
          {numSelected > 0 ? (
            <Tooltip title={t("Delete")} className={classes.toolButton} onClick={onDeleteItem}>
              <IconButton aria-label="Delete">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title={t("Add")} className={classes.toolButton}>
              <IconButton aria-label="Add" onClick={onAddItem}>
                <AddIcon />
              </IconButton>
            </Tooltip>
          )}
      </div>
    </Toolbar>
  );
};

StoreToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

export default withStyles(toolbarStyles)(StoreToolbar);
