import {connect} from 'react-redux'
import {loadDistribBalance}  from 'actions/profile/profileActions'
import AccountBalance from "components/AccountBalance";

const mapDispatchToProps = (dispatch) => {
    return {
        getBalance: (profile) => {
            dispatch(loadDistribBalance(profile))
        }
    }
}


const  mapStateToProps = (state) => {
    return {
        authenticate: state.authenticate,
        profile: state.profile,
        title: "Distrib account"
    }
}

const DistribAccountContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AccountBalance)


export default  DistribAccountContainer
