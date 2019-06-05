import React, {Component } from 'react'
import {connect} from 'react-redux'
import {loadUsers,sendPoints} from "actions/dashboardActions"
import Button from '@material-ui/core/Button';
import SimpleFieldForm from 'components/forms/SimpleFieldForm'
import DynamicForm from 'components/forms/DynamicForm'
import GridItem from "components/grid/GridItem.jsx";
import GridContainer from "components/grid/GridContainer.jsx";
import StorePage from "containers/pages/StorePage"
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

    click = (values) => {
          let profile_ids =this.props.dashboard.profiles.map(profile=>profile.id)
          this.props.onShare(values.points, profile_ids,values.message)
    }
    render() {

       return (
           <GridContainer>
             <GridItem xs={12} sm={6} md={6}>
                  <DynamicForm
                     formId={"share_all"}
                     fields={[{name:"points"},{name:"message"}]}
                     submitCaption ={"Send to all"}
                     onSubmit={this.click.bind(this)}
                  />
              </GridItem>
               <GridItem xs={12} sm={6} md={6}>
                 <DynamicForm
                    formId={"activate_code"}
                    fields={[{name:"code"}]}
                    submitCaption ={"Activate"}
                 />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <StorePage/>
                </GridItem>
              </GridContainer>
            )

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage)
