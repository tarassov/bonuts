import React, { PropTypes,Component } from 'react'
import Typography from '@material-ui/core/Typography'
import LoginForm from 'components/forms/LoginForm'
import {connect} from 'react-redux'
import {authenticate} from '../../actions/authActions'
import {hideModal} from 'actions/modal/modalActions'
import  { Redirect } from 'react-router-dom'


const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            onLogin: (username,password) => {
                dispatch(authenticate(username,password))
            },
            hideModal: () =>{
                dispatch(hideModal)
            }
        }
    }
}


const  mapStateToProps = (state) => {
    return {
        authenticate: state.authenticate,
        modal: state.modal
    }
}



class LoginPage  extends  Component {
    constructor(props) {
        super(props);
    }
    submit = values => {
      console.log(values)
        this.props.actions.onLogin(values.username, values.password)
    }

    render() {
        return (
            <div>
                <LoginForm onSubmit ={this.submit} authenticate ={this.props.authenticate}/>
            </div>
        )
    }
    /*render() {
        if(!this.props.authenticate || !this.props.authenticate.authenticated) {
            return (
                <div>
                    <LoginForm onSubmit ={this.submit} authenticate ={this.props.authenticate}/>
                </div>
            )
        }
        else {
            if (this.props.modal !== undefined && this.props.modal.show){
                this.props.hideModal()
            }
            return (
                <div>
                    <Redirect to='/'/>
                </div>
            )
        }
    }*/
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
