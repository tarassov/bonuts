import {connect} from 'react-redux'

import Header from "components/Header"

const mapDispatchToProps = (dispatch) => {
    return {
    }
}


const  mapStateToProps = (state,ownProps) => {
    return {
        authenticate: state.authenticate,
        profile: state.account,
        routes: ownProps.routes
    }
}

const HeaderContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Header)


export default  HeaderContainer
