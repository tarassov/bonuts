import React, {Component } from 'react'
import {connect} from 'react-redux'
import {loadRegards} from "actions/regardsActions"
import Edit from "@material-ui/icons/Edit";
import Regards from "components/profile/Regards"
import * as modalActions from "actions/modal/modalActions"
import * as modals from 'modals/modalList'
const mapDispatchToProps = (dispatch) => {
    return {
      loadRegards: () => {
        dispatch(loadRegards(1))
      },
      onPrint: (regard) => {
        dispatch(modalActions.showModal(modals.REGARDS_PRINT, {uid: regard.uid, regard: regard.title}))
    }
    }
}


const  mapStateToProps = (state) => {
      return{
        profile: state.profile,
        regards: state.regards
      }
}



export default connect(mapStateToProps, mapDispatchToProps)(Regards)
