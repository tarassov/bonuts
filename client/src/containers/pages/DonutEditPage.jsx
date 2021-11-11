import React, {useEffect,useState} from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// @material-ui/icons
import DonutLargeOutlined from "@material-ui/icons/DonutLargeOutlined";
// core components
import GridContainer from "components/base/grid/GridContainer";
import GridItem from "components/base/grid/GridItem";
import Button from "components/base/customButtons/Button"
import CustomInput from "components/base/customInput/CustomInput"
import Clearfix from "components/base/clearfix/Clearfix"
import Card from "components/base/card/Card"
import CardBody from "components/base/card/CardBody"
import CardHeader from "components/base/card/CardHeader"
import CardIcon from "components/base/card/CardIcon"

import {useParams} from "react-router-dom";
import styles from "assets/jss/layouts/donutEditPageStyle"
import Progress from "components/Progress";
import {useTranslation} from 'react-i18next'

import {useResource } from "hooks/useResource";
import storeApi from "api/listApi/storeApi";
import ImageUpload from "components/base/customUpload/ImageUpload";


const useStyles = makeStyles(styles);

export default function UserProfile() {

  const { id } = useParams();

   

  const {t} = useTranslation()

  const [item, updateResource ]= useResource(storeApi,id);
  const [formData, setFormData] = React.useState({isLoading: true,logoChanged: false});
  const [changed, setChanged] = useState(false)


  useEffect(()=>{
    setFormData({...item})
    if(item.uploaded) setChanged(true)
  }, [item]);


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
    updateResource(formData)
    setChanged(false)
  }

  const handleChange = (event) =>{
    console.log(event)
    if (formData[event.target.id] !=event.target.value ){
      setFormData({...formData, [event.target.id]: event.target.value})
      setChanged(true)
    }
  }

  const handleDateChange = (value) =>{
    if (formData.expiration_date !=value){
      setFormData({...formData,expiration_date: value})
      setChanged(true)
    }
  }
  return (    
           <Card>
              <CardHeader color="primary" icon>
                <CardIcon color="primary">
                  <DonutLargeOutlined />
                </CardIcon>
                <h4 className={classes.cardIconTitle}>
                  {t("Edit donut")} {formData!==null && formData.name}
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
                              labelText={t("Donut name")}
                              id="name"
                              formControlProps={{
                                fullWidth: true,
                              }}
                              inputProps={{
                                onChange: handleChange,
                                defaultValue: item.name,
                                disabled: false,
                              }}
                            />
                          </GridItem>
                          <GridItem xs={12} sm={12} md={6}>
                            <CustomInput
                                labelText={
                                  <span>
                                    {t("Price")} <small>({t("required")})</small>
                                  </span>
                                }
                                id="price"
                                formControlProps={{
                                  fullWidth: true,
                                }}
                                inputProps={{
                                  defaultValue: item.price,
                                  onChange: handleChange,
                                  type: "number",
                                }}
                            />
                          </GridItem>
                       <GridItem xs={12} sm={12} md={6}>
                          <CustomInput
                              id="expiration_date"
                              
                              formControlProps={{
                                fullWidth: true,
                              }}
                              inputProps={{
                                type: "date",
                                onChange: handleDateChange,
                                initialValue: new Date(item.expiration_date),
                                dateFormat: "DD-MM-YYYY",
                                placeholder: t("Expiration date")
                              }}
                          />
                       </GridItem>
                       </GridContainer>
                      </GridItem>
                </GridContainer>
               
                <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        <InputLabel style={{ color: "#AAAAAA" }}>{t("More")}</InputLabel>
                        <CustomInput
                          labelText={t("Donut description")}
                          id="description"
                          formControlProps={{
                            fullWidth: true,
                          }}
                          inputProps={{
                            onChange: handleChange,
                            defaultValue: item.description,
                            multiline: true,
                            rows: 5,
                          }}
                        />
                      </GridItem>
                </GridContainer>
               
           
                <Button color="primary" type="submit" disabled={!changed} className={classes.updateProfileButton}>
                  {t("Update donut")}
                </Button>
                {formData.active && <Button color="danger"  className={classes.updateProfileButton}>
                  {t("Deactivate")}
                </Button>}
                <Clearfix />
              </CardBody>
              </form>
           </Card>
  );
}
