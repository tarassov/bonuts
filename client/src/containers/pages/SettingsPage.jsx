import {connect} from 'react-redux'
import {loadUsers,sendPoints} from "actions/dashboardActions"
import Button from '@material-ui/core/Button';
import SimpleFieldForm from 'components/forms/SimpleFieldForm'
import Settings  from '../../layouts/Settings';
import { reset, reduxForm } from "redux-form";
import apis  from 'api/apiRoot'
import ListActions from "actions/listActions"

const mapDispatchToProps = (dispatch, props) => {
    return {
      onShare: (amount, profile_ids,comment,form_id) => {
          dispatch(sendPoints(amount, null, profile_ids,comment, true))
          dispatch(reset(form_id))
      },
      loadUsers: () => {

        dispatch(loadUsers())
      },

      onActivate: (code,form_id) => {
        let actions = new ListActions(apis.regards)
        dispatch(actions.updateItem({public_uid:code, status: 2}))
        //dispatch(reset(form_id))
      }
    }
}


const  mapStateToProps = (state) => {
      return{
        dashboard: state.dashboard,
        profile: state.profile
      }
}



export default connect(mapStateToProps, mapDispatchToProps)(Settings)
