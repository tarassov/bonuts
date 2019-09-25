import React, { PropTypes,Component } from 'react'
import {connect} from 'react-redux'
import {likeEvent,commentItem, loadEventWithComments} from "actions/eventActions";
import apis from 'api/apiRoot'
import * as modalActions from "actions/modal/modalActions"
import * as modals from 'modals/modalList'

import { EventLayout } from 'layouts/EventLayout';
import { stat } from 'fs';

const mapDispatchToProps = (dispatch, props) => {
    return {
        onLoad: () => {
            //dispatch(loadEventWithComments(props.match.params.id,callback(props.match.params.id)))            
            dispatch(modalActions.showModal(modals.EVENT, {event:{id: parseInt(props.match.params.id)}}))
        },
        showEventModal: (event) =>{
            dispatch(modalActions.showModal(modals.EVENT, {event: event}))
        },
    }
}


const  mapStateToProps = (state,props) => {
      return{
           profile: state.profile,
           events: state.events,
           event_id: props.match.params.id
      }
}


export default connect(mapStateToProps, mapDispatchToProps)(EventLayout)