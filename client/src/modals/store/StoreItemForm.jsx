import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Field, reduxForm } from 'redux-form'
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import modalStyle from 'assets/jss/modals/modalStyle'

import {renderNumberField,renderDateField, renderTextField} from 'components/forms/common/render'



const validate = values => {
  const errors = {}
  const requiredFields = [
      'point_amount',
      'user'
  ]


  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })

  return errors
}



class StoreItemForm extends  Component {
      render() {
        const { handleSubmit, pristine,  submitting, classes,name} = this.props

        return (
              <form onSubmit={handleSubmit} className={classes.container}>
              <DialogContent className={classes.root}>
                <div>
                  <Field
                    name="donut_name"
                    component={renderTextField}
                    label={name}
                    className={classes.textField}
                    placeholder="name"
                  />
               </div>
               <div>
                 <Field
                   name="donut_price"
                   component={renderNumberField}
                   label={name}
                   className={classes.textField}
                   placeholder="price"
                 />
              </div>
              <div>
                <Field
                  name="donut_expiration"
                  component={renderDateField}
                  label="expiration"
                  className={classes.textField}
                  placeholder="expiration"
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

StoreItemForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
}


StoreItemForm =  reduxForm({
  form: 'StoreItemForm', // a unique identifier for this form
  validate,
  //asyncValidate
})(StoreItemForm)

export default withStyles(modalStyle)(StoreItemForm);