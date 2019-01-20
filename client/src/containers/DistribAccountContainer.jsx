import {connect} from 'react-redux'
import {loadDistribBalance}  from 'actions/profile/profileActions'
import * as modalActions from "actions/modal/modalActions"
import AccountBalance from "components/AccountBalance";
import * as modals from 'modals/modalList'

const mapDispatchToProps = (dispatch) => {
    return {
        getBalance: (profile) => {
            dispatch(loadDistribBalance(profile.distrib_account.id))
        },
        onShare: () => {
            dispatch(modalActions.showModal(modals.SHARE_DIALOG, {}))
        }
    }
}


const  mapStateToProps = (state) => {
    return {
        authenticate: state.authenticate,
        profile: state.profile,
        balance: state.profile.distrib_balance,
        title: "Distrib account",
        shareable: true,
        shopable: false,
    }
}

const DistribAccountContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AccountBalance)


export default  DistribAccountContainer
