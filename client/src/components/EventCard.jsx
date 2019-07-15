import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import orange from '@material-ui/core/colors/orange';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import LockIcon from '@material-ui/icons/Lock';
import classNames from "classnames";
import Tooltip from "@material-ui/core/Tooltip";
import UserAvatar from 'react-user-avatar'
import { withTranslation, Trans } from "react-i18next";

const styles = theme => ({
    card: {
        margin: "auto",
        maxWidth: 700,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    actions: {
        display: 'flex',
    },
    dateCaption: {
        marginLeft: 'auto', 
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: green[500],
    },
    avatarPrivate: {
        backgroundColor: red[500],
    },
});


class  EventCard extends React.Component {

    state = { expanded: false };

    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    };

    render() {
        const { classes, post,t} = this.props;
        const avatarClass = classNames({
            [classes.avatar]: true,
            [classes.avatarPrivate]: !post.public,            
          });

        let avatar_url = null
        if (post.user_avatar !== undefined && post.user_avatar !==null){
            avatar_url = post.user_avatar.thumb.url
        }

        return (
            <Card className={classes.card}>
                <CardHeader
                    avatar={
                        <UserAvatar size="48" name={post.user_name} src={avatar_url}/>
                    }
                    action={ 
                        <Tooltip title={t("Only you can see it")}>
                        <IconButton  aria-label= {t("Only you can see it")}>
                            {!post.public &&<LockIcon/>}                          
                        </IconButton>
                        </Tooltip>
                    }
                    title={post.user_name}
                    subheader={post.position}
                />     
                           
                <CardContent>
                      <Typography component="p">
                        {post.content}
                    </Typography>
                </CardContent>
                <CardActions className={classes.actions} disableSpacing>          
                    <IconButton aria-label="Add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="Share">
                        <ShareIcon />
                    </IconButton>
                    <Typography variant="caption" component='div' className= {classes.dateCaption}>
                        {post.date_string}
                    </Typography>      
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
                </CardActions>
                 <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        {post.extra_content}
                    </CardContent>
                </Collapse>
            </Card>
        );
    }
}


EventCard.propTypes = {
    classes: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired
};

export default withStyles(styles)(withTranslation()(EventCard));
