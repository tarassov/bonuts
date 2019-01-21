import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Field, reduxForm } from 'redux-form'
import Button from '@material-ui/core/Button';


import {renderDownshift,renderInputWithRange} from 'components/forms/common/render'

const validate = values => {
  const errors = {}
  const requiredFields = [
      'point_amount',
      'user'
  ]

  if (values.point_amount && isNaN(Number(values.point_amount)))  {
      errors.point_amount = 'Must be number'
  }
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })

  return errors
}


const style = theme => ({
    container: {
        display: 'block',
    },
    button: {
        width: 200,
        display: 'flex',
        margin: 'auto'
    },
    textField: {
        width: 250,
        display: 'flex',
        margin: 'auto'
    },
});

class ShareForm extends  Component {
      render() {
        const { handleSubmit, pristine, reset, submitting, classes, minValue, maxValue, label,measure,users } = this.props
        return (
              <form onSubmit={handleSubmit} className={classes.container}>
               <div>
                 <Field
                   name="point_amount"
                   component={renderInputWithRange}
                   label={label}
                   measure = {measure}
                   minValue={minValue}
                   maxValue={maxValue}
                   className={classes.textField}
                 />
              </div>
              <div>
                <Field
                  name="user"
                  component={renderDownshift}
                  label="Users"
                  source= {users}
                  placeholder ="start typing"
                  className={classes.textField}
                />
             </div>
                   <Button type="submit" disabled={pristine || submitting} className={classes.button} color="primary">
                   Submit
                 </Button>
              </form>
            )
          }
}

ShareForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    minValue: PropTypes.number.isRequired,
    maxValue: PropTypes.number.isRequired,
    measure: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    users: PropTypes.array,

    classes: PropTypes.object.isRequired
}


ShareForm =  reduxForm({
  form: 'ShareForm', // a unique identifier for this form
  validate,
  //asyncValidate
})(ShareForm)

export default withStyles(style)(ShareForm);
