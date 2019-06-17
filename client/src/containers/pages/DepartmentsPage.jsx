import React, {Component } from 'react'
import {connect} from 'react-redux'
import ListActions from "actions/listActions"
import * as modalActions from "actions/modal/modalActions"
import * as modals from 'modals/modalList'
import apis  from 'api/apiRoot'
import Departments from '../../layouts/Departments';
const mapDispatchToProps = (dispatch) => {
    return {
      loadItems: () => {
          let actions = new ListActions(apis.departments)
          dispatch(actions.loadItems())
      },

      onAdd: () => {
        dispatch(modalActions.showModal(modals.EDIT_DEPARTMENT, {}))
      },

      onDelete:()=> {

      }
    }
}


const  mapStateToProps = (state) => {
      return{
        profile: state.profile,
        departments: state.departments
      }
}



export default connect(mapStateToProps, mapDispatchToProps)(Departments)
