import React, { PropTypes,Component } from 'react'
import {connect} from 'react-redux'
import {loadStore} from "actions/storeActions"
import Store from 'components/store/Store'
import * as modalActions from "actions/modal/modalActions"
import * as modals from 'modals/modalList'

const mapDispatchToProps = (dispatch) => {
    return {
      loadStore: () => {
        dispatch(loadStore())
      },
      onAddItem: () => {
          dispatch(modalActions.showModal(modals.NEW_STORE_ITEM, {}))
      }
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
