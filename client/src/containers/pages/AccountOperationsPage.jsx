import React, { PropTypes,Component } from 'react'
import {connect} from 'react-redux'
import Store from 'components/store/Store'
import { loadAccount } from 'actions/profile/profileActions';
import ListActions from 'actions/listActions';
import apis from 'api/apiRoot'
import AccountOperations from 'layouts/AccountOperations';

const mapDispatchToProps = (dispatch, props) => {
    return {
        loadItems: () => {
            console.log(props)
            let listAction = new ListActions(apis.account_log)
            dispatch(listAction.loadItems({id: props.match.params.id}))
        }
    }
}


const  mapStateToProps = (state) => {
      return{
        account_operations: state.account_operations,
        profile: state.profile,
      }
}


export default connect(mapStateToProps, mapDispatchToProps)(AccountOperations)