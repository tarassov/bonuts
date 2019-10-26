
import React, { Component } from 'react'
import ListActions from "actions/listActions"
import apis  from 'api/apiRoot'

import ReduxFormGenerator from 'components/forms/reduxFormGenerator';
import LayoutModal from 'modals/LayoutModal';
import {connect} from 'react-redux'
import GridContainer from 'components/grid/GridContainer';
import GridItem from 'components/grid/GridItem';
import userStyle from 'assets/jss/layouts/userStyle';
import { withStyles } from '@material-ui/core/styles';
import { DialogActions, Button } from '@material-ui/core';
import { Trans } from 'react-i18next';
import EventCardContainer from 'containers/EventCardContainer';
import CommentContainer from 'containers/CommentContainer';
import NewCommentContainer from 'containers/NewCommentContainer';


export class EventLayout extends Component {

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
           // mapDispatchToProps, 
           
        })

        this.generatedForm =  formGenerator.getForm();
          
    }
    componentDidMount(){
        this.props.onLoad();
    }

    render() {
        const {events}  =this.props
        return (
            <React.Fragment>
                    {events.selected !==undefined &&
                    <GridContainer >
                        <GridItem xs = {12} >
                            <EventCardContainer post = {events.selected}/>
                        </GridItem>
                        <GridItem xs={12}>
                          {
                              <NewCommentContainer event={events.selected}/>                              
                          }
                        </GridItem>
                        {events.selected.comments!==null && events.selected.comments.map((post,index) =>(
                        <GridItem xs={12}  key = {index}>
                            <CommentContainer  post = {post}/>
                        </GridItem>
                        )
                        )}               
                    </GridContainer>
                    }        
            </React.Fragment>  
           
            )
  }
}
export default withStyles(userStyle)(EventLayout)
