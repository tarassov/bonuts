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


const mapDispatchToProps = (dispatch) => {
    return {
        onLoad: () => {
            dispatch(loadAccount())
            let actionsDepartments = new ListActions(apis.departments)
            dispatch(actionsDepartments.loadItems())
        },      
        
        onSubmit: (item) => {
            dispatch(saveProfile(item))
        },
        saveAvatar: (payLoad) => {
            dispatch(saveAvatar(payLoad))
        }
    }
}


const  mapStateToProps = (state) => {
      return{
        dashboard: state.dashboard,
        account: state.account,
        profile: state.profile,
        system: state.system,
        departments: state.departments
      }
}



class UserPage  extends  Component {
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
                { name: "email", label: "Email", md:4 , disabled: !props.profile.admin},
                { name: "first_name", label: "Name", md:4 },
                { name: "last_name", label: "Surname", md:4},
                { name: "department", source: this.props.departments.items, size: "lg",disabled: !props.profile.admin},
                { name: "position", label: "Position", size: "lg"}],
                submitCaption: "Save changes"     
            }),
            mapDispatchToProps             
           
        })

        this.generatedForm =  formGenerator.getForm();

    }

    componentDidMount() {
      
    }
    
    readFile(files) {
        if (files && files[0]) {
            let formPayLoad = new FormData();
            formPayLoad.append('uploaded_image', files[0]);
            this.props.saveAvatar(formPayLoad)
        }
    }


    render() {
        const GeneratedForm =  this.generatedForm
        return (
            <React.Fragment>
                    <div>
                    <Dropzone onDrop={acceptedFiles => this.readFile(acceptedFiles)} maxSize={1500000}>
                    {({getRootProps, getInputProps}) => (
                        <section>
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p>Drag 'n' drop some files here, or click to select files</p>
                        </div>
                        </section>
                    )}
                    </Dropzone>
                    </div>
                <GeneratedForm />
            </React.Fragment>
            )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPage)
