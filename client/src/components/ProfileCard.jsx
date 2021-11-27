import React, { useCallback, useEffect } from "react";
import classNames from "classnames";

import { useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Card from "components/base/card/Card";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import CardBody from "components/base/card/CardBody";
import Button from "components/base/customButtons/RegularButton";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardHeader from "components/base/card/CardHeader";
import { Avatar, CardActions, IconButton } from "@material-ui/core";
import default_profile from "assets/img/default_profile.png";
import profileCardStyle from "assets/jss/components/profileCardStyle";

import Edit from "@material-ui/icons/Edit";
import AttachMoney from "@material-ui/icons/AttachMoney";
import GridContainer from "components/base/grid/GridContainer";
import GridItem from "components/base/grid/GridItem";

const useStyles = makeStyles(profileCardStyle);

export default function ProfileCard(props) {
  const classes = useStyles();
  const { t } = useTranslation();

  const [imagePreviewUrl, setImagePreviewUrl] = React.useState(
    props.profile.user_avatar.url ? props.profile.user_avatar.url : default_profile
  );
  const tenantProfile = useSelector((state) => state.profile);

  useEffect(() => {
    setImagePreviewUrl(
      props.profile.user_avatar.url ? props.profile.user_avatar.url : default_profile
    );
  }, [props.profile]);

  const handleClick = () => {
    props.onClick(props.profile);
  };

  const handleEdit = () => {
   // props.onClick(props.profile);
  };

  return (
    <Card team raised className={classes.profileCard}>
      <CardActionArea onClick={handleClick}>
        <CardBody team  className={classes.body}>
          <GridContainer>
            <GridItem xs={4} sm={4} md={4}>
              <div className={classes.cardHeaderHover}>
                <img src={imagePreviewUrl} alt="..." className={classes.img} />
              </div>
            </GridItem>
            <GridItem xs={8} sm={8} md={8}>
              <h5 className={`${classes.cardTitle} ${classes.marginTop10} `}>
                {props.profile.name}
              </h5>
            </GridItem>
          </GridContainer>
        </CardBody>
      </CardActionArea>
      <CardActions className={classes.actions} disableSpacing>
        {tenantProfile !== undefined && tenantProfile.admin && (
          <IconButton onClick={handleEdit} aria-label="edit" color="primary">
            <Edit />
          </IconButton>
        )}
        {tenantProfile !== undefined && tenantProfile.admin && (
          <IconButton onClick={handleEdit} aria-label="attach_money" color="primary">
            <AttachMoney />
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
}

ProfileCard.propTypes = {
  profile: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};
