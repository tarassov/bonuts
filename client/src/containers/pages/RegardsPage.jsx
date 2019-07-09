import React, {Component } from 'react'
import {connect} from 'react-redux'
import {loadRegards} from "actions/regardsActions"
import Regards from "layouts/Regards"
import {push} from 'connected-react-router'

import * as modalActions from "actions/modal/modalActions"
import * as modals from 'modals/modalList'
const mapDispatchToProps = (dispatch) => {
    return {
      loadRegards: () => {
        dispatch(loadRegards(1))
      },
      onPrint: (regard) => {
        dispatch(modalActions.showModal(modals.REGARDS_PRINT, {public_uid: regard.public_uid, title: regard.values[0], name: regard.name}))
      },
      onRedirectToStore: () => {
        dispatch(push('userstore'));
      },
      onRequest: (regard) => {
        
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
