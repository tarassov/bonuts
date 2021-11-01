import React, {Component } from 'react'
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form'
import formStyle from 'assets/jss/components/formStyle'
import { withTranslation, Trans} from "react-i18next";
import SimpleFieldForm from "components/forms/SimpleFieldForm"
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import classNames from "classnames";


class DynamicForm extends  Component {
    render() {
         const { classes,t,submitCaption,fields,formId,cancelable,cancelCaption,color, detachedSubmit} = this.props;
         const min = 1;
         const max = 10000;
         const rand = min + Math.random() * (max - min);

         const form = reduxForm({
             form: formId,
             enableReinitialize: true, 
         })(SimpleFieldForm)
         const DForm = form

         const okButtonClass = classNames({
            [classes.button]: true,
            [classes.okButton]: cancelable,
            [classes[color + "Button"]]: color,
            
          });
    
          const cancelButtonClass = classNames({
            [classes.button]: true,
            [classes.cancelButton]: true,    
          });
         
         return (
                <div>
                    <DForm {...this.props} />
                    {detachedSubmit && <div>
                            {cancelable && <Button className={cancelButtonClass}  onClick = {this.props.onCancel}>
                            <Trans>{cancelCaption? cancelCaption :"Close"}</Trans>
                            </Button>
                            }

                                    
                        <Button
                                type="submit"
                                className={okButtonClass}                           
                                
                            >
                                <Trans>{submitCaption}</Trans>
                            </Button>   
                        </div>
                    }
                </div>
                )
            
    }

}

DynamicForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    fields: PropTypes.array.isRequired,
    submitCaption: PropTypes.string.isRequired,
    formId: PropTypes.string.isRequired
}


export default withStyles(formStyle)(withTranslation()(DynamicForm))