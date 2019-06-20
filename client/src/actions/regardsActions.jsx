import * as actionTypes from "./actionTypes"
import  * as commonActions from "actions/commonActions"
import dashboardApi from "api/dashboardApi"

const name = 'regards'

export function loadRegards(page){
    return function (dispatch) {
      const options = {
        useToken: true,
        action: 'load',
        name: name, 
        apiFunction: dashboardApi.loadRegards,
        args:[page]
      }

      
      return commonActions.callApi(
          dispatch,options).then(json =>{
              let  regards  = json.regards
              if (regards === undefined) {
                regards = []
              }
              let type
              if (page ==0 || page == 1) {
               type = actionTypes.loadSuccess(name)
              }
              else {
                type = actionTypes.addSuccess(name)
              }  
              commonActions.apiResult(
                dispatch,type,
                {
                    items: regards,
                    per_page: json.headers.get('per-page'),
                    total: json.headers.get('total'),
                    request_date: json.headers.get('request_date'),
                    page: page
                },
                ()=>{return{items: []}}
              )
          }
        )
    }
  }