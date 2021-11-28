import { useState, useEffect } from 'react';
import * as actionTypes from "actions/actionTypes";
import * as apiCaller from "actions/apiCaller";
import { useDispatch } from 'react-redux'
import pluralize from "pluralize";
import { push } from 'redux-first-history';
import { defaultCallback } from "notifiers/notifierFactory";

export function useAddResource(api) {
  const [resource, setResource] = useState({created: false});

  const dispatch = useDispatch()
  
  const nameLower =  api.itemName.toLowerCase();

  const actionObject =  api.itemName.toUpperCase();
  

  function addResource(item, redirect = undefined,callback = undefined){
    dispatch(addAction(item,redirect,callback))
  }
  
  function addAction(item, redirect,callback) {
    return function (dispatch) {
      const options = {
        useToken: true,
        action: "add",
        name: api.itemName,
        apiFunction: api.addItem,
        args: [item],
      };

      return apiCaller.callApi(dispatch, options).then((json) => {
        let items = json[pluralize.plural(nameLower)];
        if (items !== undefined) {
          items.forEach((item) => {
            apiCaller.apiResult(
              dispatch,
              actionTypes.addSuccess(actionObject),
              { item: item }
            );
          });
          setResource({...items[0],isLoading: false, loaded: true, updated: true, error: false})
          if  (redirect!==undefined && redirect.successPath !==undefined) dispatch(push(redirect.successPath))
          if (callback !== undefined && callback.success !== undefined) {
            callback.success(dispatch);
          } else {
            defaultCallback.success(dispatch, api.itemName, "added");
          }
        } else {
          apiCaller.apiResult(
            dispatch,
            actionTypes.addSuccess(actionObject),
            { item: json[nameLower] }
          );
          setResource({...json[nameLower],created: true})
          console.log(redirect)
          if  (redirect!==undefined && redirect.successPath !==undefined) dispatch(push(redirect.successPath))
          if (callback !== undefined && callback.success !== undefined) {
            callback.success(dispatch);
          } else {
            defaultCallback.success(dispatch, api.itemName, "added");
          }
        }
      })
      .catch(()=>{
        setResource({...resource,created: false})   
        if  (redirect!==undefined && redirect.failPath !==undefined) dispatch(push(redirect.failPath))   
      });
    };
  }


  return {addResource};
}