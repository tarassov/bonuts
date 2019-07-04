
import {post,get,del,put,request} from './api'

const REGARD_URL  =  '/api/profile_assets'
const SELF_ACCOUNT_URL =  '/api/self_accounts'
const DISTRIB_ACCOUNT_URL =  '/api/distrib_accounts'
const CONFIRM_EMAIL_URL = '/api/confirm_email'
const RECOVER_URL = '/api/users/password'
const RECOVER_BY_TOKEN ='/api/users/recover'


export default class RegardApi {
    static updateRegard(token, regard) {
        let body = JSON.stringify({
            id: regard.id
          })
        return  post(REGARD_URL, token)
    }



}