import React, {useEffect,useState} from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// @material-ui/icons
import DonutLargeOutlined from "@material-ui/icons/DonutLargeOutlined";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
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
import ImagePreview from "components/base/image/ImagePreview";
import ImageUpload from "components/base/customUpload/ImageUpload";


const useStyles = makeStyles(styles);

export default function DonutPreviewLayout() {

  const { id } = useParams();

   

  const {t} = useTranslation()

  const [item, updateResource ]= useResource(storeApi,id);
  const [formData, setFormData] = React.useState({isLoading: true,logoChanged: false});


  useEffect(()=>{
    setFormData({...item})
  }, [item]);


  const classes = useStyles();

  if (formData.isLoading){
    return (<Progress/>)
  }

  const  buy =()=>{

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
              <CardBody>
                <GridContainer>
                      <GridItem xs={12} sm={12} md={4}>
                        <ImagePreview image={formData.logo.url}/>
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
                                disabled: true, 
                                defaultValue: item.name,

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
                                  disabled: true, 
                                  defaultValue: item.price,
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
                                disabled: true,   
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

                            defaultValue: item.description,
                            disabled: true,   
                            multiline: true,
                            rows: 5,
                          }}
                        />
                      </GridItem>
                </GridContainer>
                
  
                <Button color="primary" onClick={buy}>
                    {t("Buy")}
                </Button>                    
       
               
                <Clearfix />
              </CardBody>              
           </Card>
  );
}

DonutPreviewLayout.propTypes = {
 
}
