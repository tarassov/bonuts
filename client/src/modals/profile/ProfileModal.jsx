import React, { Component } from 'react'
import ListActions from "actions/listActions"
import apis  from 'api/apiRoot'
import {saveAvatar} from 'actions/profileActions'
import ReduxFormGenerator from 'components/forms/reduxFormGenerator';
import LayoutModal from 'modals/LayoutModal';
import {connect} from 'react-redux'
import GridContainer from 'components/grid/GridContainer';
import GridItem from 'components/grid/GridItem';
import userStyle from 'assets/jss/layouts/userStyle';

import { withStyles } from '@material-ui/core/styles';
import UserImage from 'components/UserImage';

const mapDispatchToProps = (dispatch,props) => {
    return {
        onLoad: () => {
           let actionsDepartments = new ListActions(apis.departments)
           dispatch(actionsDepartments.loadItems())
        },      
        
        onSubmit: (item) => {
            if (!props.modal.body.disabled){
                let actions = new ListActions(apis.profiles)
                
                if (item.id !==undefined && item.id !==""){
                    dispatch(actions.updateItem(item))    
                }
                else{
                    dispatch(actions.addItem(item))
                }
            }
            props.onCloseModal();
        },
        saveAvatar: (payLoad) => {
            dispatch(saveAvatar(payLoad))
        }
    }
}

const  mapStateToProps = (state) => {
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
                    { name: "email", label: "Email", size: "lg",md:12, disabled: state.modal.body.disabled},
                    { name: "first_name", label: "Name", size: "lg",md:12 , disabled: state.modal.body.disabled},
                    { name: "last_name", label: "Surname", size: "lg",md:12, disabled: state.modal.body.disabled},
                    { name: "department", 
                        source: this.props.departments.items, 
                        size: "lg",
                        disabled: state.modal.body.disabled
                    },
                    { name: "position", label: "Position", size: "lg", disabled: state.modal.body.disabled},
                    { name: "active", label: "Active", size: "lg",checkbox: true, disabled: state.modal.body.disabled},
                    { name: "store_admin", label: "Store admin", size: "lg",checkbox: true, disabled: state.modal.body.disabled}
                    ],
                    submitCaption: !state.modal.body.disabled? "Save changes":"OK",
                    cancelable: !state.modal.body.disabled  
                }),
                mapDispatchToProps,
                title: "Profile",        
               
            })
    
            this.generatedForm =  formGenerator.getForm();
    

    }

    render() {
        const GeneratedForm =  this.generatedForm
        const {modal,profile}  =this.props
        return (
            <LayoutModal title="Profile">
                    <GridContainer>
                        <GridItem xs={12}  sm={6}>                          
                          <UserImage account = {modal.body} saveAvatar={this.props.saveAvatar} changeable= {profile.admin}/>
                        </GridItem>
                        <GridItem xs={12}  sm={6}>
                            <GeneratedForm {...this.props}/>
                        </GridItem>
                    </GridContainer>
            </LayoutModal>            
            )
  }
}


export default withStyles(userStyle)(connect(mapStateToProps, mapDispatchToProps)(ProfileModal))
