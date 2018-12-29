import {connect} from 'react-redux'

import {authenticate}  from 'actions/authActions'
import Header from "components/Header"

const mapDispatchToProps = (dispatch) => {
    return {
    }
}


const  mapStateToProps = (state) => {
    return {
        authenticate: state.authenticate
    }
}

const HeaderContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Header)


export default  HeaderContainer
