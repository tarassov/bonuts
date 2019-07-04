import {connect} from 'react-redux'
import AccountMenu from "components/menu/AccountMenu";
import {authenticate,logout,checkAuth}  from 'actions/authActions'
import {push } from 'connected-react-router'
import { stat } from 'fs';

const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (username,password) => {
            dispatch(authenticate(username,password))
        },
        onLogOut: () => {
            dispatch(logout())
        },
        onCheckAuth: () => {
            dispatch(checkAuth())
        },
        onLoginRedirect: () => {
            dispatch(push('/login'))
        },
        onRegisterRedirect: () => {
            dispatch(push('/register'))
        },
        onAccount: () => {
            dispatch(push('/account'))
        }
    }
}


const  mapStateToProps = (state,ownProps) => {
    return {
        authenticate: state.authenticate,
        location: ownProps.location,
        profile: state.profile
    }
}

const accountMenuStyle = connect(
    mapStateToProps,
    mapDispatchToProps
)(AccountMenu)


export default  accountMenuStyle
