import React, {Component } from 'react'
import {connect} from 'react-redux'
import {loadProfiles} from "actions/profile/profileActions"
import Regards from "layouts/Regards"
import {push} from 'connected-react-router'

import * as modalActions from "actions/modal/modalActions"
import * as modals from 'modals/modalList'
import Profiles from 'layouts/Profiles';
import ListActions from 'actions/listActions';
import apis  from 'api/apiRoot'
import { stat } from 'fs';
const mapDispatchToProps = (dispatch) => {
    return {
      loadProfiles: () => {
        let listActions = new ListActions(apis.profiles)
        dispatch(listActions.loadItems())
        listActions = new ListActions(apis.departments)
        dispatch(listActions.loadItems())
      },
      onEdit: (regard) => {
        //dispatch(modalActions.showModal(modals.REGARDS_PRINT, {public_uid: regard.public_uid, title: regard.values[0], name: regard.name}))
      },
     
    }
}


const  mapStateToProps = (state) => {
      return{
        profiles: state.profiles,
        departments: state.departments
      }
}



export default connect(mapStateToProps, mapDispatchToProps)(Profiles)
