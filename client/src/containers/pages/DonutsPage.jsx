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
import * as notifierActions from "actions/notifierActions"

const buyCallBack = {
        success: (dispatch,response) => {
        dispatch(notifierActions.enqueueSnackbar({
          message: 'Donut added',
          options: {
              variant: 'success',
          }
        })      
        )       
      }
    }
  

const mapDispatchToProps = (dispatch) => {
    return {
      loadItems: () => {
        let actions  = new ListActions(apis.donuts)
        dispatch(actions.loadItems())
      },
      onBuy: (item) => {
        let listAction = new ListActions(apis.regards)
        dispatch(listAction.addItem({donut_id: item.id},buyCallBack))
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
