import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Field, reduxForm } from 'redux-form'
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import shareModalStyle from 'assets/jss/modals/shareModalStyle'

import {renderDownshift,renderInputWithRange} from 'components/forms/common/render'

let maxValue;
let minValue;

const validate = values => {
  const errors = {}
  const requiredFields = [
      'point_amount',
      'user'
  ]



  if (values.point_amount && isNaN(Number(values.point_amount)))  {
      errors.point_amount = 'Must be number'
  }
  else if (values.point_amount && Number(values.point_amount)%1 >0) {
      errors.point_amount = 'Can not be decimal'
  }
  else if (values.point_amount && (Number(values.point_amount) > maxValue ||  Number(values.point_amount)< minValue)) {
      errors.point_amount = 'Should be more than '  + minValue + ' and less than '+ maxValue
  }

  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })

  return errors
}



class ShareForm extends  Component {
      render() {
        const { handleSubmit, pristine, reset, submitting, classes, min, max, label,measure,users } = this.props
        maxValue = max
        minValue= min
        return (
              <form onSubmit={handleSubmit} className={classes.container}>
              <DialogContent className={classes.root}>
               <div>
                 <Field
                   name="point_amount"
                   component={renderInputWithRange}
                   label={label}
                   measure = {measure}
                   min={min}
                   max={max}
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
            </DialogContent>
             <DialogActions>
                 <Button type="submit" disabled={pristine || submitting}  color="primary" autoFocus>
                     Submit
                 </Button>
                 <Button onClick={this.props.onClose} color="secondary" >
                     Close
                 </Button>
             </DialogActions>

              </form>
            )
          }
}

ShareForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
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

export default withStyles(shareModalStyle)(ShareForm);
