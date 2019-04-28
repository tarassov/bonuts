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
    case actionTypes.updateItemSuccess(name):
      return {
          ...state,
          items: state.items.map(item => {
                    if (item.id == action.item.id){
                      return action.item
                    }
                    return item
                })
      }
    case actionTypes.removeItemSuccess(name):
      console.log(actionTypes.removeItemSuccess(name))
      console.log(action.item)
      return {
        ...state,
        items: state.items.filter(function(item,index,arr){
          //return action.items.indexOf(item.id) == -1
          return action.item.id != item.id
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
