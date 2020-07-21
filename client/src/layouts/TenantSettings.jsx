import React, {Component } from 'react'
import PropTypes from "prop-types";
import GridContainer from 'components/grid/GridContainer';
import GridItem from 'components/grid/GridItem';
import ReduxFormGenerator from 'components/forms/reduxFormGenerator';
import settingsStyles from "assets/jss/layouts/settingsStyles.jsx";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import ImageLoader from 'components/ImageLoader'


class TenantSettings  extends  Component {
    constructor(props) {
        super(props);
   
        const formGenerator = new ReduxFormGenerator({
            reduxForm:{
                form:"profile_settings",
                enableReinitialize: true,
                keepDirtyOnReinitialize: true 
            },
            mapStateToProps:state => ({
                hasInitial: true,
                initialValues: state.profile.tenant,
                formId: "tenant_settings",
                fields: [
               // { name: "user_avatar", label: "Avatar", md:3,image: true},
                { name: "caption", label: "Caption", xs:12 ,size: "lg"},
                { name: "domain", label: "Domain", lg:6,size: "lg" }],
                submitCaption: "Save changes"     
            }),
            mapDispatchToProps: dispatch => ({
                onLoad:  props.loadTenant,
                onSubmit: props.saveTenant      
            })             
           
        })       
 
        this.state ={
            newLoaded: false,
            preview: null
        }

        this.generatedForm =  formGenerator.getForm();
    }
  
    componentDidMount() {
        URL.revokeObjectURL(this.state.preview)
    }

    componentWillUnmount() {
        URL.revokeObjectURL(this.state.preview)
    }
    

    render() {
        const { classes,saveFile,saveLogo,tenant,...other } = this.props;
        const GeneratedForm =  this.generatedForm
        return (
                <React.Fragment>
                        <GridContainer>
                            <GridItem xs={12}  sm={6} lg={6}>
                            <ImageLoader save = {saveLogo} changeable loaded_image ={tenant.logo} objectId = {tenant.id}/>
                                
                            </GridItem>
                            <GridItem xs={12}  sm={6} lg={6}>
                                <GeneratedForm />
                            </GridItem>
                        </GridContainer>
                </React.Fragment>
        );
    }
  }
  
  TenantSettings.propTypes = {
    tenant: PropTypes.object,
    saveLogo: PropTypes.func,
    loadTenant: PropTypes.func,
    saveTenant: PropTypes.func
  };
  
  
  export default withStyles(settingsStyles)(TenantSettings)