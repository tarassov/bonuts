import React, {Component } from 'react'
import PropTypes from 'prop-types';
import classNames from "classnames";
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Field, reduxForm } from 'redux-form'
import formStyle from 'assets/jss/components/formStyle'
import {renderTextField} from 'components/forms/common/render'
import { withTranslation, Trans} from "react-i18next";

class SimpleFieldForm extends  Component {
    render() {
         const { classes,t,submitCaption,fields,formId,color} = this.props;
         const buttonClass = classNames({
            [classes.button]: true,
            [classes[color + "Button"]]: color,
          });

        return (
                <form onSubmit={this.props.handleSubmit} className={classes.container} form={formId}>
                {fields.map(field=>(
                  <div>
                    <Field
                        name={field.name}
                        id ={formId.concat(field.name)}
                        label={t(field.name)}
                        component={renderTextField}
                        autoComplete="off"
                        className={classes.textField}
                    />
                  </div>
                ))}
                 <Button
                    type="submit"
                    className={buttonClass}
                    
                >
                    <Trans>{submitCaption}</Trans>
                </Button>
                </form>
        )
    }

}

SimpleFieldForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    fields: PropTypes.array.isRequired,
    submitCaption: PropTypes.string.isRequired,
    formId: PropTypes.string.isRequired
}

export default withStyles(formStyle)(withTranslation()(SimpleFieldForm))
