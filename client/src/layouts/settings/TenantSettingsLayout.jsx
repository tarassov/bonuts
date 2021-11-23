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


const useStyles = makeStyles(styles);

export default function TenantSettingsLayout() {

 

  const {t} = useTranslation()

  const [item, updateResource ]= useResource(api,undefined);
  const [formData, setFormData] = React.useState({isLoading: true,logoChanged: false});
  const [changed, setChanged] = useState(false)
  const [readOnly, setReadOnly] = useState(true);

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
    updateResource(formData,{successPath: "/settings"})
    setChanged(false)
  }

  const handleChange = (event) =>{
    if (formData[event.target.id] !=event.target.value ){
      setFormData({...formData, [event.target.id]: event.target.value})
      setChanged(true)
    }
  }


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
                      <GridItem xs={12} sm={12} md={4}>
                        <ImageUpload onImageChange={logoChange} image={formData.logo.url}/>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={8}>    
                          <GridContainer>      
                          <GridItem xs={12} sm={12} md={12}>          
                            <CustomInput
                              labelText={t("Tenant name")}
                              id="name"
                              formControlProps={{
                                fullWidth: true,
                              }}
                              inputProps={{
                                onChange: handleChange,
                                defaultValue: item.name,
                                disabled: readOnly,
                              }}
                            />
                          </GridItem>
                          <GridItem xs={12} sm={12} md={6}>
                            <CustomInput
                                labelText={
                                  <span>
                                    {t("Caption")} <small>({t("required")})</small>
                                  </span>
                                }
                                id="caption"
                                formControlProps={{
                                  fullWidth: true,
                                }}
                                inputProps={{
                                  defaultValue: item.caption,
                                  disabled: readOnly,
                                  onChange: handleChange,
                                }}
                            />
                          </GridItem>                     
                       </GridContainer>
                      </GridItem>
                </GridContainer>              

                
              {!readOnly && 
                    <Button color="primary" type="submit" disabled={!changed} className={classes.actionButton}>
                      {t("Update tenant")}
                    </Button>
               }
                <Clearfix />
              </CardBody>
              </form>
           </Card>
  );
}


