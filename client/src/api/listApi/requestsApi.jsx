
import {post,get,del,put,request} from '../base/apiBaseOperations'


const REQUEST = '/api/regards/requests'
const ACTIVATE_URL ='/api/regards/activate'

export default class RequestsApi {

     
    static itemName ='request'

    static loadItems(token){
        return get(REQUEST+'?archive=true', token)
    }

    static updateItem(token, regard) {
        let body ={
            ...regard
          }
        return  post(ACTIVATE_URL, body,token)
    }  
}