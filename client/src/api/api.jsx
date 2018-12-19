import {parse} from "./jsonParser";

function handleErrors(response) {
    console.log(response)
    if (!response.ok) {
        if (response.status === 401) {
            return{unauthorized: true}
        }
        else {
            return{
                error: true,
                status: response.status,
                statusText: response.statusText
            }
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

export function request(url,method, body, token, shouldParse=true) {
    let init = {
        method: method,
        headers: {'Content-Type': 'application/json', 'Authorization': token},
        body: body
    }
    return new Promise((resolve, reject) => {
        window.fetch(url, init)
            .then(handleErrors)
            .then(response => {
                if (response.unauthorized) {
                    return {
                        data: {},
                        unauthorized: true
                    };
                }
                if (response.error){

                    return {
                        data: {},
                        error: true,
                        unauthorized: false,
                        errorText: response.statusText
                    };
                }
                if (response.ok  && response.status !== 204) {
                    return response.json().then(data => {
                        return {
                            ...data,
                            unauthorized: false,
                            error: false,
                            errorText:null

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



