import React, { PropTypes,Component } from 'react'
import {connect} from 'react-redux'
import ListActions from 'actions/listActions';
import apis from 'api/apiRoot'

import { EventLayout } from 'layouts/EventLayout';

const mapDispatchToProps = (dispatch, props) => {
    return {
        loadEvent: () => {
            let listAction = new ListActions(apis.account_log)
            dispatch(listAction.loadItems({id: props.match.params.id}))
        }
    }
}


const  mapStateToProps = (state) => {
      return{
           profile: state.profile,
      }
}


export default connect(mapStateToProps, mapDispatchToProps)(EventLayout)