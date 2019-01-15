
import {post,get,del,put,request} from './api'

const PROFILE_URL  =  '/api/profile'
const SELF_ACCOUNT_URL =  '/api/self_accounts'
const DISTRIB_ACCOUNT_URL =  '/api/distrib_accounts'



export default class ProfileApi {
    static getProfile(token) {
      return  get(PROFILE_URL, token)
    }

    static saveProfile(token,profile){
      let body =JSON.stringify({
        name: profile.username,
        email: profile.email
      })
      return put(PROFILE_URL, body,token)
    }

    static loadSelfBalance(token, profile){
        return  get(SELF_ACCOUNT_URL +'/' + profile.self_account.id  , token)
    }

    static loadDistribBalance(token, profile){
        return  get(DISTRIB_ACCOUNT_URL +'/' + profile.distrib_account.id  , token)
    }



}
