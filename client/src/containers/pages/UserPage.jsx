import React, {Component } from 'react'
import {connect} from 'react-redux'
import {loadAccount,loadProfile, saveProfile,saveAvatar} from 'actions/profile/profileActions'
import  ProgressContainer from "containers/ProgressContainer"
import ListActions from "actions/listActions"
import apis  from 'api/apiRoot'
import Progress from "components/Progress";
import ReduxFormGenerator from 'components/forms/reduxFormGenerator';
import { stat } from 'fs';
import Dropzone from 'react-dropzone';
import { Button } from '@material-ui/core';
import Previews from 'components/Previews';
import GridContainer from 'components/grid/GridContainer';
import GridItem from 'components/grid/GridItem';
import User from 'layouts/User';

const img = {
    display: 'block',
    maxwidth: 150,
    maxHeight: 300,
    margin:0,
    padding:0
  };
  

const mapDispatchToProps = (dispatch) => {
    return {
        onLoad: () => {
            dispatch(loadAccount())
            let actionsDepartments = new ListActions(apis.departments)
            dispatch(actionsDepartments.loadItems())
        },      
        
        onSubmit: (item) => {
            dispatch(saveProfile(item))
        },
        saveAvatar: (payLoad) => {
            dispatch(saveAvatar(payLoad))
        }
    }
}


const  mapStateToProps = (state) => {
      return{
        dashboard: state.dashboard,
        account: state.account,
        profile: state.profile,
        system: state.system,
        departments: state.departments
      }
}


export default connect(mapStateToProps, mapDispatchToProps)(User)
