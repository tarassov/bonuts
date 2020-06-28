import {connect} from 'react-redux'
import EventCard from 'components/EventCard'
import {likeEvent,commentItem,loadEventWithComments} from "actions/eventActions";
import * as modalActions from "actions/modal/modalActions"
import * as modals from 'modals/modalList'

const mapDispatchToProps = (dispatch,ownProps) => {
    return {
        onProfileClick: (profile) => {
            dispatch(modalActions.showModal(modals.PROFILE_PREVIEW, {
                user_name: profile.name,
                position: profile.position,
                user_avatar: profile.avatar,
                disabled:true}))
         },
        onLikeEvent: (event) => {
           dispatch(likeEvent(event))
           if (ownProps.notModal == true){
               dispatch(loadEventWithComments(event.id,))   
           }
        },
        onShowEventModal: (event) =>{
            dispatch(modalActions.showModal(modals.EVENT, {event: event}))
        },
        onComment: (event, comment) => {
            dispatch(commentItem(event,comment))
        }
    }
}


const  mapStateToProps = (state,ownProps) => {
    return {
        post: ownProps.post,
        commentable: ownProps.notModal === undefined || ownProps.notModal==false,      
        likeable:true
    }
}

const EventCardContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(EventCard)


export default  EventCardContainer
