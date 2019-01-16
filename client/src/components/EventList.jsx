import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridItem from "components/grid/GridItem.jsx";
import GridContainer from "components/grid/GridContainer.jsx";
import EventCard from 'components/EventCard'
import ProgressContainer from "containers/ProgressContainer";

const posts = [
    {
        author : "Robert Langdon",
        date: "01 January 2019",
        content: "Robert gave 10 points to Leonardo Do Vinci"
    },
    {
        author : "Santa Claus",
        date: "01 January 2019",
        content: "Santa gave 10 points to Lal of us"
    },
    {
        author : "mr Trump",
        date: "08 January 2019",
        content: "mr Trump lost all his points due to the expiration date"
    },
    {
        author : "mr Trump",
        date: "08 January 2019",
        content: "mr Trump lost all his points due to the expiration date"
    },
    {
        author : "Anonymous",
        date: "08 March 1900",
        content: "10 point goes to Robert Langdon",
        hasExtra: true,
        extraContent: "He was super helpful"
    }
]


class  EventList extends Component {




    render() {
        return (
            <React.Fragment>
                <GridContainer>
                    <ProgressContainer/>
                    {posts.map(post =>(
                        <GridItem xs={12} sm={12} md={6} lg ={4}>
                            <EventCard post = {post}/>
                        </GridItem>
                        )
                    )}

                </GridContainer>
            </React.Fragment>
        )
    }
}

export default EventList;