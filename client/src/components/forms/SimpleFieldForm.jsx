import React, {Component } from 'react'
import PropTypes from 'prop-types';
import classNames from "classnames";
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Field, reduxForm } from 'redux-form'
import formStyle from 'assets/jss/components/formStyle'
import {renderDownshift,renderInputWithRange, renderTextField} from 'components/forms/common/render'
import { withTranslation, Trans} from "react-i18next";
import GridItem from "components/grid/GridItem.jsx";
import GridContainer from "components/grid/GridContainer.jsx";
import DialogActions from '@material-ui/core/DialogActions';

class SimpleFieldForm extends  Component {

    field_xs(field){
        return field.xs ? field.xs : 12
    }

    field_sm(field){
        return field.sm ?field.sm:this.field_xs(field)
    }

    field_md(field){
        return field.md ?field.md:this.field_sm(field)
    }

    field_lg(field){
        return field.lg ?field.lg:this.field_md(field)
    }

    field_class(field,classes){
        return  classNames({
            [classes.textField]:true,
            [classes[field.size + "Field"]]: field.size,
        })    

    }

    getComponent() {
        //todo: render checkbox
    }

    render() {
         const { classes,t,
            submitCaption,fields,
            formId,
            color,
            cancelCaption,
            cancelable,
            detachedSubmit,
            initialValues,
            hasInitial
        } = this.props;

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
                <form onSubmit={this.props.handleSubmit} className={classes.container}>
                  <GridContainer>
                  {fields.map(field=>(
                
                   <GridItem   key={field.name.concat("_key")} 
                        xs={this.field_xs(field)} 
                        sm={this.field_sm(field)}
                        md={this.field_md(field)} 
                        lg={this.field_lg(field)}
                    >
                    {field.image && initialValues[field.name]!==undefined && 
                        <img className={classes.image} src={initialValues[field.name].url} alt="not found"/>
                    }
                    {!field.image && 
                        this.renderField(field, formId, t, classes, hasInitial, initialValues)
                    }
                    </GridItem>
                   
                  ))}
                  </GridContainer>

                    {!detachedSubmit && <div>
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

                 </form>
        )
    }


    renderField(field, formId, t, classes, hasInitial, initialValues) {
        return <Field name={field.name} id={formId.concat(field.name)} label={t(field.label ? field.label : field.name)} placeholder={t(field.label ? field.label : field.name)} component={field.source ? renderDownshift : renderTextField} autoComplete="off" className={this.field_class(field, classes)} source={field.source} options={{
            initialValue: !hasInitial ? undefined : (initialValues[field.name] !== undefined ? initialValues[field.name] : ""),
            disabled: field.disabled
        }} multiline />;
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
