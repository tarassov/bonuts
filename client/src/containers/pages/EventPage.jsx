
import {connect} from 'react-redux'
import {likeEvent,commentItem, loadEventWithComments} from "actions/eventActions";
//import apis from 'api/apiRoot'
import * as modalActions from "actions/modal/modalActions"
import * as modals from 'modals/modalList'
import queryString from 'query-string'

import { EventLayout } from 'layouts/EventLayout';
import { stat } from 'fs';

const mapDispatchToProps = (dispatch, props) => {
    return {
        onLoad: () => {
            dispatch(loadEventWithComments(props.match.params.id,))    
            //const values = queryString.parse(props.location.search)
            //console.log(values.eventid) 
            //dispatch(modalActions.showModal(modals.EVENT, {event:{id: parseInt(props.match.params.id)}}))
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