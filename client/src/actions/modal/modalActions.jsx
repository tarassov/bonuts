import * as actionTypes from 'actions/modal/actionTypes'


export function showModal(modalName,body){
    return {
        type: actionTypes.SHOW_MODAL,
        modalName: modalName,
        body: body
    }
}

export function hideModal(){
    console.log("HIDE_MODAL")
    return {
        type: actionTypes.HIDE_MODAL,
    }
}
