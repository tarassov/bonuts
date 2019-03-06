import React, { PropTypes,Component } from 'react'
import Typography from '@material-ui/core/Typography'
import {connect} from 'react-redux'
import {authenticate} from '../../actions/authActions'
import {loadUsers,sendPoints} from "actions/dashboardActions"
import Button from '@material-ui/core/Button';
import Store from 'components/store/Store'

const mapDispatchToProps = (dispatch) => {
    return {
      onShare: (amount, to_user_ids,comment) => {
          dispatch(sendPoints(amount, null, to_user_ids,comment))
      },
      loadUsers: () => {

        dispatch(loadUsers())
      },
    }
}


const  mapStateToProps = (state) => {
      return{
        dashboard: state.dashboard,
        profile: state.profile
      }
}



export default connect(mapStateToProps, mapDispatchToProps)(Store)
