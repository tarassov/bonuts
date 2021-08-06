import {parse} from "api/base/jsonParser";
import Storage from "common/storage";

function handleErrors(response) {
    if (!response.ok) {
        if (response.status === 401) {
            return{                        
              unauthorized: true,
            }
        }
        else {
            return response.json()
        }
    }
    return response;
}
export function post(url, body, token) {
    return request(url,'POST',body,token)
}
export function put(url,body,token) {
    return request(url,'PUT', body,token)
}
export function del(url,token) {
    return request(url, 'DELETE',undefined,token)
}

export function get(url,token) {
    return request(url, 'GET',undefined,token)
}

export function request(url,method, bodyObject, token, shouldParse=true, formData = false) {
    let tenant = Storage.getTenant()

    if (method === 'GET' || method === 'DELETE'){
        if (url.includes('?')){
            url = url +'&tenant='+tenant
        }
        else{
            url = url +'?tenant='+tenant
        }
    }
    else if (!formData){
        bodyObject = {...bodyObject, tenant: tenant}
    }
    else{
        bodyObject.append("tenant", tenant);
    }
    let body = JSON.stringify(bodyObject)
        
    let init = {
        method: method,
        headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' +token},
        body: body
    }
    if (formData) {
        let headers = new Headers();
        headers.append('Authorization','Bearer ' +token)        
        init = {
            method: method,
            // @ts-ignore
            headers: headers,
            body: bodyObject
        }
    } 
   // let fullUrl = 'http://localhost:3000/' + url

    return new Promise((resolve, reject) => {
        window.fetch(url, init)
            .then(handleErrors)
            .then(response => {
                console.log(response)
                if (response.unauthorized) {
                    return {
                        data: {},
                        unauthorized: true,
                        error: true,
                        errorText: 'Not Authorized.'
                    };
                }
                if (response.error){
                    return {
                        data: {},
                        error: true,
                        unauthorized: false,
                        errorText: response.message,
                        errorMessage: response.message,
                        errorCode: response.errorCode,
                        errorParams: response.errorParams
                    };
                }
                if (response.ok  && response.status !== 204) {
                    return response.json().then(data => {
                        console.log(data)
                        return {
                            ...data,
                            unauthorized: false,
                            error: false,
                            errorText:null,
                            headers: response.headers

                        }
                    })
                }
                else {
                    return {
                        data: {},
                        unauthorized: false,
                        error: false,
                        errorText:null
                    }
                }

            })
            .then(json =>{
               console.log(json) 
                if (shouldParse) {
                    resolve(parse(json))
                }
                else{
                    resolve(json)
                }

            })
            .catch(error => {
                reject(error)
            })
    })
}
