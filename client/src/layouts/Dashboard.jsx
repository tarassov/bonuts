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
import EventList from 'components/EventList'
import DialogActions from '@material-ui/core/DialogActions';
import { withTranslation, Trans } from "react-i18next";
import EventListContainer from 'containers/EventListContainer';

class Dashboard extends   Component {
    state = {

    };

    componentDidMount() {
        //this.props.onRequestUser();
        if (this.props.page == 0)this.props.loadEvents(this.props.page+1)
        //TODO: TImer https://medium.com/@machadogj/timers-in-react-with-redux-apps-9a5a722162e8
    }

    loadMore = () => {
        this.props.loadEvents(this.props.page+1)
    }

    doNut() {

    }

    reloadEvents(filter){
        this.props.reloadEvents(filter)
    }

    render() {
        const {classes, profile,t} = this.props

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
            <React.Fragment>
                <div>
                    <div className = {classes.flexContainer}>
                        <hr className = {classes.flexLine}/>
                        <section><Trans>Balance</Trans></section>
                        <hr className = {classes.flexLine}/>
                    </div>
                    <GridContainer>
                        <GridItem xs={12} sm={6} md={6}>
                          {profile !== undefined && profile.self_account !== undefined  && <SelfAccountContainer/>}
                        </GridItem>
                        <GridItem xs={12} sm={6} md={6}>
                          {profile !== undefined && profile.distrib_account !== undefined  && <DistribAccountContainer/>}
                        </GridItem>
                     </GridContainer>
                    <div className = {classes.flexContainer}>
                        <hr className = {classes.flexLine}/>
                            <section>
                                <Trans>Events</Trans>
                            </section>
                        <hr className = {classes.flexLine}/>
                    </div>
                    <EventListContainer/>
                </div>
            </React.Fragment>
        )
    }

}

Dashboard.props = {
    
}
export default withStyles(dashboardStyle)(withTranslation("translations")(Dashboard));
