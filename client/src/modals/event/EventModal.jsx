import React, { Component } from 'react'
import ListActions from "actions/listActions"
import apis  from 'api/apiRoot'

import ReduxFormGenerator from 'components/forms/reduxFormGenerator';
import LayoutModal from 'modals/LayoutModal';
import {connect} from 'react-redux'
import GridContainer from 'components/grid/GridContainer';
import GridItem from 'components/grid/GridItem';
import userStyle from 'assets/jss/layouts/userStyle';
import {likeEvent,commentItem} from "actions/eventActions";
import { withStyles } from '@material-ui/core/styles';
import { DialogActions, Button } from '@material-ui/core';
import { Trans } from 'react-i18next';
import EventCardContainer from 'containers/EventCardContainer';


const mapDispatchToProps = (dispatch,props) => {
    return {
        onLoad: () =>{

        },
        onSubmit: (values) => {
    
            dispatch(commentItem(props.event,values.text))
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

    constructor(props) {
        super(props);
        const formGenerator = new ReduxFormGenerator({
            reduxForm:{
                form:"new_comment",
                enableReinitialize: true,
                keepDirtyOnReinitialize: true 
            },
            mapStateToProps:state => ({
                hasInitial: false,
                formId: "profile_edit",
                fields: [
                  { name: "text", label: "your comment", size: "lg",xd:12},
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
        const event = events.items.find(event => event.id === modal.body.event.id);
        return (
            <LayoutModal>
                    <GridContainer>
                        <GridItem xs={12}>
                            <EventCardContainer post = {event}/>
                        </GridItem>
                        <GridItem xs={12}>
                            <GeneratedForm onCloseModal={this.props.onCloseModal} event ={event}/>
                        </GridItem>
                    </GridContainer>        
            </LayoutModal>  
           
            )
  }
}


export default withStyles(userStyle)(connect(mapStateToProps, mapDispatchToProps)(EventModal))
