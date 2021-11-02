import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "components/base/card/Card";
import menuCardStyle from "assets/jss/components/menuCardStyle";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import CardBody from "components/base/card/CardBody";
import CardActionArea from '@material-ui/core/CardActionArea';
import { useDispatch } from 'react-redux'
import { push } from "connected-react-router";
import { Icon } from "@material-ui/core";

const useStyles = makeStyles(menuCardStyle);

export default function MenuCard(props) {
  const classes = useStyles();
  const { t } = useTranslation();
  const {menuItem} = props;

 
  const onClick = useCallback(() => {
      dispatch(push(menuItem.path))
  }, [props.menuItem]);
  
  const dispatch = useDispatch()



  return (
    <Card raised color="primaryLight" className={classes.menuItem}>
    <CardActionArea onClick={onClick} className={classes.actionArea}>
      <CardBody className={classes.marginCenter}>
        <div className={classes.icon}>
        {typeof menuItem.config.icon === "string" ? (
                    <Icon>{menuItem.config.icon}</Icon>
                  ) : (
                    <menuItem.config.icon />
                  )}
        </div>
        <h3 className={`${classes.cardTitle} ${classes.marginCenter}`}>
          {t(menuItem.config.navbarName)}
        </h3>
      </CardBody>
    </CardActionArea>
    </Card>
  );
}

MenuCard.propTypes = {
  menuItem: PropTypes.object,
};
