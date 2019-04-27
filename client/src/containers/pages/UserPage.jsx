import React, {Component } from 'react'
import {connect} from 'react-redux'
import {loadUsers,sendPoints} from "actions/dashboardActions"
import Button from '@material-ui/core/Button';

const mapDispatchToProps = (dispatch) => {
    return {
      onShare: (amount, profile_ids,comment) => {
          dispatch(sendPoints(amount, null, profile_ids,comment))
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



class UserPage  extends  Component {

    componentDidMount() {
        this.props.loadUsers();
    }

    click = () => {
          let profile_ids =this.props.dashboard.profiles.map(profile=>profile.id)
          this.props.onShare(10, profile_ids,'happy new year')
    }
    render() {
        console.log('User Page')
        return (
                <div>
                  <Button onClick={this.click} color="secondary" >
                      Share all 10 points
                  </Button>
                </div>
            )

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPage)
