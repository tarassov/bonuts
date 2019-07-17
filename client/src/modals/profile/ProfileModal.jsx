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

const mapDispatchToProps = (dispatch,props) => {
    return {
        onLoad: () => {
           let actionsDepartments = new ListActions(apis.departments)
           dispatch(actionsDepartments.loadItems())
        },      
        
        onSubmit: (item) => {
            let actions = new ListActions(apis.profiles)
            
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
    console.log(state)
    return{
      profile: state.profile,
      departments: state.departments
    }
}

export class ProfileModal extends Component {

    constructor(props) {
        super(props);

            const formGenerator = new ReduxFormGenerator({
                reduxForm:{
                    form:"profile_edit",
                    enableReinitialize: true,
                    keepDirtyOnReinitialize: true 
                },
                mapStateToProps:state => ({
                    hasInitial: true,
                    initialValues: state.modal.body ,
                    formId: "profile_edit",
                    fields: [
                    { name: "email", label: "Email", md:12, disabled: state.modal.body.disabled},
                    { name: "first_name", label: "Name", md:12 , disabled: state.modal.body.disabled},
                    { name: "last_name", label: "Surname", md:12, disabled: state.modal.body.disabled},
                    { name: "department", 
                        source: this.props.departments.items, 
                        size: "lg",
                        disabled: state.modal.body.disabled
                    },
                    { name: "position", label: "Position", size: "lg", disabled: state.modal.body.disabled}],
                    submitCaption: "Save changes"     ,
                    cancelable: true  
                }),
                mapDispatchToProps,
                title: "Profile",        
               
            })
    
            this.generatedForm =  formGenerator.getForm();
    

    }

    render() {
        const GeneratedForm =  this.generatedForm
        const {classes, modal}  =this.props
        return (
            <LayoutModal title="Profile">
                    <GridContainer>
                        <GridItem xs={12}  sm={4} lg={3}>
                          {modal.body.user_avatar!==undefined && <img className={classes.image} src={modal.body.user_avatar.url} alt="not found"/>}                          
                        </GridItem>
                        <GridItem xs={12}  sm={8} lg={9}>
                            <GeneratedForm {...this.props}/>
                        </GridItem>
                    </GridContainer>
            </LayoutModal>            
            )
  }
}


export default withStyles(userStyle)(connect(mapStateToProps, mapDispatchToProps)(ProfileModal))
