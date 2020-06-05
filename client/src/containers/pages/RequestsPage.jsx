import React, { PropTypes,Component } from 'react'
import {connect} from 'react-redux'
import {loadStore, showItem, updateItem} from "actions/storeActions"
import Store from 'components/store/Store'
import * as assetActions from "actions/assetActions"
import * as modals from 'modals/modalList'
import apis  from 'api/apiRoot'
import * as storeActions from "actions/storeActions"
import ListActions from 'actions/listActions';
import Donuts from 'layouts/Donuts';

const mapDispatchToProps = (dispatch) => {
    return {
      loadItems: () => {
        let actions  = new ListActions(apis.donuts)
        dispatch(actions.loadItems())
      },
      onBuy: (item) => {
        dispatch(assetActions.buyAsset(item))
      }
    }
}


const  mapStateToProps = (state) => {
      return{
        dashboard: state.dashboard,
        profile: state.profile,
        donuts: state.donuts
      }
}



export default connect(mapStateToProps, mapDispatchToProps)(Donuts)
