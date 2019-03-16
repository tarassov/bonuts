import * as actionTypes from "./actionTypes"
import  * as commonActions from "actions/commonActions"
import storeApi from "api/storeApi"
import * as  profileActions from  "actions/profile/profileActions"


export function loadDonuts() {
    return function (dispatch) {
        return commonActions.callApi(
            dispatch,
            storeApi.loadDonuts,
            [],
            "Loading users",
            actionTypes.loadFailed('donuts')).then(json =>{
              var donuts  = json.donuts
              commonActions.apiResult(dispatch,'LOAD_DONUTS', json.donuts,()=>{return{donuts: []}})
            })
    }
}
