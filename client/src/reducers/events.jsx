import * as actionTypes from "../actions/actionTypes";

const defaultState ={items: [], page:0}


export default function events(state = defaultState, action) {
  switch (action.type) {
      case actionTypes.LOAD_EVENTS_SUCCESS:
        return {
            ...state,
            ...action,
            max_id: (action.items!==undefined)? action.items[0].id: null
        }
    case actionTypes.ADD_EVENTS_SUCCESS:
     console.log(action)
     return {
       ...state,
       ...action,
       items: [...state.items, ...action.items]
     }

    case actionTypes.LOAD_EVENTS_FAILED:
        return {
            ...state,
        }
      case actionTypes.AUTHENTICATE_FAILED:
          return  {
              ...defaultState
          }
      case actionTypes.LOG_OUT:
          return  {
            ...defaultState
          }

    default:
        return state
  }
}
