import React, {Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Field, reduxForm } from 'redux-form'
import TextField from '@material-ui/core/TextField'
import loginFormStyle from 'assets/jss/components/loginFormStyle'


class LoginForm extends  Component {
    render() {
         const { classes} = this.props;

        return (
                <form onSubmit={this.props.handleSubmit} className={classes.container}>
                    <Field name="username"
                           component={TextField}
                           label = "Username"
                           placeholder="your email"
                           className={classes.textField}
                           id="username"/>
                    <br/>
                    <Field
                        name="password"
                        id ="password"
                        label="Password"
                        component={TextField}
                        type="password"
                        autoComplete="current-password"
                        className={classes.button}
                    />
                    <br/>
                     <Button
                        type="submit"
                        className={classes.textField}
                        color="primary"
                    >
                        Log In
                    </Button>
                </form>
        )
    }

}

LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
}

LoginForm = reduxForm({
    // a unique name for the form
    form: 'login'
})(LoginForm)

export default withStyles(loginFormStyle)(LoginForm);
