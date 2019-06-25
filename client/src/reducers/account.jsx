import * as actionTypes from "actions/profile/actionTypes";
import * as actions from "actions/actionTypes";
export default function profile(state = {loaded: false,isLoading: false, data:{loaded:true}}, action) {
    switch (action.type) {
      case actionTypes.LOAD_ACCOUNT_SUCCESS:
          return {
              ...state,
              username: action.item.name,
              email: action.item.email,
              fullname: action.item.fullname,
              last_name: action.item.last_name,
              first_name: action.item.first_name,
              sex: action.item.sex,
              department: action.department,
              id: action.item.id,
              user_not_found: action.user_not_found,
              loaded: true,
              data:  {
                ...state.data,
                username: action.item.name,
                email: action.item.email,
                fullname: action.item.fullname,
                last_name: action.item.last_name,
                first_name: action.item.first_name,
                sex: action.item.sex,
                department: action.department,
                id: action.item.id,
                user_not_found: action.user_not_found,
                loaded: true,
              }
          }
      case actionTypes.LOAD_ACCOUNT_FAILED:
        return{
              ...state,
              user_not_found: action.user_not_found,
              loaded: false
        }
      case actionTypes.SAVE_ACCOUNT_SUCCESS:
          console.log(action)
          return {
              ...state,
              username: action.profile.name,
              email: action.profile.email,
              fullname: action.profile.fullname,
              last_name: action.profile.last_name,
              first_name: action.profile.first_name,
              department: action.profile.department,
              sex: action.profile.sex,
              loaded: true
          }
        case actions.getActionName('load','account','start'):
            return{
                ...state,
                isLoading: true
            }
        case actions.getActionName('load','account','end'):
            return{
                ...state,
                isLoading: false
            }    
        case actions.getActionName('save','account','start'):
            return{
                ...state,
                isLoading: true
            }
        case actions.getActionName('save','account','end'):
            return{
                ...state,
                isLoading: false
            }    
        default:
            return state;
    }
}
