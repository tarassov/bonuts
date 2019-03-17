import React, { PropTypes,Component } from 'react'
import Typography from '@material-ui/core/Typography'
import {connect} from 'react-redux'
import {loadStore} from "actions/storeActions"
import Store from 'components/store/Store'

const mapDispatchToProps = (dispatch) => {
    return {
      loadStore: () => {
        dispatch(loadStore())
      },
    }
}


const  mapStateToProps = (state) => {
      return{
        dashboard: state.dashboard,
        profile: state.profile,
        store: state.store
      }
}



export default connect(mapStateToProps, mapDispatchToProps)(Store)
