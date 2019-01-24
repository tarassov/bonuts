import React, { PropTypes,Component } from 'react'
import Typography from '@material-ui/core/Typography'
import  RegisterForm from 'components/forms/register/RegisterForm'
import {connect} from 'react-redux'
import {register} from 'actions/authActions'
import  { Redirect } from 'react-router-dom'
import { translate, Trans } from "react-i18next";

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
        this.props.actions.onRegister(values)
    }

    render() {
        const {authenticate} = this.props

        if(!authenticate || !authenticate.authenticated) {
            if(authenticate.registered && !authenticate.confirmed) {
              return (
              <div>
                   <Typography variant="display3" align="center" color="textPrimary" gutterBottom>
                          <Trans>Confirmation email was sent to</Trans>  {authenticate.email}
                   </Typography>
               </div>
             )
            }else {
              return (
                  <div>
                      <RegisterForm onSubmit ={this.submit} authenticate ={this.props.authenticate}/>
                  </div>
            )}
        }
        else
            return (
                <div>
                    <Redirect to='/'/>
                </div>
            )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(translate()(RegisterPage))
