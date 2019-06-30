import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import {loadAccount,loadProfile, saveProfile} from 'actions/profile/profileActions'
import { renderCheckbox } from 'components/forms/common/render';
import SimpleFieldForm from 'components/forms/SimpleFieldForm';


 class InitializeFromStateForm extends React.Component {
  componentDidMount() {
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
  export default InitializeFromStateForm
// // Decorate with reduxForm(). It will read the initialValues prop provided by connect()
// let form = reduxForm({
//   form: 'initializeFromState', // a unique identifier for this form
//   enableReinitialize: true,
//   keepDirtyOnReinitialize: true 

// })(InitializeFromStateForm)

// // You have to connect() to any reducers that you wish to connect to yourself
// form = connect(
//   state => ({
//     initialValues: state.account.data // pull initial values from account reducer
//   }),
//   { load: loadAccount } // bind account loading action creator
// )(form)

// export default form