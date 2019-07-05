import React from 'react'
import { reduxForm } from 'redux-form'
import SimpleFieldForm from 'components/forms/SimpleFieldForm';
import { connect } from 'react-redux'
import InitializeFromStateForm from 'layouts/InitializeFromStateForm';
import { preProcessFile } from 'typescript';

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