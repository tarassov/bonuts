import React, {Component } from 'react'
import {connect} from 'react-redux'
import TenantCardList from 'components/TenantCardList'
import {refreshToken, tenantLogin} from '../../actions/authActions'
import ListActions from "actions/listActions"
import apis  from 'api/apiRoot'
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
        onTenantJoin: (tenant) => {

        },
        onLoadAvailableTenants: (email) =>{  
          if (email !== undefined){
            let actions = new ListActions(apis.tenants)
            let domain  = email.replace(/.*@/, "")
            dispatch(actions.loadItems({domain: domain}))
          } 
        }            
    }
}


const  mapStateToProps = (state) => {
      return {
        profile: state.profile,
        authenticate: state.authenticate,
        tenants: state.tenants,
        system: state.system,
      }
}


export default connect(mapStateToProps, mapDispatchToProps)(TenantCardList)
