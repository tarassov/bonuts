import {connect} from 'react-redux'
import {loadUsers,sendPoints} from "actions/dashboardActions"
import * as modalActions from "actions/modal/modalActions"
import * as modals from 'modals/modalList'
import Settings  from '../../layouts/Settings';
import { reset, reduxForm } from "redux-form";
import apis  from 'api/apiRoot'
import ListActions from "actions/listActions"
import * as notifierActions from "actions/notifierActions"
import * as tenantActions from 'actions/tenantActions'
import {migrateAvatars,saveLogo,saveTenant} from 'actions/tenantActions'



const mapDispatchToProps = (dispatch, props) => {
    return {
      onShare: (amount, profile_ids,comment,form_id,burn_old) => {
          dispatch(sendPoints(amount, null, profile_ids,comment, true,true,burn_old))
          dispatch(reset(form_id))
      },
      loadUsers: () => {
        dispatch(loadUsers())
      },

      loadTenant: () => {
        dispatch(tenantActions.loadTenant())
      },

      onSaveTenant: (tenant) => {
        dispatch(saveTenant(tenant))
    },

      onSchedulerAdd: () => {
        dispatch(modalActions.showModal(modals.EDIT_SCHEDULER, {}))
      },

      onSchedulerEdit: (item) => {
        dispatch(modalActions.showModal(modals.EDIT_SCHEDULER, item))
      },
      
      onSchedulerDelete: (item) => {
       // dispatch(modalActions.showModal(modals.EDIT_SCHEDULER, {item}))
      },
      
      loadPlugins: () => {
        let actions = new ListActions(apis.plugins)
        dispatch(actions.loadItems())
      },

      onPluginEdit: (item) =>{
        dispatch(modalActions.showModal(modals.EDIT_PLUGIN, item))
      },
      
      loadSchedulers: () => {
        let actions = new ListActions(apis.schedulers)
        dispatch(actions.loadItems())
      },
      migrateAvatars: () => {
        dispatch(migrateAvatars())
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
        schedulers: state.schedulers,
        plugins: state.plugins,
      }
}



export default connect(mapStateToProps, mapDispatchToProps)(Settings)
