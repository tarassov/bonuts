import * as actionTypes from 'actions/modal/actionTypes'

import {subscribe} from 'redux-subscriber';


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


export function confirm(body){
  return new Promise((resolve, reject) => {
    const unsubscribe = subscribe('modal.result', state => {
      console.log(state);
    });

    // if you want to stop listening to changes
    unsubscribe();
  })
}
