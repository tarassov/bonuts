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



class UserPage  extends  Component {
    constructor(props) {
        super(props);
    }



    render() {
        console.log('User Page')
        return (
                <div>
                    User Page
                </div>
            )

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPage)
