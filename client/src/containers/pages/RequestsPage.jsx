import React, { PropTypes,Component } from 'react'
import {connect} from 'react-redux'
import {loadStore, showItem, updateItem} from "actions/storeActions"
import Store from 'components/store/Store'
import * as assetActions from "actions/assetActions"
import * as modals from 'modals/modalList'
import apis  from 'api/apiRoot'
import * as storeActions from "actions/storeActions"
import ListActions from 'actions/listActions';
import Requests from 'layouts/Requests';

const mapDispatchToProps = (dispatch) => {
    return {
      loadItems: () => {
        //let actions  = new ListActions(apis.regards)
       // dispatch(actions.loadItems())
      },     
    }
}


const  mapStateToProps = (state) => {
      return{
        requests: state.requests,     
      }
}



export default connect(mapStateToProps, mapDispatchToProps)(Requests)
