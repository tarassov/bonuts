import React, {Component } from 'react'
import {connect} from 'react-redux'
import Regards from "layouts/Regards"
import {push} from 'connected-react-router'
import ListActions from 'actions/listActions';
import apis from 'api/apiRoot'

import * as modalActions from "actions/modal/modalActions"
import * as modals from 'modals/modalList'
const mapDispatchToProps = (dispatch, props) => {
    return {
      loadRegards: (page) => {
        let listAction = new ListActions(apis.regards)
        dispatch(listAction.loadItems({id: props.match.params.id, page}))
      },
      onPrint: (regard) => {
        dispatch(modalActions.showModal(modals.REGARDS_PRINT, {public_uid: regard.public_uid, title: regard.values[0], name: regard.name}))
      },
      onRedirectToStore: () => {
        dispatch(push('donuts'));
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
