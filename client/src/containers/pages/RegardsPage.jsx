import React, {Component } from 'react'
import {connect} from 'react-redux'
import {loadRegards} from "actions/regardsActions"
import Edit from "@material-ui/icons/Edit";
import Regards from "components/profile/Regards"
const mapDispatchToProps = (dispatch) => {
    return {
      loadRegards: () => {
        dispatch(loadRegards(1))
      },
    }
}


const  mapStateToProps = (state) => {
      return{
        profile: state.profile,
        regards: state.regards
      }
}



export default connect(mapStateToProps, mapDispatchToProps)(Regards)
