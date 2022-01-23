import { useState } from 'react';
import * as actionTypes from "actions/actionTypes";
import * as apiCaller from "actions/apiCaller";
import { useDispatch } from 'react-redux'
import pluralize from "pluralize";
import { push } from 'redux-first-history';
import { defaultCallback } from "notifiers/notifierFactory";

export function useUpdateResource(api) {
  const [resource, setResource] = useState({updated: false,error: false});

  const dispatch = useDispatch()
  
  const nameLower =  api.itemName.toLowerCase();

  const actionObject =  api.itemName.toUpperCase();
  

  function updateResource(item, redirect = undefined,callback = undefined){
    dispatch(updateAction(item,redirect,callback))
  }
  
  function updateAction(item, redirect,callback) {
    return function (dispatch) {
      const options = {
        useToken: true,
        action: "update",
        name: api.itemName,
        apiFunction: api.updateItem,
        args: [item],
      };

      return apiCaller.callApi(dispatch, options).then((json) => {
        let items = json[pluralize.plural(nameLower)];
        if (items !== undefined) {
          items.forEach((item) => {
            apiCaller.apiResult(
              dispatch,
              actionTypes.updateSuccess(actionObject),
              { item: item }
            );
          });
          setResource({...items[0],isLoading: false, loaded: true, updated: true, error: false})
        } else {
          apiCaller.apiResult(
            dispatch,
            actionTypes.updateSuccess(actionObject),
            { item: json[nameLower] }
          );
          setResource({...json[nameLower],isLoading: false, loaded: true, updated: true, error: false})
          
          if  (redirect!==undefined && redirect.successPath !==undefined) dispatch(push(redirect.successPath))

          if (callback !== undefined && callback.success !== undefined) {
            callback.success(dispatch);
          } else {
            defaultCallback.success(dispatch, api.itemName, "updated");
          }
        }
      })
      .catch(()=>{
        setResource({...resource,isLoading: false, loaded: false, updated: false, error: true})   
        if  (redirect!==undefined && redirect.failPath !==undefined) dispatch(push(redirect.failPath))   
      });
    };
  }


  return {updateResource};
}