import React, {Component } from 'react'
import {connect} from 'react-redux'
import {loadUsers,sendPoints} from "actions/dashboardActions"
import List from 'components/list/list';
import Edit from "@material-ui/icons/Edit";
import Trophies from "components/profile/Trophies"
const mapDispatchToProps = (dispatch) => {
    return {

    }
}


const  mapStateToProps = (state) => {
      return{
        profile: state.profile
      }
}



export default connect(mapStateToProps, mapDispatchToProps)(Trophies)
