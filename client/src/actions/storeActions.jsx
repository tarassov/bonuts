import * as actionTypes from "./actionTypes"
import  * as commonActions from "actions/commonActions"
import storeApi from "api/storeApi"



export function loadStore() {
    return function (dispatch) {
        return commonActions.callApi(
            dispatch,
            storeApi.loadDonuts,
            [],
            "Loading store",
            actionTypes.loadFailed('STORE')).then(json =>{
              let  donuts   = json.donuts
              if (donuts === undefined) {
                donuts = []
              }
              commonActions.apiResult(dispatch,'LOAD_STORE', donuts,()=>{return{donuts: []}})
            })
    }
}
