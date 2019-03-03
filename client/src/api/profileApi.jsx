
import {post,get,del,put,request} from './api'

const PROFILE_URL  =  '/api/profile'
const SELF_ACCOUNT_URL =  '/api/self_accounts'
const DISTRIB_ACCOUNT_URL =  '/api/distrib_accounts'
const CONFIRM_EMAIL_URL = '/api/confirm_email'
const RECOVER_URL = '/api/users/password'

export default class ProfileApi {
    static getProfile(token) {
      return  get(PROFILE_URL, token)
    }

    static getByToken(token, confirm_token){
      return get(CONFIRM_EMAIL_URL +'?token=' + confirm_token)
    }

    static confirmEmail(token, confirm_token) {
      let body = JSON.stringify({
        token: confirm_token
      })
      return post(CONFIRM_EMAIL_URL, body, token)
    }

    static saveProfile(token,profile){
      let body =JSON.stringify({
        name: profile.username,
        email: profile.email
      })
      return put(PROFILE_URL, body,token)
    }

    static loadSelfBalance(token, account_id){
        return  get(SELF_ACCOUNT_URL +'/' + account_id  , token)
    }

    static loadDistribBalance(token, account_id){
        return  get(DISTRIB_ACCOUNT_URL +'/' + account_id , token)
    }

    static requestNewPassword(token, email) {
      let body =JSON.stringify({
        email: email
      })
      return put(RECOVER_URL, body, token )
    }

    static submitNewPassword(token, recover_token, password) {
      let body =JSON.stringify({
        recover_token: recover_token,
        password: password
      })
      return post(RECOVER_URL, body, token )
    }



}
