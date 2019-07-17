import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridItem from "components/grid/GridItem.jsx";
import GridContainer from "components/grid/GridContainer.jsx";
import EventCard from 'components/EventCard'
import ProgressContainer from "containers/ProgressContainer";


class  EventList extends Component {


    componentDidMount() {
      this.interval = setInterval(() => this.setState({ time: Date.now() }), 1000);
    }
    componentWillUnmount() {
      clearInterval(this.interval);
    }

    render() {
        const {items} = this.props
        return (
            <React.Fragment>
                <GridContainer>
                    <ProgressContainer/>
                    {items!==undefined && items.map((post,index) =>(
                        <GridItem xs={12} sm={12} md={6} lg ={4} key = {index}>
                            <EventCard  post = {post} onProfileClick={this.props.onProfileClick}/>
                        </GridItem>
                        )
                    )}

                </GridContainer>
            </React.Fragment>
        )
    }
}

export default EventList;
