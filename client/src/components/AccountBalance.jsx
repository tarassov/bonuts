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
import { withTranslation, Trans } from "react-i18next";

const styles = theme => ({
    card: {
        ...card,
       minWidth: "275px"
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    button: {
        margin: theme.spacing.unit,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    iconSmall: {
        fontSize: 20,
    },
});

class  AccountBalance extends Component {

    componentDidMount() {

    }

    render() {
        const { classes, title,lastUpdate,profile,balance,shareable,shopable,t } = this.props;
        return (

            <Card className={classes.card}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {t(title)}
                    </Typography>
                    <Typography variant="h5" component="h2">
                        {balance} {t('point', {count: balance})}
                        </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        {lastUpdate}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" >{t("Details")}</Button>
                    {balance>0 && shareable &&<Button size="small" color="primary" onClick={this.props.onShare}>
                        {t("Share")}
                        <CakeIcon className={classNames(classes.rightIcon, classes.iconSmall)} />
                    </Button>}
                    {balance>0 && shopable &&<Button size="small" color="primary" onClick={this.props.onShop}>
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
