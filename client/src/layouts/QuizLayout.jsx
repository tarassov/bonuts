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
import Card from "components/card/Card.jsx";
import CardHeader from "components/card/CardHeader.jsx";
import CardBody from "components/card/CardBody.jsx";
import CustomTableToolbar from "../components/table/CustomTableToolbar";

   
const mockData =[{id: 1, value: "1", text: "value1"},{id:2,value: "2", text: "value2"},{id:3,value: "3", text: "value3"},{id:4,value: "4", text: "value4", disabled: true}]
const mockData2 =[{id: 5, value: "value21"},{id: 6, value: "value22"},{id: 7, value: "value23"},{id: 8, value: "value24", disabled: false}]

const mockQuiz =   {
    name: "Test quiz",
    author: "mr Moonlight",
    created_at: "2020-01-01",
    radio: true,
    id:1,
    questions:[{description: "Por que?", answers: mockData}]
}


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
                    name: "question", 
                    size: "lg",
                    radio: true,
                    source: mockData, 
                    label: "1. Что делать?",
                    id: 1
                },
                { 
                    name: "question 1 text",  size: "lg",
                    legend:  "2. Por que?",
                    hideLabel: true,
                    id: 2
                },
                { 
                    name: "question text 2",  size: "lg",
                    legend:  "3. Donde?",multiline:true, rows: "5",
                    hideLabel: true,
                    id: 22
                },
                { 
                    name: "question 2", label: "4. Кому на Руси жить хорошо?", size: "lg",
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
        const {classes,quiz} = this.props
        const GeneratedForm =  this.generatedForm
        return (
            <React.Fragment>
                    <Card>
                      <CardHeader color="primary">
                      <CustomTableToolbar>
                        <h4 className={classes.cardTitleWhite}><Trans>{mockQuiz.name}</Trans></h4>
                      </CustomTableToolbar>
                      </CardHeader>
                      <CardBody>
                            <GeneratedForm />
                      </CardBody>  
                    </Card>                      
                </React.Fragment>
            )
    }
}


export default withStyles(userStyle)(withTranslation()(QuizLayout))