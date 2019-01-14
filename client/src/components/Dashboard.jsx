import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import dashboardStyle from 'assets/jss/components/dashboardStyle'
import Button from "@material-ui/core/Button";
import ProgressContainer from "containers/ProgressContainer";
import AddIcon from '@material-ui/icons/Add';
import Fabs from "components/Fabs"


class learnixList extends   Component {
    state = {

    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.onRequestUser();
    }

    doNut() {

    }

    render() {
        const {classes} = this.props

        const fabs = [
            {
                color: 'primary',
                className: classes.fab,
                icon: <AddIcon />,
                caption: 'SHARE',
                onClick: this.doNut.bind(this)
            },
            {
                color: 'primary',
                className: classes.fab,
                icon: <AddIcon />,
                caption: 'TWEET',
                onClick: this.doNut.bind(this)
            }
        ];


        return (
            <div>
                <div className={classes.placeholder}/>
                <Fabs fabs={fabs}/>
                <ProgressContainer/>
            </div>
        )
    }

}


export default withStyles(dashboardStyle)(learnixList);
