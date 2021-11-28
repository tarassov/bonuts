import { useState, useEffect } from 'react';
import * as actionTypes from "actions/actionTypes";
import * as apiCaller from "actions/apiCaller";
import { useDispatch } from 'react-redux'
import pluralize from "pluralize";
import { push } from 'redux-first-history';


export function useApi(api, initialsParams = {page:1, filter:{}}) {

    const [queryParams, setQueryParams] = useState(initialsParams)
 
    const dispatch = useDispatch()

    const nameLower =  api.itemName.toLowerCase();

    const actionObject =  api.itemName.toUpperCase();


    function loadItems(args={}) {
        return function (dispatch) {
            const options = {
                useToken: true,
                action: "load",
                name: pluralize.plural(api.itemName),
                apiFunction: api.loadItems,
                args: [args],
            };
            return apiCaller.callApi(dispatch, options).then((json) => {
                let items = json[pluralize.plural(nameLower)];

                if (items === undefined) {
                    items = [];
                }
                if (queryParams.page !== undefined) {
                    let pagination = {
                        page: queryParams.page,
                        per_page: json.headers.get("per-page"),
                        total: json.headers.get("total"),
                        request_date: json.headers.get("request_date"),
                    };

                    if (queryParams.page === 0 || queryParams.page === 1) {
                        apiCaller.apiResult(
                            dispatch,
                            actionTypes.loadSuccess(pluralize.plural(actionObject)),
                            { items: items, ...pagination },
                            () => {
                            return { items: [] };
                            }
                        );
                    } else {
                        apiCaller.apiResult(
                            dispatch,
                            actionTypes.addSuccess(pluralize.plural(actionObject)),
                            { items: items, ...pagination },
                            () => {
                            return { items: [] };
                            }
                        );
                    }
                } else {
                    apiCaller.apiResult(
                    dispatch,
                    actionTypes.loadSuccess(pluralize.plural(actionObject)),
                    { items: items },
                    () => {
                        return { items: [] };
                    }
                    );
                }
            });
        };
    }
  
    function fetchNext(fetchFilter={}){
        setQueryParams({page: queryParams.page+1, filter: queryParams.filter})          
    }

    function refresh(fetchFilter={}){
        if (fetchFilter !==queryParams.filter){
             setQueryParams({page: 1, filter: fetchFilter})
        }
        else{
             setQueryParams({page: queryParams.page+1, filter: queryParams.filter})
        }            
    }


    useEffect(() => {      
        dispatch(loadItems(queryParams))
    },[queryParams]);

    return {fetchNext, refresh}
}