
import {post,get,del,put,request} from './api'

const PROFILE_URL  =  '/api/profile'
const PROFILES_URL  =  '/api/profiles'
const SELF_ACCOUNT_URL =  '/api/self_accounts'
const DISTRIB_ACCOUNT_URL =  '/api/distrib_accounts'
const CONFIRM_EMAIL_URL = '/api/confirm_email'
const RECOVER_URL = '/api/users/password'
const RECOVER_BY_TOKEN ='/api/users/recover'


export default class ProfileApi {
    static getProfile(token) {
      return  get(PROFILE_URL, token)
    }

    static getProfileById(token,id) {
      return  get(PROFILES_URL+'/'+id, token)
    }

    static getByToken(token, confirm_token){
      return get(CONFIRM_EMAIL_URL +'?token=' + confirm_token)
    }

    static getByRecoverToken(token, recover_token){
      return get(RECOVER_BY_TOKEN +'?recover_token=' + recover_token)
    }

    static confirmEmail(token, confirm_token) {
      let body = JSON.stringify({
        token: confirm_token
      })
      return post(CONFIRM_EMAIL_URL, body, token)
    }

    static saveProfile(token,profile){
      let body =JSON.stringify({
        email: profile.email,
        first_name: profile.first_name,
        last_name: profile.last_name,
        department_id: profile.department ? profile.department.id: null,
        position: profile.position,
        admin: profile.admin,
        active: profile.active
      })
      return put(PROFILE_URL + 's/' + profile.id, body,token)
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

    static submitNewPassword(recover_token, password) {
      let body =JSON.stringify({
        recover_token: recover_token,
        password: password
      })
      return request(RECOVER_URL, "POST", body,null,false)
    }

    static saveAvatar(token,payload) {
      let body =payload
      return request('/api/save_avatar', "POST", body,token,false,true)
    }


}
