import {post,get,del,put,request} from './api'

const USERS_URL = 'api/profiles'
const SEND_POINT_URL = 'api/account_operations'
const EVENTS_URL = 'api/events'
const REGARDS_URL ='api/profile_assets'
export default class DashboardApi {
    static loadUsers(token) {
      return  get(USERS_URL, token)
    }

    static sendPoints(token, amount, from_profile_id, to_profile_ids,comment, is_for_distrib) {
      let body = JSON.stringify({ amount,to_profile_ids: to_profile_ids, from_profile_id,comment, is_for_distrib})
       return post(SEND_POINT_URL, body,token)
    }


    static loadEvents(token,page) {
        return get(EVENTS_URL+'?page=' + page, token)
    }

    static loadRegards(token){
        return get(REGARDS_URL, token)
    }

}
