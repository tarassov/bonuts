import React from 'react'
import {connect} from 'react-redux'
import Statistic from 'layouts/Statistic';
import ListActions from 'actions/listActions';
import apis  from 'api/apiRoot'
const mapDispatchToProps = (dispatch) => {
    return {
            onLoad: () =>{
                let listActions = new ListActions(apis.profiles)
                dispatch(listActions.loadItems({show_score: true}))
            }
    }
}


const  mapStateToProps = (state) => {
      return{
        profiles: state.profiles,
      }
}



export default connect(mapStateToProps, mapDispatchToProps)(Statistic)
