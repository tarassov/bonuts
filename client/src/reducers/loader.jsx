import * as actionTypes from "../actions/actionTypes";
import pluralize from "pluralize";
const defaultState = { items: [], page: 0 };

export default function loader(state = defaultState, action, name) {
  let new_state
  switch (action.type) {
    case actionTypes.loadSuccess(pluralize.plural(name)):
      return {
        ...state,
        ...action,
        items: action.items,
        max_id:
          action.items !== undefined && action.items.length > 0
            ? action.items[0].id
            : null,
      };

    case actionTypes.addSuccess(name):
      new_state = { ...state, ...action, items: state.items };
      if (action.items !== undefined) {
        new_state = {
          ...new_state,
          items: new_state.items.concat(action.items),
        };
      }
      if (action.item !== undefined) {
        new_state = { ...new_state, items: [...new_state.items, action.item] };
      }
      return new_state;

    case actionTypes.addSuccess(pluralize.plural(name)):
      new_state = { ...state, ...action, items: state.items };
      if (action.items !== undefined) {
        new_state = {
          ...new_state,
          items: new_state.items.concat(action.items),
        };
      }
      if (action.item !== undefined) {
        new_state = { ...new_state, items: [...new_state.items, action.item] };
      }
      return new_state;

    case actionTypes.loadFailed(name):
      return {
        ...state,
      };

    case actionTypes.updateSuccess(name):
      var newItems = state.items.map((item) => {
        if (item.id === action.item.id) {
          return action.item;
        }
        return item;
      });
      console.log(newItems);
      if (newItems.length === 0) {
        newItems.push(action.item);
        console.log(newItems);
      }

      return {
        ...state,
        items: newItems,
        selected: action.item,
      };
    case actionTypes.deleteSuccess(name):
      return {
        ...state,
        items: state.items.filter(function (item, index, arr) {
          //return action.items.indexOf(item.id) == -1
          return action.item.id !== item.id;
        }),
      };
    case actionTypes.loadItemSuccess(name):
      return {
        ...state,
        loadedItem: action.item,
      };

    case actionTypes.loadItemFailed(name):
      return {
        ...state,
        loadItem: undefined,
      };

    case actionTypes.AUTHENTICATE_FAILED:
      return {
        ...defaultState,
      };

    case actionTypes.CLEAR_DATA:
      return {
        ...defaultState,
      };
    case actionTypes.LOG_OUT:
      return {
        ...defaultState,
      };

    default:
      return state;
  }
}
