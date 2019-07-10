
import {post,get,del,put,request} from './api'

const URL  =  '/api/account_operations'


export default class AccountLogApi {

     
    static itemName ='account_operation'


    static loadItems(token, id) {
        return  get(URL+'?account_id='+id, token)
    }



}