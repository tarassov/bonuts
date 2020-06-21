import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import GridContainer from 'components/grid/GridContainer';
import GridItem from 'components/grid/GridItem';
import ReduxFormGenerator from 'components/forms/reduxFormGenerator';
import { withTranslation, Trans } from "react-i18next";
import Dropzone from 'react-dropzone';
import settingsStyles from "assets/jss/layouts/settingsStyles.jsx";
import { makeStyles, withStyles } from '@material-ui/core/styles';

function TenantSettings(props) {
    const { classes,saveFile,...other } = props;

    useEffect(() => {
        props.loadTenant();      
    },[])
  
    const formGenerator = new ReduxFormGenerator({
        reduxForm:{
            form:"profile_settings",
            enableReinitialize: true,
            keepDirtyOnReinitialize: true 
        },
        mapStateToProps:state => ({
            hasInitial: true,
            initialValues: state.account.data ,
            formId: "tenant_settings",
            fields: [
           // { name: "user_avatar", label: "Avatar", md:3,image: true},
            { name: "email", label: "Email", xs:12 ,size: "lg"},
            { name: "first_name", label: "Name", lg:6,size: "lg" },
            { name: "last_name", label: "Surname", lg:6,size: "lg"},
            { name: "position", label: "Position", size: "lg"}],
            submitCaption: "Save changes"     
        }),
        mapDispatchToProps: dispatch => ({
        
        })             
       
    })

   const GeneratedForm =  formGenerator.getForm();

    return (
        <React.Fragment>
                <GridContainer>
                    <GridItem xs={12}  sm={6} lg={6}>
                    <Dropzone   accept={'image/*'} onDrop={acceptedFiles => saveFile(acceptedFiles)}>
                                {({getRootProps, getInputProps}) => (
                                    <section>
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <p className={classes.caption}><Trans>Click to select files</Trans></p>
                                    </div>
                                    </section>
                                )}
                    </Dropzone> 
                         
                    </GridItem>
                    <GridItem xs={12}  sm={6} lg={6}>
                        <GeneratedForm />
                    </GridItem>
                </GridContainer>
        </React.Fragment>
    );
  }
  
  TenantSettings.propTypes = {
    saveFile: PropTypes.func,
    loadTenant: PropTypes.func
  };
  
  
  export default withStyles(settingsStyles)(TenantSettings)