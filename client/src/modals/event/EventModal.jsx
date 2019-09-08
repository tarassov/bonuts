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


const mapDispatchToProps = (dispatch,props) => {
    return {

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
    }

    render() {
        const {classes, modal,events}  =this.props
        const event = events.items.find(event => event.id === modal.body.event.id);
        return (
            <LayoutModal>
                    <GridContainer>
                        <GridItem xs={12}>
                            <EventCardContainer post = {event}/>
                        </GridItem>
                    </GridContainer>
                    <DialogActions>
                        <Button onClick={this.props.onCloseModal} color="secondary" >
                        <Trans>Close</Trans>
                        </Button>
                    </DialogActions> 
            </LayoutModal>  
           
            )
  }
}


export default withStyles(userStyle)(connect(mapStateToProps, mapDispatchToProps)(EventModal))
