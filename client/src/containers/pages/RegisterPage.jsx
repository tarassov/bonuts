import React, { PropTypes,Component } from 'react'
import Typography from '@material-ui/core/Typography'
import  RegisterForm from 'components/forms/register/RegisterForm'
import {connect} from 'react-redux'
import {register} from 'actions/authActions'
import  { Redirect } from 'react-router-dom'


const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            onRegister: (registerValues) => {
                dispatch(register(registerValues))
            },
        }
    }
}


const  mapStateToProps = (state) => {
    return {
        authenticate: state.authenticate
    }
}



class RegisterPage  extends  Component {
    constructor(props) {
        super(props);
    }

    submit = values => {
        console.log(values)
        this.props.actions.onRegister(values)
    }

    render() {
        if(!this.props.authenticate || !this.props.authenticate.authenticated) {
            return (
                <div>
                    <RegisterForm onSubmit ={this.submit} authenticate ={this.props.authenticate}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage)
