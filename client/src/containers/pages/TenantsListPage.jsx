import React, {Component } from 'react'
import {connect} from 'react-redux'
import TenantCardList from 'components/TenantCardList'
import {refreshToken, tenantLogin} from '../../actions/authActions'
const img = {
    display: 'block',
    maxwidth: 150,
    maxHeight: 300,
    margin:0,
    padding:0
  };
  

const mapDispatchToProps = (dispatch) => {
    return {
        onLoad: () =>{
          dispatch(refreshToken())
        },
        onTenantLogin: (tenant) => {
          dispatch(tenantLogin(tenant))
        },      
        
        onEnterTenant: (item) => {
            
        },      
    }
}


const  mapStateToProps = (state) => {
      return {
        profile: state.profile,
        authenticate: state.authenticate,
        system: state.system,
      }
}


export default connect(mapStateToProps, mapDispatchToProps)(TenantCardList)
