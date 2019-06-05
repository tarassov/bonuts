import React, {Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Field, reduxForm } from 'redux-form'
import formStyle from 'assets/jss/components/formStyle'
import {renderTextField} from 'components/forms/common/render'
import { withTranslation, Trans} from "react-i18next";

class ActivateRegard extends  Component {
    render() {
         const { classes,t} = this.props;
        return (
                <form onSubmit={this.props.handleSubmit} className={classes.container}>
                <Field
                    name="regard_code"
                    id ="regard_code"
                    label={t("code")}
                    component={renderTextField}
                    autoComplete="off"
                    className={classes.textField}
                />
                <br/>
                 <Button
                    type="submit"
                    className={classes.button}
                    color="primary"
                >
                    <Trans>Activate regard</Trans>
                </Button>
                </form>
        )
    }

}

ActivateRegard.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
}

ActivateRegard = reduxForm({
    // a unique name for the form
    form: 'activateRegard'
})(ActivateRegard)

export default withStyles(formStyle)(withTranslation()(ActivateRegard));
