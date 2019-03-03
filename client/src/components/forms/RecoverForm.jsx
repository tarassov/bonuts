import React, {Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Field, reduxForm } from 'redux-form'
import TextField from '@material-ui/core/TextField'
import loginFormStyle from 'assets/jss/components/loginFormStyle'
import {renderTextField,renderCheckbox} from 'components/forms/common/render'
import { translate, Trans} from "react-i18next";

class RecoverForm extends  Component {
    render() {
         const { classes,t} = this.props;
        return (
                <form onSubmit={this.props.handleSubmit} className={classes.container}>
                <Field
                    name="email"
                    id ="recover_email"
                    label={t("email")}
                    component={renderTextField}
                    type="email"
                    autoComplete="off"
                    className={classes.button}
                />
                <br/>
                 <Button
                    type="submit"
                    className={classes.textField}
                    color="primary"
                >
                    <Trans>Change password</Trans>
                </Button>
                </form>
        )
    }

}

RecoverForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
}

RecoverForm = reduxForm({
    // a unique name for the form
    form: 'recover'
})(RecoverForm)

export default withStyles(loginFormStyle)(translate()(RecoverForm));