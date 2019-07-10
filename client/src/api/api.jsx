import {parse} from "./jsonParser";

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

export function request(url,method, body, token, shouldParse=true, tenant = 'cki') {
    let init = {
        method: method,
        headers: {'Content-Type': 'application/json', 'Authorization': JSON.stringify({token:token, tenant:tenant})},
        body: body
    }
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
                        errorMessage: response.message
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
