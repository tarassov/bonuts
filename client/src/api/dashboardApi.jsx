import {post,get,del,put,request} from './api'

const USERS_URL = 'api/profiles'
const SEND_POINT_URL = 'api/account_operations'
const EVENTS_URL = 'api/events'

export default class DashboardApi {
    static loadUsers(token) {
      return  get(USERS_URL, token)
    }

    static sendPoints(token, amount, from_account_id, to_profiles_ids,comment) {
      let body = JSON.stringify({ amount,to_profiles_ids: to_profiles_ids, from_account_id,comment})
       return post(SEND_POINT_URL, body,token)
    }


    static loadEvents(token,page) {
        return get(EVENTS_URL+'?page=' + page, token)
    }

}
