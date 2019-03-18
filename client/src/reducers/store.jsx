import * as actionTypes from "../actions/actionTypes";

const defaultState ={items: [], page:0}
const ddd ={items: [], page:0}
let name ='STORE'

export default function loader(state = defaultState, action) {
  switch (action.type) {
    case  "LOAD_STORE_SUCCESS":
     return {
       ...state,
       ...action,
       items: [...state.items, ...action.items],
       max_id: (action.items!==undefined && action.items.length > 0 )? action.items[0].id: null
     }

    case "LOAD_STORE_FAILED":
        return {
            ...state
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
