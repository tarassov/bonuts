import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {card} from 'assets/jss/baseStyles'
import CakeIcon from '@material-ui/icons/Cake';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import classNames from 'classnames';
import { withTranslation} from "react-i18next";
import { Tooltip } from '@material-ui/core';

const styles = theme => ({
    card: {
        ...card,
       minWidth: "275px",
       margin:5,
    },
    content: {
        paddingBottom: 3,
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 3,
        fontSize: 13,
    },
    button: {
        margin: theme.spacing(1),
    },
    leftIcon: {
        marginRight: theme.spacing(2),
    },
    rightIcon: {
        marginLeft: theme.spacing(2),
    },
    iconSmall: {
        fontSize: 20,
    },
});

class  AccountBalance extends Component {

    componentDidMount() {

    }

    render() {
        const { classes, title,lastUpdate,balance,shareable,shopable,t,profile } = this.props;
        return (
            <Card className={classes.card}>
                <CardContent className={classes.content}>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {t(title)}
                    </Typography>
                    <Typography variant="h5" >
                        {balance} {shareable && t('donut', {count: balance})}{shopable && t('point', {count: balance})}
                        </Typography>
                    <Button>
                        <Typography className={classes.pos} color="textSecondary" onClick={this.props.onHistory.bind(this,profile)}>
                        +5 пончиков 05-06-2020
                        </Typography>
                    </Button>
                </CardContent>
                <CardActions>
                    {balance>0 && shareable &&<Button size="small" color="primary" onClick={this.props.onShare}>
                        {t("Share")}
                        <CakeIcon className={classNames(classes.rightIcon, classes.iconSmall)} />
                    </Button>}
                    {balance>0 && shopable &&<Button size="small" color="primary" onClick={this.props.onRedirectToStore}>
                        {t("Go to shop")}
                        <LocalMallIcon className={classNames(classes.rightIcon, classes.iconSmall)} />
                    </Button>}
                </CardActions>
            </Card>
         );
    }
}

AccountBalance.propTypes = {
    classes: PropTypes.object.isRequired,
    getBalance: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    profile: PropTypes.object.isRequired,
    balance: PropTypes.number.isRequired,
    shareable: PropTypes.bool.isRequired,
    shopable: PropTypes.bool.isRequired,
    lastUpdate: PropTypes.string
};

export default withStyles(styles)(withTranslation()(AccountBalance));
