import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types'
import DynamicForm from 'components/forms/DynamicForm';
import GridItem from "components/grid/GridItem.jsx";
import GridContainer from "components/grid/GridContainer.jsx";
import StorePage from "containers/pages/StorePage";
import Card from "components/card/Card.jsx";
import CardHeader from "components/card/CardHeader.jsx";
import CardBody from "components/card/CardBody.jsx";
import { withTranslation, Trans } from "react-i18next";
import { useTranslation } from 'react-i18next';
//import withStyles from "@material-ui/core/styles/withStyles";
import settingsStyles from "assets/jss/layouts/settingsStyles.jsx";
import { Button } from '@material-ui/core';
import Dropzone from 'react-dropzone';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {TabPanel,a11yProps} from 'components/tabs/TabPanel'
import Schedulers from './Schedulers';

const share_all = 'share_all'
const activate_code='activate_code'



function Settings(props) {
  const {classes} = props
  const [value,setValue] = useState(0)
  const { t, i18n } = useTranslation();

  useEffect(() => {
    props.loadUsers();
 //   props.loadSchedulers();
  },[])

  const click = (values) => {
    let profile_ids = this.props.dashboard.profiles.map(profile => profile.id);
    this.props.onShare(values.points, profile_ids, values.message,share_all,values.burn_old);
  };

  const activate = (values) => {
    this.props.onActivate(values.code, activate_code);
  }

  const readFile = (files) => {
    if (files && files[0]) {
        let formPayLoad = new FormData();
        formPayLoad.append('uploaded_image', files[0]);
        this.props.saveLogo(formPayLoad)   
    }
  }


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
    return(
       <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader plain color="primary">
           <Tabs 
           value={value} 
           onChange={handleChange} 
           aria-label="settings tabs"
           >
            <Tab label={t("Store")} {...a11yProps(0)} />
            <Tab label={t("Schedule")} {...a11yProps(1)} />
            <Tab label={t("Share donuts")} {...a11yProps(2)} />
            <Tab label={t("Team settings")} {...a11yProps(3)} />
            </Tabs>
          </CardHeader>
          <CardBody>
           <TabPanel value={value} index={0}>
              <StorePage />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Schedulers schedulers={props.schedulers} loadItems={props.loadSchedulers()}/>
          </TabPanel>
          <TabPanel value={value} index={2}>
              <DynamicForm 
                formId={share_all} 
                fields={[
                  { name: "points", xs:12,sm:12,md:12,lg:6 },
                  { name: "message",xs:12,sm:12,md:12,lg:6,size:"lg", multiline:true, rows: "5",column:2 },
                  { name: "burn_old",label:"Burn old points",xs:12,size:"lg", checkbox: true },
                ]} 
                columns= {[
                  {id:1, xs:6},
                  {id:2, xs:6}
                ]}
                submitCaption={"Send to all"}             
                onSubmit={click.bind(this)} 
              />
          </TabPanel>
          <TabPanel value={value} index={3}>
              <Dropzone   accept={'image/*'} onDrop={acceptedFiles => this.readFile(acceptedFiles)}>
                                {({getRootProps, getInputProps}) => (
                                    <section>
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <p className={classes.caption}><Trans>Click to select files</Trans></p>
                                    </div>
                                    </section>
                                )}
             </Dropzone> 
            </TabPanel>
          </CardBody>
        </Card>
        </GridItem>
      </GridContainer>
    )    
}


export default withStyles(settingsStyles)(Settings)