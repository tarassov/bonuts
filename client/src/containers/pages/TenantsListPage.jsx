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

        onInvitationAccept:(invitation) => {

        },

        onInvitationDecline: (invitation) => {

        },

        onLoadAccessibleTenants: (email) =>{  
            let actions = new ListActions(apis.tenants)
            dispatch(actions.loadItems({accessible: true}))
        },   
        onLoadTenants: () =>{  
          let actions = new ListActions(apis.tenants)
          dispatch(actions.loadItems())
        }, 
        onLoadInvitations: () =>{  
          let actions = new ListActions(apis.invitations)
          dispatch(actions.loadItems({my: true}))
        }         
    }
}


const  mapStateToProps = (state) => {
      return {
        profile: state.profile,
        authenticate: state.authenticate,
        tenants: state.tenants,
        invitations: state.invitations,
        system: state.system,
      }
}


export default connect(mapStateToProps, mapDispatchToProps)(TenantCardList)
