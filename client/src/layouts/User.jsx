import React, {Component } from 'react'
import {connect} from 'react-redux'
import {loadAccount,loadProfile, saveProfile,saveAvatar} from 'actions/profile/profileActions'
import  ProgressContainer from "containers/ProgressContainer"
import ListActions from "actions/listActions"
import apis  from 'api/apiRoot'
import Progress from "components/Progress";
import ReduxFormGenerator from 'components/forms/reduxFormGenerator';
import { stat } from 'fs';
import Dropzone from 'react-dropzone';
import { Button } from '@material-ui/core';
import Previews from 'components/Previews';
import GridContainer from 'components/grid/GridContainer';
import GridItem from 'components/grid/GridItem';
import userStyle from 'assets/jss/layouts/userStyle';
import { withTranslation, Trans } from "react-i18next";
import { withStyles } from '@material-ui/core/styles';
import UserImage from 'components/UserImage';



class User  extends  Component {
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
                initialValues: state.account.data ,
                formId: "profile_settings",
                fields: [
               // { name: "user_avatar", label: "Avatar", md:3,image: true},
                { name: "email", label: "Email", xs:12 ,size: "lg", disabled: !props.profile.admin},
                { name: "first_name", label: "Name", lg:6,size: "lg" },
                { name: "last_name", label: "Surname", lg:6,size: "lg"},
                { name: "department", source: this.props.departments.items, size: "lg",disabled: !props.profile.admin},
                { name: "position", label: "Position", size: "lg"}],
                submitCaption: "Save changes"     
            }),
            mapDispatchToProps: dispatch => ({
                onLoad: this.props.onLoad,
                onSubmit: this.props.onSubmit
            
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
    
    readFile(files) {
        if (files && files[0]) {
            let formPayLoad = new FormData();
            formPayLoad.append('uploaded_image', files[0]);
            this.props.saveAvatar(formPayLoad)   
            let preview = URL.createObjectURL(files[0])
            this.setState({newLoaded:true, preview: preview})                   
        }
    }


    render() {
        const {classes,account} = this.props
        const GeneratedForm =  this.generatedForm
        return (
            <React.Fragment>
                    <GridContainer>
                        <GridItem xs={12}  sm={6} lg={6}>
                         <UserImage account={account}/>
                             
                        </GridItem>
                        <GridItem xs={12}  sm={6} lg={6}>
                            <GeneratedForm />
                        </GridItem>
                    </GridContainer>
            </React.Fragment>
            )
    }
}


export default withStyles(userStyle)(withTranslation()(User))
