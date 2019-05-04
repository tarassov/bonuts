import {connect} from 'react-redux'
import {loadSelfBalance}  from 'actions/profile/profileActions'
import AccountBalance from "components/AccountBalance";

const mapDispatchToProps = (dispatch) => {
    return {
        getBalance: (profile) => {
            dispatch(loadSelfBalance(profile.id))
        },
        onShop: () => {
            //dispatch(modalActions.showModal(modals.SHARE_DIALOG, {}))
        }
    }
}


const  mapStateToProps = (state) => {
    return {
        authenticate: state.authenticate,
        profile: state.profile,
        balance: state.profile.self_balance,
        title: "Self account",
        shareable: false,
        shopable: true,
    }
}

const SelfAccountContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AccountBalance)


export default  SelfAccountContainer
