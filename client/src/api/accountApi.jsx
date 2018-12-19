
import {post,get,del,put,request} from './api'

const ACCOUNT_URL  =  '/api/account'



export default class AccountApi {
    static getAccount(token) {
      return  get(ACCOUNT_URL, token)
    }

    static saveAccount(token,account){
      let body =JSON.stringify({
        name: account.username,
        email: account.email,
        secret_url: account.secret_url
      })
      return put(ACCOUNT_URL, body,token)
    }


}
