import * as actionTypes from "actions/modal/actionTypes";

export default function modal(state = {show: false, modalName: null, body: null}, action) {
    switch (action.type) {

        case actionTypes.SHOW_MODAL:
            return  {
                show: true,
                modalName: action.modalName,
                body: action.body
            }

        case actionTypes.HIDE_MODAL:
            return  {
                show: false,
                modalName: null,
                body: null
            }
        default:
            return state
    }
}
