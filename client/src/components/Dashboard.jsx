import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import dashboardStyle from 'assets/jss/components/dashboardStyle'
import Button from "@material-ui/core/Button";
import ProgressContainer from "containers/ProgressContainer";
import AddIcon from '@material-ui/icons/Add';
import Fabs from "components/Fabs"
import SelfAccountContainer from "containers/SelfAccountContainer";
import DistribAccountContainer from "containers/DistribAccountContainer";
import GridItem from "components/grid/GridItem.jsx";
import GridContainer from "components/grid/GridContainer.jsx";


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
        const {classes, profile} = this.props

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


           console.log(profile)
        return (
            <React.Fragment>
                <GridContainer>
                    <ProgressContainer/>
                    <GridItem xs={12} sm={6} md={6}>
                      {profile !== undefined && profile.self_account !== undefined  && <SelfAccountContainer/>}
                    </GridItem>
                    <GridItem xs={12} sm={6} md={6}>
                      {profile !== undefined && profile.distrib_account !== undefined  && <DistribAccountContainer/>}
                    </GridItem>
                  
                </GridContainer>
            </React.Fragment>
        )
    }

}


export default withStyles(dashboardStyle)(learnixList);
