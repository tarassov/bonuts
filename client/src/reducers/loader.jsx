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
      let new_state = {...state,...action, items: state.items}
      if (action.items !== undefined)  {
        new_state = {...new_state, items: new_state.items.concat(action.items)}
      }
      if (action.item !== undefined) {
        new_state = {...new_state, items: [...new_state.items, action.item]}
      }
      return new_state

    case actionTypes.loadFailed(name):
      return {
          ...state
      }
    case actionTypes.updateSuccess(name):
      return {
          ...state,
          items: state.items.map(item => {
                    if (item.id === action.item.id){
                      return action.item
                    }
                    return item
                })
      }
    case actionTypes.deleteSuccess(name):
      return {
        ...state,
        items: state.items.filter(function(item,index,arr){
          //return action.items.indexOf(item.id) == -1
          return action.item.id !== item.id
        })
      }
    case actionTypes.loadItemSuccess(name):
      return {
        ...state,
        loadedItem: action.item
      }

    case  actionTypes.loadItemFailed(name):
      return {
        ...state,
        loadItem: undefined
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
