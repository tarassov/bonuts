import {connect} from 'react-redux'
import {loadUsers,sendPoints} from "actions/dashboardActions"
import Button from '@material-ui/core/Button';
import SimpleFieldForm from 'components/forms/SimpleFieldForm'
import Settings  from '../../layouts/Settings';
import { reset, reduxForm } from "redux-form";
import apis  from 'api/apiRoot'
import ListActions from "actions/listActions"
import * as notifierActions from "actions/notifierActions"
import {migrateAvatars,saveLogo} from 'actions/tenantActions'

const activateCallback = (acivate_form_id) => {
  return {
      success: (dispatch,response) => {
        dispatch(notifierActions.enqueueSnackbar({
          message: 'Regard activated',
          options: {
              variant: 'success',
          }
        })      
        )
        dispatch(reset(acivate_form_id))
      }
    }
  }


const mapDispatchToProps = (dispatch, props) => {
    return {
      onShare: (amount, profile_ids,comment,form_id,burn_old) => {
          dispatch(sendPoints(amount, null, profile_ids,comment, true,true,burn_old))
          dispatch(reset(form_id))
      },
      loadUsers: () => {

        dispatch(loadUsers())
      },

      loadSchedulers: () => {
        let actions = new ListActions(apis.schedulers)
        dispatch(actions.loadItems())
      },
      migrateAvatars: () => {
        dispatch(migrateAvatars())
      },
      onActivate: (code,form_id) => {
        let actions = new ListActions(apis.regards)
        dispatch(actions.updateItem({public_uid:code, status: 2},activateCallback(form_id)))
      },
      saveLogo: (payLoad) => {
        dispatch(saveLogo(payLoad))
    }
    }
}


const  mapStateToProps = (state) => {
      return{
        dashboard: state.dashboard,
        profile: state.profile,
        schedulers: state.schedulers
      }
}



export default connect(mapStateToProps, mapDispatchToProps)(Settings)
