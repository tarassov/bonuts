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

}



class DashboardPage  extends  Component {
    constructor(props) {
        super(props);
    }



    render() {
        console.log('DashboardPage')
        return (
                <div>
                    DashboardPage
                </div>
            )

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage)
