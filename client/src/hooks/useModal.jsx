import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import * as actionTypes from "actions/modal/actionTypes";

export function useModal(modalName){
    const dispatch = useDispatch()
    
    const showModal = (body)=>{
        dispatch({
            type: actionTypes.SHOW_MODAL,
            modalName: modalName,
            body: body,
          })
    }

    return {showModal}

}
