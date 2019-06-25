import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
//import { load as loadAccount } from './account'
import {loadAccount,loadProfile, saveProfile} from 'actions/profile/profileActions'
import { renderCheckbox } from 'components/forms/common/render';
import SimpleFieldForm from 'components/forms/SimpleFieldForm';
const data = {
  // used to populate "account" reducer when "Load" is clicked
  firstName: 'Jane',
  lastName: 'Doe',
  age: '42',
  anniversaryDate: '2018-08-22',
  sex: 'female',
  employed: true,
  favoriteColor: 'Blue',
  bio: 'Born to write amazing Redux code.'
}
const colors = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Indigo', 'Violet']

class InitializeFromStateForm extends React.Component {
  componentDidMount() {
     this.props.load()
  }
  render (){
 
      const { handleSubmit, load, pristine, reset, submitting } = this.props
      console.log(this.props)
      
      return (
        <SimpleFieldForm {...this.props}/>
      )
      return (  
        <form onSubmit={handleSubmit}>
          <div>
            <button type="button" onClick={() => load()}>
              Load Account
            </button>
          </div>
          <div>
            <label>First Name</label>
            <div>
              <Field
                name="first_name"
                component="input"
                type="text"
                placeholder="First Name"
              />
            </div>
          </div>
          <div>
            <label>Last Name</label>
            <div>
              <Field
                name="last_name"
                component="input"
                type="text"
                placeholder="Last Name"
              />
            </div>
          </div>
          <div>
            <button type="submit" disabled={pristine || submitting}>
              Submit
            </button>
            <button type="button" disabled={pristine || submitting} onClick={reset}>
              Undo Changes
            </button>
          </div>
        </form>
      )
    
    }
}

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
let form = reduxForm({
  form: 'initializeFromState', // a unique identifier for this form
  enableReinitialize: true,
  keepDirtyOnReinitialize: true 

})(InitializeFromStateForm)

// You have to connect() to any reducers that you wish to connect to yourself
form = connect(
  state => ({
    initialValues: state.account.data // pull initial values from account reducer
  }),
  { load: loadAccount } // bind account loading action creator
)(form)

export default form