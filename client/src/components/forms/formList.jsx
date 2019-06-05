import {reduxForm } from 'redux-form'
import ActivateRegardForm from 'components/forms/ActivateRegard'

const  ActivateRegard = reduxForm({form: 'activateRegard'})(ActivateRegardForm)

export default ActivateRegard
