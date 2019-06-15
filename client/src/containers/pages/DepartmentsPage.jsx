import React, {Component } from 'react'
import {connect} from 'react-redux'
import * as actions from "actions/listActions"
import * as modalActions from "actions/modal/modalActions"
import * as modals from 'modals/modalList'
import apis  from 'api/apiRoot'
import Departments from '../../layouts/Departments';
const mapDispatchToProps = (dispatch) => {
    return {
      loadItems: () => {
          dispatch(actions.loadItems(apis.departments))
      },

      onAdd: () => {
        dispatch(modalActions.showModal(modals.NEW_DEPARTMENT, {}))
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
