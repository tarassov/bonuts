import React, {Component } from 'react'
import {connect} from 'react-redux'

import * as modalActions from "actions/modal/modalActions"
import * as modals from 'modals/modalList'
import Departments from '../../layouts/Departments';
const mapDispatchToProps = (dispatch) => {
    return {
      loadDepartments: () => {

      },

      onAdd: () => {

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
