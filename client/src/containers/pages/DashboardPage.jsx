import React, { PropTypes,Component } from 'react'
import Typography from '@material-ui/core/Typography'
import {connect} from 'react-redux'
import {authenticate} from '../../actions/authActions'
import  { Redirect } from 'react-router-dom'


const mapDispatchToProps = (dispatch) => {
    return {
        actions: {

        }
    }
}


const  mapStateToProps = (state) => {
  return {
      authenticate: state.authenticate
  }
}



class DashboardPage  extends  Component {
    constructor(props) {
        super(props);
    }

    render() {
      if(this.props.authenticate.authenticated) {
        return (
                <div>
                    DashboardPage
                </div>
            )

       }
       else
           return (
               <div>
                   <Redirect to='/'/>
               </div>
           )
     }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage)
