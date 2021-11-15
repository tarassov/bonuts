import { useState, useEffect } from 'react';
import * as actionTypes from "actions/actionTypes";
import * as apiCaller from "actions/apiCaller";
import { useDispatch } from 'react-redux'
import pluralize from "pluralize";
import { push } from 'redux-first-history';

export function useResource(api, id) {
  const [resource, setResource] = useState({isLoading: true, loaded: false, updated: false,error: false});

  const dispatch = useDispatch()
  
  const nameLower =  api.itemName.toLowerCase();

  const actionObject =  api.itemName.toUpperCase();
  

  function getResource(){
    return function (dispatch) {
    const options = {
        useToken: true,
        action: "get",
        name: api.itemName,
        apiFunction: api.getItem,
        args: [id],
      };
      
      return apiCaller.callApi(dispatch, options).then((json) => {
        //setTimeout(()=>{
          setResource({...json[nameLower],isLoading: false, loaded: true, updated: false, error: false})
      // }, 5000)
        apiCaller.apiResult(
          dispatch,
          actionTypes.getSuccess(actionObject),
          { item: json[nameLower] }
        )    
      })
      .catch(() => {
        setResource({...resource,isLoading: false, loaded: false, error: true})
      });
    }
  }   
  
  function updateResource(item, redirect = undefined){
    dispatch(updateAction(item,redirect))
  }
  
  function updateAction(item, redirect) {
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
          console.log(redirect)
          if  (redirect!==undefined && redirect.successPath !==undefined) dispatch(push(redirect.successPath))
        }
      })
      .catch(()=>{
        setResource({...resource,isLoading: false, loaded: false, updated: false, error: true})   
        if  (redirect!==undefined && redirect.failPath !==undefined) dispatch(push(redirect.failPath))   
      });
    };
  }

    useEffect(() => {      
        dispatch(getResource()) 
    },[]);

  return [resource, updateResource] ;
}