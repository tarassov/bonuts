import React, { Component } from 'react'
import ListActions from "actions/listActions"
import apis  from 'api/apiRoot'
import ReduxFormGenerator from 'components/forms/reduxFormGenerator';
import LayoutModal from 'modals/LayoutModal';
import {connect} from 'react-redux'
import { Button } from '@material-ui/core';

const mapDispatchToProps = (dispatch,props) => {
    return {
        onLoad: () => {
            let listActions = new ListActions(apis.profiles)
            dispatch(listActions.loadItems())
        },      
        
        onSubmit: (item) => {
            let actions = new ListActions(apis.schedulers)
            
            if (item.id !==undefined && item.id !==""){
                dispatch(actions.updateItem(item))    
            }
            else{
                dispatch(actions.addItem(item))
            }
            props.onCloseModal();
        }
    }
}

const  mapStateToProps = (state) => {
    return{
      dashboard: state.dashboard,
      profiles: state.profiles
    }
}

export class PluginModal extends Component {

    constructor(props) {
        super(props);
       
        var fields = props.body.settings.map(property=>{
            return {name: property.name, size: "lg", label: property.notes}
        })
        const formGenerator = new ReduxFormGenerator({
            reduxForm:{
                form:"plugin_properties",
                enableReinitialize: true,
                keepDirtyOnReinitialize: true 
            },
            mapStateToProps:state => ({
                hasInitial: true,
                initialValues: state.modal.body ,
                formId: "scheduler_form",
                fields: [
                    { name: "name", size:"lg", label: "Name",disabled:true },
                    ...fields
                ],
                submitCaption: "Save changes",
                cancelable: true          
            }),
            mapDispatchToProps,
            title: "New plugin",               
           
        })

        this.generatedForm =  formGenerator.getForm();

    }

    render() {
        const GeneratedForm =  this.generatedForm
        return (
            <LayoutModal title="Plugin">
                <Button>Refresh or Activate</Button>
                <GeneratedForm  {...this.props}/>
            </LayoutModal>            
            )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(PluginModal)
