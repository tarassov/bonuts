import React, {useState} from "react";
import PropTypes from "prop-types";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import {useTranslation } from "react-i18next";
import classNames from "classnames";


export default function CustomCheckbox (props) {
    const {field} = props

    const [state, setState] = useState(field.defaultValue)
    const {t} = useTranslation()

    
    const handleChange = (event) => {
      setState(event.target.checked); 
      field.onChange({target:{id: field.name, name: field.name, value: event.target.checked}})     
    };



    return(
    <div>
      <FormControlLabel
        // className={field.className}
        control={
          <Checkbox
            checked={state}
            id= {field.name}
            name= {field.name}
            onChange={handleChange}
            disabled={field.disabled !== undefined ? field.disabled : false}
            color= "primary"
          />
        }
        label={t(field.labelText)}
      />
    </div>
    )
 }

 CustomCheckbox.propTypes = {
   field: PropTypes.object,
 }


