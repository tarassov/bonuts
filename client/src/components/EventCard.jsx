import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import EditIcon from "@material-ui/icons/Edit";
import TextField from "@material-ui/core/TextField";

import CommentIcon from "@material-ui/icons/Comment";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import LockIcon from "@material-ui/icons/Lock";
import AndroidIcon from "@material-ui/icons/Android";
import classNames from "classnames";
import Tooltip from "@material-ui/core/Tooltip";
import { withTranslation, Trans } from "react-i18next";
import { Button } from "@material-ui/core";
import UserAvatar from "./UserAvatar";
import eventCardStyles from "assets/jss/components/eventCardStyle";
import OperationContainer from "containers/OperationContainer";

class EventCard extends React.Component {
  state = {
    expanded: false,
    edit: false,
    content: "",
  };

  handleExpandClick = () => {
    this.setState((state) => ({ expanded: !state.expanded }));
  };

  click() {
    this.props.onProfileClick(this.props.post);
  }

  contentChange = (event) => {
    this.setState({ content: event.target.value });
  };

  handleEdit = () => {
    this.setState({ content: this.props.post.content });
    this.setState((state) => ({ edit: !state.edit }));
  };

  submitEdit = (event) => {
    event.preventDefault();
    this.props.post.content = this.state.content;
    this.setState((state) => ({ edit: false }));
    //this.props.onEdit(this.state.content);
  };
  userClick() {
    this.props.onProfileClick(this.props.post.operation.to_profile);
  }

  render() {
    const { classes, post, t, commentable, likeable, profile } = this.props;
    const avatarClass = classNames({
      [classes.avatar]: true,
      [classes.avatarPrivate]: !post.public,
    });

    const amountClass = classNames({
      [classes.operationText]: true,
      [classes.amountText]: true,
      [classes.plusText]: post.operation && post.operation.direction > 0,
      [classes.minusText]: post.operation && post.operation.direction < 0,
    });
    const cardClass = classNames({
      [classes.card]: true,
      [classes.cardPrivate]: !post.public,
    });

    const likeClass = classNames({
      [classes.liked]: post.liked,
    });

    let avatar_url = null;
    if (post.user_avatar !== undefined && post.user_avatar !== null) {
      avatar_url = post.user_avatar.thumb.url;
    }

    let title = (
      <Button className={classes.accountButton} onClick={this.click.bind(this)}>
        {post.user_name}
      </Button>
    );
    return (
      <Card className={cardClass}>
        <CardHeader
          className={classes.cardHeader}
          avatar={
            <React.Fragment>
              {post.public && (
                <UserAvatar
                  onClick={this.click.bind(this)}
                  className={classes.avatar}
                  avatar_url={avatar_url}
                  alt={post.user_name}
                />
              )}
              {!post.public && (
                <Avatar className={classes.avatar}>
                  <AndroidIcon />
                </Avatar>
              )}
            </React.Fragment>
          }
          action={
            <Tooltip
              title={!post.public ? t("Only you can see it") : t("Profile")}
            >
              <IconButton
                aria-label={
                  !post.public ? t("Only you can see it") : t("Profile")
                }
              >
                {!post.public && <LockIcon />}
              </IconButton>
            </Tooltip>
          }
          title={post.public ? title : "Сервис бот"}
          subheader={post.public && post.position}
        />

        <CardContent className={classes.content}>
          <OperationContainer receiver operation={post.operation} />
          {!this.state.edit && (
            <Typography component="p" className={classes.operationText}>
              {this.props.post.content}
            </Typography>
          )}
          {this.state.edit && (
            <form onSubmit={this.submitEdit} noValidate autoComplete="off">
              <TextField
                autoFocus
                margin="dense"
                id="content_value"
                onChange={this.contentChange}
                value={this.state.content}
                fullWidth
                multiline
              />
              <Button type="submit" color="primary" autoFocus>
                Submit
              </Button>
            </form>
          )}
        </CardContent>

        <CardActions className={classes.actions} disableSpacing>
          {(commentable || likeable) && (
            <IconButton
              aria-label="Add to favorites"
              onClick={this.props.onLikeEvent.bind(this, post)}
              className={likeClass}
            >
              <FavoriteIcon />
              {post.likes.length > 0 && post.likes.length}
            </IconButton>
          )}
          {commentable && (
            <IconButton
              aria-label="Comment"
              onClick={this.props.onShowEventModal.bind(this, post)}
            >
              <CommentIcon />
              {post.comments_count !== undefined &&
                post.comments_count !== 0 &&
                post.comments_count}
            </IconButton>
          )}
          {profile !== undefined && profile.admin && (
            <IconButton onClick={this.handleEdit} aria-label="edit">
              <EditIcon />
            </IconButton>
          )}
          {post.extra_content && (
            <IconButton
              className={classnames(classes.expand, {
                [classes.expandOpen]: this.state.expanded,
              })}
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="Show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          )}

          <Typography
            variant="caption"
            component="div"
            className={classes.dateCaption}
          >
            {post.date_string}
          </Typography>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>{post.extra_content}</CardContent>
        </Collapse>
      </Card>
    );
  }
}

EventCard.propTypes = {
  classes: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

export default withStyles(eventCardStyles)(withTranslation()(EventCard));
