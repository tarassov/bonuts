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

class learnixList extends   Component {
    state = {

    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.onRequestUser();
        this.props.loadEvents(this.props.page+1)
        //TODO: TImer https://medium.com/@machadogj/timers-in-react-with-redux-apps-9a5a722162e8
    }

    loadMore = () => {
        this.props.loadEvents(this.props.page+1)
    }

    doNut() {

    }

    render() {
        const {classes, profile, items, total, per_page,page} = this.props

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
                        <section>Balance</section>
                        <hr className = {classes.flexLine}/>
                    </div>
                    <GridContainer>
                        <ProgressContainer/>
                        <GridItem xs={12} sm={6} md={6}>
                          {profile !== undefined && profile.self_account !== undefined  && <SelfAccountContainer/>}
                        </GridItem>
                        <GridItem xs={12} sm={6} md={6}>
                          {profile !== undefined && profile.distrib_account !== undefined  && <DistribAccountContainer/>}
                        </GridItem>
                     </GridContainer>
                    <div className = {classes.flexContainer}>
                        <hr className = {classes.flexLine}/>
                            <section>Events</section>
                        <hr className = {classes.flexLine}/>
                    </div>
                    <EventList items = {items}/>
                    <DialogActions>
                    {page*per_page<total&& <Button  className = {classes.button} onClick={this.loadMore} color="primary" >
                         More
                     </Button>}
                     </DialogActions>
                </div>
            </React.Fragment>
        )
    }

}


export default withStyles(dashboardStyle)(learnixList);
