import React, { PropTypes,Component } from 'react'
import Typography from '@material-ui/core/Typography'
import {connect} from 'react-redux'
import {authenticate} from '../../actions/authActions'
import  { Redirect } from 'react-router-dom'
import Home from 'components/Home'
import {push} from 'connected-react-router'

const mapDispatchToProps = (dispatch) => {
    return {
          onLoginRedirect: () => {
              dispatch(push('/login'))
          },
          onRegisterRedirect: () => {
              dispatch(push('/register'))
          },        
    }
}


const  mapStateToProps = (state) => {
      return{
          authenticate: state.authenticate
      }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home)
