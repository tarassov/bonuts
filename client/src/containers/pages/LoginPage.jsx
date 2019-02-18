import React, { PropTypes,Component } from 'react'
import Typography from '@material-ui/core/Typography'
import LoginForm from 'components/forms/LoginForm'
import {connect} from 'react-redux'
import {authenticate} from '../../actions/authActions'
import {recoverPassword} from '../../actions/profile/profileActions'
import {hideModal} from 'actions/modal/modalActions'
import  { Redirect } from 'react-router-dom'
import RecoverForm from 'components/forms/RecoverForm'

const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            onLogin: (username,password) => {
                dispatch(authenticate(username,password))
            },
            hideModal: () =>{
                dispatch(hideModal)
            },
            onRecoverPassword: (email) => {
              dispatch(recoverPassword(email))
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
        this.state = {
          recoverMode: false
        }
    }
    submit = values => {
      console.log(values)
        this.props.actions.onLogin(values.username, values.password)
    }

    recoverModeToggle = () => {
      console.log('toggle')
      this.setState({recoverMode: !this.state.recoverMode})
    }

    sendRecoverEmail = values => {
        this.props.actions.onRecoverPassword(values.email)
    }

    render() {

       if (this.state.recoverMode) {
         return (
            <div>
              <RecoverForm onSubmit ={this.sendRecoverEmail}/>
            </div>
          )
       }
        return (
            <div>
                <LoginForm onSubmit ={this.submit} recoverToggle = {this.recoverModeToggle.bind(this)} authenticate ={this.props.authenticate}/>
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
