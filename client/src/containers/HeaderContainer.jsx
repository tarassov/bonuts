import {connect} from 'react-redux'
import {loadProfile,loadDistribBalance,loadSelfBalance} from 'actions/profile/profileActions'
import Header from "components/Header"

const mapDispatchToProps = (dispatch) => {
    return {
        loadProfile: () => {
            dispatch(loadProfile())
        },
    }
}


const  mapStateToProps = (state,ownProps) => {
    return {
        authenticate: state.authenticate,
        profile: state.profile,
        routes: ownProps.routes
    }
}

const HeaderContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Header)


export default  HeaderContainer
