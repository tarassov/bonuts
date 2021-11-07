import { useState, useEffect } from 'react';
import * as actionTypes from "actions/actionTypes";
import * as commonActions from "actions/apiCaller";
import storeApi from "api/listApi/storeApi";
import { useDispatch } from 'react-redux'

export function useDonut(id) {
  const [donut, setDonut] = useState(null);

  const dispatch = useDispatch()

  function getDonut(id){
    return function (dispatch) {
        const options = {
          useToken: true,
          action: "load",
          name: name,
          apiFunction: storeApi.getItem,
          args: [id],
        };
    
        return commonActions.callApi(dispatch, options).then((json) => {
          commonActions.apiResult(dispatch, actionTypes.loadItemSuccess(name), {
            item: json.donut,
          });
          if (json.donut !== undefined) {
            setDonut(json.donut)
          }
        });
      };
  }  


  useEffect(() => {      
      dispatch(getDonut(id)) 
  },[]);

  return donut;
}