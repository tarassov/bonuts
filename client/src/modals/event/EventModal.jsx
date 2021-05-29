import React, { Component } from 'react'
import ListActions from "actions/listActions"
import apis  from 'api/apiRoot'

import ReduxFormGenerator from 'components/forms/reduxFormGenerator';
import LayoutModal from 'modals/LayoutModal';
import {connect} from 'react-redux'
import GridContainer from 'components/grid/GridContainer';
import GridItem from 'components/grid/GridItem';
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
        loadEvent: (id) =>{
          dispatch(loadEventWithComments(id))  
        },
        onSubmit: (values) => {
  
            dispatch(commentItem({item: props.event,comment: values.text},commentCallback('new_comment_form')))
            
            //props.onCloseModal()
        },
        onCancel: () => {
            props.onCloseModal()
        }
    }
}

const  mapStateToProps = (state) => {
    return{
      events: state.events    
    }
}



export class EventModal extends Component {
    componentWillMount(){
        this.props.loadEvent(this.props.modal.body.event.id)
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
                cancelable: true  
            }),
            mapDispatchToProps, 
           
        })

        this.generatedForm =  formGenerator.getForm();
    }

    render() {
        const {classes, modal,events}  =this.props
        const GeneratedForm =  this.generatedForm
        const event = events.selected//.items.find(event => event.id === modal.body.event.id);
        return (
            <React.Fragment>                
            {(event ===undefined || event.id !== modal.body.event.id) &&
                 <React.Fragment>
                     <ProgressContainer/>           
                 </React.Fragment>

            }
            {event !==undefined && event.id === modal.body.event.id &&
                <LayoutModal>
                <GridContainer>
                        <GridItem xs={12}>
                            <EventCardContainer post = {event}/>
                        </GridItem>
                        <GridItem xs={12}>
                            <GeneratedForm formId= {"new_comment_form"} onCloseModal={this.props.onCloseModal} event ={event}/>
                        </GridItem>
                        {event.comments!==null && event.comments.map((post,index) =>(
                        <GridItem xs={12}  key = {index}>
                            <CommentContainer  post = {post}/>
                        </GridItem>
                        )
                        )}              
             
                
                </GridContainer>        
            </LayoutModal>  
            }
           </React.Fragment>
            )
  }
}


export default withStyles(userStyle)(connect(mapStateToProps, mapDispatchToProps)(EventModal))
