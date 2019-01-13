import React, {Component } from 'react'
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import asyncValidate from './asyncValidate'
import registerFormStyle from 'assets/jss/components/registerFormStyle'

const validate = values => {
  const errors = {}
  const requiredFields = [
    'firstName',
    'lastName',
    'sex',
    'email',
    'notes'
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Invalid email address'
  }
  return errors
}

const renderTextField = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <TextField
    label={label}
    placeholder={label}
    error={touched && invalid}
    helperText={touched && error}
    {...input}
    {...custom}
  />
)

const renderCheckbox = ({ input, label }) => (
  <div>
    <FormControlLabel
      control={
        <Checkbox
          checked={input.value ? true : false}
          onChange={input.onChange}
        />
      }
      label={label}
    />
  </div>
)

const radioButton = ({ input, ...rest }) => (
  <FormControl>
    <RadioGroup {...input} {...rest}>
      <FormControlLabel value="female" control={<Radio />} label="Female" />
      <FormControlLabel value="male" control={<Radio />} label="Male" />
    </RadioGroup>
  </FormControl>
)

const renderFromHelper = ({ touched, error }) => {
  if (!(touched && error)) {
    return
  } else {
    return <FormHelperText>{touched && error}</FormHelperText>
  }
}

class RegisterForm extends  Component {
      render() {
        const { handleSubmit, pristine, reset, submitting, classes } = this.props
        return (
          <form onSubmit={handleSubmit} className={classes.container}>
            <div>
              <Field
                name="firstName"
                component={renderTextField}
                label="First Name"
                className={classes.textField}
              />
            </div>
            <div>
              <Field name="lastName" component={renderTextField} label="Last Name" className={classes.textField}/>
            </div>
            <div>
              <Field name="email" component={renderTextField} label="Email" className={classes.textField}/>
            </div>
            <div className={classes.container}>
              <Field name="sex" component={radioButton} className={classes.textField}>
                <Radio value="male" label="male" className={classes.textField}/>
                <Radio value="female" label="female" className={classes.textField}/>
              </Field>
            </div>
            <div />
            <div>
              <Field
                name="notes"
                component={renderTextField}
                label="Notes"
                multiline
                rowsMax="4"
                margin="normal"
                className={classes.textField}
              />
            </div>
            <br/>
              <Button type="submit" disabled={pristine || submitting} className={classes.button} color="primary">
                Submit
              </Button>
              <Button type="button" disabled={pristine || submitting} onClick={reset} className={classes.button}>
                Clear Values
              </Button>

          </form>
        )
    }
}

RegisterForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
}


RegisterForm =  reduxForm({
  form: 'RegisterForm', // a unique identifier for this form
  validate,
  asyncValidate
})(RegisterForm)

export default withStyles(registerFormStyle)(RegisterForm);
