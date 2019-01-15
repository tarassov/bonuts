import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
    card: {
        minWidth: 275,
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
};

class  AccountBalance extends Component {

    componentDidMount() {
        this.props.getBalance(this.props.profile);
    }

    render() {
        const { classes, title,lastUpdate,profile,balance } = this.props;
        return (
            <Card className={classes.card}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {title}
                    </Typography>
                    <Typography variant="h5" component="h2">
                        {balance}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        {lastUpdate}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">get details</Button>
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
    lastUpdate: PropTypes.string
};

export default withStyles(styles)(AccountBalance);
