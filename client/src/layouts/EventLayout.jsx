import React, { useEffect } from "react";

import {
  loadEventWithComments,
} from "actions/eventActions";


import GridContainer from "components/base/grid/GridContainer";
import GridItem from "components/base/grid/GridItem";

import { useSelector,useDispatch } from 'react-redux'
import {useParams} from "react-router-dom"

import EventCardContainer from "containers/EventCardContainer";
import CommentContainer from "containers/CommentContainer";
import NewCommentContainer from "containers/NewCommentContainer";

export default function EventLayout() {


  const dispatch = useDispatch()
  const events = useSelector(state => state.events)
  const { id } = useParams();

  useEffect(() => {
    dispatch(loadEventWithComments(id))
  }, [id])


    return (
      <React.Fragment>
        {events.selected !== undefined && (
          <GridContainer>
            <GridItem xs={12}>
              <EventCardContainer post={events.selected} notModal={true} />
            </GridItem>

            {events.selected.comments !== null &&
              events.selected.comments
                .sort((a, b) => {
                  return a.id - b.id;
                })
                .map((post, index) => (
                  <GridItem xs={12} key={index}>
                    <CommentContainer post={post} />
                  </GridItem>
                ))}
            <GridItem xs={12}>
              {<NewCommentContainer event={events.selected} />}
            </GridItem>
          </GridContainer>
        )}
      </React.Fragment>
    );
  
}

