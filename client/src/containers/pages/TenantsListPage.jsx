import React, {Component } from 'react'
import {connect} from 'react-redux'
import TenantCardList from 'components/TenantCardList'
import {refreshToken, tenantLogin,tenantJoin} from '../../actions/authActions'
import ActionFactory from "actions/actionFactory"
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
          dispatch(tenantJoin(tenant))
        },

        onInvitationAccept:(invitation) => {
          let actions = new ActionFactory(apis.invitations)
          dispatch(actions.updateItem({accept: true}))
        },

        onInvitationDecline: (invitation) => {
          let actions = new ActionFactory(apis.invitations)
          dispatch(actions.updateItem({decline: true}))
        },

        onLoadAccessibleTenants: (email) =>{  
            let actions = new ActionFactory(apis.tenants,'accessible_tenant')
            dispatch(actions.loadItems({accessible: true}))
        },   
        onLoadTenants: () =>{  
          let actions = new ActionFactory(apis.tenants)
          dispatch(actions.loadItems())
        }, 
        onLoadInvitations: () =>{  
          let actions = new ActionFactory(apis.invitations)
          dispatch(actions.loadItems({my: true}))
        }         
    }
}


const  mapStateToProps = (state) => {
      return {
        profile: state.profile,
        authenticate: state.authenticate,
        tenants: state.tenants,
        accessible_tenants: state.accessible_tenants,
        invitations: state.invitations,
        system: state.system,
      }
}


export default connect(mapStateToProps, mapDispatchToProps)(TenantCardList)
