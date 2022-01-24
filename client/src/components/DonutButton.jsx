import React, { useState, useEffect } from "react";
import UserAvatar from "./UserAvatar";
import { Button } from "@material-ui/core";
import profileButtonStyle from "assets/jss/components/profileButtonStyle";
import { withStyles } from "@material-ui/core/styles";


function DonutButton(props) {
  const { classes, donut, onClick } = props;
  let thumb_url;
  if (donut.logo !== undefined && donut.logo !== null) {
    thumb_url = donut.logo.thumb.url;
  }

  return (
    <React.Fragment>
      <Button className={classes.accountButton} onClick={onClick}>
        <UserAvatar
          className={classes.smallAvatar}
          avatar_url={thumb_url}
          user_name={donut.name}
        />
      </Button>
    </React.Fragment>
  );
}

export default withStyles(profileButtonStyle)(DonutButton);
