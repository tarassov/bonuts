import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridItem from "components/grid/GridItem.jsx";
import GridContainer from "components/grid/GridContainer.jsx";
import EventCard from 'components/EventCard'
import ProgressContainer from "containers/ProgressContainer";
import EventCardContainer from 'containers/EventCardContainer';
import EventsFilter from './EventsFilter';



class  EventList extends Component {


    componentDidMount() {
      //this.interval = setInterval(() => this.setState({ time: Date.now() }), 1000);
    }
    componentWillUnmount() {
     // clearInterval(this.interval);
    }

    filter(filter) {
        this.props.reloadEvents(filter)
    }

    render() {
        const {items} = this.props
        return (
            <React.Fragment>
                <EventsFilter onFilter={this.filter.bind(this)}/>
                <GridContainer>
                    <ProgressContainer/>                    
                    {items!==undefined && items.map((post,index) =>(
                        <GridItem xs={12} sm={12} md={6} lg ={4} key = {index}>
                            <EventCardContainer  post = {post}/>
                        </GridItem>
                        )
                    )}

                </GridContainer>
            </React.Fragment>
        )
    }
}

EventList.props = {
    reloadEvents: PropTypes.func.isRequired
}

export default EventList;
