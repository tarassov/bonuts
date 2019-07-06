import React from 'react'
import { reduxForm } from 'redux-form'
import SimpleFieldForm from 'components/forms/SimpleFieldForm';
import { connect } from 'react-redux'
import DynamicForm from 'components/forms/DynamicForm';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Trans } from "react-i18next";

class LayoutForm extends React.Component {
    componentWillMount() {
       this.props.onLoad()
    }

    componentDidMount() {
        
      }


    render (){
   
        return (
            
          <SimpleFieldForm  {...this.props}/>
        )    
      }
    }


class ReduxFormGenerator {

    constructor(params){
        const default_options = {   
            reduxForm: { 
                form:"formid1",
                enableReinitialize: true,
                keepDirtyOnReinitialize: true,
            },
            mapStateToProps: (state =>{   
            }),
            mapDispatchToProps: ((dispatch, props) =>{

            }),
            props: {},
            title:""
        }

        this.options = {
            ...default_options,
            ...params
        }

    }

    getForm = () =>{

        let form = reduxForm(
           this.options.reduxForm          
        )(LayoutForm)

        let rForm = connect(
            this.options.mapStateToProps,
            this.options.mapDispatchToProps
        )(form)

        return rForm
    }


}

export default ReduxFormGenerator