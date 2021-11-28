import React from "react";
import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import { blue } from "@material-ui/core/colors";
import classNames from "classnames";
const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    backgroundColor: "white",
    color: blue[300],
  },
  userName: {
    fontWeight: 400,
    paddingLeft: 15,
  },
}));

const UserAvatar = (props) => {
  const classes = useStyles();

  const avatarClass = classNames({
    [classes.avatar]: true,
    [props.className]: props.className,
  });

  return (
    <React.Fragment>
      {props.avatar_url !== null && (
        <Avatar
          onClick={props.onClick}
          component="span"
          className={avatarClass}
          alt={props.alt}
          src={props.avatar_url}
        />
      )}
      {props.avatar_url === null && (
        <Avatar className={avatarClass}>
          <Icon>person_icon</Icon>
        </Avatar>
      )}
      {props.user_name && (
        <span className={classes.userName}>{props.user_name}</span>
      )}
    </React.Fragment>
  );
};

export default UserAvatar;
