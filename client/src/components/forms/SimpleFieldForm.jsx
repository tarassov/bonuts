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


    render() {
         const { classes,t,submitCaption,fields,formId,color,size} = this.props;
         const buttonClass = classNames({
            [classes.button]: true,
            [classes[color + "Button"]]: color,
          });
    

        return (
                <form onSubmit={this.props.handleSubmit} className={classes.container} form={formId}>
                  <GridContainer>
                  {fields.map(field=>(
                   <GridItem   key={field.name.concat("_key")} 
                        xs={this.field_xs(field)} 
                        sm={this.field_sm(field)}
                        md={this.field_md(field)} 
                        lg={this.field_lg(field)}
                    >
                    <Field                      
                        name={field.name}
                        id ={formId.concat(field.name)}
                        label={t(field.name)}
                        placeholder={t(field.name)}
                        component={field.source? renderDownshift : renderTextField}
                        autoComplete="off"
                        className={ this.field_class(field,classes)}
                        source = {field.source}
                        multiline
                    />
                    </GridItem>
                   
                  ))}
                  </GridContainer>
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
