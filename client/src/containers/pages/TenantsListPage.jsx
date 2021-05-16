import React, {Component } from 'react'
import {connect} from 'react-redux'
import TenantCardList from 'components/TenantCardList'

const img = {
    display: 'block',
    maxwidth: 150,
    maxHeight: 300,
    margin:0,
    padding:0
  };
  

const mapDispatchToProps = (dispatch) => {
    return {
        onJoinTenant: () => {
        },      
        
        onEnterTenant: (item) => {
            
        },      
    }
}


const  mapStateToProps = (state) => {
      return {
        profile: state.profile,
        system: state.system,
      }
}


export default connect(mapStateToProps, mapDispatchToProps)(TenantCardList)
