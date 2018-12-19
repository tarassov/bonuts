import {connect} from 'react-redux'

import {authenticate}  from 'actions/authActions'
import App from "components/App"

const mapDispatchToProps = (dispatch) => {
    return {
    }
}


const  mapStateToProps = (state) => {
    return {
        authenticate: state.authenticate
    }
}

const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(App)


export default  AppContainer
