
import {post,get,del,put,request} from './api'

const URL  =  '/api/account_operations'


export default class AccountLogApi {

     
    static itemName ='account_operation'


    static loadItems(token, args) {
        return  get(URL+'?account_id='+args.id, token)
    }



}