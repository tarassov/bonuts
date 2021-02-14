import React, { Component } from 'react'
import PropTypes from 'prop-types';
import  RegisterForm from 'components/forms/register/RegisterForm'
import registerFormStyle from 'assets/jss/components/registerFormStyle'
import { Typography, Button } from '@material-ui/core';
import  { Redirect } from 'react-router-dom'
import { withTranslation, Trans } from "react-i18next";
import { withStyles } from '@material-ui/core/styles';

class Register  extends  Component {
    constructor(props) {
        super(props);
        this.state ={
            values:{}
        }
    }

    componentWillMount() {
        this.props.newRegister()
    }

    submit = values => {
        this.setState({values: values})
        let domain  = values.email.replace(/.*@/, "")
        this.props.onFindTenant(domain)
        //this.props.onRegister(values)
    }

    reset =(form_name) => {
       this.setState({values:{}})
       this.props.onReset()   

    }

    register = () => {
        this.props.onRegister({...this.state.values, tenant: this.props.profile.tenant})
    }


    render() {
        const {authenticate,profile,classes} = this.props

        if(authenticate && !authenticate.authenticated && !authenticate.registered) {

              return (
                  <div  className={classes.container}>
                      {profile.tenant_loaded && <div className={classes.content}>
                      <Typography variant="button" className={classes.caption}> {profile.tenant.caption}</Typography>
                            <Button className={classes.button} variant="outlined" color="primary"  onClick={this.register}>
                                <Typography variant="button"><Trans>Connect to space</Trans></Typography>
                            </Button>
                            <Button className={classes.cancelButton} variant="outlined" onClick={this.reset}>
                                <Typography variant="button"><Trans>Cancel</Trans></Typography>
                            </Button>
                          </div>}
                      {!profile.tenant_loaded && 
                        <RegisterForm onSubmit ={this.submit} onReset = {this.reset} authenticate ={this.props.authenticate} profile ={this.props.profile}/>
                      }
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

Register.propTypes = {
    onFindTenant: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
    onRegister: PropTypes.func.isRequired,
  };

export default withStyles(registerFormStyle)(withTranslation()(Register))