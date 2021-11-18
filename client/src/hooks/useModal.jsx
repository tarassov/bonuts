import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import * as actionTypes from "actions/modal/actionTypes";

export function useModal(modalName, body){
    const dispatch = useDispatch()
    
    const showModal = ()=>{
        dispatch({
            type: actionTypes.SHOW_MODAL,
            modalName: modalName,
            body: body,
          })
    }

    return {showModal}

}
