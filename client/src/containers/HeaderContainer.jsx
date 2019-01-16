import {connect} from 'react-redux'

import {authenticate}  from 'actions/profile/profileActions'
import Header from "components/Header"

const mapDispatchToProps = (dispatch) => {
    return {
    }
}


const  mapStateToProps = (state) => {
    return {
        authenticate: state.authenticate,
        profile: state.profile
    }
}

const HeaderContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Header)


export default  HeaderContainer
