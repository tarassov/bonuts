
import {post,get,del,put,request} from './api'


const REQUEST = '/api/regards/requests'
const ACTIVATE_URL ='/api/regards/activate'

export default class RequestApi {

     
    static itemName ='request'

    static loadItems(token){
        return get(REQUEST+'?archive=true', token)
    }

    static updateItem(token, regard) {
        let body = JSON.stringify({
            ...regard
          })
        return  post(ACTIVATE_URL, body,token)
    }  
}