
import ActionFactory from "actions/actionFactory"
import apis  from 'api/apiRoot'
import {push} from 'connected-react-router'

const acceptCallback = () => {
    return {
        success: (dispatch,response) => {
           dispatch(push('/dashboard'))
        }
      }
    }


export function acceptInvitation(id) {
    return function(dispatch){
        let actions = new ActionFactory(apis.invitations)
        dispatch(actions.updateItem({accept: true, id: id},acceptCallback))
    }
}


export function declineInvitation(id) {
    return function(dispatch){
        let actions = new ActionFactory(apis.invitations)
        dispatch(actions.updateItem({decline: true, id: id}))
    }
}