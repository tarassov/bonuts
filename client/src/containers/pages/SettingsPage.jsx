import React, {Component } from 'react'
import {connect} from 'react-redux'
import {loadUsers,sendPoints} from "actions/dashboardActions"
import Button from '@material-ui/core/Button';
import SimpleFieldForm from 'components/forms/SimpleFieldForm'
import DynamicForm from 'components/forms/DynamicForm'

const mapDispatchToProps = (dispatch) => {
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



class SettingsPage  extends  Component {

    componentDidMount() {
        this.props.loadUsers();
    }

    click = () => {
          let profile_ids =this.props.dashboard.profiles.map(profile=>profile.id)
          this.props.onShare(10, profile_ids,'happy new year')
    }
    render() {

       return (
                <div>
                  <DynamicForm
                     formId={"share_all"}
                     fields={[{name:"points"}]}
                     submitCaption ={"send to all"}
                     onSubmit={this.click.bind(this)}
                  />
                 <DynamicForm
                    formId={"activate_code"}
                    fields={[{name:"code"}]}
                    submitCaption ={"activate"}
                 />
                </div>
            )

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage)
