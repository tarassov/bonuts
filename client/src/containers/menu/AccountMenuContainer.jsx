import {connect} from 'react-redux'
import AccountMenu from "components/menu/AccountMenu";
import {authenticate,logout,checkAuth}  from 'actions/authActions'
import {push } from 'connected-react-router'

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


const  mapStateToProps = (state) => {
    return {
        authenticate: state.authenticate
    }
}

const accountMenuStyle = connect(
    mapStateToProps,
    mapDispatchToProps
)(AccountMenu)


export default  accountMenuStyle