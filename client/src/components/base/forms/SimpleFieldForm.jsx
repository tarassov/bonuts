import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Button from "components/base/customButtons/RegularButton";
import { Field } from "redux-form";
import formStyle from "assets/jss/components/base/formStyle";
import {
  renderDownshift,
  renderCheckbox,
} from "components/base/forms/reduxForm/render";
import { renderRadio } from "components/base/forms/reduxForm/radio";
import { renderTextField } from "components/base/forms/reduxForm/text";
import { withTranslation, Trans } from "react-i18next";
import GridItem from "components/base/grid/GridItem.jsx";
import GridContainer from "components/base/grid/GridContainer.jsx";

class SimpleFieldForm extends Component {
  field_xs(field) {
    return field.xs ? field.xs : 12;
  }

  field_sm(field) {
    return field.sm ? field.sm : this.field_xs(field);
  }

  field_md(field) {
    return field.md ? field.md : this.field_sm(field);
  }

  field_lg(field) {
    return field.lg ? field.lg : this.field_md(field);
  }

  field_class(field, classes) {
    return classNames({
      [classes.textField]: true,
      [classes[field.size + "Field"]]: field.size,
    });
  }

  getComponent() {
    //todo: render checkbox
  }

  render() {
    const {
      classes,
      t,
      submitCaption,
      fields,
      formId,
      color,
      cancelCaption,
      cancelable,
      detachedSubmit,
      initialValues,
      hasInitial,
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
          <GridItem xs={12} className={classes.gridItem}>
            <GridContainer>
              {fields.map((field) => (
                <GridItem
                  key={field.name.concat("_key")}
                  xs={this.field_xs(field)}
                  sm={this.field_sm(field)}
                  md={this.field_md(field)}
                  lg={this.field_lg(field)}
                  className={classNames({
                    [classes.gridItem]: true,
                    [classes.downshiftControl]: field.source,
                  })}
                >
                  {field.image && initialValues[field.name] !== undefined && (
                    <img
                      className={classes.image}
                      src={initialValues[field.name].url}
                      alt="not found"
                    />
                  )}
                  {!field.image &&
                    this.renderField(
                      field,
                      formId,
                      t,
                      classes,
                      hasInitial,
                      initialValues
                    )}
                </GridItem>
              ))}
            </GridContainer>
          </GridItem>
          <GridItem xs={12}>
            {!detachedSubmit && (
              <div>
                {cancelable && (
                  <Button
                    className={classes.cancelButton}
                    onClick={this.props.onCancel}
                    color="secondary"
                  >
                    <Trans>{cancelCaption ? cancelCaption : "Close"}</Trans>
                  </Button>
                )}

                <Button
                  type="submit"
                  className={classes.okButton}
                  color="primary"
                >
                  <Trans>{submitCaption}</Trans>
                </Button>
              </div>
            )}
          </GridItem>
        </GridContainer>
      </form>
    );
  }

  renderField(field, formId, t, classes, hasInitial, initialValues) {
    let component;
    let label;
    let type;

    type = "text";
    if (field.checkbox) {
      component = renderCheckbox;
      type = "checkbox";
    } else if (field.radio) {
      component = renderRadio;
    } else {
      component = field.source ? renderDownshift : renderTextField;
    }

    if (field.hideLabel === true) {
      label = "";
    } else {
      label = t(field.label ? field.label : field.name);
    }

    if (field.type !== undefined) {
      type = field.type;
    }

    return (
      <Field
        name={field.name}
        id={formId.concat(field.name)}
        legend={field.legend}
        label={label}
        placeholder={label}
        component={component}
        autoComplete="off"
        type={type}
        className={this.field_class(field, classes)}
        classes={classes}
        source={field.source}
        // labelClass = {classes.label}
        options={{
          initialValue: !hasInitial
            ? undefined
            : initialValues[field.name] !== undefined
            ? initialValues[field.name]
            : "",
          disabled: field.disabled,
        }}
        multiline={type === "password" ? false : true}
        rows={field.rows}
      />
    );
  }
}

SimpleFieldForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  fields: PropTypes.array.isRequired,
  columns: PropTypes.array,
  submitCaption: PropTypes.string.isRequired,
  formId: PropTypes.string.isRequired,
};

export default withStyles(formStyle)(withTranslation()(SimpleFieldForm));
