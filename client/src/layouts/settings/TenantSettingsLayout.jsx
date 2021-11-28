import React, {useEffect,useState} from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// @material-ui/icons
import Icon from "@material-ui/icons/SupervisorAccount";
// core components
import GridContainer from "components/base/grid/GridContainer";
import GridItem from "components/base/grid/GridItem";
import Button from "components/base/customButtons/RegularButton"
import CustomInput from "components/base/customInput/CustomInput"
import Clearfix from "components/base/clearfix/Clearfix"
import Card from "components/base/card/Card"
import CardBody from "components/base/card/CardBody"
import CardHeader from "components/base/card/CardHeader"
import CardIcon from "components/base/card/CardIcon"

import {useParams} from "react-router-dom";
import styles from "assets/jss/layouts/tenantSettingsLayout"
import Progress from "components/Progress";
import {useTranslation} from 'react-i18next'

import {useResource } from "hooks/useResource";
import api from "api/tenantAdminApi";
import ImageUpload from "components/base/customUpload/ImageUpload";
import InputsContainer from "components/base/forms/InputsContainer"

const useStyles = makeStyles(styles);

export default function TenantSettingsLayout() {

 

  const {t} = useTranslation()

  const [item, updateResource ]= useResource(api,undefined);
  const [formData, setFormData] = React.useState({isLoading: true,logoChanged: false});
  const [changed, setChanged] = useState(false)
  const [readOnly, setReadOnly] = useState(false);

  useEffect(()=>{
    setFormData({...item})
    if(item.uploaded) setChanged(true)
  }, [item]);



  useEffect(()=>{
    if(!formData.isLoading && changed) {
      updateResource(formData)
    }
  }, [formData.active]);


  const classes = useStyles();

  if (formData.isLoading){
    return (<Progress/>)
  }

  
  const logoChange= (logo) =>{
    setFormData({...formData,logo, logoChanged: true})
    setChanged(true)
  }

  const handleSubmit = (e) =>{
    e.preventDefault()  
    console.log(formData)
    updateResource(formData,{successPath: "/settings"})
    setChanged(false)
  }

  const handleChange = (event) =>{
    if (formData[event.target.id] !=event.target.value ){
      setFormData({...formData, [event.target.id]: event.target.value})
      setChanged(true)
    }
  }

  const fields = [
    {
      name: "name",
      onChange: handleChange,
      defaultValue: item.name,
      fullWidth: true,
      disabled:true,
      labelText: "Tenant name",
    },
    {
      name: "caption",
      onChange: handleChange,
      defaultValue: item.caption,
      fullWidth: true,
      disabled:false,
      labelText: "Caption"
    },
    {
      name: "domain",
      onChange: handleChange,
      defaultValue: item.domain,
      fullWidth: true,
      disabled:false,
      labelText: "Domain"
    },
    {
      name: "welcome_points",
      onChange: handleChange,
      defaultValue: item.welcome_points,
      fullWidth: true,
      disabled:false,
      type: "number",
      labelText: "Welcome points"
    },
    {
      name: "welcome_donuts",
      onChange: handleChange,
      defaultValue: item.welcome_donuts,
      fullWidth: true,
      disabled:false,
      type: "number",
      labelText: "Welcome donuts"
    },
    {
      name: "use_departments",
      onChange: handleChange,
      defaultValue: item.use_departments,
      fullWidth: true,
      disabled:false,
      checkbox:true,
      type: "checkbox",
      labelText: "Use departments"
    },
    {
      name: "birthday_donuts",
      onChange: handleChange,
      defaultValue: item.birthday_donuts,
      fullWidth: true,
      disabled:true,
      type: "number",
      labelText: "Birthday donuts"
    },
    {
      name: "email_notfication",
      onChange: handleChange,
      defaultValue: item.email_notfication,
      fullWidth: true,
      disabled:true,
      checkbox:true,
      type: "checkbox",
      labelText: "Email notification"
    },
  ]

  return (    
           <Card>
              <CardHeader color="primary" icon>
                <CardIcon color="primary">
                  <Icon />
                </CardIcon>
                <h4 className={classes.cardIconTitle}>
                  {formData!==null && formData.name}
                </h4>
              </CardHeader>
              <form onSubmit={handleSubmit}>
              <CardBody>
                <GridContainer>
                      <GridItem xs={12} sm={12} md={3}>
                        <ImageUpload onImageChange={logoChange} image={formData.logo.url}/>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={9}>    
                          <InputsContainer fields={fields}/>
                      </GridItem>
                </GridContainer>              

                
              {!readOnly && 
                    <Button color="primary" type="submit" disabled={!changed} className={classes.actionButton}>
                      {t("Update")}
                    </Button>
               }
                <Clearfix />
              </CardBody>
              </form>
           </Card>
  );
}


