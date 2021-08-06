import React from 'react'
import {connect} from 'react-redux'
import ListActions from 'actions/listActions';
import apis from 'api/apiRoot'
import AccountOperations from 'layouts/AccountOperations';

const mapDispatchToProps = (dispatch, props) => {
    return {
        loadItems: (page) => {
            let listAction = new ListActions(apis.account_log)
            dispatch(listAction.loadItems({id: props.match.params.id, page}))
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