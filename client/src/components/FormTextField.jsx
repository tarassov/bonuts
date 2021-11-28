import React from "react";
import { useTranslation } from "react-i18next";
import { TextField } from "@material-ui/core";

export default function FormTextField(props) {
  const { t } = useTranslation();
  return <TextField {...props} helperText={props.touched && t(props.error)} />;
}
