import * as actionTypes from "../actions/actionTypes";
export default function authenticate(state = {authenticated: false}, action) {
    switch (action.type) {

        case actionTypes.AUTHENTICATE_SUCCESS:
            return  {
                authenticated: true,
                username: action.username,
                token: action.token
            }

        case actionTypes.AUTHENTICATE_FAILED:
            return  {
                authenticated: false,
            }
        case actionTypes.LOG_OUT:
            return  {
                authenticated: false,
                username:null,
                token:null
            }
        case actionTypes.REGISTER_SUCCESS:
            return {
                authenticated:true,
                username:  action.user.email,
                token: action.token
            }

        case actionTypes.REGISTER_FAILED:
            return {
                authenticated:false,
                username:  null,
                token: null
            }


        default:
            return state;
    }
}
