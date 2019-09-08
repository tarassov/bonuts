import {connect} from 'react-redux'
import EventCard from 'components/EventCard'
import {likeEvent} from "actions/dashboardActions";
import * as modalActions from "actions/modal/modalActions"
import * as modals from 'modals/modalList'

const mapDispatchToProps = (dispatch) => {
    return {
        onProfileClick: (profile) => {
            dispatch(modalActions.showModal(modals.PROFILE_PREVIEW, {
                user_name: profile.user_name,
                position: profile.position,
                user_avatar: profile.user_avatar,
                disabled:true}))
         },
        onLikeEvent: (event) => {
            dispatch(likeEvent(event))
        },
        onShowEventModal: (event) =>{
            dispatch(modalActions.showModal(modals.EVENT, {event: event}))
        }
    }
}


const  mapStateToProps = (state,ownProps) => {
    return {
        post: ownProps.post
    }
}

const EventCardContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(EventCard)


export default  EventCardContainer
