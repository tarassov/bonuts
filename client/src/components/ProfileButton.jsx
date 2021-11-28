import React, { useState, useEffect } from "react";
import UserAvatar from "./UserAvatar";
import { Button } from "@material-ui/core";
import profileButtonStyle from "assets/jss/components/profileButtonStyle";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import * as modalActions from "actions/modal/modalActions";
import * as modals from "modals/modalList";

function ProfileButton(props) {
  const { classes, profile, onClick } = props;
  let thumb_url;
  if (profile.avatar !== undefined && profile.avatar !== null) {
    thumb_url = profile.avatar.thumb.url;
  }

  return (
    <React.Fragment>
      <Button className={classes.accountButton} onClick={onClick}>
        <UserAvatar
          className={classes.smallAvatar}
          avatar_url={thumb_url}
          user_name={profile.name}
        />
      </Button>
    </React.Fragment>
  );
}

export default withStyles(profileButtonStyle)(ProfileButton);
