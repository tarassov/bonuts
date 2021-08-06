import React from 'react'
import {connect} from 'react-redux'
import * as notifierActions from "actions/notifierActions"
import apis  from 'api/apiRoot'
import ListActions from 'actions/listActions';
import Requests from 'layouts/Requests';



const activateCallback = () => {
  return {
      success: (dispatch,response) => {
        dispatch(notifierActions.enqueueSnackbar({
          message: 'Regard activated',
          options: {
              variant: 'success',
          }
        })      
        )
      }
    }
  }


const mapDispatchToProps = (dispatch) => {
    return {
      loadItems: () => {
        let actions  = new ListActions(apis.requests)
        dispatch(actions.loadItems())
      },    
      onActivate: (item) => {
        let actions = new ListActions(apis.requests)
        dispatch(actions.updateItem({public_uid:item.public_uid, status: 2},activateCallback()))
      }, 
    }
}


const  mapStateToProps = (state) => {
      return{
        requests: state.requests,     
      }
}



export default connect(mapStateToProps, mapDispatchToProps)(Requests)
