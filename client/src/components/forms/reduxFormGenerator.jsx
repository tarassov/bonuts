import React from 'react'
import { reduxForm } from 'redux-form'
import SimpleFieldForm from 'components/forms/SimpleFieldForm';
import { connect } from 'react-redux'
import InitializeFromStateForm from 'layouts/InitializeFromStateForm';

class LayoutForm extends React.Component {
    componentDidMount() {
       console.log('mounttttt')
       console.log(this.props)
       this.props.onLoad()
    }
    render (){
   
        const { handleSubmit, load, pristine, reset, submitting } = this.props
        console.log(this.props)
        
        return (
          <SimpleFieldForm {...this.props}/>
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
          
        // You have to connect() to any reducers that you wish to connect to yourself
        let rForm = connect(
            this.options.mapStateToProps,
            this.options.mapDispatchToProps
        )(form)

        return rForm
    }

}

export default ReduxFormGenerator