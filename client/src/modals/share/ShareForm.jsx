import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Field, reduxForm } from 'redux-form'
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import modalStyle from 'assets/jss/modals/modalStyle'
import { withTranslation,useTranslation } from 'react-i18next';

import {renderDownshift,renderInputWithRange, renderTextField} from 'components/forms/common/render'

let maxValue;
let minValue;
let currentId;

const validate = values => {
  const errors = {}
  const requiredFields = [
      'point_amount',
      'user',
      'comment'
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

  if(values.user && currentId === values.user.id) {
      errors.user = 'Can not be the same as current user'
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
        const {t, handleSubmit, pristine, reset, submitting, classes, min, max, label,measure,profiles,currentUserId } = this.props
        maxValue = max
        minValue= min
        currentId=currentUserId
        return (
              <form onSubmit={handleSubmit} className={classes.container}>
              <DialogContent className={classes.root}>
               <div>
                 <Field
                   name="point_amount"
                   component={renderInputWithRange}
                   placeholder = {t("Max points") +"  " + max}
                   label={t(label)}
                   measure = {t(measure)}
                   min={min}
                   max={max}
                   className={classes.textField}
                 />
              </div>
              <div>
                <Field
                  name="user"
                  component={renderDownshift}
                  label={t("Users")}
                  source= {profiles}
                  placeholder ={t("start typing")}
                  className={classes.textField}
                />
             </div>
              <div>
                  <Field
                      name="comment"
                      component={renderTextField}
                      label={t("Comment")}
                      placeholder ={t("Comment")}
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
    profiles: PropTypes.array,

    classes: PropTypes.object.isRequired
}


ShareForm =  reduxForm({
  form: 'ShareForm', // a unique identifier for this form
  validate,
  //asyncValidate
})(ShareForm)

export default withTranslation()(withStyles(modalStyle)(ShareForm));
