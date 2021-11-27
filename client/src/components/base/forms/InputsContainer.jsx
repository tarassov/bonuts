import React from "react";
import { Field } from "redux-form";
import CustomInput from "../customInput/CustomInput";
import GridContainer from "../grid/GridContainer";
import GridItem from "../grid/GridItem";
import { useTranslation } from "react-i18next";
import CustomInputField from "components/base/forms/CustomInputField"

export default function InputsContainer({fields}){
    const {t} = useTranslation()

    const  field_xs =(field) =>{
      return field.xs ? field.xs : 12;
    }
  
    const field_sm =(field) =>{
      return field.sm ? field.sm : field_xs(field);
    }
  
    const field_md =(field) =>{
      return field.md ? field.md : field_sm(field);
    }
  
    const field_lg =(field) =>{
      return field.lg ? field.lg : field_md(field);
    }

    return(
        <GridContainer>            
             {fields.map((field) => (
                <GridItem
                  key={field.name.concat("_key")}
                  xs={field_xs(field)}
                  sm={field_sm(field)}
                  md={field_md(field)}
                  lg={field_lg(field)}                  
                >
                {

                }
                <CustomInputField field={field}/>
                </GridItem>
             ))}
        </GridContainer>
    )

}

