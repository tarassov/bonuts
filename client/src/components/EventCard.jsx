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
import blue from '@material-ui/core/colors/blue';
import yellow from '@material-ui/core/colors/yellow';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonIcon from '@material-ui/icons/Person';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import LockIcon from '@material-ui/icons/Lock';
import AndroidIcon from '@material-ui/icons/Android';
import classNames from "classnames";
import Tooltip from "@material-ui/core/Tooltip";
import { withTranslation, Trans } from "react-i18next";

const styles = theme => ({
    card: {
        margin: "auto",
        maxWidth: 700,

    },
    cardPrivate: {
        backgroundColor: blue[50],
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
        backgroundColor: 'white',
        color: blue[300],
    },
    avatarPrivate: {
        backgroundColor: red[500],
    },
    bigAvatar: {
        margin: 10,
        width: 60,
        height: 60,
      },
});


class  EventCard extends React.Component {

    state = { expanded: false };

    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    };

    click() {
        this.props.onProfileClick(this.props.post)
    }

    render() {
        const { classes, post,t} = this.props;
        const avatarClass = classNames({
            [classes.avatar]: true,
            [classes.avatarPrivate]: !post.public,            
          });
        const cardClass = classNames({
        [classes.card]: true,
        [classes.cardPrivate]: !post.public,            
        });

        let avatar_url = null
        if (post.user_avatar !== undefined && post.user_avatar !==null){
            avatar_url = post.user_avatar.thumb.url
        }
 

        return (
            <Card className={cardClass}>
                 <CardHeader
                    avatar={
                        <React.Fragment>
                            {post.public && avatar_url!==null && <Avatar className ={classes.avatar} alt={post.user_name} src={avatar_url}/>} 
                            {post.public && avatar_url===null && <Avatar className ={classes.avatar}><PersonIcon/></Avatar> }
                            {!post.public && <Avatar className ={classes.avatar}><AndroidIcon/></Avatar>}                             
                        </React.Fragment>
                    }
                    action={ 
                        <Tooltip title={!post.public ? t("Only you can see it"): t("Profile")}>
                        <IconButton  aria-label= {!post.public ? t("Only you can see it"): t("Profile")} onClick={this.click.bind(this)}>
                            {!post.public &&<LockIcon/>}     
                            {post.public &&<MoreVertIcon />}     
                        </IconButton>
                        
                        </Tooltip>
                    }
                    title={post.public? post.user_name: "Сервис бот"}
                    subheader={post.public && post.position}
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
