
import {post,get,del,put,request} from './api'

const PROFILE_URL  =  '/api/profile'



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


}
