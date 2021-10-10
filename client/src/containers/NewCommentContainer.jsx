import React, { Component } from 'react'
import ListActions from "actions/listActions"
import apis  from 'api/apiRoot'

import ReduxFormGenerator from 'components/base/forms/reduxFormGenerator';
import LayoutModal from 'modals/LayoutModal';
import {connect} from 'react-redux'
import GridContainer from 'components/base/grid/GridContainer';
import GridItem from 'components/base/grid/GridItem';
import userStyle from 'assets/jss/layouts/userStyle';
import {likeEvent,commentItem, loadEventWithComments} from "actions/eventActions";
import { withStyles } from '@material-ui/core/styles';
import { DialogActions, Button } from '@material-ui/core';
import { Trans } from 'react-i18next';
import EventCardContainer from 'containers/EventCardContainer';
import CommentContainer from 'containers/CommentContainer';
import * as notifierActions from "actions/notifierActions"
import { reset, reduxForm } from "redux-form";
import ProgressContainer from 'containers/ProgressContainer';

const commentCallback = (form_id) => {
    return {
        success: (dispatch,response) => {
          dispatch(notifierActions.enqueueSnackbar({
            message: 'Comment saved',
            options: {
                variant: 'success',
            }
          })      
          )
          dispatch(reset(form_id))
        }
      }
    }


const mapDispatchToProps = (dispatch,props) => {
    return {
        onSubmit: (values) => {  
            dispatch(commentItem({item: props.event,comment: values.text},commentCallback('new_comment_form')))
        },
  
    }
}

const  mapStateToProps = (state, ownProps) => {
    return{
      event: ownProps.event
    }
}



export class EventModal extends Component {
    componentWillMount(){
        
    }

    constructor(props) {
        super(props);
        const formGenerator = new ReduxFormGenerator({
            reduxForm:{
                form:"new_comment_form",
                enableReinitialize: true,
                keepDirtyOnReinitialize: true 
            },
            mapStateToProps:state => ({
                hasInitial: false,
                formId: "new_comment_form",
                fields: [
                  { name: "text", label: "your comment", size: "lg",xd:12,rows:"4"},
                ],
                submitCaption: "Send",
                cancelable: false  
            }),
            mapDispatchToProps, 
           
        })

        this.generatedForm =  formGenerator.getForm();
    }

    render() {
        const {classes, modal,event}  =this.props
        const GeneratedForm =  this.generatedForm
        return (
            <React.Fragment>                
                <GeneratedForm formId= {"new_comment_form"} onCloseModal={this.props.onCloseModal} event ={event}/>
           </React.Fragment>
            )
  }
}


export default withStyles(userStyle)(connect(mapStateToProps, mapDispatchToProps)(EventModal))
