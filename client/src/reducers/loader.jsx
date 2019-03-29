import * as actionTypes from "../actions/actionTypes";

const defaultState ={items: [], page:0}


export default function loader(state = defaultState, action, name) {
  switch (action.type) {
    case actionTypes.loadSuccess(name):
     return {
       ...state,
       ...action,
       items: action.items,
       max_id: (action.items!==undefined && action.items.length > 0 )? action.items[0].id: null
     }

    case actionTypes.addSuccess(name):
      return {
        ...state,
        items: [...state.items, action.item]
      }


    case actionTypes.loadFailed(name):
      return {
          ...state
      }
    case actionTypes.saveItemSuccess(name):
      return {

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
