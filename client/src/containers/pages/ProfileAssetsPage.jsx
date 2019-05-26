import React, {Component } from 'react'
import {connect} from 'react-redux'
import {loadUsers,sendPoints} from "actions/dashboardActions"
import List from 'components/list/list';

const mapDispatchToProps = (dispatch) => {
    return {

    }
}


const  mapStateToProps = (state) => {
      return{
        profile: state.profile
      }
}


const items = [
  {
    id: 1,
    value: 'item 1'
  },
  {
    id: 2,
    value: 'item2'
  }

]

class ProfileAssetsPage  extends  Component {

    componentDidMount() {

    }

    render() {

        return (
              <List
                items = {items}
              />
            )

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileAssetsPage)
