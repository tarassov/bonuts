import {connect} from 'react-redux'

import {authenticate}  from 'actions/authActions'
import Sideboard from "components/Sideboard"

const mapDispatchToProps = (dispatch) => {
    return {
    }
}


const  mapStateToProps = (state) => {
    return {
        authenticate: state.authenticate
    }
}

const SideboardContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Sideboard)


export default  SideboardContainer
