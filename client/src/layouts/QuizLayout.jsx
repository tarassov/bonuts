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

const mockData =[{id: 1, value: "value1"},{id: 2, value: "value2"},{id: 3, value: "value3"},{id: 4, value: "value4", disabled: true}]
const mockData2 =[{id: 5, value: "value21"},{id: 6, value: "value22"},{id: 7, value: "value23"},{id: 8, value: "value24", disabled: false}]
class QuizLayout  extends  Component {
    constructor(props) {
        super(props);
        const formGenerator = new ReduxFormGenerator({
            reduxForm:{
                form:"quiz_form",
                enableReinitialize: true,
                keepDirtyOnReinitialize: true 
            },
            mapStateToProps:state => ({
                hasInitial: false,
                formId: "quiz_form",
                fields: [
                { 
                    name: "question", label: "Question 1", size: "lg",
                    radio: true,
                    source: mockData, 
                    id: 1
                },
                { 
                    name: "question 2", label: "Question 2", size: "lg",
                    radio: true,
                    source: mockData, 
                    id: 2
                }],


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
    
    

    render() {
        const {classes,account,saveAvatar} = this.props
        const GeneratedForm =  this.generatedForm
        return (
            <React.Fragment>
                    <GridContainer>
                        <GridItem xs={12}>
                            <GeneratedForm />
                        </GridItem>
                    </GridContainer>
            </React.Fragment>
            )
    }
}


export default withStyles(userStyle)(withTranslation()(QuizLayout))
