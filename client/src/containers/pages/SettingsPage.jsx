import {connect} from 'react-redux'
import {loadUsers,sendPoints} from "actions/dashboardActions"
import Button from '@material-ui/core/Button';
import SimpleFieldForm from 'components/forms/SimpleFieldForm'
import Settings  from '../../layouts/Settings';
const mapDispatchToProps = (dispatch, props) => {
    return {
      onShare: (amount, profile_ids,comment) => {
          dispatch(sendPoints(amount, null, profile_ids,comment, true))
      },
      loadUsers: () => {

        dispatch(loadUsers())
      },
    }
}


const  mapStateToProps = (state) => {
      return{
        dashboard: state.dashboard,
        profile: state.profile
      }
}



export default connect(mapStateToProps, mapDispatchToProps)(Settings)
